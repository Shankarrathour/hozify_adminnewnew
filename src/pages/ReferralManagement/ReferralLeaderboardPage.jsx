import React, { useState } from "react";
import AdminShell from "../../components/layouts/AdminShell";
import { useToast } from "../../components/common/ToastNotification";
import { Search, ArrowRight, Download, XCircle } from "lucide-react";

const topReferrers = [
  {
    rank: 2,
    name: "Elena Vance",
    role: "Enterprise Partner",
    referrals: 1240,
    earned: "$12,400",
    image: "/avatars/avatar_elena.jpg",
  },
  {
    rank: 1,
    name: "Julian Thorne",
    role: "Global Ambassador",
    referrals: 3892,
    earned: "$45,210",
    highlight: true,
    image: "/avatars/avatar_julian.jpg",
  },
  {
    rank: 3,
    name: "Sarah Chen",
    role: "Top Contributor",
    referrals: 945,
    earned: "$8,920",
    image: "/avatars/avatar_sarah.jpg",
  },
];

const rankingData = [
  { rank: "#4", name: "Marcus Wright", referrals: 812, earned: "$6,540.00", activity: "+12% this week", color: "text-green-600" },
  { rank: "#5", name: "Linda Okafor", referrals: 754, earned: "$5,920.00", activity: "Stable", color: "text-slate-500" },
  { rank: "#6", name: "David Kim", referrals: 689, earned: "$5,100.00", activity: "+5% this week", color: "text-green-600" },
  { rank: "#7", name: "Bradley Smith", referrals: 620, earned: "$4,850.00", activity: "-2% this week", color: "text-red-500" },
  { rank: "#8", name: "Aisha Malik", referrals: 590, earned: "$4,420.00", activity: "+3% this week", color: "text-green-600" },
  { rank: "#9", name: "John Carter", referrals: 512, earned: "$3,980.00", activity: "Stable", color: "text-slate-500" },
  { rank: "#10", name: "Neha Sharma", referrals: 488, earned: "$3,760.00", activity: "+8% this week", color: "text-green-600" },
];

