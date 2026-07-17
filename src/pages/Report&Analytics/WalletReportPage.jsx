import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import AdminShell from "../../components/layouts/AdminShell";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { useToast } from "../../components/common/ToastNotification";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle2,
  XCircle,
  Undo2,
  Search,
  Filter,
  Download,
  FileSpreadsheet,
  FileText,
  Eye,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// Mock Data
const MOCK_SUMMARY = {
  totalBalance: 1245000,
  totalCredits: 800000,
  totalDebits: 400000,
  pendingTransactions: 142,
  successfulTransactions: 15842,
  failedTransactions: 24,
  totalRefunds: 15400
};

const MOCK_TRANSACTIONS = Array.from({ length: 50 }, (_, i) => ({
  id: `TRX-${Math.floor(100000 + Math.random() * 900000)}`,
  userName: `User ${i + 1}`,
  type: Math.random() > 0.5 ? 'Credit' : 'Debit',
  amount: Math.floor(100 + Math.random() * 5000),
  method: ['UPI', 'Credit Card', 'Bank Transfer', 'Wallet'][Math.floor(Math.random() * 4)],
  status: ['Success', 'Pending', 'Failed'][Math.floor(Math.random() * 3)],
  date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  referenceId: `REF-${Math.floor(10000000 + Math.random() * 90000000)}`
}));

