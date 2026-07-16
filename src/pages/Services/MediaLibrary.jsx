import React, { useState, useRef } from 'react';
import {
  FileText,
  Image as ImageIcon,
  Video,
  Upload,
  Search,
  ChevronDown,
  LayoutGrid,
  List,
  Folder,
  Play,
  X
} from 'lucide-react';

import Select from "../../components/ui/Select";
import { useToast } from "../../components/common/ToastNotification";

export default function MediaLibrary() {
  const { addToast } = useToast();
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      addToast(`Selected file: ${file.name}`, 'success');
      // Reset input so the same file can be selected again
      e.target.value = '';
    }
  };

  const [activeCategory, setActiveCategory] = useState('All Assets');
  const [selectedTypes, setSelectedTypes] = useState({
    images: true,
    videos: true,
    documents: false
  });

  const categories = [
    { name: 'All Assets', count: 1248 },
    { name: 'Facility Icons', count: 412 },
    { name: 'Hero Banners', count: 86 },
    { name: 'Safety Videos', count: 24 },
    { name: 'Staff Training', count: 112 }
  ];

  const initialAssets = [
    {
      id: 1,
      name: 'Safety_Protocol',
      type: 'MP4',
      size: '24.5 MB',
      date: 'Added 2 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=150&h=100&q=80',
      isVideo: true,
      duration: '02:45'
    },
    {
      id: 2,
      name: 'Main_Hero_Tech',
      type: 'JPG',
      size: '1.2 MB',
      date: 'Added Jan 12, 2024',
      thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=150&h=100&q=80'
    },
    {
      id: 3,
      name: 'Utility_Icons',
      type: 'SVG',
      size: '45 KB',
      date: 'Added 5 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&h=100&q=80',
      isVector: true
    },
    {
      id: 4,
      name: 'Staff_Training',
      type: 'PNG',
      size: '3.8 MB',
      date: 'Added Dec 22, 2023',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=150&h=100&q=80'
    },
    {
      id: 5,
      name: 'Service_Manual',
      type: 'PDF',
      size: '12.4 MB',
      date: 'Added 1 week ago',
      thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=150&h=100&q=80',
      isDocument: true
    },
    {
      id: 6,
      name: 'Solar_Plant_Overview',
      type: 'JPG',
      size: '4.1 MB',
      date: 'Added 2 weeks ago',
      thumbnail: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=150&h=100&q=80'
    },
    {
      id: 7,
      name: 'Emergency_Icons',
      type: 'SVG',
      size: '12 KB',
      date: 'Added 3 weeks ago',
      thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=150&h=100&q=80',
      isVector: true
    },
    {
      id: 8,
      name: 'Automation_Video',
      type: 'MP4',
      size: '185 MB',
      date: 'Added 1 month ago',
      thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=150&h=100&q=80',
      isVideo: true,
      hasPlayOverlay: true
    }
  ];

  const [assets, setAssets] = useState(initialAssets);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [sortBy, setSortBy] = useState('Date Modified');

  const toggleType = (key) => {
    setSelectedTypes(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredAssets = assets.filter(asset => {
    const isImage = asset.isVector || asset.type === 'JPG' || asset.type === 'PNG' || asset.type === 'SVG';
    const isVideo = asset.isVideo || asset.type === 'MP4';
    const isDocument = asset.isDocument || asset.type === 'PDF';
    
    if (selectedTypes.images && isImage) return true;
    if (selectedTypes.videos && isVideo) return true;
    if (selectedTypes.documents && isDocument) return true;
    
    return false;
  });

  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-section)', fontFamily: 'Inter, sans-serif' }}>
      {/* Left Sidebar Category & File Upload panel */}
      <div style={{ width: '260px', display: 'flex', flexDirection: 'column', gap: '20px', flexShrink: 0 }}>
        
        {/* Categories Panel */}
        <div className="panel" style={{ background: 'white', borderRadius: '12px', border: '1.5px solid #25108f', padding: '16px' }}>
          <h3 style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 12px' }}>
            Asset Categories
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 10px',
                    background: isSelected ? '#eff6ff' : 'transparent',
                    border: 'none',
                    color: isSelected ? '#1e40af' : 'var(--text)',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: isSelected ? '700' : '600',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                  type="button"
                >
                  <span>{cat.name}</span>
                  <span style={{ fontSize: '11px', color: isSelected ? '#1e40af' : 'var(--muted)' }}>
                    {cat.count.toLocaleString()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* File Types checkboxes */}
        <div className="panel" style={{ background: 'white', borderRadius: '12px', border: '1.5px solid #25108f', padding: '16px' }}>
          <h3 style={{ fontSize: '10px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 12px' }}>
            File Types
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px', fontWeight: '700' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={selectedTypes.images}
                onChange={() => toggleType('images')}
                style={{ accentcolor: 'var(--primary)' }}
              />
              Images (SVG, PNG)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={selectedTypes.videos}
                onChange={() => toggleType('videos')}
                style={{ accentcolor: 'var(--primary)' }}
              />
              Videos (MP4)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={selectedTypes.documents}
                onChange={() => toggleType('documents')}
                style={{ accentcolor: 'var(--primary)' }}
              />
              Documents (PDF)
            </label>
          </div>
        </div>

        {/* Upload Card */}
        <div style={{
          border: '2px dashed #bfdbfe',
          borderRadius: '12px',
          background: '#eff6ff',
          padding: '20px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#2563eb'
          }}>
            <Upload size={18} />
          </div>
          <div>
            <strong style={{ fontSize: '13px', display: 'block', color: 'var(--text)' }}>Upload New Asset</strong>
            <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', marginTop: '2px' }}>Max file size 50MB</span>
          </div>
          <button
            style={{
              padding: '6px 16px',
              borderRadius: '6px',
              border: '1.5px solid #25108f',
              background: 'white',
              color: 'var(--text)',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              width: '100%',
              textAlign: 'center'
            }}
            onClick={() => fileInputRef.current?.click()}
            type="button"
          >
            Browse
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileSelect} 
            style={{ display: 'none' }} 
            accept="image/*,video/*,application/pdf"
          />
        </div>

      </div>
      {/* Right Main Panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Title and Storage Metrics Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottom: '1.5px solid #25108f',
          paddingBottom: '20px'
        }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>Media Library</h1>
            <span style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px', display: 'block' }}>
              Manage and organize visual assets for all managed services.
            </span>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{
              background: 'white',
              border: '1.5px solid #25108f',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '11px',
              textAlign: 'right'
            }}>
              <span style={{ color: 'var(--muted)', display: 'block', fontWeight: '700', textTransform: 'uppercase', fontSize: '9px' }}>Total Storage</span>
              <strong style={{ fontSize: '13px', color: 'var(--text)' }}>4.2 GB <span style={{ fontWeight: 'normal', color: 'var(--muted)' }}>/ 10GB</span></strong>
            </div>
            <div style={{
              background: 'white',
              border: '1.5px solid #25108f',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '11px',
              textAlign: 'right',
              minWidth: '90px'
            }}>
              <span style={{ color: 'var(--muted)', display: 'block', fontWeight: '700', textTransform: 'uppercase', fontSize: '9px' }}>Asset Count</span>
              <strong style={{ fontSize: '13px', color: 'var(--text)' }}>1,248</strong>
            </div>
          </div>
        </div>

        {/* Toolbar: Pills, Sort, View mode */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          {/* Active Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: '600' }}>Viewing:</span>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: '700',
              background: '#e0e7ff',
              color: 'var(--primary)',
              padding: '4px 8px',
              borderRadius: '20px'
            }}>
              All Assets
              <X size={12} style={{ cursor: 'pointer' }} onClick={() => addToast('Cleared All Assets filter', 'success')} />
            </span>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: '700',
              background: '#e0e7ff',
              color: 'var(--primary)',
              padding: '4px 8px',
              borderRadius: '20px'
            }}>
              Videos
              <X size={12} style={{ cursor: 'pointer' }} onClick={() => addToast('Cleared Videos filter', 'success')} />
            </span>
            <button
              onClick={() => addToast('Filters cleared', 'success')}
              style={{ border: 'none', background: 'transparent', color: 'var(--primary)', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}
              type="button"
            >
              Clear all
            </button>
          </div>

          {/* Sort & View switchers */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
              <span style={{ color: 'var(--muted)', fontWeight: '600' }}>Sort by:</span>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  border: '1.5px solid #25108f',
                  borderRadius: '6px',
                  background: 'white',
                  padding: '4px 8px',
                  fontSize: '12px',
                  fontWeight: '700',
                  outline: 'none'
                }}
                options={[{
                  label: "Date Modified",
                  value: "Date Modified"
                }, {
                  label: "File Size",
                  value: "File Size"
                }, {
                  label: "Alphabetical",
                  value: "Alphabetical"
                }]} />
            </div>

            <div style={{ display: 'flex', border: '1.5px solid #25108f', borderRadius: '6px', overflow: 'hidden' }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  background: viewMode === 'grid' ? '#f1f5f9' : 'white',
                  border: 'none',
                  padding: '6px 8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  color: viewMode === 'grid' ? 'var(--text)' : 'var(--muted)'
                }}
                type="button"
                aria-label="Grid view"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  background: viewMode === 'list' ? '#f1f5f9' : 'white',
                  border: 'none',
                  padding: '6px 8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  color: viewMode === 'list' ? 'var(--text)' : 'var(--muted)'
                }}
                type="button"
                aria-label="List view"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Media Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
          gap: '16px'
        }}>
          {filteredAssets.map((asset) => {
            const isDoc = asset.isDocument;
            return (
              <div
                key={asset.id}
                style={{
                  borderRadius: '10px',
                  border: '1.5px solid #25108f',
                  overflow: 'hidden',
                  background: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer'
                }}
              >
                {/* Thumbnail Header */}
                <div style={{ height: '110px', position: 'relative', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isDoc && !asset.thumbnail ? (
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: '#fffbeb',
                      color: '#f59e0b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <FileText size={24} />
                    </div>
                  ) : (
                    <img
                      src={asset.thumbnail}
                      alt={asset.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}

                  {/* Duration overlay for safety video */}
                  {asset.duration && (
                    <span style={{
                      position: 'absolute',
                      top: '6px',
                      right: '6px',
                      background: 'rgba(0,0,0,0.7)',
                      color: 'white',
                      fontSize: '9px',
                      fontWeight: '800',
                      padding: '2px 4px',
                      borderRadius: '4px'
                    }}>
                      {asset.duration}
                    </span>
                  )}

                  {/* Play icon overlay */}
                  {asset.hasPlayOverlay && (
                    <div style={{
                      position: 'absolute',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.9)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'black'
                    }}>
                      <Play size={12} fill="black" style={{ marginLeft: '2px' }} />
                    </div>
                  )}

                  {/* File extension badge */}
                  <span style={{
                    position: 'absolute',
                    bottom: '6px',
                    left: '6px',
                    fontSize: '9px',
                    fontWeight: '900',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    background: asset.type === 'MP4' ? '#e0f2fe' : asset.type === 'SVG' ? '#d1fae5' : asset.type === 'PDF' ? '#fee2e2' : '#f5f3ff',
                    color: asset.type === 'MP4' ? '#0284c7' : asset.type === 'SVG' ? '#059669' : asset.type === 'PDF' ? '#ef4444' : '#7c3aed'
                  }}>
                    {asset.type}
                  </span>
                </div>

                {/* Details Footer */}
                <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <strong style={{ fontSize: '12px', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={asset.name}>
                    {asset.name}
                  </strong>
                  <span style={{ fontSize: '10px', color: 'var(--muted)' }}>
                    {asset.date} • {asset.size}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        <button
          style={{
            alignSelf: 'center',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1.5px solid #25108f',
            background: 'white',
            color: 'var(--text)',
            fontSize: '12px',
            fontWeight: '700',
            height: '36px',
            padding: '0 24px',
            borderRadius: '6px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
          onClick={() => addToast('Loading more assets...', 'info')}
          type="button"
        >
          <span>Load more assets</span>
          <ChevronDown size={14} />
        </button>

      </div>
    </div>
  );
}


