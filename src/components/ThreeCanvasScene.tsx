import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Maximize2,
  Minimize2,
  Sun,
  Moon,
  Wind,
  Compass,
  Eye,
  Sparkles,
  Tractor,
  Layers,
  RotateCw,
} from 'lucide-react';

interface ThreeCanvasSceneProps {
  className?: string;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export const ThreeCanvasScene: React.FC<ThreeCanvasSceneProps> = ({
  className = '',
  isExpanded = false,
  onToggleExpand,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'sunset' | 'night'>('day');
  const [cameraView, setCameraView] = useState<'drone' | 'ground' | 'silo'>('drone');
  const [selectedCropInfo, setSelectedCropInfo] = useState<string | null>(
    'Ratnagiri Alphonso Mango Tree #04 · Grade A+ Organic'
  );
  const [windActive, setWindActive] = useState(true);

  // References to keep across renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const reqIdRef = useRef<number | null>(null);
  const tractorRef = useRef<THREE.Group | null>(null);
  const cropsGroupRef = useRef<THREE.Group | null>(null);
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 360;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x06281e);
    scene.fog = new THREE.FogExp2(0x06281e, 0.025);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.set(22, 16, 26);
    camera.lookAt(0, 2, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.7);
    ambientLightRef.current = ambientLight;
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffedd5, 1.8);
    sunLight.position.set(30, 45, 20);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 100;
    sunLight.shadow.camera.left = -25;
    sunLight.shadow.camera.right = 25;
    sunLight.shadow.camera.top = 25;
    sunLight.shadow.camera.bottom = -25;
    sunLightRef.current = sunLight;
    scene.add(sunLight);

    // Secondary fill light for vivid produce colors
    const fillLight = new THREE.PointLight(0x34d399, 1.2, 50);
    fillLight.position.set(-15, 10, -10);
    scene.add(fillLight);

    // 5. Ground / Soil Rows
    const groundGeo = new THREE.PlaneGeometry(60, 60, 32, 32);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x1b4332,
      roughness: 0.9,
      metalness: 0.1,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Soil furrow ridges (striated farming rows)
    const rowGroup = new THREE.Group();
    const rowMat = new THREE.MeshStandardMaterial({ color: 0x2d1810, roughness: 0.95 });
    for (let i = -14; i <= 14; i += 2.4) {
      const ridgeGeo = new THREE.BoxGeometry(0.8, 0.25, 36);
      const ridge = new THREE.Mesh(ridgeGeo, rowMat);
      ridge.position.set(i, 0.12, 0);
      ridge.receiveShadow = true;
      rowGroup.add(ridge);
    }
    scene.add(rowGroup);

    // 6. Crops & Fruit Trees
    const cropsGroup = new THREE.Group();
    cropsGroupRef.current = cropsGroup;