// Utility for formatting currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function WalletReportPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTxn, setSelectedTxn] = useState(null);
  const { addToast } = useToast();

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [calendarPos, setCalendarPos] = useState({ top: 0, left: 0 });
  const datePickerRef = useRef(null);

  const handleDateTriggerClick = useCallback(() => {
    if (datePickerRef.current) {
      const rect = datePickerRef.current.getBoundingClientRect();
      setCalendarPos({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX - 250 // offset to right-align mostly
      });
    }
    setShowDatePicker(prev => !prev);
  }, []);

  useEffect(() => {
    if (!showDatePicker) return;
    const handler = (e) => {
      if (datePickerRef.current && datePickerRef.current.contains(e.target)) return;
      const portal = document.getElementById('wallet-date-portal');
      if (portal && portal.contains(e.target)) return;
      setShowDatePicker(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showDatePicker]);

  const dateLabel = dateRange[0].startDate.getTime() === dateRange[0].endDate.getTime()
    ? format(dateRange[0].startDate, 'MMM d, yyyy')
    : `${format(dateRange[0].startDate, 'MMM d, yyyy')} - ${format(dateRange[0].endDate, 'MMM d, yyyy')}`;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success':
      case 'Completed': return 'text-emerald-700 bg-emerald-50 border-emerald-200/60';
      case 'Pending': return 'text-amber-700 bg-amber-50 border-amber-200/60';
      case 'Failed': return 'text-rose-700 bg-rose-50 border-rose-200/60';
      default: return 'text-gray-700 bg-gray-50 border-gray-200/60';
    }
  };

  // CSV Export Function
  const handleExportCSV = () => {
    alert("Exporting CSV...");
    // Logic here
  };

  return (
    <AdminShell activeTab="Reports & Analytics" searchPlaceholder="Search reports...">
      <div className="w-full min-h-screen bg-[#f8fafd] p-4 sm:p-6 lg:p-8 text-slate-700 ">
        
        {/* HEADER SECTION */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Wallet Report</h1>
            <p className="text-sm text-gray-500 mt-1 font-medium">
              Comprehensive overview of wallet balances and transactions
            </p>
          </div>
          
          <div className="flex items-center gap-2 relative">
            {/* Calendar Button */}
            <button 
              ref={datePickerRef}
              onClick={handleDateTriggerClick}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-slate-700 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span>📅</span> {dateLabel} <span className="text-[10px] text-gray-400">▼</span>
            </button>

            {/* Export Button */}
            <button 
              onClick={() => addToast('Exporting CSV Report...', 'info')}
              className="flex items-center gap-2 px-4 py-2 bg-[#1d0094] rounded-lg text-xs font-bold text-white shadow-sm hover:bg-opacity-90 transition-colors"
            >
              <span>📤</span> Export CSV
            </button>
          </div>
        </div>

        {/* TOP ROW: THREE SEGMENT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white border border-gray-200/70 rounded-xl p-6 shadow-sm relative">
            <div className="absolute top-6 right-6 text-slate-400 text-lg">👥</div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">User Segment</span>
            <div className="mt-4">
              <span className="text-2xl font-black text-slate-900 tracking-tight block">$1,482,930.55</span>
              <div className="flex items-center gap-1 mt-1 text-[11px]">
                <span className="font-bold text-emerald-500">📈 12.5%</span>
                <span className="text-gray-400">vs last month</span>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200/70 rounded-xl p-6 shadow-sm relative">
            <div className="absolute top-6 right-6 text-slate-400 text-lg">💎</div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Partner Segment</span>
            <div className="mt-4">
              <span className="text-2xl font-black text-slate-900 tracking-tight block">$842,100.00</span>
              <div className="flex items-center gap-1 mt-1 text-[11px]">
                <span className="font-bold text-emerald-500">📈 4.2%</span>
                <span className="text-gray-400">vs last month</span>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200/70 rounded-xl p-6 shadow-sm relative">
            <div className="absolute top-6 right-6 text-slate-400 text-lg">🏪</div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Seller Segment</span>
            <div className="mt-4">
              <span className="text-2xl font-black text-slate-900 tracking-tight block">$2,109,445.12</span>
              <div className="flex items-center gap-1 mt-1 text-[11px]">
                <span className="font-bold text-rose-500">📉 2.1%</span>
                <span className="text-gray-400">vs last month</span>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white border border-gray-200/70 rounded-xl p-6 shadow-sm lg:col-span-2 flex flex-col justify-between">
            <h3 className="text-sm font-black text-[#1d0094] tracking-wide mb-6">Aggregate Balance Trend</h3>
            <div className="h-56 flex items-end justify-between pt-4 px-2 relative border-b border-gray-100">
               {/* Bar Chart Bars */}
              <div className="w-[6%] bg-gray-200 rounded-t h-[40%]"></div>
              <div className="w-[6%] bg-gray-200 rounded-t h-[45%]"></div>
              <div className="w-[6%] bg-gray-200 rounded-t h-[35%]"></div>
              <div className="w-[6%] bg-gray-200 rounded-t h-[55%]"></div>
              <div className="w-[6%] bg-gray-200 rounded-t h-[65%]"></div>
              <div className="w-[6%] bg-gray-200 rounded-t h-[75%]"></div>
              <div className="w-[6%] bg-gray-200 rounded-t h-[70%]"></div>
              <div className="w-[6%] bg-[#1d0094] rounded-t h-[85%]"></div>
              <div className="w-[6%] bg-gray-400 rounded-t h-[80%]"></div>
              <div className="w-[6%] bg-gray-400 rounded-t h-[90%]"></div>
              <div className="w-[6%] bg-gray-400 rounded-t h-[87%]"></div>
              <div className="w-[6%] bg-gray-400 rounded-t h-[93%]"></div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            <div className="bg-white border border-gray-200/70 rounded-xl p-6 shadow-sm flex-1">
              <h3 className="text-sm font-black text-slate-800 tracking-wide mb-4">Wallet Activity</h3>
              {/* Wallet Activity Items */}
              <div className="space-y-4">
                <div>
                   <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5"><span>Avg. Top-up Size</span><span className="text-slate-900 font-extrabold">$1,240.00</span></div>
                   <div className="w-full bg-gray-100 h-1.5 rounded-full"><div className="bg-slate-900 h-full rounded-full" style={{ width: "40%" }}></div></div>
                </div>
                <div>
                   <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5"><span>Avg. Withdrawal</span><span className="text-slate-900 font-extrabold">$4,500.00</span></div>
                   <div className="w-full bg-gray-100 h-1.5 rounded-full"><div className="bg-slate-900 h-full rounded-full" style={{ width: "75%" }}></div></div>
                </div>
                <div>
                   <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5"><span>Pending Transfers</span><span className="text-slate-900 font-extrabold">143</span></div>
                   <div className="w-full bg-gray-100 h-1.5 rounded-full"><div className="bg-slate-900 h-full rounded-full" style={{ width: "20%" }}></div></div>
                </div>
              </div>
            </div>
            
            {/* Critical Alert */}
            <div className="bg-[#110066] text-white rounded-xl p-5 shadow-sm">
              <span className="text-[9px] font-black text-blue-300 tracking-wider uppercase block">Critical Alert</span>
              <h4 className="text-sm font-black mt-1 tracking-tight">High Volume Withdrawal</h4>
              <button className="mt-4 text-xs font-bold text-white underline" type="button" onClick={() => addToast('Opening Case Review...', 'info')}>Review Case</button>
            </div>
          </div>
        </div>

        {/* TABLE SECTION */}
        <div className="bg-white border border-gray-200/80 rounded-xl shadow-sm overflow-hidden">
          <div className="table-responsive-wrapper">
<table className="w-full text-left text-xs border-collapse">
             <thead>
                <tr className="bg-[#f8fafd] text-gray-400 border-b uppercase text-[9px] font-black">
                  <th className="py-3.5 px-6">Transaction ID</th>
                  <th className="py-3.5 px-6">Entity</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Amount</th>
                  <th className="py-3.5 px-6 text-right">Status</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-100 font-bold text-slate-700">
                {/* Rows */}
                <tr className="cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => setSelectedTxn({id: 'TRX-99201', userName: 'John Sullivan', type: 'Debit', amount: 1200, method: 'Bank Transfer', status: 'Completed', date: new Date().toISOString(), referenceId: 'REF-83921029'})}><td className="py-4 px-6">#TRX-99201</td><td className="py-4 px-6">John Sullivan (Seller)</td><td className="py-4 px-4">Withdrawal</td><td className="py-4 px-4">Oct 24, 2023</td><td className="py-4 px-4">-$1,200.00</td><td className="py-4 px-6 text-right">Completed</td></tr>
                <tr className="cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => setSelectedTxn({id: 'TRX-99202', userName: 'Acme West', type: 'Credit', amount: 15000, method: 'Bank Transfer', status: 'Completed', date: new Date().toISOString(), referenceId: 'REF-38291032'})}><td className="py-4 px-6">#TRX-99202</td><td className="py-4 px-6">Acme West (Partner)</td><td className="py-4 px-4">Top-up</td><td className="py-4 px-4">Oct 24, 2023</td><td className="py-4 px-4">+$15,000.00</td><td className="py-4 px-6 text-right">Completed</td></tr>
                <tr className="cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => setSelectedTxn({id: 'TRX-99203', userName: 'Elena Martinez', type: 'Credit', amount: 42.50, method: 'Wallet', status: 'Pending', date: new Date().toISOString(), referenceId: 'REF-12349102'})}><td className="py-4 px-6">#TRX-99203</td><td className="py-4 px-6">Elena Martinez (User)</td><td className="py-4 px-4">Refund</td><td className="py-4 px-4">Oct 23, 2023</td><td className="py-4 px-4">+$42.50</td><td className="py-4 px-6 text-right">Pending</td></tr>
                <tr className="cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => setSelectedTxn({id: 'TRX-99204', userName: 'Global Logistics', type: 'Debit', amount: 5600, method: 'Bank Transfer', status: 'Completed', date: new Date().toISOString(), referenceId: 'REF-59302192'})}><td className="py-4 px-6">#TRX-99204</td><td className="py-4 px-6">Global Logistics (Partner)</td><td className="py-4 px-4">Withdrawal</td><td className="py-4 px-4">Oct 23, 2023</td><td className="py-4 px-4">-$5,600.00</td><td className="py-4 px-6 text-right">Completed</td></tr>
                <tr className="cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => setSelectedTxn({id: 'TRX-99205', userName: 'Tech Pro', type: 'Credit', amount: 8920, method: 'Bank Transfer', status: 'Completed', date: new Date().toISOString(), referenceId: 'REF-39102930'})}><td className="py-4 px-6">#TRX-99205</td><td className="py-4 px-6">Tech Pro (Seller)</td><td className="py-4 px-4">Settlement</td><td className="py-4 px-4">Oct 23, 2023</td><td className="py-4 px-4">+$8,920.00</td><td className="py-4 px-6 text-right">Completed</td></tr>
             </tbody>
          </table>
</div>

          {/* Pagination */}
          <div className="bg-[#f8fafd] border-t px-6 py-3 flex justify-between items-center text-xs font-bold text-gray-400">
            <span>Showing Page {currentPage} of 3</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} className="px-2 py-1 bg-white border rounded">&lt;</button>
              <button className="px-2 py-1 bg-[#1d0094] text-white rounded">{currentPage}</button>
              <button onClick={() => setCurrentPage(Math.min(3, currentPage + 1))} className="px-2 py-1 bg-white border rounded">&gt;</button>
            </div>
          </div>
        </div>
      </div>

      {/* TRANSACTION DETAILS MODAL */}
      {selectedTxn && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-lg font-black text-slate-900">Transaction Details</h2>
              <button 
                onClick={() => setSelectedTxn(null)}
                className="p-2 rounded-full hover:bg-gray-200 transition text-gray-500"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              <div className="flex flex-col items-center justify-center mb-6 pb-6 border-b border-gray-100">
                <span className={`text-xs font-bold border px-3 py-1 rounded-full mb-3 ${getStatusColor(selectedTxn.status)}`}>
                  {selectedTxn.status}
                </span>
                <h3 className="text-4xl font-black text-slate-900 tracking-tight">
                  {selectedTxn.type === 'Credit' ? '+' : '-'}{formatCurrency(selectedTxn.amount)}
                </h3>
                <p className="text-sm text-gray-500 mt-2 font-medium uppercase tracking-widest">{selectedTxn.type}</p>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Transaction ID</span>
                  <span className="font-bold text-slate-900">{selectedTxn.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Reference ID</span>
                  <span className="font-bold text-slate-900">{selectedTxn.referenceId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Date & Time</span>
                  <span className="font-bold text-slate-900">{new Date(selectedTxn.date).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">User Name</span>
                  <span className="font-bold text-slate-900">{selectedTxn.userName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Payment Method</span>
                  <span className="font-bold text-slate-900">{selectedTxn.method}</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-gray-100 mt-auto">
              <button 
                onClick={() => setSelectedTxn(null)}
                className="w-full py-3 bg-[#1d0094] text-white font-bold rounded-xl shadow-sm hover:bg-indigo-800 transition"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DateRange Portal */}
      {showDatePicker && ReactDOM.createPortal(
        <div
          id="wallet-date-portal"
          style={{
            position: 'fixed',
            top: calendarPos.top,
            left: Math.max(10, calendarPos.left), // Ensure it doesn't go off-screen to the left
            zIndex: 99999,
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            borderRadius: '12px',
            overflow: 'hidden',
            background: '#fff',
            border: '1.5px solid #e5e7eb'
          }}
        >
          <DateRange
            editableDateInputs={true}
            onChange={item => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            rangeColors={['#1d0094']}
          />
          <div style={{ padding: '12px 16px', borderTop: '1px solid #eee', background: '#f9f9f9', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button
              onClick={() => setShowDatePicker(false)}
              style={{ padding: '6px 14px', background: '#fff', color: '#1d0094', border: '1.5px solid #1d0094', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}
              type="button"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowDatePicker(false)}
              style={{ padding: '6px 16px', background: '#1d0094', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}
              type="button"
            >
              Apply Range
            </button>
          </div>
        </div>,
        document.body
      )}
    </AdminShell>
  );
}