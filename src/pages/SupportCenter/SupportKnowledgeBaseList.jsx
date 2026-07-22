import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  ChevronRight,
  FileText,
  Clock,
  User,
  ExternalLink,
  ChevronLeft,
  BookOpen as BookIcon,
  HelpCircle,
  AlertTriangle,
  Eye,
  Edit2,
  Trash2,
  X,
  FileCode,
  Globe,
  Lock,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import { ROUTES } from '../../config/routes';
import AdminShell from '../../components/layouts/AdminShell';

import Select from "../../components/ui/Select";

export default function SupportKnowledgeBaseList({ activeTab = 'Support Center' }) {
  const { navigate } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Drawer editor state
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Product Documentation');
  const [formVisibility, setFormVisibility] = useState('Public');
  const [formBody, setFormBody] = useState('');
  const [formTags, setFormTags] = useState('');
  const [formMetaTitle, setFormMetaTitle] = useState('');
  const [formMetaDesc, setFormMetaDesc] = useState('');

  const categories = ['All', 'Product Documentation', 'Troubleshooting Guides', 'Security & Compliance', 'API Integration'];

  const [articles, setArticles] = useState([
    {
      id: 1,
      title: 'Setting up Escalation Workflows',
      desc: 'Learn how to configure dynamic SLA alerts, Tier routing matrices, and trigger custom War-Room actions.',
      category: 'Product Documentation',
      reads: 342,
      status: 'Published',
      visibility: 'Public',
      updated: '2026-06-12',
      author: 'Marcus K.',
      tags: 'sla, escalations, workflows',
      body: 'This guide covers the core configuration steps required to setup Escalation Workflows in the support queue...'
    },
    {
      id: 2,
      title: 'Understanding User Permissions',
      desc: 'A comprehensive review of standard role controls, granular permission grids, and audit logging parameters.',
      category: 'Security & Compliance',
      reads: 189,
      status: 'Published',
      visibility: 'Internal',
      updated: '2026-06-13',
      author: 'Elena R.',
      tags: 'security, permissions, roles',
      body: 'Standard user controls are configured at the module level. Grant access based on agent tier levels...'
    },
    {
      id: 3,
      title: 'Stripe Webhook Gateway Timeout Fix',
      desc: 'Troubleshoot double-charge timeouts, webhook payload retries, and manual invoice reconciliation steps.',
      category: 'Troubleshooting Guides',
      reads: 512,
      status: 'Published',
      visibility: 'Public',
      updated: '2026-06-10',
      author: 'Sarah J.',
      tags: 'stripe, webhook, timeout, billing',
      body: 'If Stripe retries trigger redundant events, ensure your handler responds with 200 OK immediately...'
    },
    {
      id: 4,
      title: 'Auditing API Request Payload Limits',
      desc: 'Documentation for payload sizing guidelines, error response templates, and gateway rate-limiting policies.',
      category: 'API Integration',
      reads: 76,
      status: 'Draft',
      visibility: 'Internal',
      updated: '2026-06-14',
      author: 'Alex M.',
      tags: 'api, limits, rate-limiting',
      body: 'Write rate limit rules inside the gateway console. Default limits are set to 1,000 req/min...'
    }
  ]);

  const [knowledgeGaps, setKnowledgeGaps] = useState([
    { title: 'Refund wallet transfer timeline', queries: 42, urgency: 'Medium' },
    { title: 'BSP registration failure codes', queries: 28, urgency: 'Low' },
    { title: 'Webhook payload structure', queries: 64, urgency: 'High' }
  ]);

  const handleOpenEditor = (article = null) => {
    if (article) {
      setSelectedArticle(article);
      setFormTitle(article.title);
      setFormCategory(article.category);
      setFormVisibility(article.visibility);
      setFormBody(article.body || '');
      setFormTags(article.tags || '');
      setFormMetaTitle(article.title);
      setFormMetaDesc(article.desc || '');
    } else {
      setSelectedArticle(null);
      setFormTitle('');
      setFormCategory('Product Documentation');
      setFormVisibility('Public');
      setFormBody('');
      setFormTags('');
      setFormMetaTitle('');
      setFormMetaDesc('');
    }
    setEditorOpen(true);
  };

  const handleSaveArticle = () => {
    if (!formTitle.trim()) {
      alert('Article title is required.');
      return;
    }

    if (selectedArticle) {
      // Edit mode
      setArticles(articles.map(art => {
        if (art.id === selectedArticle.id) {
          return {
            ...art,
            title: formTitle,
            category: formCategory,
            visibility: formVisibility,
            body: formBody,
            tags: formTags,
            desc: formMetaDesc || formBody.substring(0, 100) + '...',
            updated: 'Today'
          };
        }
        return art;
      }));
      alert('Article updated successfully.');
    } else {
      // Create mode
      const newArticle = {
        id: Date.now(),
        title: formTitle,
        category: formCategory,
        visibility: formVisibility,
        reads: 0,
        status: 'Draft',
        updated: 'Today',
        author: 'Alex M.',
        tags: formTags,
        body: formBody,
        desc: formMetaDesc || formBody.substring(0, 100) + '...'
      };
      setArticles([newArticle, ...articles]);
      
      // If matches a knowledge gap, resolve it
      setKnowledgeGaps(knowledgeGaps.filter(gap => gap.title.toLowerCase() !== formTitle.toLowerCase()));
      alert('New article draft created.');
    }
    setEditorOpen(false);
  };

  const handlePublishArticle = () => {
    if (!formTitle.trim()) {
      alert('Article title is required.');
      return;
    }

    if (selectedArticle) {
      setArticles(articles.map(art => {
        if (art.id === selectedArticle.id) {
          return {
            ...art,
            title: formTitle,
            category: formCategory,
            visibility: formVisibility,
            body: formBody,
            tags: formTags,
            desc: formMetaDesc || formBody.substring(0, 100) + '...',
            status: 'Published',
            updated: 'Today'
          };
        }
        return art;
      }));
    } else {
      const newArticle = {
        id: Date.now(),
        title: formTitle,
        category: formCategory,
        visibility: formVisibility,
        reads: 0,
        status: 'Published',
        updated: 'Today',
        author: 'Alex M.',
        tags: formTags,
        body: formBody,
        desc: formMetaDesc || formBody.substring(0, 100) + '...'
      };
      setArticles([newArticle, ...articles]);
      setKnowledgeGaps(knowledgeGaps.filter(gap => gap.title.toLowerCase() !== formTitle.toLowerCase()));
    }
    alert('Article published successfully!');
    setEditorOpen(false);
  };

  const handleCreateFromGap = (gapTitle) => {
    handleOpenEditor();
    setFormTitle(gapTitle);
  };

  const filteredArticles = articles.filter(art => {
    if (selectedCategory !== 'All' && art.category !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return art.title.toLowerCase().includes(q) || art.desc.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <AdminShell
      activeTab={activeTab}
      brandText="HOZIFY"
      brandSubText="Enterprise Admin"
      headerTitle="Knowledge Base"
      searchPlaceholder="Search articles, tags, or topics..."
    >
      <div style={{ padding: '24px 0', position: 'relative' }}>
        
        {/* Breadcrumb Row */}
        <div style={{ fontSize: '12px', fontWeight: '750', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
          <span>Support Center</span>
          <ChevronRight size={12} />
          <span style={{ color: 'var(--primary)' }}>Knowledge Base Manager</span>
        </div>

        {/* Split Pane Layout Container */}
        <div style={{ display: 'flex', gap: 'var(--spacing-section)', flexWrap: 'wrap', alignItems: 'stretch' }}>
          
          {/* LEFT PANE: Directory Overview */}
          <div style={{ flex: editorOpen ? '1.2' : '1', minWidth: '320px', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-section)', transition: 'all 0.3s ease' }}>
            
            {/* Page Header */}
            <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
                  Knowledge Base Directory
                </h1>
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>
                  Organize platform documentation and client integration guides.
                </p>
              </div>

              {!editorOpen && (
                <button
                  onClick={() => handleOpenEditor()}
                  style={{
                    height: '38px',
                    padding: '0 16px',
                    borderRadius: '6px',
                    border: 'none',
                    background: 'var(--primary)',
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: '13px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(37, 16, 143, 0.1)'
                  }}
                  type="button"
                >
                  <Plus size={16} />
                  <span>Create Article</span>
                </button>
              )}
            </div>

            {/* Metrics counters row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '16px' }}>
              <div className="panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px', background: '#fff' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Total Articles</span>
                <strong style={{ fontSize: '22px', fontWeight: '850', color: 'var(--text)' }}>142</strong>
              </div>
              <div className="panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px', background: '#fff' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Published</span>
                <strong style={{ fontSize: '22px', fontWeight: '850', color: 'var(--green)' }}>128</strong>
              </div>
              <div className="panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px', background: '#fff' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Drafts</span>
                <strong style={{ fontSize: '22px', fontWeight: '850', color: 'var(--primary)' }}>14</strong>
              </div>
            </div>

            {/* Knowledge Gap cards */}
            <div className="panel" style={{ padding: 'var(--spacing-section)', background: '#fff', borderLeft: '4px solid var(--primary)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h3 style={{ fontSize: '14.5px', fontWeight: '850', color: 'var(--text)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertTriangle size={15} style={{ color: 'var(--primary)' }} />
                  Identified Knowledge Gaps
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '4px 0 0' }}>
                  Search queries yielding zero results. Resolve by drafting documentation.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {knowledgeGaps.map((gap, idx) => (
                  <div key={idx} style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', background: 'var(--soft)', padding: '10px 14px', borderRadius: '6px' }}>
                    <div>
                      <strong style={{ display: 'block', fontSize: '12.5px', color: 'var(--text)' }}>"{gap.title}"</strong>
                      <span style={{ fontSize: '11px', color: 'var(--muted)' }}>
                        {gap.queries} failed queries • Urgency: 
                        <strong style={{ marginLeft: '4px', color: gap.urgency === 'High' ? '#dc2626' : gap.urgency === 'Medium' ? '#f59e0b' : 'var(--muted)' }}>
                          {gap.urgency}
                        </strong>
                      </span>
                    </div>

                    <button
                      onClick={() => handleCreateFromGap(gap.title)}
                      style={{
                        height: '26px',
                        padding: '0 10px',
                        borderRadius: '4px',
                        border: 'none',
                        background: 'var(--primary)',
                        color: '#fff',
                        fontSize: '11px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      type="button"
                    >
                      <Plus size={11} />
                      Write
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Articles Table Grid */}
            <div className="panel" style={{ padding: 'var(--spacing-section)', display: 'flex', flexDirection: 'column', gap: '16px', background: '#fff' }}>
              
              {/* Directory Filter controls */}
              <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                {/* Search bar */}
                <div style={{ position: 'relative', minWidth: '220px' }}>
                  <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                  <input
                    type="text"
                    placeholder="Filter by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      height: '32px',
                      width: '100%',
                      borderRadius: '6px',
                      border: '1.5px solid #25108f',
                      padding: '0 10px 0 32px',
                      fontSize: '12.5px'
                    }}
                  />
                </div>

                {/* Category select dropdown */}
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  options={categories.map(cat => ({
                    value: cat,
                    label: cat === 'All' ? 'All Categories' : cat
                  }))}
                  style={{ height: '32px', borderRadius: '6px', border: '1.5px solid #25108f', padding: '0 10px', fontSize: '12.5px' }}
                />
              </div>

              {/* Table ledger */}
              <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
                <div className="table-responsive-wrapper">
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1.5px solid #25108f', color: 'var(--muted)' }}>
                      <th style={{ padding: '10px 12px', fontWeight: '800', fontSize: '10.5px' }}>ARTICLE DETAILS</th>
                      <th style={{ padding: '10px 12px', fontWeight: '800', fontSize: '10.5px' }}>CATEGORY</th>
                      <th style={{ padding: '10px 12px', fontWeight: '800', fontSize: '10.5px', textAlign: 'center' }}>READS</th>
                      <th style={{ padding: '10px 12px', fontWeight: '800', fontSize: '10.5px', textAlign: 'center' }}>STATUS</th>
                      <th style={{ padding: '10px 12px', fontWeight: '800', fontSize: '10.5px', textAlign: 'right' }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredArticles.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ padding: 'var(--spacing-page)', textAlign: 'center', color: 'var(--muted)' }}>
                          No documentation articles match your filter preferences.
                        </td>
                      </tr>
                    ) : (
                      filteredArticles.map((art) => (
                        <tr
                          key={art.id}
                          style={{
                            borderBottom: '1px solid var(--lavender)',
                            cursor: 'pointer',
                            background: selectedArticle?.id === art.id ? 'var(--soft)' : 'transparent'
                          }}
                          onClick={() => handleOpenEditor(art)}
                        >
                          <td style={{ padding: '12px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                              <strong style={{ color: 'var(--text)' }}>{art.title}</strong>
                              <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                {art.visibility === 'Public' ? <Globe size={11} /> : <Lock size={11} />}
                                {art.visibility} Visibility • Updated {art.updated}
                              </span>
                            </div>
                          </td>
                          <td style={{ padding: '12px' }}>
                            <span style={{
                              fontSize: '10.5px',
                              fontWeight: '750',
                              color: 'var(--primary)',
                              background: 'var(--soft)',
                              padding: '2px 8px',
                              borderRadius: '4px'
                            }}>
                              {art.category}
                            </span>
                          </td>
                          <td style={{ padding: '12px', textAlign: 'center', fontWeight: '700', color: 'var(--text)' }}>
                            {art.reads}
                          </td>
                          <td style={{ padding: '12px', textAlign: 'center' }}>
                            <span style={{
                              fontSize: '10px',
                              fontWeight: '900',
                              color: art.status === 'Published' ? '#07956f' : 'var(--primary)',
                              background: art.status === 'Published' ? '#ecfdf5' : '#e9e2f6',
                              padding: '2px 6px',
                              borderRadius: '4px'
                            }}>
                              {art.status}
                            </span>
                          </td>
                          <td style={{ padding: '12px', textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                              <button
                                onClick={() => handleOpenEditor(art)}
                                style={{ border: 'none', background: 'transparent', color: 'var(--primary)', cursor: 'pointer', padding: '4px' }}
                                type="button"
                              >
                                <Edit2 size={13} />
                              </button>
                              <button
                                onClick={() => setArticles(articles.filter(a => a.id !== art.id))}
                                style={{ border: 'none', background: 'transparent', color: '#dc2626', cursor: 'pointer', padding: '4px' }}
                                type="button"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
</div>
              </div>
            </div>

          </div>

          {/* RIGHT PANE: Slide-out Article Form Builder Drawer */}
          {editorOpen && (
            <div style={{
              flex: '0.8',
              minWidth: '300px',
              background: '#fff',
              border: '1.5px solid #25108f',
              borderRadius: '12px',
              padding: 'var(--spacing-section)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
              position: 'sticky',
              top: '24px',
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto'
            }}>
              
              {/* Drawer Title & Close controls */}
              <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1.5px solid #25108f', paddingBottom: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                    {selectedArticle ? 'Edit Article Document' : 'Create Article Draft'}
                  </h3>
                  <span style={{ fontSize: '11px', color: 'var(--muted)' }}>
                    {selectedArticle ? `Editing ID: #${selectedArticle.id}` : 'Platform catalog entry'}
                  </span>
                </div>
                <button
                  onClick={() => setEditorOpen(false)}
                  style={{
                    height: '28px',
                    width: '28px',
                    borderRadius: '50%',
                    border: 'none',
                    background: 'var(--soft)',
                    color: 'var(--muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  type="button"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Form Input elements */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                
                {/* Title */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Article Title</label>
                  <input
                    type="text"
                    placeholder="e.g. BSP Account Suspension Rules"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    style={{ height: '36px', borderRadius: '6px', border: '1.5px solid #25108f', padding: '0 12px', fontSize: '12.5px' }}
                  />
                </div>

                {/* Double column Category / Visibility */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Category</label>
                    <Select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      options={categories.filter(c => c !== 'All').map(cat => ({
                        value: cat,
                        label: cat
                      }))}
                      style={{ height: '36px', borderRadius: '6px', border: '1.5px solid #25108f', padding: '0 8px', fontSize: '12px' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Visibility</label>
                    <Select
                      value={formVisibility}
                      onChange={(e) => setFormVisibility(e.target.value)}
                      style={{ height: '36px', borderRadius: '6px', border: '1.5px solid #25108f', padding: '0 8px', fontSize: '12px' }}
                      options={[{
                        label: "Public",
                        value: "Public"
                      }, {
                        label: "Internal",
                        value: "Internal"
                      }]} />
                  </div>
                </div>

                {/* Rich Text style Toolbar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Article Body</label>
                  
                  {/* Toolbar */}
                  <div style={{ display: 'flex', gap: '2px', background: 'var(--soft)', border: '1.5px solid #25108f', borderBottom: 'none', borderRadius: '6px 6px 0 0', padding: '4px' }}>
                    {['B', 'I', 'U', 'Link', 'Code', 'List'].map((btn) => (
                      <button
                        key={btn}
                        onClick={() => setFormBody(b => b + ` [${btn}]`)}
                        style={{
                          height: '24px',
                          padding: '0 8px',
                          border: 'none',
                          background: 'transparent',
                          fontSize: '11px',
                          fontWeight: '800',
                          color: 'var(--muted)',
                          cursor: 'pointer',
                          borderRadius: '3px'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = '#e9e2f6'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                        type="button"
                      >
                        {btn}
                      </button>
                    ))}
                  </div>

                  {/* Body Textarea */}
                  <textarea
                    placeholder="Write detailed guide content here..."
                    value={formBody}
                    onChange={(e) => setFormBody(e.target.value)}
                    rows={8}
                    style={{
                      borderRadius: '0 0 6px 6px',
                      border: '1.5px solid #25108f',
                      padding: '12px',
                      fontSize: '12.5px',
                      
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase' }}>Tag Keywords</label>
                  <input
                    type="text"
                    placeholder="e.g. stripe, billing, ref-9021 (comma separated)"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    style={{ height: '36px', borderRadius: '6px', border: '1.5px solid #25108f', padding: '0 12px', fontSize: '12.5px' }}
                  />
                </div>

                {/* Meta details footer info */}
                <div style={{ borderTop: '1px solid var(--lavender)', paddingTop: '12px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block' }}>
                    Reading Time estimate: <strong>{Math.ceil(formBody.split(' ').filter(Boolean).length / 200) || 1} min(s)</strong>
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', marginTop: '2px' }}>
                    Word Count: <strong>{formBody.split(' ').filter(Boolean).length} words</strong>
                  </span>
                </div>

                {/* SEO Configurations */}
                <div style={{ borderTop: '1px dashed var(--line)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '850', color: 'var(--text)' }}>Search Engine Optimization (SEO) Settings</span>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <input
                      type="text"
                      placeholder="Meta Title Tag"
                      value={formMetaTitle}
                      onChange={(e) => setFormMetaTitle(e.target.value)}
                      style={{ height: '32px', borderRadius: '6px', border: '1.5px solid #25108f', padding: '0 10px', fontSize: '12px' }}
                    />
                    <textarea
                      placeholder="Meta Description snippet for search pages..."
                      value={formMetaDesc}
                      onChange={(e) => setFormMetaDesc(e.target.value)}
                      rows={2}
                      style={{ borderRadius: '6px', border: '1.5px solid #25108f', padding: '8px 10px', fontSize: '12px', resize: 'none' }}
                    />
                  </div>
                </div>

              </div>

              {/* Action row buttons */}
              <div style={{ display: 'flex', gap: '10px', borderTop: '1.5px solid #25108f', paddingTop: '16px' }}>
                <button
                  onClick={handleSaveArticle}
                  style={{
                    flex: 1,
                    height: '36px',
                    borderRadius: '6px',
                    border: '1.5px solid #25108f',
                    background: '#fff',
                    color: 'var(--text)',
                    fontSize: '12.5px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                  type="button"
                >
                  Save Draft
                </button>
                
                <button
                  onClick={handlePublishArticle}
                  style={{
                    flex: 1.2,
                    height: '36px',
                    borderRadius: '6px',
                    border: 'none',
                    background: 'var(--primary)',
                    color: '#fff',
                    fontSize: '12.5px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(37, 16, 143, 0.1)'
                  }}
                  type="button"
                >
                  Publish Article
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </AdminShell>
  );
}