    // Organic Wheat stalks
    const wheatMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.6 });
    const wheatStemMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.8 });

    for (let r = -12; r <= -4; r += 2.4) {
      for (let z = -14; z <= 14; z += 1.2) {
        const stalkGroup = new THREE.Group();
        const stemGeo = new THREE.CylinderGeometry(0.04, 0.05, 1.4, 5);
        const stem = new THREE.Mesh(stemGeo, wheatStemMat);
        stem.position.y = 0.7;
        stalkGroup.add(stem);

        const earGeo = new THREE.ConeGeometry(0.14, 0.6, 6);
        const ear = new THREE.Mesh(earGeo, wheatMat);
        ear.position.y = 1.4;
        stalkGroup.add(ear);

        stalkGroup.position.set(r + (Math.random() - 0.5) * 0.4, 0.2, z + (Math.random() - 0.5) * 0.4);
        stalkGroup.castShadow = true;
        cropsGroup.add(stalkGroup);
      }
    }

    // Tomato Vines with Red Fruit Spheres
    const tomatoMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3, metalness: 0.2 });
    const vineMat = new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.8 });

    for (let r = -2; r <= 6; r += 2.4) {
      for (let z = -12; z <= 12; z += 2.5) {
        const bush = new THREE.Group();
        const vineGeo = new THREE.DodecahedronGeometry(0.7, 1);
        const vine = new THREE.Mesh(vineGeo, vineMat);
        vine.position.y = 0.8;
        bush.add(vine);

        // 3 red ripe tomatoes per bush
        for (let t = 0; t < 3; t++) {
          const tomGeo = new THREE.SphereGeometry(0.18, 12, 12);
          const tom = new THREE.Mesh(tomGeo, tomatoMat);
          const angle = (t / 3) * Math.PI * 2;
          tom.position.set(Math.cos(angle) * 0.6, 0.7 + t * 0.2, Math.sin(angle) * 0.6);
          tom.castShadow = true;
          bush.add(tom);
        }

        bush.position.set(r, 0.2, z);
        cropsGroup.add(bush);
      }
    }

    // Orchard Trees (Ratnagiri Alphonso Mango & Citrus)
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5c3a21, roughness: 0.9 });
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x047857, roughness: 0.7 });
    const mangoMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.3, metalness: 0.1 });

    for (let r = 9; r <= 15; r += 3.2) {
      for (let z = -12; z <= 12; z += 4.5) {
        const tree = new THREE.Group();
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.35, 2.4, 8), trunkMat);
        trunk.position.y = 1.2;
        trunk.castShadow = true;
        tree.add(trunk);

        const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(1.6, 1), foliageMat);
        crown.position.y = 2.8;
        crown.castShadow = true;
        tree.add(crown);

        // Golden Mangoes hanging
        for (let m = 0; m < 4; m++) {
          const mango = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 10), mangoMat);
          const ma = (m / 4) * Math.PI * 2;
          mango.position.set(Math.cos(ma) * 1.3, 2.2 + (m % 2) * 0.4, Math.sin(ma) * 1.3);
          tree.add(mango);
        }

        tree.position.set(r, 0, z);
        cropsGroup.add(tree);
      }
    }

    scene.add(cropsGroup);

    // 7. Cold Storage Consolidation Hub Building
    const hubGroup = new THREE.Group();
    const hubBuilding = new THREE.Mesh(
      new THREE.BoxGeometry(7, 4, 9),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4, metalness: 0.6 })
    );
    hubBuilding.position.set(-18, 2, 0);
    hubBuilding.castShadow = true;
    hubGroup.add(hubBuilding);

    // Roof solar panels
    const solarPanel = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 8),
      new THREE.MeshStandardMaterial({ color: 0x1e3a8a, metalness: 0.9, roughness: 0.1 })
    );
    solarPanel.rotation.x = -Math.PI / 2;
    solarPanel.position.set(-18, 4.05, 0);
    hubGroup.add(solarPanel);

    // Cold chain antenna / beacon
    const beacon = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0x10b981 })
    );
    beacon.position.set(-18, 5, 0);
    hubGroup.add(beacon);

    scene.add(hubGroup);

    // 8. 3D Autonomous Electric Tractor
    const tractorGroup = new THREE.Group();
    const tractorBody = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 1.1, 2.4),
      new THREE.MeshStandardMaterial({ color: 0x16a34a, metalness: 0.4, roughness: 0.3 })
    );
    tractorBody.position.y = 0.9;
    tractorBody.castShadow = true;
    tractorGroup.add(tractorBody);

    const tractorCabin = new THREE.Mesh(
      new THREE.BoxGeometry(1.3, 0.9, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 })
    );
    tractorCabin.position.set(0, 1.7, -0.2);
    tractorGroup.add(tractorCabin);

    // Tractor wheels (4)
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x171717, roughness: 0.9 });
    const wheelGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.3, 16);
    wheelGeo.rotateZ(Math.PI / 2);

    const wheelFL = new THREE.Mesh(wheelGeo, wheelMat);
    wheelFL.position.set(0.9, 0.45, 0.8);
    tractorGroup.add(wheelFL);

    const wheelFR = new THREE.Mesh(wheelGeo, wheelMat);
    wheelFR.position.set(-0.9, 0.45, 0.8);
    tractorGroup.add(wheelFR);

    const bigWheelGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.35, 16);
    bigWheelGeo.rotateZ(Math.PI / 2);

    const wheelRL = new THREE.Mesh(bigWheelGeo, wheelMat);
    wheelRL.position.set(1.0, 0.65, -0.7);
    tractorGroup.add(wheelRL);

    const wheelRR = new THREE.Mesh(bigWheelGeo, wheelMat);
    wheelRR.position.set(-1.0, 0.65, -0.7);
    tractorGroup.add(wheelRR);

    tractorGroup.position.set(-0.8, 0, -10);
    tractorRef.current = tractorGroup;
    scene.add(tractorGroup);

    // 9. Floating 3D Harvest Indicator Pins
    const pinGeo = new THREE.OctahedronGeometry(0.5, 0);
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      emissive: 0x059669,
      emissiveIntensity: 0.6,
      wireframe: false,
    });
    const pin1 = new THREE.Mesh(pinGeo, pinMat);
    pin1.position.set(10.5, 5, 0);
    scene.add(pin1);

    const pin2 = new THREE.Mesh(pinGeo, new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xd97706, emissiveIntensity: 0.6 }));
    pin2.position.set(-8, 3.5, 2);
    scene.add(pin2);

    // 10. Interactive Drag Orbit
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let sphericalTheta = 0.85;
    let sphericalPhi = 0.85;
    let sphericalRadius = 36;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      sphericalTheta -= deltaX * 0.008;
      sphericalPhi = Math.max(0.2, Math.min(Math.PI / 2.1, sphericalPhi - deltaY * 0.008));

      updateCameraPosition();
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      sphericalRadius = Math.max(12, Math.min(55, sphericalRadius + e.deltaY * 0.03));
      updateCameraPosition();
    };

    const updateCameraPosition = () => {
      if (!cameraRef.current) return;
      cameraRef.current.position.x = sphericalRadius * Math.sin(sphericalPhi) * Math.sin(sphericalTheta);
      cameraRef.current.position.y = sphericalRadius * Math.cos(sphericalPhi);
      cameraRef.current.position.z = sphericalRadius * Math.sin(sphericalPhi) * Math.cos(sphericalTheta);
      cameraRef.current.lookAt(0, 1.5, 0);
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('wheel', onWheel, { passive: false });

    // Touch support for mobile devices
    let touchStartDist = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        touchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDragging) {
        const deltaX = e.touches[0].clientX - prevMouseX;
        const deltaY = e.touches[0].clientY - prevMouseY;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
        sphericalTheta -= deltaX * 0.01;
        sphericalPhi = Math.max(0.2, Math.min(Math.PI / 2.1, sphericalPhi - deltaY * 0.01));
        updateCameraPosition();
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const diff = touchStartDist - dist;
        touchStartDist = dist;
        sphericalRadius = Math.max(12, Math.min(55, sphericalRadius + diff * 0.05));
        updateCameraPosition();
      }
    };
    const onTouchEnd = () => {
      isDragging = false;
    };
    domElement.addEventListener('touchstart', onTouchStart);
    domElement.addEventListener('touchmove', onTouchMove);
    domElement.addEventListener('touchend', onTouchEnd);

    // 11. Animation Loop
    let clock = new THREE.Clock();
    let tractorZ = -12;
    let tractorDir = 1;

    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Animate Autonomous Tractor patrolling
      if (tractorRef.current) {
        tractorZ += 0.045 * tractorDir;
        if (tractorZ > 12) {
          tractorDir = -1;
          tractorRef.current.rotation.y = Math.PI;
        } else if (tractorZ < -12) {
          tractorDir = 1;
          tractorRef.current.rotation.y = 0;
        }
        tractorRef.current.position.z = tractorZ;
      }

      // Wind sway on crops
      if (windActive && cropsGroupRef.current) {
        cropsGroupRef.current.children.forEach((child, idx) => {
          if (child instanceof THREE.Group) {
            child.rotation.z = Math.sin(elapsedTime * 2.2 + idx) * 0.06;
          }
        });
      }

      // Floating pins rotation & bobbing
      pin1.rotation.y += 0.02;
      pin1.position.y = 5 + Math.sin(elapsedTime * 3) * 0.35;
      pin2.rotation.y -= 0.025;
      pin2.position.y = 3.5 + Math.cos(elapsedTime * 2.5) * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    // 12. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      resizeObserver.disconnect();
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('wheel', onWheel);
      domElement.removeEventListener('touchstart', onTouchStart);
      domElement.removeEventListener('touchmove', onTouchMove);
      domElement.removeEventListener('touchend', onTouchEnd);
      renderer.dispose();
    };
  }, [windActive]);

  // Handle Time of Day changes
  useEffect(() => {
    if (!sceneRef.current || !sunLightRef.current || !ambientLightRef.current) return;
    if (timeOfDay === 'day') {
      sceneRef.current.background = new THREE.Color(0x06281e);
      sceneRef.current.fog = new THREE.FogExp2(0x06281e, 0.025);
      sunLightRef.current.color.setHex(0xffedd5);
      sunLightRef.current.intensity = 1.8;
      ambientLightRef.current.color.setHex(0xfff5e6);
      ambientLightRef.current.intensity = 0.7;
    } else if (timeOfDay === 'sunset') {
      sceneRef.current.background = new THREE.Color(0x271120);
      sceneRef.current.fog = new THREE.FogExp2(0x271120, 0.025);
      sunLightRef.current.color.setHex(0xf97316);
      sunLightRef.current.intensity = 2.2;
      ambientLightRef.current.color.setHex(0xfb923c);
      ambientLightRef.current.intensity = 0.5;
    } else {
      sceneRef.current.background = new THREE.Color(0x030712);
      sceneRef.current.fog = new THREE.FogExp2(0x030712, 0.03);
      sunLightRef.current.color.setHex(0x38bdf8);
      sunLightRef.current.intensity = 0.5;
      ambientLightRef.current.color.setHex(0x1e293b);
      ambientLightRef.current.intensity = 0.35;
    }
  }, [timeOfDay]);

  // Handle Preset Camera Angles
  const setPresetView = (preset: 'drone' | 'ground' | 'silo') => {
    setCameraView(preset);
    if (!cameraRef.current) return;
    if (preset === 'drone') {
      cameraRef.current.position.set(22, 18, 26);
      cameraRef.current.lookAt(0, 2, 0);
    } else if (preset === 'ground') {
      cameraRef.current.position.set(0, 2.5, 14);
      cameraRef.current.lookAt(0, 1.2, 0);
    } else if (preset === 'silo') {
      cameraRef.current.position.set(-14, 8, 14);
      cameraRef.current.lookAt(-18, 3, 0);
    }
  };

  return (
    <div
      className={`relative rounded-3xl overflow-hidden border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-950 via-[#042419] to-neutral-950 shadow-[0_20px_50px_rgba(6,78,59,0.35)] select-none ${className} ${
        isExpanded ? 'h-[580px]' : 'h-[360px] sm:h-[400px]'
      }`}
    >
      {/* 3D WebGL Canvas Viewport */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating 3D HUD Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="px-3 py-1.5 rounded-xl bg-neutral-950/85 backdrop-blur-md border border-emerald-400/40 text-white shadow-lg flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-black tracking-wider uppercase text-emerald-300 font-mono">
            Web 3D Interactive Farm
          </span>
          <span className="text-[10px] text-neutral-400 hidden sm:inline">| Drag to Rotate &amp; Zoom</span>
        </div>
      </div>

      {/* Top Right Controls (Full Screen & Perspective Toggles) */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => setTimeOfDay(timeOfDay === 'day' ? 'sunset' : timeOfDay === 'sunset' ? 'night' : 'day')}
          className="p-2 rounded-xl bg-neutral-950/85 backdrop-blur-md border border-white/20 text-neutral-200 hover:text-white hover:bg-neutral-800 text-xs font-bold transition-all shadow-md cursor-pointer"
          title={`Lighting: ${timeOfDay.toUpperCase()}`}
        >
          {timeOfDay === 'day' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : timeOfDay === 'sunset' ? (
            <Sparkles className="w-4 h-4 text-orange-400" />
          ) : (
            <Moon className="w-4 h-4 text-sky-300" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setWindActive(!windActive)}
          className={`p-2 rounded-xl backdrop-blur-md border text-xs font-bold transition-all shadow-md cursor-pointer ${
            windActive
              ? 'bg-emerald-600/90 border-emerald-400 text-white'
              : 'bg-neutral-950/85 border-white/20 text-neutral-400 hover:text-white'
          }`}
          title="Toggle Crop Wind Physics"
        >
          <Wind className="w-4 h-4" />
        </button>

        {onToggleExpand && (
          <button
            type="button"
            onClick={onToggleExpand}
            className="p-2 rounded-xl bg-neutral-950/85 backdrop-blur-md border border-white/20 text-neutral-200 hover:text-white hover:bg-neutral-800 text-xs font-bold transition-all shadow-md cursor-pointer"
            title={isExpanded ? 'Collapse 3D View' : 'Expand 3D Full View'}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Bottom Floating Telemetry & Camera Views HUD */}
      <div className="absolute bottom-4 inset-x-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-none">
        {/* Selected Crop Telemetry Card */}
        <div className="bg-neutral-950/90 backdrop-blur-md border border-emerald-500/40 rounded-2xl px-3.5 py-2 text-white shadow-xl pointer-events-auto flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center flex-shrink-0">
            <Tractor className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold">
              3D Field Telemetry
            </div>
            <div className="text-xs font-bold text-neutral-100">{selectedCropInfo}</div>
          </div>
        </div>

        {/* Camera Preset Angles */}
        <div className="bg-neutral-950/90 backdrop-blur-md border border-white/20 rounded-2xl p-1 text-white shadow-xl pointer-events-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setPresetView('drone')}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              cameraView === 'drone' ? 'bg-emerald-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Drone View
          </button>
          <button
            type="button"
            onClick={() => setPresetView('ground')}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              cameraView === 'ground' ? 'bg-emerald-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Crop Rows
          </button>
          <button
            type="button"
            onClick={() => setPresetView('silo')}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              cameraView === 'silo' ? 'bg-emerald-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Cold Hub
          </button>
        </div>
      </div>
    </div>
  );
};
