import React, { useEffect, useState } from 'react';
import { Save, X, User, Phone, Shield, Globe, MapPin } from 'lucide-react';
import Select from '../../components/ui/Select';

const statusOptions = ['Active', 'Suspended', 'Blocked'];
const membershipOptions = ['Standard User', 'Verified User', 'Premium User'];
const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];
const whatsappOptions = ['Active', 'Inactive', 'Blocked'];
const loginStatusOptions = ['Online', 'Offline', 'Blocked'];
const locationTypeOptions = ['Urban', 'Semi-Urban', 'Rural'];
const languageOptions = ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Bengali', 'Gujarati', 'Marathi', 'Punjabi'];

function SectionTitle({ icon: Icon, title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '20px 0 14px', paddingBottom: '8px', borderBottom: '2px solid var(--materio-primary)' }}>
      <div style={{ background: 'rgba(105,108,255,0.1)', padding: '5px', borderRadius: '6px', color: 'var(--materio-primary)', display: 'flex', alignItems: 'center' }}>
        <Icon size={14} />
      </div>
      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--materio-primary)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>{title}</span>
    </div>
  );
}

function FormField({ label, error, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--materio-text-muted)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{label}</label>
      {children}
      {error && <span style={{ fontSize: '11px', color: '#FF3E1D', fontWeight: 500 }}>{error}</span>}
    </div>
  );
}

const inputStyle = {
  padding: '9px 12px',
  border: '1px solid var(--materio-border)',
  borderRadius: '8px',
  fontSize: '13px',
  outline: 'none',
  color: 'var(--materio-text-main)',
  background: '#fff',
  transition: 'border-color 0.2s',
  width: '100%',
  fontFamily: 'inherit'
};

