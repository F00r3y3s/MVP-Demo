
import React, { useState, useEffect } from 'react';
import { ScreenName, FeedPost } from '../types';
import RewardView from '../components/RewardView';
import { useAccessibility } from '../context/AccessibilityContext';
import { useOrganization } from '../context/OrganizationContext';
import { USER_IMAGE_URL } from '../constants';

interface Props {
   onNavigate: (screen: ScreenName) => void;
   initialTab?: 'feed' | 'connect' | 'hub';
}

// Extended types for internal state
interface PostState extends FeedPost {
   impact?: string;
   location?: string;
   wdaEarned?: number;
   relation?: 'Family' | 'Friend' | 'Follower' | 'Work';
   user: {
      name: string;
      avatar: string; // Initials
      avatarImage?: string; // Profile Pic URL
      badge: string;
      isVerified?: boolean;
   };
}

interface BlogState {
   id: number;
   title: string;
   author: string;
   readTime: string;
   category: string;
   image: string;
   wdaEarned: number;
}

interface MessageState {
   id: string;
   user: string;
   avatar: string;
   avatarImage?: string;
   lastMsg: string;
   time: string;
   unread: number;
   online: boolean;
}

const CommunityScreen: React.FC<Props> = ({ onNavigate, initialTab }) => {
   const [viewMode, setViewMode] = useState<'feed' | 'connect' | 'hub'>(initialTab || 'feed');
   const { simplifiedView } = useAccessibility();
   const [blogTab, setBlogTab] = useState<'community' | 'mine'>('community');

   // Modal States
   const [showCreatePost, setShowCreatePost] = useState(false);
   const [showCreateBlog, setShowCreateBlog] = useState(false);
   const [showTribesModal, setShowTribesModal] = useState(false);
   const [showAllGoalsModal, setShowAllGoalsModal] = useState(false);
   const [showMessagesModal, setShowMessagesModal] = useState(false);
   const [showSearch, setShowSearch] = useState(false);
   const [showAddFriendModal, setShowAddFriendModal] = useState(false);
   const [showConnectionsModal, setShowConnectionsModal] = useState(false);

   const [userStatus, setUserStatus] = useState<'online' | 'away' | 'busy'>('online');
   const [showStatusMenu, setShowStatusMenu] = useState(false);

   // Phase 2B Task 2.1: Organization State (NOW USING CONTEXT)
   const { isLinked: isOrganizationLinked, organization, department, team } = useOrganization();
   const showTagFamilyModalState = useState(false);
   const [showTagFamilyModal, setShowTagFamilyModal] = showTagFamilyModalState;
   const [friendCircleFilter, setFriendCircleFilter] = useState<'all' | 'Family' | 'Friend' | 'Work' | 'Follower' | 'Company'>('all');

   const organizationData = organization ? {
      name: organization.name,
      department: department,
      logo: organization.logo,
      color: organization.color
   } : null;

   // Content Creation State
   const [newPostContent, setNewPostContent] = useState('');
   const [blogTitle, setBlogTitle] = useState('');
   const [blogCategory, setBlogCategory] = useState('Tips & Tricks');
   const [blogContent, setBlogContent] = useState('');

   // Carousel State
   const [activeGoalIndex, setActiveGoalIndex] = useState(0);

   // Goal Modal & Share
   const [selectedGoal, setSelectedGoal] = useState<any | null>(null);
   const [showShareModal, setShowShareModal] = useState(false);
   const [isCopied, setIsCopied] = useState(false);

   // --- DATA & STATE ---

   const [posts, setPosts] = useState<PostState[]>([
      {
         id: '1',
         user: {
            name: 'Ahmed Al Mansouri',
            avatar: 'AM',
            avatarImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=150',
            badge: 'Eco Warrior',
            isVerified: true
         },
         content: 'Spent the morning at Kite Beach cleaning up micro-plastics. It’s amazing what we can do when we work together! 🌊🐢 #CleanSeas',
         time: '2h ago',
         likes: 245,
         comments: 32,
         achievements: ['Clean Up Hero'],
         location: 'Kite Beach, Dubai',
         image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&q=80&w=800',
         impact: '5kg Waste Removed',
         wdaEarned: 150,
         relation: 'Family'
      },
      {
         id: '2',
         user: { name: 'Sarah Johnson', avatar: 'SJ', avatarImage: USER_IMAGE_URL, badge: 'Mentor' },
         content: 'Just harvested my first batch of tomatoes from the balcony garden! 🍅 Urban farming is easier than you think. DM me if you need tips on soil mix!',
         time: '4h ago',
         likes: 180,
         comments: 45,
         image: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=600',
         impact: 'Local Food Source',
         wdaEarned: 80,
         relation: 'Friend'
      },
      {
         id: '3',
         user: { name: 'Green DXB', avatar: 'GD', badge: 'Organization', isVerified: true },
         content: 'Massive turnout for our solar workshop today! Empowering homes to go off-grid one panel at a time. ☀️⚡',
         time: '6h ago',
         likes: 540,
         comments: 89,
         image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=600',
         impact: 'Community Edu',
         wdaEarned: 500
      }
   ]);

   const [blogs, setBlogs] = useState<BlogState[]>([
      { id: 1, title: '10 Easy Ways to Reduce Carbon Footprint at Home', author: 'Sarah Johnson', readTime: '5 min', category: 'Tips', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=300', wdaEarned: 25 },
      { id: 2, title: 'The Future of Water Desalination in the UAE', author: 'Ahmed Al Mansouri', readTime: '8 min', category: 'Innovation', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=300', wdaEarned: 25 },
      { id: 3, title: 'My Journey to Zero Waste: Month 1', author: 'Fatima Z.', readTime: '6 min', category: 'Personal', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=300', wdaEarned: 25 },
   ]);

   const stories = [
      { id: 's1', user: 'You', avatar: 'SJ', isUser: true },
      { id: 's2', user: 'Ahmed', avatar: 'AM', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=150', seen: false, hasWda: true },
      { id: 's3', user: 'Fatima', avatar: 'FZ', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=150', seen: false },
      { id: 's4', user: 'EcoUAE', avatar: 'EU', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=150', seen: true, isOfficial: true },
      { id: 's5', user: 'Zayed', avatar: 'ZA', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150', seen: false },
   ];

   const messages = [
      { id: 'm1', user: 'Ahmed Al Mansouri', avatar: 'AM', avatarImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=150', time: '2m', lastMsg: 'See you at the beach cleanup! 🌊', unread: 2, online: true },
      { id: 'm2', user: 'Fatima Zaabi', avatar: 'FZ', time: '1h', lastMsg: 'Thanks for the tips on composting.', unread: 0, online: false },
      { id: 'm3', user: 'EcoUAE Official', avatar: 'EU', time: '3h', lastMsg: 'Your submission has been approved.', unread: 0, online: true },
      { id: 'm4', user: 'Khalid M.', avatar: 'KM', time: '1d', lastMsg: 'Did you check the new solar panels?', unread: 0, online: false },
   ];

   const leaderboard = [
      { rank: 1, name: 'Ahmed Al Mansouri', badge: 'Eco Warrior', points: '15,200', avatar: 'AM', color: 'bg-amber-500', isUser: false },
      { rank: 2, name: 'Fatima Al Zaabi', badge: 'Green Champion', points: '12,850', avatar: 'FZ', color: 'bg-slate-400', isUser: false },
      { rank: 3, name: 'Khalid Al Sharqi', badge: 'Sustainability Hero', points: '10,400', avatar: 'KS', color: 'bg-orange-700', isUser: false },
      { rank: 4, name: 'Mariam Al Falasi', badge: 'Member', points: '8,900', avatar: 'MF', color: 'bg-teal-600', isUser: false },
      { rank: 12, name: 'Sarah Johnson', badge: 'Mentor', points: '2,850', avatar: 'SJ', color: 'bg-green-600', isUser: true },
   ];

   const awards = [
      { id: 1, title: 'Zero Waste Champion', desc: 'Complete 30 days of zero-waste living', icon: 'fa-trophy', color: 'from-amber-400 to-orange-500', progress: 80, target: '24/30 days' },
      { id: 2, title: 'Tree Planter', desc: 'Plant 50 trees in your community', icon: 'fa-medal', color: 'from-slate-300 to-slate-400', progress: 60, target: '30/50 trees' },
      { id: 3, title: 'Energy Saver', desc: 'Save 1000kWh of energy', icon: 'fa-award', color: 'from-orange-700 to-amber-800', progress: 45, target: '450/1000 kWh' },
      { id: 4, title: 'Community Leader', desc: 'Start a sustainability initiative', icon: 'fa-lock', color: 'from-gray-200 to-gray-300', progress: 0, target: 'Locked', isLocked: true },
   ];

   const communityGoals = [
      {
         id: 1,
         title: "The Billion Tree Campaign",
         subtitle: "Global Reforestation",
         target: "1 Million Trees",
         progress: 75,
         daysLeft: 12,
         participants: 12500,
         image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600",
         sdg: 15,
         color: "from-green-600 to-emerald-800",
         activities: [
            { id: 1, title: 'Plant a Ghaf Tree', reward: 500, type: 'Event' },
            { id: 2, title: 'Donate to Sapling Fund', reward: 200, type: 'Donation' },
            { id: 3, title: 'Join Reforestation Webinar', reward: 100, type: 'Education' }
         ]
      },
      {
         id: 2,
         title: "Clean Oceans Initiative",
         subtitle: "Marine Life Protection",
         target: "50 Tons Plastic",
         progress: 42,
         daysLeft: 20,
         participants: 8400,
         image: "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?auto=format&fit=crop&q=80&w=600",
         sdg: 14,
         color: "from-blue-600 to-cyan-800",
         activities: [
            { id: 1, title: 'Beach Cleanup Jumeirah', reward: 300, type: 'Event' },
            { id: 2, title: 'Reduce Single-Use Plastics', reward: 150, type: 'Challenge' },
         ]
      },
      {
         id: 3,
         title: "Renewable Energy Shift",
         subtitle: "Solar Adoption",
         target: "10,000 Homes",
         progress: 60,
         daysLeft: 45,
         participants: 5200,
         image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=600",
         sdg: 7,
         color: "from-amber-500 to-orange-700",
         activities: [
            { id: 1, title: 'Install Solar Panel', reward: 1000, type: 'Action' },
            { id: 2, title: 'Switch to LED Bulbs', reward: 200, type: 'Challenge' },
         ]
      }
   ];

   const allTribes = [
      { id: 1, name: 'Dubai Vegans', members: '12.5k', image: 'from-green-400 to-emerald-600', icon: 'fa-carrot', wda: 50, desc: 'Plant-based living in the city.' },
      { id: 2, name: 'Beach Cleaners', members: '8.2k', image: 'from-blue-400 to-cyan-600', icon: 'fa-water', wda: 100, desc: 'Weekly cleanup drives.' },
      { id: 3, name: 'Zero Waste Home', members: '24k', image: 'from-amber-400 to-orange-600', icon: 'fa-home', wda: 50, desc: 'Tips for reducing household waste.' },
      { id: 4, name: 'Eco Techies', members: '5.1k', image: 'from-purple-400 to-indigo-600', icon: 'fa-microchip', wda: 75, desc: 'Sustainable gadgets and innovation.' },
   ];

   const getStatusColor = (status: string) => {
      switch (status) {
         case 'online': return 'bg-green-500';
         case 'away': return 'bg-amber-500';
         case 'busy': return 'bg-red-500';
         default: return 'bg-gray-400';
      }
   };

   const getRelationColor = (relation?: string) => {
      switch (relation) {
         case 'Family': return 'bg-red-100 text-red-600';
         case 'Friend': return 'bg-blue-100 text-blue-600';
         case 'Work': return 'bg-purple-100 text-purple-600';
         case 'Follower': return 'bg-gray-100 text-gray-600';
         default: return 'bg-gray-100 text-gray-600';
      }
   };

   // --- ACTIONS ---

   const handleCreatePost = () => {
      if (!newPostContent.trim()) return;

      const newPost: PostState = {
         id: Date.now().toString(),
         user: { name: 'Sarah Johnson', avatar: 'SJ', badge: 'Mentor', isVerified: true },
         content: newPostContent,
         time: 'Just now',
         likes: 0,
         comments: 0,
         wdaEarned: 10,
         relation: undefined // Self
      };

      setPosts([newPost, ...posts]);
      setNewPostContent('');
      setShowCreatePost(false);
   };

   const handleCreateBlog = () => {
      if (!blogTitle.trim()) return;

      const newBlog: BlogState = {
         id: Date.now(),
         title: blogTitle,
         author: 'Sarah Johnson',
         readTime: '2 min',
         category: blogCategory,
         image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b0?auto=format&fit=crop&q=80&w=300', // Default image
         wdaEarned: 50
      };

      setBlogs([newBlog, ...blogs]);
      setBlogTitle('');
      setBlogContent('');
      setShowCreateBlog(false);
   };

   const handleCopyLink = () => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
   };

   const handleSocialShare = (platform: string) => {
      window.open(`https://${platform}.com`, '_blank');
   };

   const openShareModal = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setShowShareModal(true);
   };

   useEffect(() => {
      if (viewMode === 'hub' && !showAllGoalsModal) {
         const interval = setInterval(() => {
            setActiveGoalIndex((prev) => (prev + 1) % communityGoals.length);
         }, 5000);
         return () => clearInterval(interval);
      }
   }, [viewMode, showAllGoalsModal, communityGoals.length]);

   const displayedBlogs = blogTab === 'community' ? blogs : blogs.filter(b => b.author === 'Sarah Johnson');

   return (
      <div className="bg-[var(--bg-primary)] h-full relative flex flex-col" onClick={() => setShowStatusMenu(false)}>

         {/* 1. HEADER */}
         <div className="sticky top-0 z-40 bg-[var(--bg-primary)]/95 backdrop-blur-xl border-b border-[var(--border-light)]/50 pt-16 pb-2 px-5 transition-all">
            <div className="flex items-center justify-between mb-4">
               {/* User Info */}
               <div className="flex items-center gap-3">
                  <div className="relative">
                     <div className="w-10 h-10 rounded-xl overflow-hidden border border-[var(--border-light)] shadow-sm cursor-pointer" onClick={() => onNavigate(ScreenName.PROFILE)}>
                        <img src={USER_IMAGE_URL} alt="Profile" className="w-full h-full object-cover" />
                     </div>
                     <div className="absolute -bottom-1 -right-1 z-30" onClick={(e) => { e.stopPropagation(); setShowStatusMenu(!showStatusMenu); }}>
                        <div className={`w-3 h-3 rounded-full border-2 border-white ${getStatusColor(userStatus)}`}></div>
                     </div>
                     {showStatusMenu && (
                        <div className="absolute top-full left-0 mt-2 w-32 bg-white rounded-xl shadow-xl py-1 z-40">
                           {['online', 'away', 'busy'].map((s) => (
                              <button key={s} onClick={(e) => { e.stopPropagation(); setUserStatus(s as any); setShowStatusMenu(false); }} className="w-full px-3 py-2 text-left text-xs font-bold text-gray-700 hover:bg-gray-100 flex items-center gap-2 capitalize">
                                 <div className={`w-2 h-2 rounded-full ${getStatusColor(s)}`}></div>{s}
                              </button>
                           ))}
                        </div>
                     )}
                  </div>
                  <div>
                     <h2 className="font-bold text-[var(--text-primary)] text-sm leading-none mb-0.5">Sarah Johnson</h2>
                     <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold">Lvl 12</span>
                        {/* Phase 2B Task 2.2: Organization Badge */}
                        {isOrganizationLinked && organizationData && (
                           <div className="text-[10px] bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-1.5 py-0.5 rounded font-bold flex items-center gap-1">
                              <span className="text-[9px]">{organizationData.logo}</span> {organizationData.name}
                           </div>
                        )}
                        <span className="text-[10px] text-[var(--forest-light)] font-bold">2,850 Wda</span>
                     </div>
                  </div>
               </div>

            </div>
            {/* Search Bar */}
            {showSearch && (
               <div className="mb-4 animate-[fadeIn_0.2s_ease-out]">
                  <input type="text" placeholder="Search friends, posts, or tribes..." className="w-full bg-[var(--bg-tertiary)] rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--forest-light)] transition-all" autoFocus />
               </div>
            )}

            {/* Tab Switcher */}
            <div className="bg-[var(--bg-tertiary)] p-1 rounded-xl flex relative overflow-x-auto no-scrollbar">
               <div
                  className={`absolute top-1 bottom-1 w-[32%] bg-white rounded-lg shadow-sm transition-all duration-300 ease-out`}
                  style={{
                     left: viewMode === 'feed' ? '1%' :
                        viewMode === 'connect' ? '34%' : '67%'
                  }}
               ></div>

               <button onClick={() => setViewMode('feed')} className={`flex-1 min-w-[32%] py-2 rounded-lg text-xs font-bold relative z-10 transition-colors flex items-center justify-center gap-1.5 ${viewMode === 'feed' ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                  <i className="fas fa-stream"></i> Feed
               </button>
               <button onClick={() => setViewMode('connect')} className={`flex-1 min-w-[32%] py-2 rounded-lg text-xs font-bold relative z-10 transition-colors flex items-center justify-center gap-1.5 ${viewMode === 'connect' ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                  <i className="fas fa-users"></i> Connect
               </button>
               <button onClick={() => setViewMode('hub')} className={`flex-1 min-w-[32%] py-2 rounded-lg text-xs font-bold relative z-10 transition-colors flex items-center justify-center gap-1.5 ${viewMode === 'hub' ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                  <i className="fas fa-globe"></i> Hub
               </button>
            </div>
         </div>

         <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
            {/* === VIEW 1: SOCIAL FEED === */}
            {viewMode === 'feed' && (
               <div className="animate-[fadeIn_0.3s_ease-out]">
                  <div className="px-5 py-4 flex gap-4">
                     {!simplifiedView && (
                        <>
                           <div onClick={() => setShowConnectionsModal(true)} className="flex-1 bg-white p-3 rounded-2xl border border-[var(--border-light)] flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
                              <div><div className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider">Following</div><div className="text-lg font-bold text-[var(--text-primary)]">248</div></div>
                              <div className="w-8 h-8 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-secondary)]"><i className="fas fa-user-friends text-xs"></i></div>
                           </div>
                           <div onClick={() => setShowConnectionsModal(true)} className="flex-1 bg-white p-3 rounded-2xl border border-[var(--border-light)] flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
                              <div><div className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider">Followers</div><div className="text-lg font-bold text-[var(--text-primary)]">1.2k</div></div>
                              <div className="w-8 h-8 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-secondary)]"><i className="fas fa-users text-xs"></i></div>
                           </div>
                        </>
                     )}
                     <div onClick={() => setShowAddFriendModal(true)} className={`w-12 bg-gradient-to-br from-[var(--forest-light)] to-[var(--forest-deep)] rounded-2xl flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-105 transition-transform active:scale-95 ${simplifiedView ? 'w-full py-3' : ''}`}>
                        {simplifiedView ? <span className="font-bold">Add Connection</span> : <i className="fas fa-user-plus"></i>}
                     </div>
                  </div>

                  {!simplifiedView && (
                     <div className="pb-2 pl-5 overflow-x-auto no-scrollbar flex gap-4 border-b border-[var(--border-light)]/50">
                        <div className="flex flex-col items-center gap-1 min-w-[64px]">
                           <div className="w-16 h-16 rounded-full border-2 border-dashed border-[var(--forest-light)] p-1 relative cursor-pointer hover:scale-105 transition-transform">
                              <div className="w-full h-full bg-[var(--bg-tertiary)] rounded-full flex items-center justify-center text-[var(--forest-light)]"><i className="fas fa-plus text-lg"></i></div>
                           </div>
                           <span className="text-[10px] font-bold text-[var(--text-secondary)]">Your Story</span>
                        </div>
                        {stories.slice(1).map(story => (
                           <div key={story.id} className="flex flex-col items-center gap-1 min-w-[64px] cursor-pointer group">
                              <div className={`w-16 h-16 rounded-full p-[2px] ${story.seen ? 'bg-gray-200' : 'bg-gradient-to-tr from-yellow-400 to-fuchsia-600'} relative group-hover:scale-105 transition-transform`}>
                                 <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                    {story.image ? <img src={story.image} alt={story.user} className="w-full h-full object-cover" /> : story.avatar}
                                 </div>
                              </div>
                              <span className="text-[10px] font-medium text-[var(--text-primary)]">{story.user}</span>
                           </div>
                        ))}
                     </div>
                  )}

                  <div className="px-5 space-y-6 pt-4">
                     {posts.map(post => (
                        <div key={post.id} className="bg-white rounded-[32px] overflow-hidden border border-[var(--border-light)] shadow-sm group">
                           <div className="p-4 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs border border-white shadow-sm overflow-hidden">
                                    {post.user.avatarImage ? <img src={post.user.avatarImage} alt={post.user.name} className="w-full h-full object-cover" /> : post.user.avatar}
                                 </div>
                                 <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                       <h4 className="font-bold text-sm text-[var(--text-primary)]">{post.user.name}</h4>
                                       {post.user.isVerified && <i className="fas fa-check-circle text-blue-500 text-[10px]"></i>}
                                    </div>
                                    <div className="text-[10px] text-[var(--text-secondary)]">{post.location || post.time}</div>
                                 </div>
                              </div>
                              <button className="w-8 h-8 flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--bg-tertiary)] rounded-full"><i className="fas fa-ellipsis-h"></i></button>
                           </div>
                           {!simplifiedView && (
                              <div className="relative aspect-[4/3] bg-gray-200 group-hover:brightness-[1.02] transition-all cursor-pointer overflow-hidden">
                                 {post.image ? <img src={post.image} alt="Post" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-gray-100"><i className="fas fa-image text-gray-300 text-4xl"></i></div>}
                                 {post.wdaEarned && (
                                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xl px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-amber-100">
                                       <div className="w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center text-white text-[9px]"><i className="fas fa-coins"></i></div>
                                       <div className="flex flex-col leading-none"><span className="text-[8px] font-bold text-[var(--text-secondary)] uppercase">Impact Verified</span><span className="text-xs font-extrabold text-[var(--text-primary)]">+{post.wdaEarned} Wda</span></div>
                                    </div>
                                 )}
                              </div>
                           )}
                           <div className="px-4 py-3 flex items-center gap-5 border-b border-[var(--border-light)]/50">
                              <button className="flex items-center gap-2 group/btn"><i className="far fa-heart text-xl text-[var(--text-secondary)] group-hover/btn:text-red-500"></i><span className="text-xs font-bold text-[var(--text-primary)]">{post.likes}</span></button>
                              <button className="flex items-center gap-2 group/btn"><i className="far fa-comment text-xl text-[var(--text-secondary)] group-hover/btn:text-blue-500"></i><span className="text-xs font-bold text-[var(--text-primary)]">{post.comments}</span></button>
                           </div>
                           <div className="px-4 py-3"><p className="text-sm text-[var(--text-primary)] leading-relaxed"><span className="font-bold mr-1">{post.user.name}</span>{post.content}</p></div>
                        </div>
                     ))}
                  </div>
               </div>
            )}

            {/* === VIEW 2: CONNECT (Friend Circles) === */}
            {viewMode === 'connect' && (
               <div className="animate-[fadeIn_0.3s_ease-out] p-5 space-y-6">
                  {/* Friend Circle Filter Tabs */}
                  {!simplifiedView && (
                     <div className="bg-[var(--bg-tertiary)] p-1 rounded-xl flex gap-1 overflow-x-auto no-scrollbar" role="group" aria-label="Filter connections by circle">
                        {[
                           { id: 'all', label: 'All', icon: 'fa-globe' },
                           { id: 'Family', label: 'Family', icon: 'fa-home' },
                           { id: 'Friend', label: 'Friends', icon: 'fa-user-friends' },
                           { id: 'Work', label: 'Work', icon: 'fa-briefcase' },
                           { id: 'Company', label: 'Company', icon: 'fa-building' }, // Phase 6E Task 5.2: Company Filter
                           { id: 'Follower', label: 'Followers', icon: 'fa-users' }
                        ].map((tab) => (
                           <button
                              key={tab.id}
                              onClick={() => setFriendCircleFilter(tab.id as any)}
                              className={`flex-1 min-w-[80px] py-2 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none flex items-center justify-center gap-1.5 ${friendCircleFilter === tab.id ? 'bg-white text-[var(--forest-deep)] shadow-sm' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                                 }`}
                              aria-label={`Show ${tab.label} connections`}
                              aria-pressed={friendCircleFilter === tab.id}
                           >
                              <i className={`fas ${tab.icon} text-[9px]`}></i> {tab.label}
                           </button>
                        ))}
                     </div>
                  )}

                  {/* Tag Family Action */}
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-100 rounded-2xl p-4 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-500">
                           <i className="fas fa-heart"></i>
                        </div>
                        <div>
                           <h4 className="text-sm font-bold text-red-800">Family Sustainability Tracking</h4>
                           <p className="text-[10px] text-red-600">Track impact together with your family</p>
                        </div>
                     </div>
                     <button
                        onClick={() => setShowTagFamilyModal(true)}
                        className="px-4 py-2 bg-red-500 text-white rounded-xl text-xs font-bold hover:bg-red-600 transition-colors focus:ring-2 focus:ring-red-500 focus:outline-none"
                        aria-label="Tag family members"
                     >
                        Tag Family
                     </button>
                  </div>

                  {/* Connection Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3" role="list" aria-label={`${friendCircleFilter === 'all' ? 'All' : friendCircleFilter} connections`}>
                     {[
                        { name: 'Ahmed Al Mansouri', avatar: 'AM', avatarImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=150', badge: 'Eco Warrior', relation: 'Family', wda: 15420, online: true },
                        { name: 'Fatima Al Zaabi', avatar: 'FZ', badge: 'Green Champion', relation: 'Friend', wda: 12850, online: false },
                        { name: 'Khalid Al Sharqi', avatar: 'KS', badge: 'Sustainability Hero', relation: 'Friend', wda: 10400, online: true },
                        { name: 'Mariam Al Falasi', avatar: 'MF', badge: 'Member', relation: 'Work', wda: 8900, online: false },
                        { name: 'Omar Hassan', avatar: 'OH', badge: 'Newcomer', relation: 'Follower', wda: 3200, online: true },
                     ]
                        .filter(p => friendCircleFilter === 'all' || p.relation === friendCircleFilter)
                        .map((person) => (
                           <div key={person.name} role="listitem" className="bg-white p-4 rounded-2xl border border-[var(--border-light)] shadow-sm hover:shadow-md transition-all group">
                              <div className="flex items-center justify-between mb-3">
                                 <div className="flex items-center gap-3">
                                    <div className="relative">
                                       <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                          {person.avatarImage ? <img src={person.avatarImage} alt={person.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-[var(--bg-tertiary)] flex items-center justify-center font-bold text-xs">{person.avatar}</div>}
                                       </div>
                                       <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${person.online ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                    </div>
                                    <div>
                                       <h4 className="font-bold text-sm text-[var(--text-primary)]">{person.name}</h4>
                                       <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${getRelationColor(person.relation)}`}>{person.relation}</span>
                                    </div>
                                 </div>
                                 <span className="text-[10px] font-black text-[var(--forest-light)]">{person.wda.toLocaleString()} Wda</span>
                              </div>
                              <div className="flex gap-2 mt-3 pt-3 border-t border-[var(--border-light)]">
                                 <button className="flex-1 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-xl text-[10px] font-bold hover:bg-[var(--border-light)] transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none flex items-center justify-center gap-1">
                                    <i className="fas fa-comment-alt text-[9px]"></i> Message
                                 </button>
                                 <button className="flex-1 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-xl text-[10px] font-bold hover:bg-[var(--border-light)] transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none flex items-center justify-center gap-1">
                                    <i className="fas fa-user text-[9px]"></i> Profile
                                 </button>
                              </div>
                           </div>
                        ))}
                  </div>

                  {/* Friend Activity Feed */}
                  <div>
                     <h3 className="font-black text-lg text-[var(--text-primary)] mb-4 flex items-center gap-2">
                        <i className="fas fa-bolt text-amber-500 text-sm"></i> Recent Activity
                     </h3>
                     <div className="space-y-3">
                        {[
                           { name: 'Ahmed', action: 'planted a tree', time: '2 min ago', icon: 'fa-tree', color: 'bg-green-100 text-green-600' },
                           { name: 'Fatima', action: 'completed zero waste challenge', time: '15 min ago', icon: 'fa-recycle', color: 'bg-blue-100 text-blue-600' },
                           { name: 'Khalid', action: 'earned Carbon Crusher badge', time: '1 hour ago', icon: 'fa-medal', color: 'bg-amber-100 text-amber-600' },
                        ].map((activity, i) => (
                           <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[var(--border-light)]">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activity.color}`}>
                                 <i className={`fas ${activity.icon}`}></i>
                              </div>
                              <div className="flex-1">
                                 <p className="text-sm text-[var(--text-primary)]"><span className="font-bold">{activity.name}</span> {activity.action}</p>
                                 <p className="text-[10px] text-[var(--text-muted)]">{activity.time}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            )}

            {/* === VIEW 4: ECO-HUB === */}
            {viewMode === 'hub' && (
               <div className="animate-[fadeIn_0.3s_ease-out] p-5 space-y-8">
                  {/* 1. Global Goal Carousel */}
                  <div>
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg text-[var(--text-primary)]">Global Goals</h3>
                        <button onClick={() => setShowAllGoalsModal(true)} className="text-xs font-bold text-[var(--forest-light)]">View All</button>
                     </div>

                     {!simplifiedView ? (
                        <div className="relative w-full h-72 rounded-[32px] overflow-hidden shadow-xl shadow-green-900/10 group">
                           {communityGoals.map((goal, index) => (
                              <div
                                 key={goal.id}
                                 onClick={() => setSelectedGoal(goal)}
                                 className={`absolute inset-0 cursor-pointer transition-opacity duration-700 ${index === activeGoalIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                              >
                                 <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[7000ms] group-hover:scale-105" style={{ backgroundImage: `url(${goal.image})` }}></div>
                                 <div className={`absolute inset-0 bg-gradient-to-t ${goal.color} opacity-90 mix-blend-multiply`}></div>
                                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60"></div>

                                 <div className="absolute top-5 left-5 right-5 flex justify-between items-start z-20">
                                    <div className="bg-white/20 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                                       <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Goal of the Month
                                    </div>
                                    <button
                                       type="button"
                                       onClick={openShareModal}
                                       className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-2 cursor-pointer transition-colors relative z-30"
                                    >
                                       <i className="fas fa-heart"></i> Share Impact
                                    </button>
                                 </div>

                                 <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                                    <h3 className="text-3xl font-extrabold text-white mb-2 leading-tight drop-shadow-md font-jakarta">{goal.title}</h3>
                                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 mb-4 hover:bg-white/20 transition-colors">
                                       <div className="flex justify-between items-end mb-2">
                                          <span className="text-xs font-bold text-white uppercase tracking-wider">Progress</span>
                                          <span className="text-2xl font-bold text-green-300">{goal.progress}%</span>
                                       </div>
                                       <div className="h-2.5 bg-black/20 rounded-full overflow-hidden mb-2">
                                          <div className="h-full bg-white rounded-full relative" style={{ width: `${goal.progress}%` }}></div>
                                       </div>
                                       <div className="flex justify-between text-[10px] text-white/80 font-medium">
                                          <span>{goal.participants.toLocaleString()} Contributors</span>
                                          <span>{goal.daysLeft} Days Left</span>
                                       </div>
                                    </div>
                                    <div className="flex gap-2 text-white/80 text-xs font-bold">
                                       <span>Click to view activities & earn Wda <i className="fas fa-arrow-right"></i></span>
                                    </div>
                                 </div>
                              </div>
                           ))}

                           {/* Carousel Indicators */}
                           <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                              {communityGoals.map((_, i) => (
                                 <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeGoalIndex ? 'bg-white w-4' : 'bg-white/40'}`}></div>
                              ))}
                           </div>
                        </div>
                     ) : (
                        <div className="space-y-3">
                           {communityGoals.map(goal => (
                              <button
                                 key={goal.id}
                                 onClick={() => setSelectedGoal(goal)}
                                 className="w-full bg-white p-4 rounded-xl border border-[var(--border-light)] shadow-sm text-left flex justify-between items-center"
                              >
                                 <span className="font-bold text-[var(--text-primary)]">{goal.title}</span>
                                 <span className="text-[var(--forest-light)] font-bold text-sm">View</span>
                              </button>
                           ))}
                        </div>
                     )}
                  </div>

                  {/* 2. Tribes (Groups) */}
                  <div>
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg text-[var(--text-primary)]">Join a Tribe</h3>
                        <button onClick={() => setShowTribesModal(true)} className="text-xs font-bold text-[var(--text-secondary)]">View All</button>
                     </div>
                     <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-5 px-5">
                        {allTribes.slice(0, 5).map(tribe => (
                           <div key={tribe.id} className="min-w-[150px] bg-white rounded-[24px] p-4 border border-[var(--border-light)] shadow-sm text-center cursor-pointer hover:shadow-md transition-all group relative overflow-hidden">
                              <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${tribe.image} flex items-center justify-center text-white text-3xl mb-3 shadow-sm group-hover:scale-110 transition-transform`}>
                                 <i className={`fas ${tribe.icon}`}></i>
                              </div>
                              <h4 className="font-bold text-sm text-[var(--text-primary)] mb-1 truncate">{tribe.name}</h4>
                              <div className="text-[10px] text-[var(--text-secondary)] mb-3">{tribe.members} Members</div>
                              <button className="w-full py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] text-xs font-bold rounded-xl hover:bg-[var(--forest-light)] hover:text-white transition-colors">
                                 Join (+{tribe.wda})
                              </button>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Phase 2B Task 2.3: Organization Challenges Section */}
                  {isOrganizationLinked && organizationData && (
                     <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-5 border border-blue-100">
                        <div className="flex items-center justify-between mb-4">
                           <div className="flex items-center gap-2">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg shadow-lg">
                                 <i className="fas fa-building"></i>
                              </div>
                              <div>
                                 <h3 className="font-bold text-lg text-blue-900">Organization Challenges</h3>
                                 <p className="text-[10px] text-blue-700 font-medium">{organizationData.name} • {organizationData.department}</p>
                              </div>
                           </div>
                           <button onClick={() => onNavigate(ScreenName.CHAT)} className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors" title="Team Chat">
                              <i className="fas fa-comments text-xs"></i>
                           </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                           {[
                              { title: 'Department Green Challenge', participants: 45, progress: 78, reward: 500, icon: 'fa-leaf', color: 'from-green-400 to-emerald-600' },
                              { title: 'Zero Waste Week', participants: 120, progress: 45, reward: 1000, icon: 'fa-recycle', color: 'from-blue-400 to-cyan-600' },
                           ].map((challenge, i) => (
                              <div key={i} className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all cursor-pointer">
                                 <div className="flex items-start justify-between mb-2">
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${challenge.color} flex items-center justify-center text-white shadow-sm`}>
                                       <i className={`fas ${challenge.icon}`}></i>
                                    </div>
                                    <div className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-bold">+{challenge.reward} Wda</div>
                                 </div>
                                 <h4 className="font-bold text-sm text-[var(--text-primary)] mb-1">{challenge.title}</h4>
                                 <div className="flex justify-between items-center text-[10px] text-[var(--text-muted)]">
                                    <span>{challenge.participants} participants</span>
                                    <span className="font-bold text-emerald-600">{challenge.progress}%</span>
                                 </div>
                                 <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-2">
                                    <div className={`h-full bg-gradient-to-r ${challenge.color} rounded-full`} style={{ width: `${challenge.progress}%` }}></div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* Phase 2B Task 2.4: Team Leaderboard Widget */}
                  {isOrganizationLinked && organizationData && (
                     <div className="bg-white p-5 rounded-2xl border border-[var(--border-light)] shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                           <h3 className="font-bold text-lg text-[var(--text-primary)]">Team Leaderboard</h3>
                           <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-bold">{organizationData.department}</span>
                        </div>
                        <div className="space-y-2">
                           {[
                              { name: 'Engineering', score: 15200, rank: 1 },
                              { name: 'Marketing', score: 12800, rank: 2 },
                              { name: 'Operations', score: 11500, rank: 3 },
                              { name: 'HR', score: 9200, rank: 4 },
                           ].map((team) => (
                              <div key={team.name} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--border-light)] transition-colors">
                                 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${team.rank === 1 ? 'bg-amber-400 text-white' :
                                    team.rank === 2 ? 'bg-slate-400 text-white' :
                                       team.rank === 3 ? 'bg-orange-700 text-white' : 'bg-gray-300 text-gray-600'
                                    }`}>
                                    {team.rank}
                                 </div>
                                 <div className="flex-1">
                                    <div className="font-bold text-sm text-[var(--text-primary)]">{team.name}</div>
                                    <div className="text-[10px] text-[var(--text-muted)]">{team.score.toLocaleString()} pts</div>
                                 </div>
                                 {team.name === organizationData.department && (
                                    <span className="text-[9px] bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-bold">You</span>
                                 )}
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* 3. Community Voices (Blogs) - REFINED */}
                  <div>
                     <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                           <button
                              onClick={() => setBlogTab('community')}
                              className={`text-lg font-bold transition-colors ${blogTab === 'community' ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}
                              aria-label="View community blogs"
                           >
                              Community Voices
                           </button>
                           <div className="h-4 w-px bg-gray-300"></div>
                           <button
                              onClick={() => setBlogTab('mine')}
                              className={`text-lg font-bold transition-colors ${blogTab === 'mine' ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}
                              aria-label="View my blogs"
                           >
                              My Blogs
                           </button>
                        </div>
                        <button onClick={() => setShowCreateBlog(true)} className="px-4 py-2 bg-[var(--forest-light)] text-white rounded-xl text-xs font-bold hover:bg-[var(--forest-deep)] transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none flex items-center gap-2">
                           <i className="fas fa-pen text-[9px]"></i> Write Blog
                        </button>
                     </div>

                     {/* Phase 2D Task 4.4: Blog Categories Filter */}
                     <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2" role="group" aria-label="Filter blogs by category">
                        {['All', 'Tips & Tricks', 'Innovation', 'Personal', 'Community'].map((category) => (
                           <button
                              key={category}
                              className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap focus:ring-2 focus:ring-emerald-500 focus:outline-none ${blogCategory === category || category === 'All'
                                 ? 'bg-[var(--forest-light)] text-white shadow-md shadow-emerald-200'
                                 : 'bg-white text-[var(--text-muted)] border border-[var(--border-light)] hover:bg-[var(--bg-tertiary)]'
                                 }`}
                              onClick={() => setBlogCategory(category)}
                              aria-label={`Filter by ${category}`}
                              aria-pressed={blogCategory === category || category === 'All'}
                           >
                              {category}
                           </button>
                        ))}
                     </div>

                     <div className="space-y-4">
                        {displayedBlogs.length > 0 ? displayedBlogs.map(blog => (
                           <div key={blog.id} className="bg-white rounded-[24px] p-4 border border-[var(--border-light)] shadow-sm flex gap-4 cursor-pointer hover:shadow-md transition-all">
                              <div className="w-24 h-24 rounded-2xl bg-gray-200 shrink-0 overflow-hidden">
                                 <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                 <div className="flex justify-between items-start mb-1">
                                    <span className="text-[9px] font-bold bg-purple-50 text-purple-600 px-2 py-0.5 rounded-lg uppercase">{blog.category}</span>
                                    <div className="flex items-center gap-1 text-[10px] font-bold text-amber-500"><i className="fas fa-coins"></i> +{blog.wdaEarned}</div>
                                 </div>
                                 <h4 className="font-bold text-[var(--text-primary)] text-sm leading-tight mb-2 line-clamp-2">{blog.title}</h4>
                                 <div className="flex items-center gap-2 text-[10px] text-[var(--text-secondary)]">
                                    <span className="font-bold">{blog.author}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                    <span>{blog.readTime} read</span>
                                 </div>
                              </div>
                           </div>
                        )) : (
                           <div className="text-center py-8 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
                              <p className="text-sm text-gray-500 mb-2">No blogs found.</p>
                              <button onClick={() => setShowCreateBlog(true)} className="text-xs font-bold text-[var(--forest-light)]">Start writing</button>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            )}
         </div>

         {/* CONTEXTUAL FAB */}
         <button
            onClick={() => viewMode === 'hub' ? setShowCreateBlog(true) : setShowCreatePost(true)}
            className="fixed bottom-10 right-6 lg:right-[calc(50%-225px+24px)] w-14 h-14 rounded-full shadow-[0_10px_25px_rgba(16,185,129,0.4)] flex items-center justify-center z-30 group hover:scale-110 active:scale-95 transition-all"
         >
            <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-md border border-white/30"></div>
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-[var(--forest-light)] to-[var(--forest-deep)] flex items-center justify-center text-white">
               <i className={`fas ${viewMode === 'hub' ? 'fa-pen-nib' : 'fa-plus'} text-xl transition-transform group-hover:rotate-12`}></i>
            </div>
         </button>

         {/* --- MODALS --- */}

         {/* 5. Share Impact Modal (UPDATED) */}
         {showShareModal && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4" onClick={() => setShowShareModal(false)}>
               <div className="relative w-full max-w-xs sm:max-w-sm bg-white rounded-[32px] overflow-hidden shadow-2xl animate-[scaleIn_0.3s_cubic-bezier(0.16,1,0.3,1)] flex flex-col" onClick={e => e.stopPropagation()}>
                  <button onClick={() => setShowShareModal(false)} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/20 text-white flex items-center justify-center hover:bg-black/30 backdrop-blur-md z-20">
                     <i className="fas fa-times"></i>
                  </button>

                  {/* Compact Header */}
                  <div className="bg-gradient-to-b from-purple-600 to-indigo-700 p-6 pt-10 text-center relative shrink-0">
                     <div className="w-16 h-16 rounded-2xl bg-white/20 p-1 mx-auto mb-3 backdrop-blur-sm shadow-inner rotate-3">
                        <div className="w-full h-full rounded-xl bg-white/10 flex items-center justify-center text-2xl text-white border border-white/20">
                           <i className="fas fa-user"></i>
                        </div>
                     </div>
                     <h2 className="text-xl font-bold text-white mb-0.5">Sarah Johnson</h2>
                     <p className="text-purple-200 text-[10px] mb-4 font-medium tracking-wide uppercase">Level 12 Eco Warrior</p>

                     <div className="flex justify-center gap-4 text-white">
                        <div className="text-center">
                           <div className="text-xl font-extrabold">47</div>
                           <div className="text-[8px] uppercase opacity-70 tracking-widest font-bold">Trees</div>
                        </div>
                        <div className="w-px bg-white/20"></div>
                        <div className="text-center">
                           <div className="text-xl font-extrabold">1.2k</div>
                           <div className="text-[8px] uppercase opacity-70 tracking-widest font-bold">Water</div>
                        </div>
                        <div className="w-px bg-white/20"></div>
                        <div className="text-center">
                           <div className="text-xl font-extrabold">2.8k</div>
                           <div className="text-[8px] uppercase opacity-70 tracking-widest font-bold">Wda</div>
                        </div>
                     </div>
                  </div>

                  {/* Compact Body */}
                  <div className="p-5 bg-white flex-1">
                     <p className="text-[10px] font-bold text-[var(--text-secondary)] mb-3 text-center uppercase tracking-wider">Share Impact To</p>
                     <div className="flex gap-3 mb-4">
                        {['twitter', 'facebook', 'whatsapp', 'linkedin'].map(platform => (
                           <button key={platform} onClick={() => handleSocialShare(platform)} className="flex-1 aspect-square rounded-xl bg-gray-50 flex flex-col items-center justify-center gap-1 hover:bg-gray-100 transition-colors text-[var(--text-secondary)] border border-gray-100 group">
                              <i className={`fab fa-${platform} text-lg group-hover:scale-110 transition-transform`}></i>
                              <span className="text-[8px] capitalize font-bold">{platform}</span>
                           </button>
                        ))}
                     </div>

                     <button onClick={handleCopyLink} className={`w-full py-3 rounded-xl font-bold border-2 border-dashed flex items-center justify-center gap-2 transition-all mb-4 text-xs ${isCopied ? 'bg-green-50 border-green-200 text-green-600' : 'bg-white border-gray-200 text-[var(--text-primary)] hover:bg-gray-50'}`}>
                        <i className={`fas ${isCopied ? 'fa-check' : 'fa-link'}`}></i> {isCopied ? 'Copied!' : 'Copy Profile Link'}
                     </button>

                     <div className="relative bg-[#F8FAFC] rounded-xl p-3 border border-dashed border-gray-300 overflow-hidden group cursor-pointer hover:border-[var(--forest-light)] transition-colors" onClick={handleCopyLink}>
                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-r border-gray-200"></div>
                        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-l border-gray-200"></div>
                        <div className="text-center">
                           <p className="text-[9px] text-[var(--text-secondary)] font-bold uppercase tracking-wider mb-1">Referral Code</p>
                           <div className="flex items-center justify-center gap-2"><span className="text-lg font-mono font-bold text-[var(--text-primary)] tracking-wider">SUSTAIN-2024</span><i className="far fa-copy text-gray-400 text-xs group-hover:text-[var(--forest-light)]"></i></div>
                           <p className="text-[9px] text-green-600 mt-1 font-medium">Give 100 Wda, Get 100 Wda</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* 6. GOAL DETAILS MODAL */}
         {selectedGoal && (
            <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={() => setSelectedGoal(null)}>
               {/* FIXED: Added max-w-[430px] mx-auto */}
               {/* <div className="bg-[var(--bg-primary)] w-full max-h-[90vh] rounded-t-[32px] overflow-hidden flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]" onClick={e => e.stopPropagation()}> */}
               <div className="bg-[var(--bg-primary)] w-full max-w-[430px] mx-auto max-h-[85vh] rounded-t-[32px] overflow-hidden flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]" onClick={e => e.stopPropagation()}>
                  <div className="h-64 relative">
                     <img src={selectedGoal.image} className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                     <button onClick={() => setSelectedGoal(null)} className="absolute top-6 right-6 w-8 h-8 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/50 transition-colors z-20">
                        <i className="fas fa-times"></i>
                     </button>
                     <div className="absolute bottom-0 left-0 p-6 w-full">
                        <div className="inline-block px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-bold text-white uppercase mb-2 border border-white/20">Global Goal</div>
                        <h2 className="text-2xl font-bold text-white mb-1">{selectedGoal.title}</h2>
                        <p className="text-white/80 text-sm">{selectedGoal.subtitle}</p>
                     </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 bg-[var(--bg-primary)]">
                     <div className="flex gap-4 mb-6">
                        <div className="flex-1 bg-white p-3 rounded-2xl border border-[var(--border-light)] text-center shadow-sm">
                           <div className="text-xl font-bold text-[var(--forest-light)]">{selectedGoal.progress}%</div>
                           <div className="text-[10px] text-[var(--text-secondary)]">Funded</div>
                        </div>
                        <div className="flex-1 bg-white p-3 rounded-2xl border border-[var(--border-light)] text-center shadow-sm">
                           <div className="text-xl font-bold text-[var(--text-primary)]">{selectedGoal.daysLeft}</div>
                           <div className="text-[10px] text-[var(--text-secondary)]">Days Left</div>
                        </div>
                        <div className="flex-1 bg-white p-3 rounded-2xl border border-[var(--border-light)] text-center shadow-sm">
                           <div className="text-xl font-bold text-[var(--text-primary)]">{selectedGoal.participants >= 1000 ? (selectedGoal.participants / 1000).toFixed(1) + 'k' : selectedGoal.participants}</div>
                           <div className="text-[10px] text-[var(--text-secondary)]">Backers</div>
                        </div>
                     </div>

                     <h3 className="font-bold text-[var(--text-primary)] mb-3">Activities</h3>
                     <div className="space-y-3">
                        {selectedGoal.activities?.map((act: any) => (
                           <div key={act.id} className="bg-white p-4 rounded-2xl border border-[var(--border-light)] flex justify-between items-center shadow-sm">
                              <div>
                                 <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase">{act.type}</div>
                                 <div className="font-bold text-sm text-[var(--text-primary)]">{act.title}</div>
                              </div>
                              <div className="text-xs font-bold text-[var(--forest-light)]">+{act.reward} Wda</div>
                           </div>
                        ))}
                     </div>
                  </div>
                  <div className="p-4 bg-white border-t border-[var(--border-light)] flex gap-3">
                     <button className="flex-1 py-4 bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded-2xl font-bold flex items-center justify-center gap-2" onClick={() => { setShowShareModal(true); }}>
                        <i className="fas fa-share-alt"></i> Share
                     </button>
                     <button className="flex-[2] py-4 bg-gradient-to-r from-[var(--forest-light)] to-[var(--forest-deep)] text-white rounded-2xl font-bold shadow-lg">
                        Join Initiative
                     </button>
                  </div>
               </div>
            </div>
         )}

         {/* 7. Create Social Post Modal */}
         {showCreatePost && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-end justify-center" onClick={() => setShowCreatePost(false)}>
               {/* FIXED: Added max-w-[430px] mx-auto */}
               {/* <div className="bg-white w-full rounded-t-[32px] h-[90vh] flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]" onClick={e => e.stopPropagation()}> */}
               <div className="bg-white w-full max-w-[430px] mx-auto rounded-t-[32px] h-[85vh] flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]" onClick={e => e.stopPropagation()}>
                  <div className="px-5 py-4 border-b border-[var(--border-light)] flex justify-between items-center">
                     <button onClick={() => setShowCreatePost(false)} className="text-[var(--text-secondary)] font-bold text-sm hover:bg-gray-100 px-3 py-1 rounded-lg transition-colors">Cancel</button>
                     <h2 className="font-bold text-base">New Social Post</h2>
                     <button onClick={handleCreatePost} className="px-6 py-2 bg-[var(--forest-light)] text-white text-sm font-bold rounded-full shadow-lg shadow-green-200 active:scale-95 transition-transform">Post</button>
                  </div>

                  {/* Phase 2F Task 6.5: Voice Posting Option */}
                  <div className="px-5 py-3 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg">
                              <i className="fas fa-microphone"></i>
                           </div>
                           <div>
                              <h4 className="font-bold text-sm text-purple-900">Voice Post</h4>
                              <p className="text-[10px] text-purple-700">Tap to speak your post</p>
                           </div>
                        </div>
                        <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-xs font-bold hover:opacity-90 transition-opacity focus:ring-2 focus:ring-purple-500 focus:outline-none">
                           <i className="fas fa-waveform-lines mr-1"></i> Record
                        </button>
                     </div>
                  </div>

                  <div className="p-5 flex-1 overflow-y-auto">
                     <textarea
                        className="w-full h-32 bg-transparent resize-none outline-none text-xl placeholder-gray-400 font-medium leading-relaxed text-gray-900"
                        placeholder="What's your green moment today?"
                        autoFocus
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                     ></textarea>
                     <div className="flex gap-2 overflow-x-auto no-scrollbar py-2 mb-4">
                        {['#ZeroWaste', '#CleanUp', '#GreenLife', '#MyImpact'].map(tag => (
                           <button key={tag} onClick={() => setNewPostContent(prev => prev + ' ' + tag)} className="px-3 py-1 rounded-full border border-[var(--border-light)] text-xs font-bold text-[var(--forest-light)] hover:bg-green-50 transition-colors">{tag}</button>
                        ))}
                     </div>

                     {/* Media Attachments */}
                     <div className="mt-4 border-t border-[var(--border-light)] pt-4">
                        <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase mb-3">Add to your post</p>
                        <div className="flex gap-4">
                           <button className="flex flex-col items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--forest-light)] transition-colors group">
                              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-lg text-green-600 group-hover:scale-110 transition-transform"><i className="fas fa-image"></i></div>
                              <span className="text-[10px] font-bold">Photo</span>
                           </button>
                           <button className="flex flex-col items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--forest-light)] transition-colors group">
                              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-lg text-blue-600 group-hover:scale-110 transition-transform"><i className="fas fa-video"></i></div>
                              <span className="text-[10px] font-bold">Video</span>
                           </button>
                           <button className="flex flex-col items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--forest-light)] transition-colors group">
                              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-lg text-purple-600 group-hover:scale-110 transition-transform"><i className="fas fa-file-alt"></i></div>
                              <span className="text-[10px] font-bold">File</span>
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* 8. All Tribes Modal */}
         {showTribesModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-end justify-center" onClick={() => setShowTribesModal(false)}>
               {/* FIXED: Added max-w-[430px] mx-auto */}
               {/* <div className="bg-[var(--bg-primary)] w-full h-[90vh] rounded-t-[32px] flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]" onClick={e => e.stopPropagation()}> */}
               <div className="bg-[var(--bg-primary)] w-full max-w-[430px] mx-auto h-[85vh] rounded-t-[32px] flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]" onClick={e => e.stopPropagation()}>
                  <div className="p-6 border-b border-[var(--border-light)] bg-white rounded-t-[32px]">
                     <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold font-jakarta">Discover Tribes</h2>
                        <button onClick={() => setShowTribesModal(false)} className="w-8 h-8 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center"><i className="fas fa-times text-sm"></i></button>
                     </div>
                     <div className="relative">
                        <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input type="text" placeholder="Search groups..." className="w-full bg-[var(--bg-tertiary)] pl-10 pr-4 py-3 rounded-xl outline-none text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[var(--forest-light)] transition-all" />
                     </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                     {allTribes.map(tribe => (
                        <div key={tribe.id} className="bg-white p-4 rounded-2xl border border-[var(--border-light)] flex gap-4 items-center">
                           <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tribe.image} flex items-center justify-center text-white text-2xl shrink-0`}>
                              <i className={`fas ${tribe.icon}`}></i>
                           </div>
                           <div className="flex-1">
                              <h4 className="font-bold text-[var(--text-primary)]">{tribe.name}</h4>
                              <p className="text-xs text-[var(--text-secondary)] mb-1">{tribe.desc}</p>
                              <div className="text-[10px] text-[var(--text-muted)] font-bold">{tribe.members} Members</div>
                           </div>
                           <button className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] text-xs font-bold rounded-xl hover:bg-[var(--forest-light)] hover:text-white transition-colors">
                              Join (+{tribe.wda})
                           </button>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         )}

         {/* 9. All Goals Modal */}
         {showAllGoalsModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-end justify-center" onClick={() => setShowAllGoalsModal(false)}>
               <div className="bg-[var(--bg-primary)] w-full h-[85vh] rounded-t-[32px] flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]" onClick={e => e.stopPropagation()}>
                  <div className="p-6 border-b border-[var(--border-light)] bg-white rounded-t-[32px]">
                     <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold font-jakarta">Global Goals</h2>
                        <button onClick={() => setShowAllGoalsModal(false)} className="w-8 h-8 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center"><i className="fas fa-times text-sm"></i></button>
                     </div>
                     <p className="text-sm text-[var(--text-secondary)]">Join global initiatives to make a bigger impact.</p>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                     {communityGoals.map(goal => (
                        <div key={goal.id} onClick={() => { setShowAllGoalsModal(false); setSelectedGoal(goal); }} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[var(--border-light)] cursor-pointer">
                           <div className="h-32 bg-gray-200 relative">
                              <img src={goal.image} className="w-full h-full object-cover" />
                              <div className={`absolute inset-0 bg-gradient-to-t ${goal.color} opacity-80`}></div>
                              <div className="absolute bottom-3 left-4 text-white font-bold text-lg">{goal.title}</div>
                           </div>
                           <div className="p-4 flex items-center justify-between">
                              <div>
                                 <div className="text-xs text-[var(--text-secondary)] mb-1">Progress</div>
                                 <div className="text-xl font-bold text-[var(--forest-light)]">{goal.progress}%</div>
                              </div>
                              <div className="text-right">
                                 <div className="text-xs text-[var(--text-secondary)] mb-1">Goal</div>
                                 <div className="text-sm font-bold text-[var(--text-primary)]">{goal.target}</div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         )}

         {/* 10. MESSAGES MODAL (ADDED) */}
         {showMessagesModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-end justify-center" onClick={() => setShowMessagesModal(false)}>
               <div className="bg-[var(--bg-primary)] w-full h-[85vh] rounded-t-[32px] flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]" onClick={e => e.stopPropagation()}>
                  <div className="p-6 border-b border-[var(--border-light)] bg-white rounded-t-[32px] flex justify-between items-center">
                     <h2 className="text-xl font-bold font-jakarta">Messages</h2>
                     <button onClick={() => setShowMessagesModal(false)} className="w-8 h-8 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center"><i className="fas fa-times text-sm"></i></button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-1">
                     {messages.map(msg => (
                        <div key={msg.id} className="flex items-center gap-3 p-3 bg-white rounded-2xl hover:bg-gray-50 cursor-pointer border border-transparent hover:border-[var(--border-light)] transition-colors">
                           <div className="relative">
                              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                                 {msg.avatarImage ? <img src={msg.avatarImage} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-[var(--forest-light)] text-white font-bold">{msg.avatar}</div>}
                              </div>
                              {msg.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>}
                           </div>
                           <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center mb-0.5">
                                 <h4 className={`text-sm font-bold truncate ${msg.unread > 0 ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>{msg.user}</h4>
                                 <span className="text-[10px] text-[var(--text-muted)]">{msg.time}</span>
                              </div>
                              <p className={`text-xs truncate ${msg.unread > 0 ? 'font-bold text-[var(--text-primary)]' : 'text-[var(--text-secondary)] opacity-80'}`}>{msg.lastMsg}</p>
                           </div>
                           {msg.unread > 0 && <div className="w-5 h-5 rounded-full bg-[var(--forest-light)] flex items-center justify-center text-white text-[10px] font-bold">{msg.unread}</div>}
                        </div>
                     ))}
                  </div>
                  <div className="p-4 bg-white border-t border-[var(--border-light)]">
                     <button className="w-full py-3.5 bg-[var(--forest-light)] text-white rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2">
                        <i className="fas fa-pen"></i> New Message
                     </button>
                  </div>
               </div>
            </div>
         )}

         {/* 11. ADD FRIEND MODAL (ADDED) */}
         {showAddFriendModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-end justify-center" onClick={() => setShowAddFriendModal(false)}>
               <div className="bg-[var(--bg-primary)] w-full h-[85vh] rounded-t-[32px] flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]" onClick={e => e.stopPropagation()}>
                  <div className="p-6 border-b border-[var(--border-light)] bg-white rounded-t-[32px]">
                     <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold font-jakarta">Add Connections</h2>
                        <button onClick={() => setShowAddFriendModal(false)} className="w-8 h-8 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center"><i className="fas fa-times text-sm"></i></button>
                     </div>
                     <div className="relative">
                        <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input type="text" placeholder="Search by username or phone..." className="w-full bg-[var(--bg-tertiary)] pl-10 pr-4 py-3 rounded-xl outline-none text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[var(--forest-light)] transition-all" />
                     </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                     <div>
                        <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase mb-3 px-2">Suggestions</h3>
                        <div className="space-y-2">
                           {[{ name: 'Zayed Al Nahyan', mutual: '12 mutual friends', avatar: 'ZN' }, { name: 'Eco Warrior UAE', mutual: 'Followed by Ahmed', avatar: 'EW' }].map((person, i) => (
                              <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-[var(--border-light)]">
                                 <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold shadow-sm">{person.avatar}</div>
                                 <div className="flex-1">
                                    <div className="font-bold text-sm text-[var(--text-primary)]">{person.name}</div>
                                    <div className="text-[10px] text-[var(--text-secondary)]">{person.mutual}</div>
                                 </div>
                                 <button className="px-3 py-1.5 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg text-xs font-bold hover:bg-[var(--forest-light)] hover:text-white transition-colors">Add</button>
                              </div>
                           ))}
                        </div>
                     </div>
                     <div>
                        <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase mb-3 px-2">Contacts on Sustain</h3>
                        <div className="space-y-2">
                           <div className="text-center py-6">
                              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2 text-gray-400"><i className="fas fa-address-book"></i></div>
                              <p className="text-xs text-gray-500">Sync contacts to find friends</p>
                              <button className="mt-2 text-xs font-bold text-[var(--forest-light)]">Sync Now</button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* 12. CREATE BLOG MODAL (REFINED) */}
         {showCreateBlog && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-end justify-center" onClick={() => setShowCreateBlog(false)}>
               <div className="bg-white w-full rounded-t-[32px] h-[85vh] flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]" onClick={e => e.stopPropagation()}>
                  <div className="px-5 py-4 border-b border-[var(--border-light)] flex justify-between items-center">
                     <button onClick={() => setShowCreateBlog(false)} className="text-[var(--text-secondary)] font-bold text-sm hover:bg-gray-100 px-3 py-1 rounded-lg transition-colors">Cancel</button>
                     <h2 className="font-bold text-base">Write Blog</h2>
                     <button onClick={handleCreateBlog} className="px-6 py-2 bg-[var(--forest-light)] text-white text-sm font-bold rounded-full shadow-lg shadow-green-200 active:scale-95 transition-transform">Publish</button>
                  </div>

                  <div className="p-6 flex-1 overflow-y-auto">
                     {/* Refined Title Input */}
                     <div className="mb-4">
                        <input
                           type="text"
                           placeholder="Title of your story..."
                           className="w-full text-3xl font-bold font-jakarta outline-none placeholder-gray-300 border-b border-transparent focus:border-gray-200 transition-colors py-2"
                           value={blogTitle}
                           onChange={(e) => setBlogTitle(e.target.value)}
                        />
                     </div>

                     {/* Categories */}
                     <div className="mb-6 flex gap-2 overflow-x-auto no-scrollbar">
                        {['Tips & Tricks', 'Innovation', 'Personal', 'Review'].map(cat => (
                           <button
                              key={cat}
                              onClick={() => setBlogCategory(cat)}
                              className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${blogCategory === cat ? 'bg-purple-100 border-purple-200 text-purple-700' : 'bg-white border-[var(--border-light)] text-[var(--text-secondary)]'}`}
                           >
                              {cat}
                           </button>
                        ))}
                     </div>

                     {/* Rich Text Toolbar (Visual Only) */}
                     <div className="flex items-center gap-4 border-b border-[var(--border-light)] pb-3 mb-3 text-[var(--text-secondary)]">
                        <button className="hover:text-[var(--text-primary)]"><i className="fas fa-bold"></i></button>
                        <button className="hover:text-[var(--text-primary)]"><i className="fas fa-italic"></i></button>
                        <button className="hover:text-[var(--text-primary)]"><i className="fas fa-underline"></i></button>
                        <button className="hover:text-[var(--text-primary)]"><i className="fas fa-list-ul"></i></button>
                        <button className="hover:text-[var(--text-primary)]"><i className="fas fa-quote-right"></i></button>
                        <div className="w-px h-4 bg-gray-200"></div>
                        <button className="hover:text-[var(--text-primary)]"><i className="fas fa-link"></i></button>
                     </div>

                     <textarea
                        className="w-full h-64 bg-transparent resize-none outline-none text-base placeholder-gray-400 leading-relaxed text-gray-800"
                        placeholder="Share your sustainability journey, tips, or reviews here..."
                        value={blogContent}
                        onChange={(e) => setBlogContent(e.target.value)}
                     ></textarea>

                     {/* Media Attachments */}
                     <div className="mt-4 border-t border-[var(--border-light)] pt-4">
                        <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase mb-3">Add Media</p>
                        <div className="flex gap-4">
                           <button className="flex flex-col items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--forest-light)] transition-colors group">
                              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-lg group-hover:scale-110 transition-transform"><i className="fas fa-image"></i></div>
                              <span className="text-[10px] font-bold">Photo</span>
                           </button>
                           <button className="flex flex-col items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--forest-light)] transition-colors group">
                              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-lg group-hover:scale-110 transition-transform"><i className="fas fa-video"></i></div>
                              <span className="text-[10px] font-bold">Video</span>
                           </button>
                           <button className="flex flex-col items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--forest-light)] transition-colors group">
                              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-lg group-hover:scale-110 transition-transform"><i className="fas fa-file-alt"></i></div>
                              <span className="text-[10px] font-bold">File</span>
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* 13. Connections Modal (Placeholder for Following/Followers) */}
         {showConnectionsModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-end justify-center" onClick={() => setShowConnectionsModal(false)}>
               {/* FIXED: Added max-w-[430px] mx-auto */}
               {/* <div className="bg-[var(--bg-primary)] w-full h-[85vh] rounded-t-[32px] p-6 animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]" onClick={e => e.stopPropagation()}> */}
               <div className="bg-[var(--bg-primary)] w-full max-w-[430px] mx-auto h-[85vh] rounded-t-[32px] p-6 animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]" onClick={e => e.stopPropagation()}>
                  <div className="flex justify-between items-center mb-6">
                     <h2 className="text-xl font-bold font-jakarta">Connections</h2>
                     <button onClick={() => setShowConnectionsModal(false)} className="w-10 h-10 rounded-full bg-gray-100/80 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-all active:scale-95"><i className="fas fa-times text-base"></i></button>
                  </div>
                  <div className="text-center text-gray-400 py-10">
                     <i className="fas fa-user-friends text-4xl mb-3"></i>
                     <p className="text-sm">Connection list coming soon...</p>
                  </div>
               </div>
            </div>
         )}

         {/* Phase 2C Task 3.4: Tag Family Modal */}
         {showTagFamilyModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-end justify-center" onClick={() => setShowTagFamilyModal(false)}>
               {/* FIXED: Added max-w-[430px] mx-auto */}
               {/* <div className="bg-white w-full rounded-t-[32px] h-[85vh] flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]" onClick={e => e.stopPropagation()}> */}
               <div className="bg-white w-full max-w-[430px] mx-auto rounded-t-[32px] h-[85vh] flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]" onClick={e => e.stopPropagation()}>
                  <div className="p-6 border-b border-[var(--border-light)] bg-gradient-to-r from-red-50 to-pink-50 rounded-t-[32px]">
                     <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                           <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-white text-xl shadow-lg">
                              <i className="fas fa-heart"></i>
                           </div>
                           <div>
                              <h2 className="text-xl font-bold text-red-900">Tag Family</h2>
                              <p className="text-sm text-red-700">Track your family's sustainability journey</p>
                           </div>
                        </div>
                        <button onClick={() => setShowTagFamilyModal(false)} className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors">
                           <i className="fas fa-times text-red-600"></i>
                        </button>
                     </div>

                     <div className="relative mb-4">
                        <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input
                           type="text"
                           placeholder="Search family members..."
                           className="w-full bg-white pl-10 pr-4 py-3 rounded-xl outline-none text-sm font-medium focus:ring-2 focus:ring-red-500 transition-all border border-gray-200"
                           autoFocus
                        />
                     </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                     <div>
                        <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase mb-3 px-2">Suggested</h3>
                        <div className="space-y-3">
                           {[
                              { name: 'Father - Ahmed', avatar: 'AM', relation: 'Father', wda: 15420 },
                              { name: 'Mother - Fatima', avatar: 'FZ', relation: 'Mother', wda: 12850 },
                              { name: 'Sister - Mariam', avatar: 'MM', relation: 'Sister', wda: 8900 },
                           ].map((member, i) => (
                              <div key={i} className="flex items-center justify-between p-4 bg-[var(--bg-tertiary)] rounded-2xl border border-[var(--border-light)] hover:border-red-200 transition-colors cursor-pointer">
                                 <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center text-white font-bold">{member.avatar}</div>
                                    <div>
                                       <div className="font-bold text-sm text-[var(--text-primary)]">{member.name}</div>
                                       <div className="text-[10px] text-[var(--text-muted)]">{member.relation}</div>
                                    </div>
                                 </div>
                                 <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-bold text-amber-600">{member.wda.toLocaleString()} Wda</span>
                                    <button className="w-10 h-10 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-colors focus:ring-2 focus:ring-red-500 focus:outline-none">
                                       <i className="fas fa-plus"></i>
                                    </button>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>

                     <div>
                        <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase mb-3 px-2">Search Contacts</h3>
                        <button className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                           <i className="fas fa-address-book"></i> Import from Phone Contacts
                        </button>
                     </div>

                     <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl">
                        <div className="flex items-start gap-3">
                           <i className="fas fa-info-circle text-blue-500 text-lg mt-1"></i>
                           <div className="flex-1">
                              <h4 className="font-bold text-sm text-blue-900 mb-1">Family Sustainability Tracking</h4>
                              <p className="text-xs text-blue-700 leading-relaxed">When you tag family members, you can view combined impact, participate in family challenges, and earn bonus Wda for family achievements.</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="p-4 bg-white border-t border-[var(--border-light)]">
                     <button onClick={() => setShowTagFamilyModal(false)} className="w-full py-3 bg-[var(--bg-tertiary)] text-[var(--text-secondary)] text-sm font-bold rounded-xl hover:bg-[var(--border-light)] transition-colors">Done</button>
                  </div>
               </div>
            </div>
         )}

      </div>
   );

};

export default CommunityScreen;
