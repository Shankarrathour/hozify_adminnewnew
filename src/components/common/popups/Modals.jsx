import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, CheckCircle, UploadCloud, Eye } from 'lucide-react';
import Select from '../../ui/Select';

// Wrapper component for consistent styling and modal overlay behavior
function ModalWrapper({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <>
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000,
          animation: 'fadeIn 0.2s ease-out'
        }}
      />
      <div 
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1001,
          width: '90%',
          maxWidth: '500px',
          animation: 'zoomIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {children}
      </div>
    </>
  );
}

// 1. Add / Edit Form Modal with Full Validations
export function AddEditModal({ isOpen, onClose, title, fields = [], initialValues, onSave }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setValues(initialValues || {});
      setErrors({});
    }
  }, [isOpen, initialValues]);

  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    fields.forEach(field => {
      const val = values[field.name];
      if (field.required && (val === undefined || val === null || val === '')) {
        newErrors[field.name] = `${field.label} is required`;
      } else if (field.maxLength && val && String(val).length > field.maxLength) {
        newErrors[field.name] = `Maximum character limit is ${field.maxLength}`;
      } else if (field.type === 'select' && field.required && (!val || val === '')) {
        newErrors[field.name] = `Please select an option`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(values);
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1e1b4b', margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b' }}><X size={18} /></button>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '70vh', overflowY: 'auto' }}>
            {fields.map(field => (
              <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '800', color: '#475569', textTransform: 'uppercase' }}>
                  {field.label} {field.required && <span style={{ color: '#ef4444' }}>*</span>}
                </label>
                {field.type === 'select' ? (
                  <Select
                    value={values[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    options={[
                      { value: "", label: "Select option..." },
                      ...(field.options || [])
                    ]}
                    style={{ height: '40px', border: errors[field.name] ? '1px solid #ef4444' : '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
                  />
                ) : field.type === 'textarea' ? (
                  <textarea
                    rows={field.rows || 3}
                    placeholder={field.placeholder}
                    value={values[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    maxLength={field.maxLength}
                    style={{ padding: '10px 12px', border: errors[field.name] ? '1px solid #ef4444' : '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', resize: 'vertical' }}
                  />
                ) : (
                  <input
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    value={values[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    maxLength={field.maxLength}
                    style={{ height: '40px', padding: '0 12px', border: errors[field.name] ? '1px solid #ef4444' : '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
                  />
                )}
                {field.maxLength && (
                  <span style={{ fontSize: '10px', color: '#94a3b8', textAlign: 'right' }}>
                    {String(values[field.name] || '').length} / {field.maxLength} chars
                  </span>
                )}
                {errors[field.name] && <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: '600' }}>{errors[field.name]}</span>}
              </div>
            ))}
          </div>
          <div style={{ padding: '16px 24px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button type="button" onClick={onClose} style={{ height: '36px', padding: '0 16px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', background: '#fff', color: '#334155', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" style={{ height: '36px', padding: '0 16px', border: 'none', borderRadius: '6px', fontSize: '13px', background: '#4f46e5', color: '#fff', fontWeight: '700', cursor: 'pointer' }}>Save</button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
}

// 2. Delete Confirmation Modal
export function DeleteConfirmationModal({ isOpen, onClose, onConfirm, itemName = 'this item' }) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
        <div style={{ width: '48px', height: '48px', background: '#fee2e2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#ef4444' }}>
          <AlertTriangle size={24} />
        </div>
        <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1e1b4b', margin: '0 0 8px 0' }}>Confirm Deletion</h3>
        <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 24px 0', lineHeight: '1.5' }}>
          Are you absolutely sure you want to delete <strong>{itemName}</strong>? This action is permanent and cannot be undone.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button onClick={onClose} style={{ height: '36px', padding: '0 16px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', background: '#fff', color: '#334155', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
          <button 
            onClick={() => {
              onConfirm();
              onClose();
            }} 
            style={{ height: '36px', padding: '0 16px', border: 'none', borderRadius: '6px', fontSize: '13px', background: '#ef4444', color: '#fff', fontWeight: '700', cursor: 'pointer' }}
          >
            Delete
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}

// 3. Preview Modal
export function PreviewModal({ isOpen, onClose, title, data = {} }) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1e1b4b', margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b' }}><X size={18} /></button>
        </div>
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '60vh', overflowY: 'auto' }}>
          {Object.entries(data).map(([key, value]) => (
            <div key={key} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>{key.replace(/([A-Z])/g, ' $1')}</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e1b4b', textAlign: 'right' }}>{String(value)}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '16px 24px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ height: '36px', padding: '0 16px', border: 'none', borderRadius: '6px', fontSize: '13px', background: '#4f46e5', color: '#fff', fontWeight: '700', cursor: 'pointer' }}>Close</button>
        </div>
      </div>
    </ModalWrapper>
  );
}

// 4. Image Viewer Modal
export function ImageViewerModal({ isOpen, onClose, imageUrl, title = 'Image Preview' }) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', fontWeight: '800', color: '#1e1b4b' }}>{title}</span>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b' }}><X size={18} /></button>
        </div>
        <div style={{ padding: '16px', display: 'flex', justifyContent: 'center', background: '#f8fafc' }}>
          <img src={imageUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80"} alt={title} style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '6px', objectFit: 'contain' }} />
        </div>
      </div>
    </ModalWrapper>
  );
}

// 5. Upload Modal (Drag & Drop Mocked)
export function UploadModal({ isOpen, onClose, onUpload, title = 'Upload File', allowedFormats = [], maxSize = '5MB' }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file) => {
    setError('');
    const extension = file.name.split('.').pop().toLowerCase();
    
    if (allowedFormats.length > 0 && !allowedFormats.includes(extension)) {
      setError(`Supported formats: ${allowedFormats.join(', ')}`);
      return;
    }
    
    setSelectedFile(file);
  };

  const handleUploadSubmit = () => {
    if (!selectedFile) {
      setError('Please select a file to upload');
      return;
    }
    onUpload(selectedFile);
    setSelectedFile(null);
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1e1b4b', margin: '0 0 16px 0' }}>{title}</h3>
        
        <div 
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          style={{
            border: dragActive ? '2px dashed #4f46e5' : '2px dashed #cbd5e1',
            background: dragActive ? '#f5f3ff' : '#f8fafc',
            borderRadius: '8px',
            padding: '40px 20px',
            textAlign: 'center',
            cursor: 'pointer',
            position: 'relative',
            marginBottom: '16px'
          }}
        >
          <input 
            type="file" 
            onChange={handleFileChange} 
            style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} 
          />
          <UploadCloud size={32} style={{ color: '#4f46e5', marginBottom: '12px' }} />
          <p style={{ fontSize: '13px', fontWeight: '600', color: '#334155', margin: '0 0 4px 0' }}>
            Drag and drop your file here, or <span style={{ color: '#4f46e5' }}>browse</span>
          </p>
          <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>
            Formats: {allowedFormats.join(', ').toUpperCase()} (Max: {maxSize})
          </p>
        </div>

        {selectedFile && (
          <div style={{ background: '#f0fdf4', padding: '10px 12px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#166534' }}>{selectedFile.name}</span>
            <button onClick={() => setSelectedFile(null)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#166534' }}><X size={14} /></button>
          </div>
        )}

        {error && <p style={{ fontSize: '11px', color: '#ef4444', fontWeight: '600', marginBottom: '16px' }}>{error}</p>}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button onClick={onClose} style={{ height: '36px', padding: '0 16px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', background: '#fff', color: '#334155', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
          <button onClick={handleUploadSubmit} style={{ height: '36px', padding: '0 16px', border: 'none', borderRadius: '6px', fontSize: '13px', background: '#4f46e5', color: '#fff', fontWeight: '700', cursor: 'pointer' }}>Upload</button>
        </div>
      </div>
    </ModalWrapper>
  );
}

// 6. Approval Modal
export function ApprovalModal({ isOpen, onClose, title, details = {}, onApprove, onReject }) {
  const [comment, setComment] = useState('');

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1e1b4b', margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b' }}><X size={18} /></button>
        </div>
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            {Object.entries(details).map(([key, val]) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>{key}</span>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#1e1b4b' }}>{String(val)}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '11px', fontWeight: '800', color: '#475569' }}>DECISION COMMENT / REMARKS</label>
            <textarea
              placeholder="Provide context for approval/rejection decision..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', outline: 'none', resize: 'vertical' }}
            />
          </div>
        </div>
        <div style={{ padding: '16px 24px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button 
            onClick={() => {
              onReject(comment);
              onClose();
            }} 
            style={{ height: '36px', padding: '0 16px', border: '1px solid #ef4444', borderRadius: '6px', fontSize: '13px', background: '#fff', color: '#ef4444', fontWeight: '700', cursor: 'pointer' }}
          >
            Reject
          </button>
          <button 
            onClick={() => {
              onApprove(comment);
              onClose();
            }} 
            style={{ height: '36px', padding: '0 16px', border: 'none', borderRadius: '6px', fontSize: '13px', background: '#059669', color: '#fff', fontWeight: '700', cursor: 'pointer' }}
          >
            Approve
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}

// 7. Warning Modal
export function WarningModal({ isOpen, onClose, title, message, onConfirm }) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
        <div style={{ width: '48px', height: '48px', background: '#fef3c7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#d97706' }}>
          <AlertTriangle size={24} />
        </div>
        <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1e1b4b', margin: '0 0 8px 0' }}>{title || 'System Warning'}</h3>
        <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 24px 0', lineHeight: '1.5' }}>
          {message}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button onClick={onClose} style={{ height: '36px', padding: '0 16px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', background: '#fff', color: '#334155', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
          <button 
            onClick={() => {
              onConfirm();
              onClose();
            }} 
            style={{ height: '36px', padding: '0 16px', border: 'none', borderRadius: '6px', fontSize: '13px', background: '#d97706', color: '#fff', fontWeight: '700', cursor: 'pointer' }}
          >
            Confirm Trigger
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}

// 8. Success Modal
export function SuccessModal({ isOpen, onClose, title = 'Success!', message }) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
        <div style={{ width: '48px', height: '48px', background: '#d1fae5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#059669' }}>
          <CheckCircle size={24} />
        </div>
        <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1e1b4b', margin: '0 0 8px 0' }}>{title}</h3>
        <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 24px 0', lineHeight: '1.5' }}>
          {message}
        </p>
        <button onClick={onClose} style={{ width: '100%', height: '40px', border: 'none', borderRadius: '6px', fontSize: '13px', background: '#4f46e5', color: '#fff', fontWeight: '700', cursor: 'pointer' }}>Ok</button>
      </div>
    </ModalWrapper>
  );
}

// 9. Discard Changes Modal
export function DiscardChangesModal({ isOpen, onClose, onDiscard }) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
        <div style={{ width: '48px', height: '48px', background: '#fee2e2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#ef4444' }}>
          <AlertTriangle size={24} />
        </div>
        <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1e1b4b', margin: '0 0 8px 0' }}>Unsaved Changes</h3>
        <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 24px 0', lineHeight: '1.5' }}>
          You have unsaved changes. Are you sure you want to discard them? Any changes made will be lost.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button onClick={onClose} style={{ height: '36px', padding: '0 16px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', background: '#fff', color: '#334155', fontWeight: '600', cursor: 'pointer' }}>Keep Editing</button>
          <button 
            onClick={() => {
              onDiscard();
              onClose();
            }} 
            style={{ height: '36px', padding: '0 16px', border: 'none', borderRadius: '6px', fontSize: '13px', background: '#ef4444', color: '#fff', fontWeight: '700', cursor: 'pointer' }}
          >
            Discard
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}

// 10. Validation Popup
export function ValidationPopup({ isOpen, onClose, errors = [] }) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', bg: '#fee2e2' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#991b1b', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={18} /> Form Validation Warnings
          </h3>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#991b1b' }}><X size={18} /></button>
        </div>
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#b91c1c', fontSize: '13px', lineHeight: '1.6' }}>
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
        <div style={{ padding: '12px 24px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ height: '32px', padding: '0 12px', border: 'none', borderRadius: '6px', fontSize: '12px', background: '#991b1b', color: '#fff', fontWeight: '700', cursor: 'pointer' }}>Close</button>
        </div>
      </div>
    </ModalWrapper>
  );
}
