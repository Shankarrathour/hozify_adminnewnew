import React, { useState } from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { useApp } from '../../../../../hooks/useApp';
import { useVisibilityEngine } from '../../../../../hooks/useVisibilityEngine';
import { useAppText } from '../../../../../hooks/useAppText';
import { ChevronLeft, CreditCard, Smartphone, Building, Wallet, Banknote, ShieldCheck, ChevronRight, Clock, ShieldAlert } from 'lucide-react';
import { mockPackages } from '../data/mockData';

export default function FlowPaymentPage() {
  const { navigate } = useApp();
  const { isEnabled } = useVisibilityEngine('user');
  const { getText } = useAppText();
  const [method, setMethod] = useState('');
  const cartItem = mockPackages['s1'][0];

  const isPaymentsEnabled = isEnabled('payments');
  const isWalletEnabled = isEnabled('wallet');

  const paymentSections = [
    {
      title: 'Wallet',
      items: [
        { id: 'hozify', name: 'Hozify Wallet', sub: 'Rs. 10,000', icon: Wallet }
      ]
    },
    {
      title: 'Cards',
      items: [
        { id: 'new_card', name: 'Add new card', icon: CreditCard }
      ]
    },
    {
      title: 'Wallet',
      items: [
        { id: 'amazon', name: 'Amazon Pay Balance', sub: 'Setup now', hint: 'Get assured cashback on paying via Amazon Pay Balance', icon: Wallet, actionColor: '#4f46e5' }
      ]
    },
    {
      title: 'Pay with UPI',
      items: [
        { id: 'gpay', name: 'Google Pay', icon: Smartphone, iconColor: '#ea4335' },
        { id: 'phonepe', name: 'PhonePe', icon: Smartphone, iconColor: '#673ab7' },
        { id: 'paytm', name: 'Paytm', icon: Smartphone, iconColor: '#00baf2' },
        { id: 'apple', name: 'Apple Pay', icon: Smartphone, iconColor: '#000000' }
      ]
    },
    {
      title: 'Netbanking',
      items: [
        { id: 'netbanking', name: 'Netbanking', icon: Building, iconColor: '#4f46e5' }
      ]
    },
    {
      title: 'Pay later',
      items: [
        { id: 'paylater', name: 'Pay later online', icon: Clock, iconColor: '#4f46e5' }
      ]
    },
    {
      title: 'Pay with app',
      items: [
        { id: 'cred', name: 'CRED Pay', icon: Smartphone, iconColor: '#000000' }
      ]
    }
  ];

  return (
    <AdminShell>
      <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', minHeight: 'calc(100vh - 80px)' }}>
        
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', color: '#64748b', fontSize: '14px' }}>
          <span style={{ cursor: 'pointer', hover: { color: '#0f172a' } }} onClick={() => navigate('/cms/app-management/user-app/flow/checkout')}>Checkout</span>
          <ChevronLeft size={16} style={{ transform: 'rotate(180deg)' }} />
          <span style={{ color: '#0f172a', fontWeight: '500' }}>Payment</span>
        </div>

        <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 32px 0', color: '#0f172a' }}>Select Payment Method</h1>
        
        <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
          
          {/* Left Column: Payment Methods */}
          <div style={{ flex: '2', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <div style={{ background: '#f5f3ff', borderRadius: '24px', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '16px', color: '#1e1b4b', fontWeight: '500' }}>Amount to pay</span>
              <span style={{ fontSize: '24px', color: '#1e1b4b', fontWeight: 'bold' }}>₹{cartItem.price + 324 + 49}</span>
            </div>

            <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              
              {paymentSections.map((sec, idx) => (
                <div key={idx} style={{ marginBottom: idx === paymentSections.length - 1 ? 0 : '32px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#0f172a', marginBottom: '16px' }}>{sec.title}</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {sec.items.map(item => {
                      const Icon = item.icon;
                      return (
                        <div 
                          key={item.id}
                          onClick={() => setMethod(item.id)}
                          style={{ 
                            border: '1px solid #f1f5f9', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.2s',
                            background: method === item.id ? '#f5f7ff' : '#fff', borderColor: method === item.id ? '#4f46e5' : '#f1f5f9'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                              <Icon size={20} color={item.iconColor || '#4f46e5'} />
                            </div>
                            <div>
                              <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#0f172a', marginBottom: '4px' }}>{item.name}</div>
                              {item.sub && (
                                <div style={{ fontSize: '12px', fontWeight: '600', color: item.actionColor || '#1e1b4b' }}>
                                  {item.sub}
                                </div>
                              )}
                              {item.hint && (
                                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>{item.hint}</div>
                              )}
                            </div>
                          </div>
                          <ChevronRight size={20} color="#cbd5e1" />
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
              
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div style={{ flex: '1', position: 'sticky', top: '24px' }}>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 'bold', color: '#0f172a' }}>Payment Summary</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px', color: '#475569', fontSize: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Item Total</span>
                  <span style={{ fontWeight: '500', color: '#0f172a' }}>₹{cartItem.price}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Taxes & Fee</span>
                  <span style={{ fontWeight: '500', color: '#0f172a' }}>₹324</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Convenience Fee</span>
                  <span style={{ fontWeight: '500', color: '#0f172a' }}>₹49</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '20px', marginBottom: '32px', fontSize: '20px', fontWeight: 'bold', color: '#0f172a' }}>
                <span>Amount to Pay</span>
                <span>₹{cartItem.price + 324 + 49}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '24px' }}>
                <ShieldCheck size={24} color="#4f46e5" />
                <span style={{ fontSize: '13px', color: '#475569' }}>Secure payment processed by Stripe. All transactions are encrypted.</span>
              </div>

              <button 
                onClick={() => navigate('/cms/app-management/user-app/flow/confirmation')} 
                disabled={!method}
                style={{ width: '100%', background: method ? '#1e1b4b' : '#cbd5e1', color: '#fff', border: 'none', padding: '20px', borderRadius: '16px', fontSize: '18px', fontWeight: 'bold', cursor: method ? 'pointer' : 'not-allowed', transition: 'background 0.2s' }}
              >
                Pay Now
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </AdminShell>
  );
}