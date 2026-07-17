import React, { useState } from 'react';
import AdminShell from '../../../../../components/layouts/AdminShell';
import { 
  MonitorPlay, Image as ImageIcon, Plus, Trash2, Smartphone, Save, X
} from 'lucide-react';
import { useToast } from '../../../../../components/common/ToastNotification';

const INITIAL_SCREENS = [
  { id: '1', title: 'Welcome to Hozify', subtitle: 'Your one stop solution for all home services.', image: 'welcome.png' },
  { id: '2', title: 'Verified Professionals', subtitle: 'All our pros undergo strict background checks.', image: 'trusted.png' },
  { id: '3', title: 'Secure Payments', subtitle: 'Pay online securely or after the service.', image: 'payment.png' }
];

export default function OnboardingManagerPage() {
  const [screens, setScreens] = useState(() => {
    try {
      const saved = localStorage.getItem('onboardingScreens');
      return saved ? JSON.parse(saved) : INITIAL_SCREENS;
    } catch(e) {
      return INITIAL_SCREENS;
    }
  });
  const [splashConfig, setSplashConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('splashConfig');
      return saved ? JSON.parse(saved) : { duration: 2, bgColor: '#25108f' };
    } catch(e) {
      return { duration: 2, bgColor: '#25108f' };
    }
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [slideToDelete, setSlideToDelete] = useState(null);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    image: 'new_slide.png'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openCreateModal = () => {
    setEditingSlide(null);
    setFormData({ title: '', subtitle: '', image: 'new_slide.png' });
    setIsModalOpen(true);
  };

  const openEditModal = (slide) => {
    setEditingSlide(slide.id);
    setFormData({ title: slide.title, subtitle: slide.subtitle, image: slide.image });
    setIsModalOpen(true);
  };

  const handleSaveSlide = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.subtitle) {
      addToast('Please fill all fields', 'error');
      return;
    }
    
    if (editingSlide) {
      setScreens(screens.map(s => s.id === editingSlide ? { ...s, ...formData } : s));
      addToast('Onboarding slide updated successfully!', 'success');
    } else {
      const newScreen = {
        ...formData,
        id: Date.now().toString()
      };
      setScreens([...screens, newScreen]);
      addToast('Onboarding slide added successfully!', 'success');
    }
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    setScreens(screens.filter(s => s.id !== slideToDelete));
    setSlideToDelete(null);
    addToast('Slide removed.', 'success');
  };

  const handlePublish = () => {
    try {
      localStorage.setItem('onboardingScreens', JSON.stringify(screens));
      localStorage.setItem('splashConfig', JSON.stringify(splashConfig));
    } catch (e) {
      console.error("Failed to save onboardingScreens to localStorage", e);
    }
    addToast('Splash and Onboarding screens published!', 'success');
  };

  const currentPreviewSlide = screens.length > 0 ? screens[currentPreviewIndex % screens.length] : null;

  return (
    <AdminShell activeTab="CMS" headerTitle="Onboarding & Splash Screen Manager">
      <div style={{ padding: 'var(--spacing-section)', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Breadcrumb */}
        <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: '600' }}>
          CMS &gt; App Management &gt; User App &gt; <span style={{ color: '#2A2454' }}>Onboarding Screens</span>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="custom-page-heading">Onboarding & Splash Manager</h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>Configure the first impressions of your app (Splash Screen & Onboarding Slider).</p>
          </div>
          <button onClick={handlePublish} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700">
            <Save size={16} strokeWidth={2.5} /> Publish Screens
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', alignItems: 'start' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Splash Screen */}
            <div style={{ background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '24px' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                 <div style={{ width: '32px', height: '32px', background: '#d1fae5', color: '#059669', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <MonitorPlay size={16} />
                 </div>
                 <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1e1b4b', margin: 0 }}>Splash Screen Config</h3>
               </div>
               
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                 <div>
                   <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '8px' }}>Splash Duration (Seconds)</label>
                   <input type="number" value={splashConfig.duration} onChange={(e) => setSplashConfig({...splashConfig, duration: Number(e.target.value)})} style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px' }} />
                 </div>
                 <div>
                   <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '8px' }}>Background Color (HEX)</label>
                   <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                     <div style={{ width: '30px', height: '30px', background: splashConfig.bgColor, borderRadius: '4px' }} />
                     <input type="text" value={splashConfig.bgColor} onChange={(e) => setSplashConfig({...splashConfig, bgColor: e.target.value})} style={{ flexGrow: 1, padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '14px' }} />
                   </div>
                 </div>
               </div>
            </div>

            {/* Onboarding Screens */}
            <div style={{ background: '#fff', border: '1.5px solid #25108f', borderRadius: '12px', padding: '24px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <div style={{ width: '32px', height: '32px', background: '#e0e7ff', color: '#4f46e5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <Smartphone size={16} />
                   </div>
                   <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1e1b4b', margin: 0 }}>Onboarding Carousel</h3>
                 </div>
                 <button onClick={openCreateModal} className="flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-100 transition-colors">
                   <Plus size={14} /> Add Slide
                 </button>
               </div>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                 {screens.map((screen, index) => (
                   <div key={screen.id} style={{ display: 'flex', gap: '16px', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#f8fafc' }}>
                     <div style={{ width: '80px', height: '80px', background: '#e2e8f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                       <ImageIcon size={24} />
                     </div>
                     <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                       <input type="text" value={screen.title} readOnly style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold', background: '#fff' }} />
                       <input type="text" value={screen.subtitle} readOnly style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', background: '#fff' }} />
                     </div>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                       <button onClick={() => openEditModal(screen)} style={{ padding: '8px', border: 'none', background: '#e2e8f0', borderRadius: '6px', color: '#475569', cursor: 'pointer' }}>
                         <Plus size={16} style={{transform: 'rotate(45deg)'}} /> {/* Using Plus rotated as a generic icon, normally you'd use Edit */}
                       </button>
                       <button onClick={() => setSlideToDelete(screen.id)} style={{ padding: '8px', border: 'none', background: '#fef2f2', borderRadius: '6px', color: '#ef4444', cursor: 'pointer' }}>
                         <Trash2 size={16} />
                       </button>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Device Preview */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', position: 'sticky', top: '100px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
               <Smartphone size={20} color="#4f46e5" />
               <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1e1b4b', margin: 0 }}>Live Preview</h3>
             </div>
             
             {/* Mock Phone Frame */}
             <div style={{ width: '100%', height: '450px', border: '4px solid #1e293b', borderRadius: '24px', overflow: 'hidden', position: 'relative', background: '#fff', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '40%', height: '16px', background: '#1e293b', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }} />
                
                {/* Mock Content */}
                <div style={{ flexGrow: 1, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                   <div style={{ width: '120px', height: '120px', background: '#e2e8f0', borderRadius: '50%', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                     <ImageIcon size={32} />
                   </div>
                   <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#1e1b4b', margin: '0 0 8px 0' }}>{currentPreviewSlide ? currentPreviewSlide.title : 'No slides'}</h4>
                   <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>{currentPreviewSlide ? currentPreviewSlide.subtitle : 'Please add a slide to preview.'}</p>
                </div>

                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {screens.map((_, idx) => (
                      <div key={idx} style={{ 
                        width: (currentPreviewIndex % screens.length) === idx ? '16px' : '6px', 
                        height: '6px', 
                        background: (currentPreviewIndex % screens.length) === idx ? '#4f46e5' : '#e2e8f0', 
                        borderRadius: '3px',
                        transition: 'all 0.3s'
                      }} />
                    ))}
                  </div>
                  <button 
                    onClick={() => screens.length > 0 && setCurrentPreviewIndex(prev => prev + 1)}
                    style={{ width: '100%', padding: '12px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Next
                  </button>
                </div>
             </div>
          </div>
        </div>
        
        {/* Add/Edit Slide Modal */}
        {isModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <div style={{ background: '#fff', borderRadius: '12px', width: '90%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#0f172a' }}>{editingSlide ? 'Edit Slide' : 'Add Onboarding Slide'}</h2>
                <button onClick={() => setIsModalOpen(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}>
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSaveSlide} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Slide Title *</label>
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Verified Professionals"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    required
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Subtitle / Description *</label>
                  <input 
                    type="text" 
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    placeholder="e.g. All our pros undergo strict checks."
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    required
                  />
                </div>

                <div style={{ padding: '16px 20px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', marginTop: '8px', borderRadius: '0 0 12px 12px', margin: '0 -20px -20px -20px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '14px', fontWeight: '600', color: '#475569', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', background: '#2563eb', color: '#fff', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>{editingSlide ? 'Update Slide' : 'Add Slide'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Popup */}
        {slideToDelete && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <div style={{ background: '#fff', borderRadius: '12px', width: '90%', maxWidth: '350px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '24px', textAlign: 'center' }}>
              <Trash2 size={40} color="#ef4444" style={{ margin: '0 auto 16px auto' }} />
              <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 8px 0', color: '#0f172a' }}>Delete Slide?</h2>
              <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 24px 0' }}>Are you sure you want to delete this slide from the onboarding carousel?</p>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setSlideToDelete(null)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontWeight: '600', color: '#475569', cursor: 'pointer' }}>Cancel</button>
                <button onClick={confirmDelete} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#ef4444', fontWeight: '600', color: '#fff', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
