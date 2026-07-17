import React, { useState, useRef, useEffect } from 'react';
import {
  Brain,
  TrendingUp,
  Send,
  Calendar as CalendarIcon,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Award,
  ChevronDown,
  SlidersHorizontal,
  MoreVertical,
  ArrowRight
} from 'lucide-react';
import AdminShell from '../../components/layouts/AdminShell';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';

import Select from "../../components/ui/Select";
import { Calendar as DateRangeCalendar } from 'react-date-range';
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
export default function Restocking() {
  const { navigate } = useApp();
  
  // Form states
  const [material, setMaterial] = useState('Industrial Grade Steel - S400');
  const [supplier, setSupplier] = useState('Apex Metalworks');
  const [quantity, setQuantity] = useState('150');
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarPos, setCalendarPos] = useState({ top: 0, left: 0 });
  const calendarRef = useRef(null);
  const triggerRef = useRef(null);

  // Helper: recalculate position from trigger button's current bounding rect
  const updateCalendarPos = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const calendarHeight = 340;
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUpward = spaceBelow < calendarHeight && rect.top > calendarHeight;
    setCalendarPos({
      top: openUpward ? rect.top - calendarHeight - 8 : rect.bottom + 8,
      left: rect.left,
      width: rect.width,
    });
  };

  // Close on outside click + track scroll/resize to keep position in sync
  useEffect(() => {
    if (!showCalendar) return;

    const handleClickOutside = (e) => {
      if (
        calendarRef.current && !calendarRef.current.contains(e.target) &&
        triggerRef.current && !triggerRef.current.contains(e.target)
      ) {
        setShowCalendar(false);
      }
    };

    // On scroll or resize: recalculate position so calendar tracks the button
    const handleScrollOrResize = () => {
      updateCalendarPos();
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScrollOrResize, true); // capture: true catches all scroll containers
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [showCalendar]);

  const handleCalendarToggle = () => {
    if (!showCalendar) {
      updateCalendarPos();
    }
    setShowCalendar(prev => !prev);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Restock request for ${quantity} units of ${material} submitted for approval.`);
  };

  const handleAutoGenerate = () => {
    alert('AI Restock Recommendation engine: generating Purchase Requisitions...');
  };

  const handleReviewThresholds = () => {
    alert('Opening material stock limits settings...');
  };

  return (
    <AdminShell
      activeTab="Material Management"
      brandText="Hozify Procurement"
      brandSubText="EXECUTIVE COMMAND"
      searchPlaceholder="Search orders, suppliers, or materials..."
      customProfileName="Admin User"
      customProfileRole="Procurement Director"
    >
      <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
        
        {/* Title Block */}
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
            Restock Intelligence
          </h1>
          <p style={{ fontSize: '14px', color: '#7a7688', marginTop: '4px', margin: 0 }}>
            Automated stock threshold monitoring and replenishment controls.
          </p>
        </div>

        {/* Intelligence Banner & Procurement Health Card */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-section)' }}>
          
          {/* Restock Intelligence Banner */}
          <div className="panel" style={{ 
            background: '#1c2536', 
            color: '#ffffff', 
            borderRadius: '12px', 
            padding: 'var(--spacing-section)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '16px',
            boxShadow: '0 4px 12px rgba(28,37,54,0.1)'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: '#93c5fd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Brain size={18} />
                </div>
                <strong style={{ fontSize: '16px', fontWeight: '800' }}>Restock Intelligence</strong>
              </div>
              <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: '1.5' }}>
                4 items have dropped below safety thresholds. AI suggests prioritizing the Steel Grade-A batch for next-day delivery.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleAutoGenerate}
                style={{
                  background: 'var(--primary)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 18px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
                type="button"
              >
                Auto-Generate PRs
              </button>
              <button
                onClick={handleReviewThresholds}
                style={{
                  background: 'transparent',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '6px',
                  padding: '10px 18px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
                type="button"
              >
                Review Thresholds
              </button>
            </div>
          </div>

          {/* Procurement Health */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase' }}>Procurement Health</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '4px' }}>
                  <strong style={{ fontSize: '24px', fontWeight: '800', color: '#1c2536' }}>94%</strong>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#059669', display: 'flex', alignItems: 'center' }}>
                    +2.4%
                  </span>
                </div>
              </div>
              <div style={{ color: 'var(--primary)' }}>
                <TrendingUp size={20} />
              </div>
            </div>
            {/* SVG vertical column chart */}
            <div style={{ height: '70px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '8px', marginTop: '8px' }}>
              {[40, 60, 50, 85, 45].map((h, idx) => (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{
                    height: `${h}%`,
                    background: idx === 3 ? '#25108f' : '#d7e1ff',
                    borderRadius: '3px 3px 0 0'
                  }} />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 2 Columns: Forms & Approval Workflow */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '1.2fr 1fr', gap: 'var(--spacing-section)' }}>
          
          {/* Create Restock Request Form */}
          <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)', overflow: 'visible', position: 'relative', zIndex: 9999 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f5f3ff', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Send size={16} />
              </div>
              <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
                Create Restock Request
              </h2>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* Material Selection */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Material Selection
                </label>
                <div style={{ position: 'relative' }}>
                  <Select
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    style={{
                      width: '100%',
                      height: '38px',
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px',
                      padding: '0 32px 0 12px',
                      fontSize: '13px',
                      color: '#1c2536',
                      fontWeight: '600',
                      appearance: 'none',
                      outline: 'none'
                    }}
                    aria-label="Select material to restock"
                    options={[{
                      label: "Industrial Grade Steel - S400",
                      value: "Industrial Grade Steel - S400"
                    }, {
                      label: "Copper Bus Bar 200A",
                      value: "Copper Bus Bar 200A"
                    }, {
                      label: "Reinforced Structural Rebar",
                      value: "Reinforced Structural Rebar"
                    }, {
                      label: "M12 Fasteners",
                      value: "M12 Fasteners"
                    }]} />

                </div>
              </div>

              {/* Flex row for Supplier & Quantity */}
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                
                {/* Supplier */}
                <div style={{ flex: '1 1 200px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Supplier
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Select
                      value={supplier}
                      onChange={(e) => setSupplier(e.target.value)}
                      style={{
                        width: '100%',
                        height: '38px',
                        background: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        padding: '0 32px 0 12px',
                        fontSize: '13px',
                        color: '#1c2536',
                        fontWeight: '600',
                        appearance: 'none',
                        outline: 'none'
                      }}
                      aria-label="Select supplier"
                      options={[{
                        label: "Apex Metalworks",
                        value: "Apex Metalworks"
                      }, {
                        label: "Titan Steel Industries",
                        value: "Titan Steel Industries"
                      }, {
                        label: "Global Alloys Ltd.",
                        value: "Global Alloys Ltd."
                      }]} />

                  </div>
                </div>

                {/* Quantity */}
                <div style={{ flex: '1 1 120px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    style={{
                      width: '100%',
                      height: '38px',
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px',
                      padding: '0 12px',
                      fontSize: '13px',
                      color: '#1c2536',
                      fontWeight: '600',
                      outline: 'none'
                    }}
                    placeholder="150"
                  />
                </div>

              </div>

              {/* Expected Delivery Date */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#7a7688', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Expected Delivery Date
                </label>
                <div style={{ position: 'relative' }}>
                  {/* Trigger button */}
                  <div
                    ref={triggerRef}
                    onClick={handleCalendarToggle}
                    style={{
                      width: '100%',
                      height: '38px',
                      background: '#ffffff',
                      border: `1px solid ${showCalendar ? 'var(--primary)' : '#cbd5e1'}`,
                      borderRadius: '6px',
                      padding: '0 12px',
                      fontSize: '13px',
                      color: '#1c2536',
                      fontWeight: '600',
                      outline: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s'
                    }}
                  >
                    <span>{deliveryDate ? format(deliveryDate, 'MMM dd, yyyy') : 'Select Date'}</span>
                    <CalendarIcon size={14} color={showCalendar ? 'var(--primary)' : '#64748B'} />
                  </div>

                  {/* Fixed-position calendar portal — floats above all page content */}
                  {showCalendar && (
                    <div
                      ref={calendarRef}
                      style={{
                        position: 'fixed',
                        top: calendarPos.top,
                        left: calendarPos.left,
                        zIndex: 999999,
                        background: '#ffffff',
                        borderRadius: '12px',
                        boxShadow: '0 8px 32px rgba(28,37,54,0.18), 0 2px 8px rgba(28,37,54,0.10)',
                        border: '1.5px solid #e2e8f0',
                        overflow: 'hidden',
                        minWidth: '320px',
                      }}
                    >
                      {/* Calendar Header bar */}
                      <div style={{
                        padding: '10px 16px 6px',
                        background: '#f8fafc',
                        borderBottom: '1px solid #e2e8f0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: '#7a7688', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Select Delivery Date</span>
                        <button
                          type="button"
                          onClick={() => setShowCalendar(false)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7a7688', fontSize: '16px', lineHeight: 1, padding: '2px 4px' }}
                        >✕</button>
                      </div>
                      <DateRangeCalendar
                        date={deliveryDate}
                        onChange={(item) => {
                          setDeliveryDate(item);
                          setShowCalendar(false);
                        }}
                        color="#25108f"
                        showMonthAndYearPickers
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Estimated Cost Block */}
              <div style={{ 
                background: '#f8fafc', 
                border: '1.5px solid #25108f', 
                borderRadius: '8px', 
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#565365' }}>Estimated Cost</span>
                  <strong style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary)' }}>$12,450.00</strong>
                </div>
                <p style={{ fontSize: '11px', color: '#7a7688', margin: 0, lineHeight: '1.4' }}>
                  Price includes standard shipping and bulk discount from Apex Metalworks. Final approval required for orders over $10k.
                </p>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                style={{
                  background: '#0b1329',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  height: '42px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'opacity 0.2s',
                  marginTop: '6px'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                <span>Submit for Approval</span>
                <Send size={14} style={{ transform: 'rotate(-45deg)', marginTop: '-2px' }} />
              </button>

            </form>
          </div>

          {/* Current Approval Workflow & Subcards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)' }}>
            
            {/* Current Approval Workflow Card */}
            <div className="panel" style={{ background: '#ffffff', border: '1.5px solid #25108f', borderRadius: '12px', padding: 'var(--spacing-section)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#1c2536', margin: 0 }}>
                  Current Approval Workflow
                </h2>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{ border: 'none', background: 'transparent', color: '#7a7688', cursor: 'pointer' }} type="button">
                    <SlidersHorizontal size={16} />
                  </button>
                  <button style={{ border: 'none', background: 'transparent', color: '#7a7688', cursor: 'pointer' }} type="button">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Workflow 1 */}
                <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div>
                      <strong style={{ display: 'block', fontSize: '13px', color: '#1c2536' }}>#PR-8821: Steel Grade-A</strong>
                      <span style={{ display: 'block', fontSize: '11px', color: '#7a7688', marginTop: '2px' }}>Qty: 500 units • $45,000</span>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: '800', color: '#d97706', padding: '3px 8px', borderRadius: '4px', background: '#fffbeb' }}>
                      PENDING FINANCE
                    </span>
                  </div>
                  <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: '70%', height: '100%', background: '#d97706', borderRadius: '2px' }} />
                  </div>
                </div>

                {/* Workflow 2 */}
                <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <div>
                      <strong style={{ display: 'block', fontSize: '13px', color: '#1c2536' }}>#PR-8819: Thermal Comp</strong>
                      <span style={{ display: 'block', fontSize: '11px', color: '#7a7688', marginTop: '2px' }}>Qty: 25 kits • $1,200</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#059669', fontSize: '11px', fontWeight: '700' }}>
                      <CheckCircle2 size={14} fill="#ecfdf5" />
                      <span>APPROVED</span>
                    </div>
                  </div>
                </div>

                {/* Workflow 3 */}
                <div style={{ paddingBottom: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <div>
                      <strong style={{ display: 'block', fontSize: '13px', color: '#1c2536' }}>#PR-8815: Blue-X Lubricant</strong>
                      <span style={{ display: 'block', fontSize: '11px', color: '#7a7688', marginTop: '2px' }}>Qty: 10 bbl • $8,900</span>
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: '800', color: '#dc2626', padding: '3px 8px', borderRadius: '4px', background: '#fef2f2' }}>
                      CLARIFICATION REQUIRED
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Vendor Performance Card */}
            <div className="panel" style={{ 
              background: '#ffffff', 
              border: '1.5px solid #25108f', 
              borderRadius: '12px', 
              padding: '20px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Award size={22} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '13px', color: '#7a7688', textTransform: 'uppercase' }}>Vendor Performance</strong>
                <strong style={{ display: 'block', fontSize: '15px', color: '#1c2536', marginTop: '4px' }}>
                  Apex Metalworks <span style={{ color: '#d97706', fontSize: '13px', fontWeight: '700' }}>★ 4.8/5</span>
                </strong>
                <p style={{ fontSize: '12px', color: '#7a7688', margin: '6px 0 0 0', lineHeight: '1.4' }}>
                  98.2% on-time delivery rate over last 12 months.
                </p>
              </div>
            </div>

            {/* Restock Alert Card */}
            <div className="panel" style={{ 
              background: '#f5f3ff', 
              border: '1px solid #ddd6fe', 
              borderRadius: '12px', 
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div>
                <span style={{ display: 'block', fontSize: '10px', fontWeight: '800', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Restock Alert</span>
                <strong style={{ display: 'block', fontSize: '14px', color: '#1c2536', marginTop: '6px', lineHeight: '1.4' }}>
                  M12 Fasteners critically low (8% remaining)
                </strong>
              </div>
              <button 
                onClick={() => {
                  setMaterial('M12 Fasteners');
                  setQuantity('1000');
                  alert('Form updated for M12 Fasteners quick restocking.');
                }}
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: '#7c3aed', 
                  fontSize: '12.5px', 
                  fontWeight: '700', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px',
                  padding: 0,
                  textAlign: 'left'
                }}
                type="button"
              >
                <span>Quick Restock</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </AdminShell>
  );
}


