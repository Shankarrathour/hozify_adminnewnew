import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import { useApp } from "../../hooks/useApp";
import AdminShell from "../../components/layouts/AdminShell";
import { useToast } from "../../components/common/ToastNotification";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";

export default function RevenueReportspage() {
  const { addToast } = useToast();
  const { route } = useApp();
  const isFinancial = route && route.includes('financial');
  
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
      const portal = document.getElementById('revenue-date-portal');
      if (portal && portal.contains(e.target)) return;
      setShowDatePicker(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showDatePicker]);

  const dateLabel = dateRange[0].startDate.getTime() === dateRange[0].endDate.getTime()
    ? format(dateRange[0].startDate, 'MMM d, yyyy')
    : `${format(dateRange[0].startDate, 'MMM d, yyyy')} - ${format(dateRange[0].endDate, 'MMM d, yyyy')}`;

  const handleGenerateReport = () => {
    alert("Report generating for date range: " + dateLabel);
  };

  return (
    <AdminShell activeTab="Reports & Analytics">
      <div className="w-full min-h-screen bg-[#f8fafd] p-8 text-slate-700 antialiased ">
        
        {/* BREADCRUMB & HEADER SECTION */}
        <div className="mb-6">
          <div className="text-xs text-gray-400 font-semibold mb-1 flex items-center gap-1">
            <span>Financial</span> <span>&gt;</span> <span className="text-slate-600">{isFinancial ? "Financial Reports" : "Revenue Reports"}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">{isFinancial ? "Financial Overview" : "Revenue Analytics"}</h1>
            
            <div className="flex items-center gap-2 relative">
              {/* Calendar Button */}
              <div className="relative">
                <button 
                  ref={datePickerRef}
                  onClick={handleDateTriggerClick}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-slate-700 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span>📅</span> {dateLabel}
                </button>
              </div>
              
              <button 
                onClick={handleGenerateReport}
                className="flex items-center gap-2 px-4 py-2 bg-[#1d0094] rounded-lg text-xs font-bold text-white shadow-sm hover:bg-opacity-90 transition-colors"
              >
                <span>📤</span> Generate Report
              </button>
            </div>
          </div>
        </div>

        {/* TOP ROW: THREE REVENUE METRIC CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          
          {/* Card 1: Gross Revenue */}
          <div className="bg-white border border-gray-200/70 rounded-xl p-6 shadow-sm relative">
            <div className="absolute top-6 right-6 w-8 h-8 bg-slate-50 border border-gray-100 rounded-lg flex items-center justify-center text-xs text-slate-700">
              📈
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Gross Revenue</span>
            <div className="mt-4">
              <span className="text-2xl font-black text-slate-900 tracking-tight block">$1,248,500.00</span>
              <div className="flex items-center gap-1 mt-1 text-[11px]">
                <span className="font-bold text-emerald-500">↑ 12.4%</span>
                <span className="text-gray-400">vs. previous period</span>
              </div>
            </div>
          </div>

          {/* Card 2: Net Revenue */}
          <div className="bg-white border border-gray-200/70 rounded-xl p-6 shadow-sm relative">
            <div className="absolute top-6 right-6 w-8 h-8 bg-slate-50 border border-gray-100 rounded-lg flex items-center justify-center text-xs text-slate-700">
              💼
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Net Revenue</span>
            <div className="mt-4">
              <span className="text-2xl font-black text-slate-900 tracking-tight block">$982,340.00</span>
              <div className="flex items-center gap-1 mt-1 text-[11px]">
                <span className="font-bold text-emerald-500">↑ 8.1%</span>
                <span className="text-gray-400">vs. previous period</span>
              </div>
            </div>
          </div>

          {/* Card 3: Tax Provision */}
          <div className="bg-white border border-gray-200/70 rounded-xl p-6 shadow-sm relative">
            <div className="absolute top-6 right-6 w-8 h-8 bg-slate-50 border border-gray-100 rounded-lg flex items-center justify-center text-xs text-slate-700">
              📋
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Tax Provision</span>
            <div className="mt-4">
              <span className="text-2xl font-black text-slate-900 tracking-tight block">$266,160.00</span>
              <span className="text-[11px] text-gray-400 block mt-1 font-medium">Total Tax Liability (21.3%)</span>
            </div>
          </div>

        </div>

        {/* MIDDLE SECTION: REVENUE TREND & SERVICE CATEGORIES */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Left: Revenue Trend Chart Container */}
          <div className="bg-white border border-gray-200/70 rounded-xl p-6 shadow-sm lg:col-span-2 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Revenue Trend</h3>
              <div className="flex items-center gap-4 text-[10px] font-bold">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-900"></span>
                  <span className="text-slate-600">Gross</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                  <span className="text-slate-400">Net</span>
                </div>
              </div>
            </div>

            {/* Simulated Chart Plot Area Grid */}
            <div className="h-56 flex flex-col justify-between relative pt-4 px-2">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none border-b border-gray-100">
                <div className="w-full border-t border-gray-100/70 h-0"></div>
                <div className="w-full border-t border-gray-100/70 h-0"></div>
                <div className="w-full border-t border-gray-100/70 h-0"></div>
                <div className="w-full border-t border-gray-100/70 h-0"></div>
              </div>
              
              {/* X-Axis labels centered */}
              <div className="w-full flex justify-between text-[10px] text-gray-400 font-bold mt-auto pt-2 px-4 z-10">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
              </div>
            </div>
          </div>

          {/* Right: Service Categories Progress Tracker */}
          <div className="bg-white border border-gray-200/70 rounded-xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide mb-6">Service Categories</h3>
              
              <div className="space-y-4">
                {/* Category 1 */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <span>Enterprise Software</span>
                    <span className="text-gray-400">$542,000 <span className="text-slate-900 font-extrabold">(43%)</span></span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-slate-900 h-full rounded-full" style={{ width: "43%" }}></div>
                  </div>
                </div>

                {/* Category 2 */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <span>Consulting Services</span>
                    <span className="text-gray-400">$325,000 <span className="text-slate-900 font-extrabold">(26%)</span></span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-slate-900 h-full rounded-full" style={{ width: "26%" }}></div>
                  </div>
                </div>

                {/* Category 3 */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <span>Hardware & Support</span>
                    <span className="text-gray-400">$210,000 <span className="text-slate-900 font-extrabold">(17%)</span></span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-slate-900 h-full rounded-full" style={{ width: "17%" }}></div>
                  </div>
                </div>

                {/* Category 4 */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <span>Maintenance Fees</span>
                    <span className="text-gray-400">$171,500 <span className="text-slate-900 font-extrabold">(14%)</span></span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-slate-900 h-full rounded-full" style={{ width: "14%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full text-center text-xs font-bold text-slate-900 hover:underline mt-6 flex items-center justify-center gap-1" type="button" onClick={() => addToast('Opening Full Breakdown...', 'info')}>
              View Full Breakdown <span>→</span>
            </button>
          </div>

        </div>

        {/* BOTTOM SECTION: TAX DISTRIBUTION & QUARTERLY PROJECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          
          {/* Tax Distribution Panel (2 columns block) */}
          <div className="bg-white border border-gray-200/70 rounded-xl p-6 shadow-sm lg:col-span-2 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide mb-5">Tax Distribution</h3>
              
              <div className="divide-y divide-gray-100/70 text-xs font-bold text-slate-700">
                <div className="flex justify-between items-center py-3">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                    <span>Federal Tax</span>
                  </div>
                  <span className="font-extrabold text-slate-900">$185,200.00</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                    <span>State/Regional</span>
                  </div>
                  <span className="font-extrabold text-slate-900">$48,560.00</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                    <span>VAT/Sales Tax</span>
                  </div>
                  <span className="font-extrabold text-slate-900">$32,400.00</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-100 font-bold text-xs">
              <span className="text-gray-400">Effective Tax Rate</span>
              <span className="text-slate-950 font-black text-sm">21.32%</span>
            </div>
          </div>

          {/* Quarterly Projection Panel (3 columns block) */}
          <div className="bg-white border border-gray-200/70 rounded-xl p-6 shadow-sm lg:col-span-3 flex flex-col justify-between relative overflow-hidden">
            {/* Watermark brand mesh line simulation */}
            <div className="absolute right-0 bottom-0 opacity-[0.03] text-[180px] font-black tracking-tighter select-none  text-slate-900 pointer-events-none translate-x-10 translate-y-16">
              M
            </div>

            <div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Quarterly Projection</h3>
              <p className="text-[11px] text-gray-400 font-medium mt-1 max-w-sm leading-relaxed">
                Estimated revenue growth based on current velocity and seasonal adjustments.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-6">
                <div>
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">Target Q3</span>
                  <span className="text-2xl font-black text-slate-900 tracking-tight block mt-0.5">$1.5M</span>
                  <div className="w-full bg-gray-100 h-1 rounded-full mt-3 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: "82%" }}></div>
                  </div>
                  <span className="text-[9px] text-emerald-600 font-black block mt-1.5 uppercase">82% of target achieved</span>
                </div>

                <div>
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">Projected Annual</span>
                  <span className="text-2xl font-black text-slate-900 tracking-tight block mt-0.5">$5.8M</span>
                  <div className="w-full bg-gray-100 h-1 rounded-full mt-3 overflow-hidden">
                    <div className="bg-slate-900 h-full rounded-full" style={{ width: "65%" }}></div>
                  </div>
                  <span className="text-[9px] text-slate-500 font-black block mt-1.5 uppercase">On track for 2024</span>
                </div>
              </div>
            </div>
            <div className="h-2"></div>
          </div>

        </div>

        {/* FOOTER ROW: HIGH-VALUE TRANSACTIONS TABLE */}
        <div className="bg-white border border-gray-200/80 rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
            <h3 className="text-sm font-black text-slate-800 tracking-wide">High-Value Transactions</h3>
            <button className="text-xs font-black text-slate-900 hover:underline" type="button" onClick={() => addToast('Opening Ledger View...', 'info')}>View Ledger</button>
          </div>

          <div className="overflow-x-auto">
            <div className="table-responsive-wrapper">
<table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#f8fafd] text-gray-400 border-b border-gray-200/60 uppercase text-[9px] font-black tracking-wider">
                  <th className="py-3 px-6">Entity</th><th className="py-3 px-6">Service</th><th className="py-3 px-6">Date</th><th className="py-3 px-6">Amount</th><th className="py-3 px-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-bold text-slate-700 bg-white">
                
                <tr className="hover:bg-slate-50/40 transition-colors">
                  <td className="py-4 px-6 font-extrabold text-slate-900">Nexus Corp</td>
                  <td className="py-4 px-6 text-gray-500 font-medium">SaaS Enterprise License</td>
                  <td className="py-4 px-6 text-gray-500 font-medium">Oct 12, 2023</td>
                  <td className="py-4 px-6 text-slate-950 font-black">$42,500.00</td>
                  <td className="py-4 px-6 text-right">
                    <span className="text-[9px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2 py-0.5 rounded tracking-wide uppercase">
                      Settled
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/40 transition-colors">
                  <td className="py-4 px-6 font-extrabold text-slate-900">Vantage Global</td>
                  <td className="py-4 px-6 text-gray-500 font-medium">Strategy Consulting</td>
                  <td className="py-4 px-6 text-gray-500 font-medium">Oct 10, 2023</td>
                  <td className="py-4 px-6 text-slate-950 font-black">$18,200.00</td>
                  <td className="py-4 px-6 text-right">
                    <span className="text-[9px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2 py-0.5 rounded tracking-wide uppercase">
                      Settled
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/40 transition-colors">
                  <td className="py-4 px-6 font-extrabold text-slate-900">Solstice Systems</td>
                  <td className="py-4 px-6 text-gray-500 font-medium">Infrastructure Setup</td>
                  <td className="py-4 px-6 text-gray-500 font-medium">Oct 08, 2023</td>
                  <td className="py-4 px-6 text-slate-950 font-black">$75,000.00</td>
                  <td className="py-4 px-6 text-right">
                    <span className="text-[9px] font-black bg-amber-50 text-amber-700 border border-amber-200/60 px-2 py-0.5 rounded tracking-wide uppercase">
                      Pending
                    </span>
                  </td>
                </tr>

              </tbody>
            </table>
</div>
          </div>
        </div>

      </div>

      {/* DateRange Portal */}
      {showDatePicker && ReactDOM.createPortal(
        <div
          id="revenue-date-portal"
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