export default function UserEditModal({ user, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    status: 'Active',
    membershipType: 'Standard User',
    gender: 'Male',
    dateOfBirth: '',
    whatsappStatus: 'Active',
    accountStatus: 'Active',
    loginStatus: 'Offline',
    preferredLanguage: 'English',
    notificationLanguage: 'English',
    isInfluencer: false,
    locationType: 'Urban',
    city: '',
    district: '',
    state: '',
    favoriteAddressCount: 0,
    emergencyContactsCount: 0
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        mobile: user.mobile || '',
        email: user.email || '',
        status: user.status || 'Active',
        membershipType: user.membershipType || 'Standard User',
        gender: user.gender || 'Male',
        dateOfBirth: user.dateOfBirth || '',
        whatsappStatus: user.whatsappStatus || 'Active',
        accountStatus: user.accountStatus || 'Active',
        loginStatus: user.loginStatus || 'Offline',
        preferredLanguage: user.preferredLanguage || 'English',
        notificationLanguage: user.notificationLanguage || 'English',
        isInfluencer: user.isInfluencer || false,
        locationType: user.locationType || 'Urban',
        city: user.city || '',
        district: user.district || '',
        state: user.state || '',
        favoriteAddressCount: user.favoriteAddressCount || 0,
        emergencyContactsCount: user.emergencyContactsCount || 0
      });
      setErrors({});
    }
  }, [user]);

  if (!user) return null;

  const updateField = (field, value) => {
    setFormData(current => ({ ...current, [field]: value }));
    setErrors(current => ({ ...current, [field]: '' }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = 'Name is required.';
    if (!formData.mobile.trim()) nextErrors.mobile = 'Mobile is required.';
    if (!formData.email.trim()) nextErrors.email = 'Email is required.';
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (Object.keys(nextErrors).length > 0) { setErrors(nextErrors); return; }
    onSave({ ...user, ...formData, name: formData.name.trim(), mobile: formData.mobile.trim(), email: formData.email.trim() });
  };

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(3px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', animation: 'fadeIn 0.2s ease' }}
      onClick={onClose}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .ud-edit-modal::-webkit-scrollbar { width: 5px; }
        .ud-edit-modal::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .ud-edit-input:focus { border-color: var(--materio-primary) !important; box-shadow: 0 0 0 3px rgba(105,108,255,0.1); }
      `}</style>
      <form
        className="ud-edit-modal"
        onSubmit={handleSubmit}
        onClick={e => e.stopPropagation()}
        style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 25px 50px rgba(15,23,42,0.18)', width: '100%', maxWidth: '680px', maxHeight: '90vh', overflow: 'auto', animation: 'slideUp 0.25s cubic-bezier(0.4,0,0.2,1)', display: 'flex', flexDirection: 'column' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid var(--materio-border)', position: 'sticky', top: 0, background: '#fff', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={user.avatar} alt={user.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(105,108,255,0.2)' }} onError={e => { e.target.style.display = 'none'; }} />
            <div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--materio-text-main)' }}>Edit User</div>
              <div style={{ fontSize: '12px', color: 'var(--materio-text-muted)', marginTop: '2px' }}>{user.id} · {user.name}</div>
            </div>
          </div>
          <button type="button" onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--materio-text-muted)', padding: '4px', borderRadius: '6px', display: 'flex', alignItems: 'center' }} onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '4px 24px 24px', flex: 1 }}>
          {/* Basic Information */}
          <SectionTitle icon={User} title="Basic Information" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <FormField label="Full Name" error={errors.name}>
              <input className="ud-edit-input" style={inputStyle} value={formData.name} onChange={e => updateField('name', e.target.value)} placeholder="Full name" />
            </FormField>
            <FormField label="Gender">
              <Select value={formData.gender} onChange={e => updateField('gender', e.target.value)} options={genderOptions.map(o => ({ value: o, label: o }))} style={{ ...inputStyle, cursor: 'pointer' }} />
            </FormField>
            <FormField label="Date of Birth">
              <input className="ud-edit-input" type="date" style={inputStyle} value={formData.dateOfBirth} onChange={e => updateField('dateOfBirth', e.target.value)} />
            </FormField>
            <FormField label="Membership Type">
              <Select value={formData.membershipType} onChange={e => updateField('membershipType', e.target.value)} options={membershipOptions.map(o => ({ value: o, label: o }))} style={{ ...inputStyle, cursor: 'pointer' }} />
            </FormField>
            <FormField label="Is Influencer">
              <Select value={String(formData.isInfluencer)} onChange={e => updateField('isInfluencer', e.target.value === 'true')} options={[{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }]} style={{ ...inputStyle, cursor: 'pointer' }} />
            </FormField>
          </div>

          {/* Contact Details */}
          <SectionTitle icon={Phone} title="Contact Details" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <FormField label="Mobile Number" error={errors.mobile}>
              <input className="ud-edit-input" style={inputStyle} value={formData.mobile} onChange={e => updateField('mobile', e.target.value)} placeholder="+91 XXXXX XXXXX" />
            </FormField>
            <FormField label="Email ID" error={errors.email}>
              <input className="ud-edit-input" type="email" style={inputStyle} value={formData.email} onChange={e => updateField('email', e.target.value)} placeholder="email@example.com" />
            </FormField>
            <FormField label="WhatsApp Status">
              <Select value={formData.whatsappStatus} onChange={e => updateField('whatsappStatus', e.target.value)} options={whatsappOptions.map(o => ({ value: o, label: o }))} style={{ ...inputStyle, cursor: 'pointer' }} />
            </FormField>
            <FormField label="Emergency Contacts">
              <input className="ud-edit-input" type="number" min="0" style={inputStyle} value={formData.emergencyContactsCount} onChange={e => updateField('emergencyContactsCount', Number(e.target.value))} />
            </FormField>
            <FormField label="Favorite Addresses">
              <input className="ud-edit-input" type="number" min="0" style={inputStyle} value={formData.favoriteAddressCount} onChange={e => updateField('favoriteAddressCount', Number(e.target.value))} />
            </FormField>
          </div>

          {/* Account Information */}
          <SectionTitle icon={Shield} title="Account Information" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <FormField label="Account Status">
              <Select value={formData.accountStatus} onChange={e => updateField('accountStatus', e.target.value)} options={statusOptions.map(o => ({ value: o, label: o }))} style={{ ...inputStyle, cursor: 'pointer' }} />
            </FormField>
            <FormField label="Login Status">
              <Select value={formData.loginStatus} onChange={e => updateField('loginStatus', e.target.value)} options={loginStatusOptions.map(o => ({ value: o, label: o }))} style={{ ...inputStyle, cursor: 'pointer' }} />
            </FormField>
          </div>

          {/* Preferences */}
          <SectionTitle icon={Globe} title="Preferences" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <FormField label="Preferred Language">
              <Select value={formData.preferredLanguage} onChange={e => updateField('preferredLanguage', e.target.value)} options={languageOptions.map(o => ({ value: o, label: o }))} style={{ ...inputStyle, cursor: 'pointer' }} />
            </FormField>
            <FormField label="Notification Language">
              <Select value={formData.notificationLanguage} onChange={e => updateField('notificationLanguage', e.target.value)} options={languageOptions.map(o => ({ value: o, label: o }))} style={{ ...inputStyle, cursor: 'pointer' }} />
            </FormField>
          </div>

          {/* Location Details */}
          <SectionTitle icon={MapPin} title="Location Details" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <FormField label="Location Type">
              <Select value={formData.locationType} onChange={e => updateField('locationType', e.target.value)} options={locationTypeOptions.map(o => ({ value: o, label: o }))} style={{ ...inputStyle, cursor: 'pointer' }} />
            </FormField>
            <FormField label="City">
              <input className="ud-edit-input" style={inputStyle} value={formData.city} onChange={e => updateField('city', e.target.value)} placeholder="City" />
            </FormField>
            <FormField label="District">
              <input className="ud-edit-input" style={inputStyle} value={formData.district} onChange={e => updateField('district', e.target.value)} placeholder="District" />
            </FormField>
            <FormField label="State">
              <input className="ud-edit-input" style={inputStyle} value={formData.state} onChange={e => updateField('state', e.target.value)} placeholder="State" />
            </FormField>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--materio-border)', background: '#f8fafc', display: 'flex', gap: '10px', justifyContent: 'flex-end', position: 'sticky', bottom: 0 }}>
          <button type="button" onClick={onClose} className="btn-materio btn-materio-outline" style={{ fontSize: '13px' }}>Cancel</button>
          <button type="submit" className="btn-materio btn-materio-primary" style={{ fontSize: '13px' }}>
            <Save size={14} /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
