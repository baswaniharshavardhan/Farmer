import React, { useState } from 'react';
import {
  IndianRupee,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Download,
  Printer,
  FileText,
  Building2,
  Calendar,
  Search,
  Filter,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import { FarmerPayoutRecord, Order } from '../types';

interface FarmerReceivedMoneyProps {
  payouts: FarmerPayoutRecord[];
  farmName: string;
  bankName: string;
  bankAccount: string;
  ifscCode: string;
  upiId: string;
}

export const FarmerReceivedMoney: React.FC<FarmerReceivedMoneyProps> = ({
  payouts,
  farmName,
  bankName,
  bankAccount,
  ifscCode,
  upiId,
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [downloadSlipId, setDownloadSlipId] = useState<string | null>(null);

  const totalGross = payouts.reduce((acc, p) => acc + p.grossAmount, 0);
  const totalReceivedNet = payouts.reduce((acc, p) => acc + p.farmerNetPayout, 0);
  const totalLogisticsDeducted = payouts.reduce((acc, p) => acc + p.grossAmount * 0.07, 0);

  const filteredPayouts = payouts.filter(
    (p) =>
      p.id.toLowerCase().includes(filterQuery.toLowerCase()) ||
      p.orderId.toLowerCase().includes(filterQuery.toLowerCase()) ||
      p.status.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner: Total Received Money & Direct DBT Settlement */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-neutral-900 text-white rounded-3xl p-6 border-2 border-emerald-500/40 shadow-xl relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs uppercase font-mono tracking-wider text-emerald-300 font-bold">
                Automated DBT Escrow Settlement
              </span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
              Total Received Money (88% Net Payouts)
            </h3>
            <p className="text-xs text-neutral-300 max-w-xl leading-relaxed">
              Every customer order checkout is protected by a mathematical escrow engine. Upon produce dispatch and verification, 88% is credited directly to your bank account without deductions.
            </p>
          </div>

          <div className="bg-emerald-900/60 border border-emerald-400/40 rounded-2xl p-5 text-right space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-semibold block">
              Net Settled to Bank
            </span>
            <div className="font-mono font-black text-3xl text-emerald-300">
              ₹{totalReceivedNet.toFixed(2)}
            </div>
            <span className="text-[11px] text-emerald-200/80 block">
              Gross Value: ₹{totalGross.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Linked Bank Account & Payment VPA Details Card */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs">
        <h4 className="font-bold text-neutral-900 text-sm mb-3 flex items-center gap-2">
          <Landmark className="w-4 h-4 text-emerald-700" />
          <span>Verified Linked Bank Account for Instant Credits</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
            <span className="text-neutral-500 block text-[11px]">Beneficiary Bank</span>
            <strong className="text-neutral-900 font-semibold mt-0.5 block">{bankName}</strong>
          </div>

          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
            <span className="text-neutral-500 block text-[11px]">Account Number</span>
            <strong className="text-neutral-900 font-mono mt-0.5 block">{bankAccount}</strong>
          </div>

          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
            <span className="text-neutral-500 block text-[11px]">IFSC Code</span>
            <strong className="text-neutral-900 font-mono mt-0.5 block">{ifscCode}</strong>
          </div>

          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
            <span className="text-neutral-500 block text-[11px]">UPI VPA (Direct QR)</span>
            <strong className="text-emerald-700 font-mono mt-0.5 block truncate">{upiId}</strong>
          </div>
        </div>
      </div>

      {/* Transaction Ledger Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-neutral-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="font-bold text-neutral-900 text-base">Received Payouts &amp; DBT Records</h4>
            <p className="text-xs text-neutral-500">
              Audit trail of every single order settlement with bank UTR reference numbers.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by order or payout ID..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Payout ID / UTR Ref</th>
                <th className="py-3 px-4">Order Ref</th>
                <th className="py-3 px-4">Gross Customer Spend</th>
                <th className="py-3 px-4 text-emerald-800">88% Farmer Net Payout</th>
                <th className="py-3 px-4">7% Logistics</th>
                <th className="py-3 px-4">Settlement Status</th>
                <th className="py-3 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-150">
              {filteredPayouts.map((record, index) => {
                const isCleared = record.status === 'processed' || record.status === 'cleared';
                const utrNumber = `UTR-${new Date(record.timestamp).getFullYear()}${record.id.replace(/\D/g, '').padEnd(8, '0')}`;
                return (
                  <tr key={record.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-neutral-900">{record.id}</div>
                      <div className="text-[10px] text-neutral-500 font-mono">{utrNumber}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-neutral-800">{record.orderId}</span>
                      <div className="text-[10px] text-neutral-400">
                        {new Date(record.timestamp).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-semibold text-neutral-800">
                      ₹{record.grossAmount.toFixed(2)}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-emerald-700 text-sm">
                        ₹{record.farmerNetPayout.toFixed(2)}
                      </span>
                      <span className="block text-[10px] text-emerald-600 font-semibold">
                        (88.0% Take-home)
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-neutral-500">
                      ₹{(record.grossAmount * 0.07).toFixed(2)}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isCleared
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{isCleared ? 'Bank Credited (DBT)' : 'Escrow Holding'}</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => setDownloadSlipId(record.id)}
                        className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold rounded-lg text-[11px] inline-flex items-center gap-1 border border-neutral-300 transition-colors cursor-pointer"
                        title="Download official payment voucher"
                      >
                        <FileText className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Slip</span>
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredPayouts.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-xs text-neutral-400">
                    No matching payout records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slip Modal Preview */}
      {downloadSlipId && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-neutral-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <h4 className="font-bold text-sm text-neutral-900">Official DBT Payment Voucher</h4>
              <button
                type="button"
                onClick={() => setDownloadSlipId(null)}
                className="text-neutral-400 hover:text-neutral-700 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs bg-neutral-50 p-4 rounded-2xl border border-neutral-200 font-mono">
              <div className="flex justify-between">
                <span>Voucher ID:</span>
                <strong>{downloadSlipId}</strong>
              </div>
              <div className="flex justify-between">
                <span>Producer:</span>
                <strong>{farmName}</strong>
              </div>
              <div className="flex justify-between">
                <span>Credited Account:</span>
                <strong>{bankName} ({bankAccount})</strong>
              </div>
              <div className="flex justify-between pt-2 border-t text-emerald-800 font-bold text-sm">
                <span>Amount Deposited:</span>
                <strong>₹{payouts.find((p) => p.id === downloadSlipId)?.farmerNetPayout.toFixed(2)}</strong>
              </div>
              <div className="text-[10px] text-neutral-500 pt-1">
                Settled through RBI IMPS / NEFT Direct Settlement Protocol
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  window.print();
                  setDownloadSlipId(null);
                }}
                className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