function TopCard({ data, onViewProfile }) {
  return (
    <div
      onClick={onViewProfile}
      className={`relative rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-all cursor-pointer border border-slate-200 flex flex-col justify-between min-h-[220px] ${
        data.highlight
          ? "bg-indigo-900 text-white scale-105 z-10 border-indigo-950"
          : "bg-white"
      }`}
    >
      {/* rank badge */}
      <div className="absolute top-4 right-4 text-5xl font-black opacity-10">
        {data.rank}
      </div>

      {/* avatar */}
      <div className="relative w-16 h-16 mx-auto">
        <img
          src={data.image}
          alt=""
          className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
        />
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-indigo-650 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full border border-white whitespace-nowrap">
          Rank #{data.rank}
        </div>
      </div>

      {/* name */}
      <div className="mt-4">
        <h3 className="text-sm font-black">{data.name}</h3>
        <p className="text-[10px] opacity-75 mt-0.5 font-bold uppercase tracking-wider">{data.role}</p>
      </div>

      {/* stats */}
      <div className="flex justify-between mt-4 text-xs font-semibold px-2">
        <div>
          <p className="text-[9px] opacity-70 uppercase font-extrabold">Referrals</p>
          <p className="font-black mt-0.5">{data.referrals.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-[9px] opacity-70 uppercase font-extrabold">Earned</p>
          <p className="font-black mt-0.5">{data.earned}</p>
        </div>
      </div>

      {/* button */}
      <button 
        onClick={(e) => { e.stopPropagation(); onViewProfile(); }}
        className="mt-4 text-[10px] font-extrabold flex items-center gap-1 mx-auto hover:underline cursor-pointer uppercase tracking-wider"
      >
        <span>View Profile</span>
        <ArrowRight size={12} />
      </button>
    </div>
  );
}

export default function ReferralLeaderboardPage() {
  const { addToast } = useToast();
  const [filterPeriod, setFilterPeriod] = useState("This Month");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [viewingProfile, setViewingProfile] = useState(null);

  const getTopReferrers = () => {
    let multiplier = filterPeriod === "All Time" ? 4 : 1;
    return topReferrers.map(item => ({
      ...item,
      referrals: item.referrals * multiplier,
      earned: "$" + (parseInt(item.earned.replace(/[^0-9]/g, '')) * multiplier).toLocaleString(),
    }));
  };

  const getRankingData = () => {
    let multiplier = filterPeriod === "All Time" ? 4 : 1;
    return rankingData.map(item => ({
      ...item,
      referrals: item.referrals * multiplier,
      earned: "$" + (parseFloat(item.earned.replace(/[^0-9.]/g, '')) * multiplier).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
    }));
  };

  const displayTopReferrers = getTopReferrers();
  let displayRankingData = getRankingData();

  if (searchQuery) {
    displayRankingData = displayRankingData.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.rank.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const handleExportCSV = () => {
    const headers = ['Rank', 'Name', 'Referrals', 'Earned', 'Activity'];
    const csvContent = [
      headers.join(','),
      ...displayRankingData.map(item => 
        `"${item.rank}","${item.name}","${item.referrals}","${item.earned}","${item.activity}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'leaderboard_rankings.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast("Exported leaderboard rankings successfully!", "success");
  };

  return (
    <AdminShell activeTab="Referrals">
      <div className="bg-slate-100 min-h-screen p-6">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900">
              Referrer Leaderboard
            </h1>
            <p className="text-slate-550 text-sm mt-1">
              A live ranking of your top performing advocates and their impact.
            </p>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => { setFilterPeriod("This Month"); addToast("Filtered ranking period: This Month", "success"); }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${filterPeriod === "This Month" ? "bg-indigo-900 border-indigo-900 text-white shadow-sm" : "bg-white border-slate-300 hover:bg-slate-50 text-slate-700"}`}
            >
              This Month
            </button>
            <button 
              onClick={() => { setFilterPeriod("All Time"); addToast("Filtered ranking period: All Time", "success"); }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${filterPeriod === "All Time" ? "bg-indigo-900 border-indigo-900 text-white shadow-sm" : "bg-white border-slate-300 hover:bg-slate-50 text-slate-700"}`}
            >
              All Time
            </button>
          </div>
        </div>

        {/* TOP 3 Podium Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto">
          {displayTopReferrers.map((item, i) => (
            <TopCard 
              key={i} 
              data={item} 
              onViewProfile={() => setViewingProfile(item)}
            />
          ))}
        </div>

        {/* TABLE */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          {/* table header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 border-b border-slate-200 gap-4">
            <h2 className="font-bold text-sm text-slate-900">Detailed Ranking</h2>

            <div className="flex items-center gap-3">
              {isSearchOpen ? (
                <div className="flex items-center">
                  <input 
                    type="text" 
                    placeholder="Search name or rank..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-slate-300 px-3 py-1.5 rounded-l-lg text-xs focus:outline-none focus:border-indigo-500 w-48"
                    autoFocus
                  />
                  <button 
                    onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                    className="border border-slate-300 border-l-0 bg-slate-50 hover:bg-slate-100 px-2 py-1.5 rounded-r-lg text-slate-500"
                  >
                    <XCircle size={14} />
                  </button>
                </div>
              ) : (
                <div 
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center gap-2 border border-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-50 hover:bg-slate-100 cursor-pointer transition-all text-slate-700 shadow-sm"
                >
                  <Search size={13} />
                  <span>Search Rank</span>
                </div>
              )}

              <button 
                onClick={handleExportCSV}
                className="text-indigo-700 hover:text-indigo-900 font-bold text-xs cursor-pointer flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-all border border-indigo-100"
              >
                <Download size={13} />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* table */}
          <div className="overflow-x-auto">
            <div className="table-responsive-wrapper">
<table className="w-full text-left text-xs border-collapse min-w-[600px]">
              <thead className="bg-slate-50 text-gray-500 font-bold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="p-4 pl-6">Rank</th>
                  <th>Name</th>
                  <th>Referrals</th>
                  <th>Earned</th>
                  <th>Activity</th>
                  <th className="text-right pr-6">Action</th>
                </tr>
              </thead>

              <tbody>
                {displayRankingData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-slate-500 font-semibold text-xs">
                      No advocates found matching "{searchQuery}".
                    </td>
                  </tr>
                ) : (
                  displayRankingData.map((item, i) => (
                    <tr 
                      key={i} 
                      onClick={() => setViewingProfile(item)}
                      className="border-t border-slate-100 hover:bg-slate-50 transition-all cursor-pointer font-medium"
                    >
                      <td className="p-5 pl-6 font-bold text-slate-800">{item.rank}</td>
                      <td className="font-bold text-slate-900">{item.name}</td>
                      <td className="font-semibold text-slate-650">{item.referrals.toLocaleString()}</td>
                      <td className="font-black text-slate-900">{item.earned}</td>
                      <td className={`${item.color} font-bold`}>{item.activity}</td>
                      <td className="text-right pr-6" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => setViewingProfile(item)}
                          className="text-indigo-700 hover:text-indigo-900 font-bold cursor-pointer hover:underline text-xs"
                        >
                          View Profile
                        </button>
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

      {/* Profile Modal */}
      {viewingProfile && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-indigo-955 text-lg">Advocate Profile</h2>
              <button onClick={() => setViewingProfile(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <XCircle size={20} />
              </button>
            </div>
            
            <div className="p-6 text-center">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <img
                  src={viewingProfile.image || "https://randomuser.me/api/portraits/lego/1.jpg"}
                  alt={viewingProfile.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-slate-50 shadow-sm"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-indigo-900 text-white text-[10px] font-extrabold px-3 py-0.5 rounded-full border-2 border-white whitespace-nowrap shadow-sm">
                  {viewingProfile.rank.toString().startsWith('#') ? `Rank ${viewingProfile.rank}` : `Rank #${viewingProfile.rank}`}
                </div>
              </div>
              
              <h3 className="text-xl font-black text-slate-900">{viewingProfile.name}</h3>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">
                {viewingProfile.role || "Community Member"}
              </p>
              
              <div className="flex justify-center gap-6 mt-6 pt-6 border-t border-slate-100">
                <div>
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase">Total Referrals</p>
                  <p className="text-2xl font-black text-indigo-900 mt-1">{viewingProfile.referrals.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase">Total Earned</p>
                  <p className="text-2xl font-black text-emerald-600 mt-1">{viewingProfile.earned}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button 
                onClick={() => setViewingProfile(null)}
                className="bg-indigo-900 hover:bg-indigo-850 text-white px-4 py-2 rounded-xl font-bold text-xs transition-all shadow-sm cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}