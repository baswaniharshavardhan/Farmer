import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { SupportedLanguage, SUPPORTED_LANGUAGES, LanguageOption, getTranslation, translateText } from '../utils/translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (keyOrText: string) => string;
  languages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Keep track of the original English text for every Text node in the DOM
const originalTextMap = new WeakMap<Node, string>();
const originalPlaceholderMap = new WeakMap<Element, string>();
const originalTitleMap = new WeakMap<Element, string>();

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('farmdirect_language') as SupportedLanguage;
    return saved && ['en', 'hi', 'mr', 'pa', 'te', 'ta', 'bn', 'kn'].includes(saved) ? saved : 'en';
  });

  const languageRef = useRef<SupportedLanguage>(language);
  languageRef.current = language;

  const isTranslatingRef = useRef(false);

  // Translate a single text node
  const translateNode = useCallback((node: Text, lang: SupportedLanguage) => {
    // Skip script, style, svg contents
    const parent = node.parentElement;
    if (parent) {
      const tagName = parent.tagName.toLowerCase();
      if (['script', 'style', 'noscript', 'code', 'pre'].includes(tagName)) {
        return;
      }
      if (parent.closest('svg') || parent.classList.contains('notranslate')) {
        return;
      }
    }

    const currentVal = node.nodeValue;
    if (!currentVal || !currentVal.trim()) return;

    if (lang === 'en') {
      // Revert to English cleanly
      const orig = originalTextMap.get(node);
      const enText = translateText(orig || currentVal, 'en');
      if (node.nodeValue !== enText) {
        node.nodeValue = enText;
      }
      originalTextMap.set(node, enText);
    } else {
      // Translating to non-English
      if (!originalTextMap.has(node)) {
        // Resolve English base first
        const enSource = translateText(currentVal, 'en');
        originalTextMap.set(node, enSource);
      }
      const original = originalTextMap.get(node) || currentVal;
      const translated = translateText(original, lang);
      if (translated !== node.nodeValue) {
        node.nodeValue = translated;
      }
    }
  }, []);

  // Translate element attributes like placeholders and titles
  const translateElementAttrs = useCallback((el: Element, lang: SupportedLanguage) => {
    if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea') {
      const inputEl = el as HTMLInputElement | HTMLTextAreaElement;
      if (inputEl.placeholder) {
        if (lang === 'en') {
          const orig = originalPlaceholderMap.get(inputEl) || inputEl.placeholder;
          const enText = translateText(orig, 'en');
          inputEl.placeholder = enText;
          originalPlaceholderMap.set(inputEl, enText);
        } else {
          if (!originalPlaceholderMap.has(inputEl)) {
            const enSource = translateText(inputEl.placeholder, 'en');
            originalPlaceholderMap.set(inputEl, enSource);
          }
          const original = originalPlaceholderMap.get(inputEl) || inputEl.placeholder;
          inputEl.placeholder = translateText(original, lang);
        }
      }
    }

    const title = el.getAttribute('title');
    if (title) {
      if (lang === 'en') {
        const orig = originalTitleMap.get(el) || title;
        const enText = translateText(orig, 'en');
        el.setAttribute('title', enText);
        originalTitleMap.set(el, enText);
      } else {
        if (!originalTitleMap.has(el)) {
          const enSource = translateText(title, 'en');
          originalTitleMap.set(el, enSource);
        }
        const original = originalTitleMap.get(el) || title;
        el.setAttribute('title', translateText(original, lang));
      }
    }
  }, []);

  // Walk all DOM elements and text nodes
  const translateSubtree = useCallback((root: Node, lang: SupportedLanguage) => {
    if (!root) return;
    if (isTranslatingRef.current) return;
    isTranslatingRef.current = true;

    try {
      const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
        {
          acceptNode: (n) => {
            if (n.nodeType === Node.ELEMENT_NODE) {
              const el = n as Element;
              const tag = el.tagName.toLowerCase();
              if (['script', 'style', 'noscript'].includes(tag) || el.classList.contains('notranslate')) {
                return NodeFilter.FILTER_REJECT;
              }
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_ACCEPT;
          },
        }
      );

      let currentNode = walker.nextNode();
      while (currentNode) {
        if (currentNode.nodeType === Node.TEXT_NODE) {
          translateNode(currentNode as Text, lang);
        } else if (currentNode.nodeType === Node.ELEMENT_NODE) {
          translateElementAttrs(currentNode as Element, lang);
        }
        currentNode = walker.nextNode();
      }
    } finally {
      isTranslatingRef.current = false;
    }
  }, [translateNode, translateElementAttrs]);

  // Synchronize Google Translate widget / cookies if present
  const syncGoogleTranslate = useCallback((lang: SupportedLanguage) => {
    try {
      if (lang === 'en') {
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        if (window.location.hostname) {
          document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
        }
        document.cookie = 'googtrans=/en/en; path=/; SameSite=Lax';
      } else {
        document.cookie = `googtrans=/en/${lang}; path=/; SameSite=Lax`;
        if (window.location.hostname) {
          document.cookie = `googtrans=/en/${lang}; path=/; domain=${window.location.hostname}; SameSite=Lax`;
        }
      }
      const googleSelect = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (googleSelect) {
        googleSelect.value = lang;
        googleSelect.dispatchEvent(new Event('change'));
      }
    } catch {
      // Ignore if iframe restricts cookie access
    }
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    languageRef.current = lang;
    localStorage.setItem('farmdirect_language', lang);
    document.documentElement.lang = lang;
    syncGoogleTranslate(lang);

    // Run synchronous DOM translation pass
    requestAnimationFrame(() => {
      translateSubtree(document.body, lang);
    });
  };

  // Observe all DOM changes so dynamically rendered elements, modals, tabs, and lists are automatically translated
  useEffect(() => {
    document.documentElement.lang = language;
    syncGoogleTranslate(language);

    // Initial translation pass
    translateSubtree(document.body, language);

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const observer = new MutationObserver((mutations) => {
      if (isTranslatingRef.current) return;

      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              translateSubtree(node, languageRef.current);
            });
          } else if (mutation.type === 'characterData') {
            if (mutation.target.nodeType === Node.TEXT_NODE) {
              translateNode(mutation.target as Text, languageRef.current);
            }
          }
        });
      }, 50);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      observer.disconnect();
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [language, translateSubtree, translateNode, syncGoogleTranslate]);

  const t = (keyOrText: string) => {
    return getTranslation(language, keyOrText);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
