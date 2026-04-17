
import React, { useState, useEffect } from 'react';
import { ScreenName, Vendor } from '../types';
import { useAccessibility } from '../context/AccessibilityContext';

interface Props {
   onNavigate: (screen: ScreenName) => void;
}

// Extended Types for the Rich Marketplace
type TabMode = 'featured' | 'products' | 'services' | 'events';

interface Product {
   id: string;
   name: string;
   price: number;
   wdaEarn: number;
   category: string;
   image: string;
   description: string;
   rating: number;
}

interface Service {
   id: string;
   name: string;
   provider: string;
   priceRange: string;
   wdaEarn: number;
   type: string;
   description: string;
   icon: string;
   image: string;
   accessibility: string[];
}

interface MarketEvent {
   id: string;
   name: string;
   date: string;
   price: number;
   wdaEarn: number;
   image: string;
   description: string;
   participants: number;
   location: string;
}

const HERO_FALLBACK_IMAGE = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 300'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23065F46'/%3E%3Cstop offset='100%25' stop-color='%2310B981'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='600' height='300' fill='url(%23g)'/%3E%3Ctext x='50%25' y='54%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='30' fill='white'%3EEco Marketplace%3C/text%3E%3C/svg%3E";
const CARD_FALLBACK_IMAGE = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23E2E8F0'/%3E%3Cstop offset='100%25' stop-color='%23CBD5E1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='600' height='400' fill='url(%23g)'/%3E%3Ccircle cx='300' cy='170' r='52' fill='%23065F46' fill-opacity='0.15'/%3E%3Ctext x='50%25' y='62%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='28' fill='%23065F46'%3EEco Item%3C/text%3E%3C/svg%3E";

const MarketplaceScreen: React.FC<Props> = ({ onNavigate }) => {
   const { screenReaderOptimized } = useAccessibility();
   const [activeTab, setActiveTab] = useState<TabMode>('featured');
   const [activeHeroSlide, setActiveHeroSlide] = useState(0);
   const [selectedOffer, setSelectedOffer] = useState<any | null>(null);
   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
   const [selectedService, setSelectedService] = useState<Service | null>(null);
   const [selectedEvent, setSelectedEvent] = useState<MarketEvent | null>(null);
   const [searchQuery, setSearchQuery] = useState('');
   const [partnersExpanded, setPartnersExpanded] = useState(false);
   const [categoryFilter, setCategoryFilter] = useState('All');
   const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);

   // --- DATA ---

   const heroSlides = [
      { id: 1, title: 'Summer Eco-Sale', subtitle: 'Up to 50% off sustainable fashion', bg: 'from-orange-400 to-amber-600', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600' },
      { id: 2, title: 'Zero Waste Kit', subtitle: 'Starter bundle for your home', bg: 'from-emerald-500 to-teal-700', image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=600' },
      { id: 3, title: 'Eat Green', subtitle: 'Organic boxes delivered free', bg: 'from-green-600 to-lime-600', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600' }
   ];

   const flashDeals = [
      { id: 'f1', title: '50% OFF Lunch', partner: 'Salad Jar', category: 'Food', time: '02:45:12', bg: 'from-green-500 to-emerald-700', icon: 'fa-leaf' },
      { id: 'f2', title: 'B1G1 Coffee', partner: 'Arabica', category: 'Food', time: '05:12:30', bg: 'from-amber-700 to-orange-900', icon: 'fa-coffee' },
      { id: 'f3', title: 'Free Audit', partner: 'Energy+', category: 'Retail', time: '12:00:00', bg: 'from-blue-600 to-indigo-800', icon: 'fa-solar-panel' },
   ];

   const collections = [
      { id: 'c1', type: 'Hotel', name: 'Al Maha Resort', subtitle: 'Dubai Desert', discount: '20% OFF', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=300' },
      { id: 'c2', type: 'Fashion', name: 'The Giving Mvmnt', subtitle: 'Recycled Fabrics', discount: 'New Collection', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=300' },
      { id: 'c3', type: 'Hotel', name: 'Zaya Nurai', subtitle: 'Abu Dhabi', discount: '15% OFF', image: 'https://images.unsplash.com/photo-1573047330191-fb342b1be381?auto=format&fit=crop&q=80&w=300' },
   ];

   const vendors: Vendor[] = [
      { id: '1', name: 'The Green Ecostore', category: 'Home', discount: '15% OFF', logo: 'fa-leaf', image: 'linear-gradient(to bottom right, #a8e063, #56ab2f)', isPremium: true },
      { id: '2', name: 'Organic Foods & Café', category: 'Food', discount: '20% OFF', logo: 'fa-carrot', image: 'linear-gradient(to bottom right, #F2994A, #F2C94C)' },
      { id: '3', name: 'Sustainable Wear', category: 'Fashion', discount: '10% OFF', logo: 'fa-tshirt', image: 'linear-gradient(to bottom right, #8E2DE2, #4A00E0)' },
      { id: '4', name: 'Solarify', category: 'Energy', discount: 'Free Audit', logo: 'fa-solar-panel', image: 'linear-gradient(to bottom right, #f12711, #f5af19)' },
      { id: '5', name: 'Lush Cosmetics', category: 'Beauty', discount: 'Free Gift', logo: 'fa-pump-soap', image: 'linear-gradient(to bottom right, #EC4899, #be185d)' },
      { id: '6', name: 'Sprout', category: 'Food', discount: 'Meal Plan Deal', logo: 'fa-seedling', image: 'linear-gradient(to bottom right, #10B981, #047857)' }
   ];

   // --- NEW RICH DATA (Merged from Phase 4) ---

   const categories = ['All', 'Home', 'Travel', 'Fashion', 'Tech'];

   const products: Product[] = [
      { id: 'p1', name: 'Reusable Water Bottle', price: 59, wdaEarn: 50, category: 'Home', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=300', description: 'Premium stainless steel water bottle, keeps drinks cold for 24hrs. BPA-free and 100% recyclable.', rating: 4.8 },
      { id: 'p2', name: 'Bamboo Cutlery Set', price: 35, wdaEarn: 30, category: 'Home', image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=300', description: 'Portable bamboo fork, spoon, chopsticks, and straw with cleaning brush. Perfect for lunch at work.', rating: 4.6 },
      { id: 'p3', name: 'Solar Phone Charger', price: 149, wdaEarn: 150, category: 'Tech', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=300', description: 'High-efficiency solar panel with 20000mAh battery. Charge your phone anywhere under the sun.', rating: 4.9 },
      { id: 'p4', name: 'Organic Cotton Tote', price: 25, wdaEarn: 25, category: 'Fashion', image: 'https://images.unsplash.com/photo-1597633425046-08f5110420b5?auto=format&fit=crop&q=80&w=300', description: 'Durable organic cotton tote bag. Replace 500 plastic bags over its lifetime.', rating: 4.5 },
      { id: 'p5', name: 'Beeswax Wraps Set', price: 45, wdaEarn: 40, category: 'Home', image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&q=80&w=300', description: 'Set of 3 sizes. Natural alternative to plastic wrap. Washable and reusable for up to 1 year.', rating: 4.7 },
      { id: 'p6', name: 'Eco Yoga Mat', price: 89, wdaEarn: 80, category: 'Fashion', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=300', description: 'Natural rubber yoga mat with excellent grip. Made from sustainable materials.', rating: 4.8 },
      { id: 'p7', name: 'Reef-Safe Sunscreen', price: 42, wdaEarn: 35, category: 'Travel', image: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&q=80&w=300', description: 'Mineral sunscreen that protects both your skin and coral reefs. Water-resistant.', rating: 4.6 },
      { id: 'p8', name: 'Bamboo Toothbrush Set', price: 28, wdaEarn: 25, category: 'Home', image: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&q=80&w=300', description: 'Pack of 4 bamboo toothbrushes with charcoal bristles. Biodegradable handle.', rating: 4.4 },
   ];

   const services: Service[] = [
      { id: 's1', name: 'Solar Panel Installation', provider: 'DEWA Certified', priceRange: 'AED 5,000 - 20,000', wdaEarn: 500, type: 'Energy', description: 'Professional solar panel installation for homes and businesses. Save up to 80% on electricity bills.', icon: 'fa-solar-panel', image: 'linear-gradient(to bottom right, #f59e0b, #d97706)', accessibility: ['Wheelchair Access', 'Sign Language Available'] },
      { id: 's2', name: 'E-waste Recycling Pickup', provider: 'Green UAE', priceRange: 'Free', wdaEarn: 100, type: 'Recycling', description: 'Free doorstep pickup for electronic waste. Proper recycling to prevent environmental harm.', icon: 'fa-recycle', image: 'linear-gradient(to bottom right, #10b981, #059669)', accessibility: ['Home Pickup', 'Accessible Vehicle'] },
      { id: 's3', name: 'Organic Cleaning Service', provider: 'EcoClean Pro', priceRange: 'AED 150 - 400', wdaEarn: 200, type: 'Cleaning', description: 'Non-toxic, eco-friendly cleaning service using plant-based products safe for family and pets.', icon: 'fa-sparkles', image: 'linear-gradient(to bottom right, #8b5cf6, #7c3aed)', accessibility: ['Wheelchair Access'] },
      { id: 's4', name: 'EV Charging Installation', provider: 'Volt UAE', priceRange: 'AED 2,000 - 5,000', wdaEarn: 400, type: 'Energy', description: 'Home EV charging station installation. Compatible with all electric vehicles.', icon: 'fa-car-battery', image: 'linear-gradient(to bottom right, #3b82f6, #2563eb)', accessibility: ['Wheelchair Access', 'Ground Floor Preferred'] },
      { id: 's5', name: 'Composting Setup Service', provider: 'Urban Farm', priceRange: 'AED 300 - 600', wdaEarn: 250, type: 'Garden', description: 'Start composting at home. We set up the system and teach you how to turn waste into fertilizer.', icon: 'fa-leaf', image: 'linear-gradient(to bottom right, #22c55e, #16a34a)', accessibility: ['Garden Access Required'] },
      { id: 's6', name: 'Water Conservation Audit', provider: 'AquaSave', priceRange: 'AED 200 - 500', wdaEarn: 150, type: 'Water', description: 'Professional audit to identify water waste and provide solutions to reduce consumption.', icon: 'fa-tint', image: 'linear-gradient(to bottom right, #06b6d4, #0891b2)', accessibility: ['Full Home Access'] },
   ];

   const events: MarketEvent[] = [
      { id: 'e1', name: 'Beach Cleanup Jumeirah', date: 'Jan 25, 2026', price: 0, wdaEarn: 300, image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600', description: 'Join us for a morning of beach cleaning. All equipment provided. Protect our coastlines!', participants: 45, location: 'Jumeirah Beach' },
      { id: 'e2', name: 'Ghaf Tree Planting', date: 'Feb 5, 2026', price: 50, wdaEarn: 500, image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600', description: 'Plant the UAE national tree! Contribute to the ghaf forest initiative and learn about native ecosystems.', participants: 120, location: 'Al Qudra' },
      { id: 'e3', name: 'Zero Waste Workshop', date: 'Feb 12, 2026', price: 100, wdaEarn: 200, image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=600', description: 'Learn practical tips to reduce waste in your daily life. Includes DIY cleaning products session.', participants: 30, location: 'Dubai Sustainable City' },
      { id: 'e4', name: 'Desert Conservation Tour', date: 'Feb 20, 2026', price: 250, wdaEarn: 400, image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=600', description: 'Explore the desert ecosystem with expert guides. Learn about native wildlife and conservation efforts.', participants: 25, location: 'Dubai Desert Conservation Reserve' },
      { id: 'e5', name: 'Urban Farming Class', date: 'Feb 28, 2026', price: 75, wdaEarn: 150, image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=600', description: 'Grow your own food! Learn balcony gardening, composting, and sustainable farming techniques.', participants: 40, location: 'Urban Farm Hub, Al Quoz' },
      { id: 'e6', name: 'Coral Reef Education', date: 'Mar 5, 2026', price: 150, wdaEarn: 350, image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&q=80&w=600', description: 'Interactive session about marine ecosystems and coral reef conservation. Snorkeling optional.', participants: 20, location: 'Fujairah Coast' },
   ];

   // Auto-scroll logic
   useEffect(() => {
      const heroInterval = setInterval(() => setActiveHeroSlide(p => (p + 1) % heroSlides.length), 5000);
      return () => clearInterval(heroInterval);
   }, []);

   useEffect(() => {
      return () => {
         if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
         }
      };
   }, []);

   useEffect(() => {
      if (!screenReaderOptimized && typeof window !== 'undefined' && 'speechSynthesis' in window) {
         window.speechSynthesis.cancel();
         setActiveSpeechId(null);
      }
   }, [screenReaderOptimized]);

   const handleImageFallback = (e: React.SyntheticEvent<HTMLImageElement>, fallbackImage = CARD_FALLBACK_IMAGE) => {
      const img = e.currentTarget;
      img.onerror = null;
      img.src = fallbackImage;
   };

   const stopSpeech = () => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      setActiveSpeechId(null);
   };

   const handleSpeak = (id: string, text: string) => {
      if (!screenReaderOptimized) return;
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

      if (activeSpeechId === id && window.speechSynthesis.speaking) {
         stopSpeech();
         return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.onend = () => setActiveSpeechId((current) => (current === id ? null : current));
      utterance.onerror = () => setActiveSpeechId((current) => (current === id ? null : current));
      setActiveSpeechId(id);
      window.speechSynthesis.speak(utterance);
   };

   const visibleVendors = partnersExpanded ? vendors : vendors.slice(0, 3);
   const filteredProducts = products.filter((product) =>
      (categoryFilter === 'All' || product.category === categoryFilter) &&
      (product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.category.toLowerCase().includes(searchQuery.toLowerCase()))
   );
   const filteredServices = services.filter((service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.type.toLowerCase().includes(searchQuery.toLowerCase())
   );
   const filteredEvents = events.filter((event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
   );

   return (
      <div className="bg-[var(--bg-primary)] min-h-full pb-32">

         {/* 1. STICKY GLASS HEADER */}
         <div className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl pt-12 pb-2 px-5 border-b border-[var(--border-light)]/50 shadow-sm transition-all">
            <div className="flex justify-between items-center mb-4">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--forest-deep)] to-[var(--teal)] flex items-center justify-center text-white shadow-lg shadow-green-900/20">
                     <i className="fas fa-shopping-bag"></i>
                  </div>
                  <div>
                     <div className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">Eco Market Place</div>
                     <div className="text-xl font-extrabold text-[var(--text-primary)] font-jakarta leading-none">Explore <span className="text-xs text-[var(--forest-light)]">Everything</span></div>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 bg-[var(--bg-tertiary)] rounded-xl flex items-center gap-2 border border-[var(--border-light)]">
                     <i className="fas fa-wallet text-[var(--forest-light)] text-xs"></i>
                     <span className="text-xs font-bold text-[var(--text-primary)]">2,850</span>
                  </div>
                  <button
                     onClick={() => onNavigate(ScreenName.WALLET)}
                     className="w-10 h-10 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-primary)] flex items-center justify-center hover:bg-[var(--forest-light)] hover:text-white transition-all shadow-sm"
                  >
                     <i className="fas fa-wallet"></i>
                  </button>
               </div>
            </div>

            <div className="relative">
               <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
               <input
                  type="text"
                  placeholder="Search eco products, services, events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/80 h-11 rounded-2xl pl-12 pr-12 text-sm font-medium border border-[var(--border-light)] focus:border-[var(--forest-light)] focus:ring-2 focus:ring-green-100 outline-none shadow-sm transition-all"
               />
               <button
                  type="button"
                  className={`absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-colors ${
                     screenReaderOptimized
                        ? 'bg-[var(--bg-tertiary)] text-gray-500 hover:text-emerald-600 hover:bg-emerald-50'
                        : 'bg-[var(--bg-tertiary)] text-gray-300 cursor-not-allowed'
                  }`}
                  onClick={() => activeSpeechId ? stopSpeech() : undefined}
                  disabled={!screenReaderOptimized}
                  title={screenReaderOptimized ? 'Tap any speaker icon to read details' : 'Enable Screen Reader Support in POD Settings'}
                  aria-label="Screen reader help"
               >
                  <i className={`fas ${activeSpeechId ? 'fa-stop' : 'fa-volume-up'}`}></i>
               </button>
            </div>

            {/* TABS NAVIGATION */}
            <div className="flex gap-1 mt-4 p-1 bg-[var(--bg-tertiary)] rounded-xl overflow-x-auto no-scrollbar">
               {(['featured', 'products', 'services', 'events'] as const).map(tab => (
                  <button
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={`flex-1 min-w-[80px] py-2 px-3 rounded-lg text-[10px] font-black uppercase tracking-wide transition-all ${activeTab === tab
                           ? 'bg-white text-[var(--text-primary)] shadow-sm'
                           : 'text-[var(--text-secondary)] hover:bg-white/50'
                        }`}
                  >
                     {tab}
                  </button>
               ))}
            </div>
         </div>

         <div className="p-5 space-y-8 animate-[fadeIn_0.3s_ease-out]">

            {/* 2. HERO CAROUSEL (Always Visible or conditional? User liked it. Let's keep it for 'Featured' and maybe smaller for others, or just always there) 
            For less clutter, let's keep it ONLY on Featured tab, or show different hero for different tabs? 
            User said "hero section ... and below it there were certain other offers". 
            Let's keep the Main Hero on Featured, and maybe specific banners on others? 
            For MVP simplicity and impact, let's keep it on Featured for the WOW factor.
        */}

            {activeTab === 'featured' && (
               <>
                  <div className="relative w-full h-48 rounded-[32px] overflow-hidden shadow-lg group">
                     {heroSlides.map((slide, index) => (
                        <div
                           key={slide.id}
                           className={`absolute inset-0 transition-opacity duration-1000 ${index === activeHeroSlide ? 'opacity-100' : 'opacity-0'}`}
                        >
                           <img
                              src={slide.image}
                              alt={slide.title}
                              loading="lazy"
                             
                              onError={(e) => handleImageFallback(e, HERO_FALLBACK_IMAGE)}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10000ms] ease-linear scale-100 group-hover:scale-110"
                           />
                           <div className={`absolute inset-0 bg-gradient-to-r ${slide.bg} opacity-80 mix-blend-multiply`}></div>
                           <div className="absolute inset-0 bg-black/10"></div>

                           <div className="absolute bottom-0 left-0 p-6 w-full z-10">
                              <div className="inline-block px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-bold text-white uppercase mb-2 border border-white/20">Featured</div>
                              <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-md">{slide.title}</h2>
                              <p className="text-white/90 text-sm mb-3">{slide.subtitle}</p>
                              <button className="px-5 py-2 bg-white text-[var(--text-primary)] rounded-xl text-xs font-bold hover:bg-gray-100 transition-colors shadow-lg">Shop Now</button>
                           </div>
                        </div>
                     ))}
                     <div className="absolute bottom-4 right-4 flex gap-1.5 z-20">
                        {heroSlides.map((_, i) => (
                           <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeHeroSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}></div>
                        ))}
                     </div>
                  </div>

                  {/* FLASH DEALS */}
                  <div className="bg-[var(--bg-tertiary)]/50 rounded-[32px] p-5 border border-[var(--border-light)]">
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg text-[var(--text-primary)] flex items-center gap-2">
                           <i className="fas fa-bolt text-amber-500 animate-pulse"></i> Flash Deals
                        </h3>
                     </div>
                     <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 snap-x">
                        {flashDeals.map((deal) => (
                           <div key={deal.id} onClick={() => setSelectedOffer({ ...deal, type: 'flash' })} className="snap-start min-w-[200px] bg-white rounded-2xl p-3 border border-[var(--border-light)] shadow-sm relative overflow-hidden cursor-pointer active:scale-95 transition-transform">
                              <div className="flex items-center gap-3">
                                 <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${deal.bg} flex items-center justify-center text-white text-lg shrink-0`}>
                                    <i className={`fas ${deal.icon}`}></i>
                                 </div>
                                 <div className="flex-1 min-w-0">
                                    <div className="text-[9px] font-bold text-[var(--text-muted)] uppercase truncate">{deal.partner}</div>
                                    <div className="text-sm font-bold text-[var(--text-primary)] leading-tight truncate">{deal.title}</div>
                                    <div className="text-[10px] font-mono text-red-500 mt-1 flex items-center gap-1">
                                       <i className="far fa-clock"></i> {deal.time}
                                    </div>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* COLLECTIONS */}
                  <div>
                     <h3 className="font-bold text-lg text-[var(--text-primary)] mb-4">Eco-Collections</h3>
                     <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-5 px-5 snap-x">
                        {collections.map((item) => (
                           <div key={item.id} onClick={() => setSelectedOffer({ ...item, category: item.type })} className="snap-center min-w-[220px] bg-white rounded-[24px] overflow-hidden shadow-sm border border-[var(--border-light)] group cursor-pointer hover:shadow-md transition-all">
                              <div className="h-32 relative">
                                 <img
                                    src={item.image}
                                    alt={item.name}
                                    loading="lazy"
                                   
                                    onError={(e) => handleImageFallback(e)}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                 />
                                 <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold text-white shadow-sm">{item.type}</div>
                                 <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold text-[var(--forest-deep)] shadow-sm">{item.discount}</div>
                              </div>
                              <div className="p-3">
                                 <h4 className="font-bold text-sm text-[var(--text-primary)]">{item.name}</h4>
                                 <div className="text-[10px] text-[var(--text-secondary)] mt-1">{item.subtitle}</div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* ALL PARTNERS PREVIEW */}
                  <div className="bg-white rounded-[32px] p-5 shadow-sm border border-[var(--border-light)]">
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg text-[var(--text-primary)]">Top Partners</h3>
                        <button onClick={() => setPartnersExpanded(!partnersExpanded)} className="text-xs font-bold text-[var(--forest-light)]">
                           {partnersExpanded ? 'Show Less' : 'View All'}
                        </button>
                     </div>
                     <div className="space-y-4">
                        {visibleVendors.map(vendor => (
                           <div key={vendor.id} onClick={() => setSelectedOffer(vendor)} className="flex items-center gap-4 group cursor-pointer border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl shadow-sm shrink-0" style={{ background: vendor.image }}>
                                 <i className={`fas ${vendor.logo}`}></i>
                              </div>
                              <div className="flex-1 min-w-0">
                                 <h4 className="font-bold text-[var(--text-primary)] text-sm">{vendor.name}</h4>
                                 <div className="text-[10px] font-bold text-[var(--forest-deep)]">{vendor.discount}</div>
                              </div>
                              <i className="fas fa-chevron-right text-gray-300 group-hover:text-[var(--forest-light)] transition-colors"></i>
                           </div>
                        ))}
                     </div>
                  </div>
               </>
            )}

            {activeTab === 'products' && (
               <div className="animate-[fadeIn_0.3s_ease-out]">
                  <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 -mx-2 px-2">
                     {categories.map((cat) => (
                        <button
                           key={cat}
                           onClick={() => setCategoryFilter(cat)}
                           className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${categoryFilter === cat ? 'bg-[var(--text-primary)] text-white border-[var(--text-primary)]' : 'bg-white text-[var(--text-secondary)] border-[var(--border-light)]'
                              }`}
                        >
                           {cat}
                        </button>
                     ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     {filteredProducts.map((product) => (
                        <div key={product.id} onClick={() => setSelectedProduct(product)} className="bg-white rounded-[24px] overflow-hidden border border-[var(--border-light)] shadow-sm hover:shadow-md transition-all cursor-pointer group">
                           <div className="relative h-40 bg-gray-100">
                              <img
                                 src={product.image}
                                 alt={product.name}
                                 loading="lazy"
                                
                                 onError={(e) => handleImageFallback(e)}
                                 className="w-full h-full object-cover"
                              />
                              <div className="absolute top-2 right-2 bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm">
                                 <i className="fas fa-coins text-[8px]"></i>
                                 +{product.wdaEarn} Wda
                              </div>
                              <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-[9px] font-bold text-[var(--text-primary)]">
                                 {product.category}
                              </div>
                              <button
                                 type="button"
                                 className={`absolute bottom-2 right-2 w-7 h-7 rounded-full backdrop-blur-sm flex items-center justify-center text-[10px] shadow-sm transition-colors ${
                                    screenReaderOptimized
                                       ? 'bg-white/90 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50'
                                       : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                 }`}
                                 aria-label={`Read out ${product.name}`}
                                 title={screenReaderOptimized ? `Read ${product.name} details` : 'Enable Screen Reader Support in POD Settings'}
                                 disabled={!screenReaderOptimized}
                                 onClick={(e) => {
                                    e.stopPropagation();
                                    handleSpeak(`product-${product.id}`, `${product.name}. ${product.description}. Price AED ${product.price}. Reward ${product.wdaEarn} Wda.`);
                                 }}
                              >
                                 <i className={`fas ${activeSpeechId === `product-${product.id}` ? 'fa-stop' : 'fa-volume-up'}`}></i>
                              </button>
                           </div>
                           <div className="p-3">
                              <h4 className="font-bold text-sm text-[var(--text-primary)] mb-1 line-clamp-1">{product.name}</h4>
                              <div className="flex items-center justify-between mb-2">
                                 <div className="flex items-center gap-1">
                                    <i className="fas fa-star text-amber-400 text-[10px]"></i>
                                    <span className="text-[10px] text-[var(--text-muted)]">{product.rating}</span>
                                 </div>
                                 <span className="text-xs font-bold text-[var(--text-primary)]">AED {product.price}</span>
                              </div>
                              <div className="flex items-center gap-1 mb-2">
                                 <span className="text-[8px] px-1.5 py-0.5 bg-green-50 text-green-600 rounded font-bold">ECO</span>
                                 <span className="text-[8px] font-bold text-[var(--forest-deep)]">Rating: {product.rating >= 4.8 ? 'A+' : product.rating >= 4.5 ? 'A' : 'B'}</span>
                              </div>
                              <div className="w-full h-1 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                                 <div className="h-full bg-emerald-500" style={{ width: '100%' }}></div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            )}

            {activeTab === 'services' && (
               <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
                  {filteredServices.map(service => (
                     <div key={service.id} onClick={() => setSelectedService(service)} className="bg-white rounded-[24px] p-4 border border-[var(--border-light)] shadow-sm hover:shadow-md transition-all cursor-pointer relative">
                        <button
                           type="button"
                           className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-[9px] transition-colors z-10 ${
                              screenReaderOptimized
                                 ? 'bg-[var(--bg-tertiary)] text-gray-500 hover:text-emerald-600 hover:bg-emerald-50'
                                 : 'bg-[var(--bg-tertiary)] text-gray-300 cursor-not-allowed'
                           }`}
                           aria-label={`Read out ${service.name}`}
                           title={screenReaderOptimized ? `Read ${service.name} details` : 'Enable Screen Reader Support in POD Settings'}
                           disabled={!screenReaderOptimized}
                           onClick={(e) => {
                              e.stopPropagation();
                              handleSpeak(`service-${service.id}`, `${service.name}. ${service.description}. Provider ${service.provider}. Price ${service.priceRange}. Reward ${service.wdaEarn} Wda.`);
                           }}
                        >
                           <i className={`fas ${activeSpeechId === `service-${service.id}` ? 'fa-stop' : 'fa-volume-up'}`}></i>
                        </button>
                        <div className="flex items-start gap-4">
                           <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-sm" style={{ background: service.image }}>
                              <i className={`fas ${service.icon} text-white`}></i>
                           </div>
                           <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-1">
                                 <div>
                                    <div className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wide">{service.provider}</div>
                                    <h4 className="font-bold text-[var(--text-primary)]">{service.name}</h4>
                                 </div>
                                 <div className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shrink-0 ml-2">
                                    <i className="fas fa-coins text-[8px]"></i> +{service.wdaEarn}
                                 </div>
                              </div>
                              <p className="text-xs text-[var(--text-secondary)] mb-2 line-clamp-2">{service.description}</p>
                              <div className="flex items-center justify-between">
                                 <span className="text-xs font-bold text-[var(--forest-deep)]">{service.priceRange}</span>
                                 <div className="flex items-center gap-2">
                                    {service.accessibility.slice(0, 2).map((acc: string, i: number) => (
                                       <span key={i} className="text-[8px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">
                                          {acc}
                                       </span>
                                    ))}
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            )}

            {activeTab === 'events' && (
               <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
                  {filteredEvents.map(event => (
                     <div key={event.id} onClick={() => setSelectedEvent(event)} className="bg-white rounded-[24px] overflow-hidden border border-[var(--border-light)] shadow-sm hover:shadow-md transition-all cursor-pointer">
                        <div className="h-44 relative">
                           <img
                              src={event.image}
                              alt={event.name}
                              loading="lazy"
                             
                              onError={(e) => handleImageFallback(e)}
                              className="w-full h-full object-cover"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                           <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-[var(--text-primary)] flex items-center gap-2">
                              <i className="fas fa-calendar text-[var(--forest-light)]"></i>
                              {event.date}
                           </div>
                           <button
                              type="button"
                              className={`absolute top-3 right-14 w-7 h-7 rounded-full backdrop-blur-sm flex items-center justify-center text-[10px] shadow-sm z-20 transition-colors ${
                                 screenReaderOptimized
                                    ? 'bg-white/90 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50'
                                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                              }`}
                              aria-label={`Read out ${event.name}`}
                              title={screenReaderOptimized ? `Read ${event.name} details` : 'Enable Screen Reader Support in POD Settings'}
                              disabled={!screenReaderOptimized}
                              onClick={(e) => {
                                 e.stopPropagation();
                                 handleSpeak(`event-${event.id}`, `${event.name}. ${event.description}. Date ${event.date}. Location ${event.location}. ${event.participants} participants. Reward ${event.wdaEarn} Wda.`);
                              }}
                           >
                              <i className={`fas ${activeSpeechId === `event-${event.id}` ? 'fa-stop' : 'fa-volume-up'}`}></i>
                           </button>
                           <div className="absolute top-3 right-3 bg-amber-100 backdrop-blur-sm px-2 py-1 rounded-full text-[10px] font-bold text-amber-700 flex items-center gap-1 shadow-sm">
                              <i className="fas fa-coins text-[8px]"></i>
                              +{event.wdaEarn} Wda
                           </div>
                           <div className="absolute bottom-3 left-3 text-white">
                              <h4 className="font-bold text-lg leading-tight">{event.name}</h4>
                              <div className="flex items-center gap-3 text-white/80 text-[10px] mt-1">
                                 <span><i className="fas fa-map-marker-alt mr-1"></i>{event.location}</span>
                                 <span><i className="fas fa-users mr-1"></i>{event.participants} going</span>
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                 <span className="text-[8px] px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full flex items-center gap-1">
                                    <i className="fas fa-universal-access"></i>
                                    {event.location.includes('Beach') ? 'Beach Access' : event.location.includes('Desert') ? 'Off-road' : 'Indoor'}
                                 </span>
                              </div>
                           </div>
                        </div>
                        <div className="p-4 flex items-center justify-between">
                           <div className="flex items-center gap-2">
                              {event.price === 0 ? (
                                 <span className="text-lg font-bold text-emerald-600">FREE</span>
                              ) : (
                                 <>
                                    <span className="text-[10px] text-[var(--text-muted)] line-through">AED {event.price + 50}</span>
                                    <span className="text-lg font-bold text-[var(--text-primary)]">AED {event.price}</span>
                                 </>
                              )}
                           </div>
                           <button className="px-4 py-2 bg-[var(--forest-light)] text-white rounded-xl text-xs font-bold hover:bg-[var(--forest-deep)] transition-colors">
                              Register
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            )}

         </div>

         {/* PRODUCT DETAIL MODAL */}
         {selectedProduct && (
            <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}>
               <div className="bg-[var(--bg-primary)] w-full rounded-t-[32px] overflow-hidden flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] max-h-[90vh]" onClick={e => e.stopPropagation()}>
                  <div className="h-64 relative flex items-center justify-center overflow-hidden">
                     <img
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        loading="lazy"
                        onError={(e) => handleImageFallback(e)}
                        className="absolute inset-0 w-full h-full object-cover"
                     />
                     <div className="absolute inset-0 bg-black/30"></div>
                     <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 text-white flex items-center justify-center hover:bg-black/30 backdrop-blur-md z-20">
                        <i className="fas fa-times"></i>
                     </button>
                     <div className="absolute bottom-4 left-4 right-4">
                        <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-bold text-white border border-white/20 mb-2">
                           {selectedProduct.category}
                        </div>
                        <h2 className="text-2xl font-bold text-white">{selectedProduct.name}</h2>
                     </div>
                  </div>

                  <div className="p-6 bg-[var(--bg-primary)] -mt-6 rounded-t-[32px] relative z-10 flex-1 overflow-y-auto">
                     <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1">
                           {[1, 2, 3, 4, 5].map(star => (
                              <i key={star} className={`fas fa-star ${star <= Math.floor(selectedProduct.rating) ? 'text-amber-400' : 'text-gray-200'} text-sm`}></i>
                           ))}
                        </div>
                        <span className="text-sm text-[var(--text-secondary)]">{selectedProduct.rating}</span>
                     </div>

                     <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">{selectedProduct.description}</p>

                     <div className="bg-emerald-50 rounded-2xl p-4 mb-6">
                        <div className="flex items-center justify-between mb-2">
                           <span className="text-sm font-bold text-[var(--text-primary)]">Price</span>
                           <span className="text-2xl font-bold text-[var(--text-primary)]">AED {selectedProduct.price}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-emerald-100">
                           <span className="text-sm text-[var(--text-secondary)]">Earn with purchase</span>
                           <span className="font-bold text-emerald-600">+{selectedProduct.wdaEarn} Wda</span>
                        </div>
                     </div>

                     <div className="space-y-3">
                        <button className="w-full py-4 bg-[var(--text-primary)] text-white rounded-2xl font-bold shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2">
                           <i className="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                        <button className="w-full py-4 bg-[var(--forest-light)] text-white rounded-2xl font-bold shadow-lg hover:bg-[var(--forest-deep)] transition-all flex items-center justify-center gap-2">
                           <i className="fas fa-bolt"></i> Buy Now (Pay with Wda: {selectedProduct.wdaEarn})
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* SERVICE DETAIL MODAL */}
         {selectedService && (
            <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={() => setSelectedService(null)}>
               <div className="bg-[var(--bg-primary)] w-full rounded-t-[32px] overflow-hidden flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] max-h-[90vh]" onClick={e => e.stopPropagation()}>
                  <div className="h-56 relative flex items-center justify-center overflow-hidden">
                     <div className="absolute inset-0" style={{ background: selectedService.image }}></div>
                     <div className="absolute inset-0 bg-black/30"></div>
                     <button onClick={() => setSelectedService(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 text-white flex items-center justify-center hover:bg-black/30 backdrop-blur-md z-20">
                        <i className="fas fa-times"></i>
                     </button>
                     <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-5xl text-white shadow-2xl relative z-10">
                        <i className={`fas ${selectedService.icon}`}></i>
                     </div>
                  </div>

                  <div className="p-6 bg-[var(--bg-primary)] -mt-12 rounded-t-[32px] relative z-10 flex-1 overflow-y-auto">
                     <div className="text-center mb-6">
                        <div className="inline-block px-3 py-1 bg-[var(--forest-light)] text-white text-[10px] font-bold uppercase rounded-md mb-2">
                           {selectedService.type}
                        </div>
                        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">{selectedService.name}</h2>
                        <p className="text-[var(--text-secondary)]">{selectedService.provider}</p>
                     </div>

                     <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">{selectedService.description}</p>

                     <div className="bg-[var(--bg-tertiary)] rounded-2xl p-4 mb-6">
                        <div className="flex items-center justify-between mb-3">
                           <span className="text-sm font-bold text-[var(--text-secondary)]">Price Range</span>
                           <span className="font-bold text-[var(--text-primary)]">{selectedService.priceRange}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-[var(--border-light)]">
                           <span className="text-sm text-[var(--text-secondary)]">Wda Bonus</span>
                           <span className="font-bold text-emerald-600">+{selectedService.wdaEarn} Wda</span>
                        </div>
                     </div>

                     <div className="mb-6">
                        <h4 className="font-bold text-[var(--text-primary)] mb-3">Accessibility</h4>
                        <div className="flex flex-wrap gap-2">
                           {selectedService.accessibility.map((acc, i) => (
                              <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold flex items-center gap-2">
                                 <i className="fas fa-universal-access text-[10px]"></i>
                                 {acc}
                              </span>
                           ))}
                        </div>
                     </div>

                     <div className="space-y-3">
                        <button className="w-full py-4 bg-[var(--forest-light)] text-white rounded-2xl font-bold shadow-lg hover:bg-[var(--forest-deep)] transition-all flex items-center justify-center gap-2">
                           <i className="fas fa-calendar-check"></i> Request Quote
                        </button>
                        <button className="w-full py-4 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-2xl font-bold hover:bg-[var(--border-light)] transition-all flex items-center justify-center gap-2">
                           <i className="fas fa-phone"></i> Contact Provider
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* EVENT DETAIL MODAL */}
         {selectedEvent && (
            <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={() => setSelectedEvent(null)}>
               <div className="bg-[var(--bg-primary)] w-full rounded-t-[32px] overflow-hidden flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] max-h-[90vh]" onClick={e => e.stopPropagation()}>
                  <div className="h-64 relative flex items-center justify-center overflow-hidden">
                     <img
                        src={selectedEvent.image}
                        alt={selectedEvent.name}
                        loading="lazy"
                        onError={(e) => handleImageFallback(e)}
                        className="absolute inset-0 w-full h-full object-cover"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                     <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 text-white flex items-center justify-center hover:bg-black/30 backdrop-blur-md z-20">
                        <i className="fas fa-times"></i>
                     </button>
                     <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center gap-2 mb-2">
                           <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-bold flex items-center gap-1">
                              <i className="fas fa-coins text-[8px]"></i>
                              +{selectedEvent.wdaEarn} Wda
                           </span>
                           <span className="px-2 py-1 bg-white/20 backdrop-blur-md text-white rounded-full text-[10px] font-bold">
                              <i className="fas fa-users mr-1"></i>
                              {selectedEvent.participants} spots taken
                           </span>
                        </div>
                        <h2 className="text-2xl font-bold text-white">{selectedEvent.name}</h2>
                     </div>
                  </div>

                  <div className="p-6 bg-[var(--bg-primary)] -mt-4 rounded-t-[32px] relative z-10 flex-1 overflow-y-auto">
                     <div className="flex items-center gap-4 mb-4 p-4 bg-[var(--bg-tertiary)] rounded-2xl">
                        <div className="flex-1">
                           <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wide">Date & Time</div>
                           <div className="font-bold text-[var(--text-primary)]">{selectedEvent.date}</div>
                        </div>
                        <div className="flex-1">
                           <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wide">Location</div>
                           <div className="font-bold text-[var(--text-primary)]">{selectedEvent.location}</div>
                        </div>
                     </div>

                     <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">{selectedEvent.description}</p>

                     <div className="bg-emerald-50 rounded-2xl p-4 mb-6">
                        <div className="flex items-center justify-between mb-2">
                           <span className="text-sm font-bold text-[var(--text-primary)]">Registration</span>
                           <span className="text-2xl font-bold text-emerald-600">
                              {selectedEvent.price === 0 ? 'FREE' : `AED ${selectedEvent.price}`}
                           </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-emerald-100">
                           <span className="text-sm text-[var(--text-secondary)]">Wda Reward</span>
                           <span className="font-bold text-emerald-600">+{selectedEvent.wdaEarn} Wda</span>
                        </div>
                     </div>

                     <button className="w-full py-4 bg-[var(--text-primary)] text-white rounded-2xl font-bold shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2">
                        <i className="fas fa-ticket-alt"></i> Register Now
                     </button>
                     <p className="text-center text-[10px] text-[var(--text-muted)] mt-3">
                        Registration links to Community events for social features
                     </p>
                  </div>
               </div>
            </div>
         )}

         {/* UNIVERSAL REDEMPTION MODAL */}
         {selectedOffer && (
            <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={() => setSelectedOffer(null)}>
               <div className="bg-[var(--bg-primary)] w-full rounded-t-[32px] overflow-hidden flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] max-h-[90vh]" onClick={e => e.stopPropagation()}>

                  {/* Modal Header Image */}
                  <div className="h-56 relative flex items-center justify-center overflow-hidden">
                     {selectedOffer.image && selectedOffer.image.startsWith('http') ? (
                        <img
                           src={selectedOffer.image}
                           loading="lazy"
                          
                           onError={(e) => handleImageFallback(e)}
                           className="absolute inset-0 w-full h-full object-cover"
                        />
                     ) : (
                        <div className="absolute inset-0" style={{ background: selectedOffer.image || 'var(--forest-deep)' }}></div>
                     )}
                     <div className="absolute inset-0 bg-black/30"></div>

                     <button onClick={() => setSelectedOffer(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 text-white flex items-center justify-center hover:bg-black/30 backdrop-blur-md z-20">
                        <i className="fas fa-times"></i>
                     </button>

                     {(selectedOffer.logo || selectedOffer.icon) && (
                        <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-5xl text-white shadow-2xl relative z-10">
                           <i className={`fas ${selectedOffer.logo || selectedOffer.icon}`}></i>
                        </div>
                     )}
                  </div>

                  <div className="p-6 bg-[var(--bg-primary)] -mt-6 rounded-t-[32px] relative z-10 flex-1 overflow-y-auto">
                     <div className="text-center mb-6">
                        <div className="inline-block px-2 py-0.5 bg-[var(--forest-light)] text-white text-[10px] font-bold uppercase rounded-md mb-2">
                           {selectedOffer.category || selectedOffer.type || 'Offer'}
                        </div>
                        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">{selectedOffer.name || selectedOffer.title || selectedOffer.partner}</h2>
                        <p className="text-[var(--text-secondary)]">
                           {selectedOffer.description || selectedOffer.desc || 'Exclusive Benefit'}
                        </p>
                     </div>

                     {/* Pricing / Reward Block */}
                     <div className="bg-white border-2 border-[var(--border-light)] rounded-2xl p-4 flex items-center justify-between mb-6 shadow-sm">
                        <div>
                           <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase">Cost</div>
                           <div className="text-lg font-bold text-[var(--text-primary)]">{selectedOffer.price || selectedOffer.priceRange || selectedOffer.discount || 'Free'}</div>
                        </div>
                        <div className="text-right">
                           <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase">You Earn</div>
                           <div className="text-lg font-bold text-emerald-600">+{selectedOffer.wdaEarn || 0} Wda</div>
                        </div>
                     </div>

                     <button className="w-full py-4 bg-gradient-to-r from-[var(--forest-light)] to-[var(--forest-deep)] text-white rounded-2xl font-bold shadow-lg shadow-green-500/30 active:scale-[0.98] transition-transform flex items-center justify-center gap-3 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <i className="fas fa-check-circle"></i> {selectedOffer.type === 'product' ? 'Add to Cart' : selectedOffer.type === 'service' ? 'Request Service' : selectedOffer.type === 'event' ? 'Register Now' : 'Redeem Offer'}
                     </button>
                  </div>
               </div>
            </div>
         )}

      </div>
   );
};

export default MarketplaceScreen;
