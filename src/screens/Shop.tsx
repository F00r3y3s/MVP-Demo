import React, { useState } from 'react';
import { ScreenName } from '../types';

interface Props {
  onNavigate: (screen: ScreenName) => void;
}

type TabMode = 'products' | 'services' | 'experiences';

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

interface Experience {
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

const ShopScreen: React.FC<Props> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<TabMode>('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('All');

  const wdaBalance = 2850;

  const categories = ['All', 'Home', 'Travel', 'Fashion', 'Tech'];

  const products: Product[] = [
    { id: 'p1', name: 'Reusable Water Bottle', price: 59, wdaEarn: 50, category: 'Home', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=300', description: 'Premium stainless steel water bottle, keeps drinks cold for 24hrs. BPA-free and 100% recyclable.', rating: 4.8 },
    { id: 'p2', name: 'Bamboo Cutlery Set', price: 35, wdaEarn: 30, category: 'Home', image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=300', description: 'Portable bamboo fork, spoon, chopsticks, and straw with cleaning brush. Perfect for lunch at work.', rating: 4.6 },
    { id: 'p3', name: 'Solar Phone Charger', price: 149, wdaEarn: 150, category: 'Tech', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=300', description: 'High-efficiency solar panel with 20000mAh battery. Charge your phone anywhere under the sun.', rating: 4.9 },
    { id: 'p4', name: 'Organic Cotton Tote', price: 25, wdaEarn: 25, category: 'Fashion', image: 'https://images.unsplash.com/photo-1597633425046-08f5110420b5?auto=format&fit=crop&q=80&w=300', description: 'Durable organic cotton tote bag. Replace 500 plastic bags over its lifetime.', rating: 4.5 },
    { id: 'p5', name: 'Beeswax Wraps Set', price: 45, wdaEarn: 40, category: 'Home', image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&q=80&w=300', description: 'Set of 3 sizes. Natural alternative to plastic wrap. Washable and reusable for up to 1 year.', rating: 4.7 },
    { id: 'p6', name: 'Eco Yoga Mat', price: 89, wdaEarn: 80, category: 'Fashion', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=300', description: 'Natural rubber yoga mat with excellent grip. Made from sustainable materials.', rating: 4.8 },
    { id: 'p7', name: 'Reef-Safe Sunscreen', price: 42, wdaEarn: 35, category: 'Travel', image: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&q=80&w=300', description: 'Mineral sunscreen that protects both your skin and coral reefs. Water-resistant.', rating: 4.6 },
    { id: 'p8', name: 'Bamboo Toothbrush Set', price: 28, wdaEarn: 25, category: 'Home', image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb71d12?auto=format&fit=crop&q=80&w=300', description: 'Pack of 4 bamboo toothbrushes with charcoal bristles. Biodegradable handle.', rating: 4.4 },
  ];

  const services: Service[] = [
    { id: 's1', name: 'Solar Panel Installation', provider: 'DEWA Certified', priceRange: 'AED 5,000 - 20,000', wdaEarn: 500, type: 'Energy', description: 'Professional solar panel installation for homes and businesses. Save up to 80% on electricity bills.', icon: 'fa-solar-panel', image: 'linear-gradient(to bottom right, #f59e0b, #d97706)', accessibility: ['Wheelchair Access', 'Sign Language Available'] },
    { id: 's2', name: 'E-waste Recycling Pickup', provider: 'Green UAE', priceRange: 'Free', wdaEarn: 100, type: 'Recycling', description: 'Free doorstep pickup for electronic waste. Proper recycling to prevent environmental harm.', icon: 'fa-recycle', image: 'linear-gradient(to bottom right, #10b981, #059669)', accessibility: ['Home Pickup', 'Accessible Vehicle'] },
    { id: 's3', name: 'Organic Cleaning Service', provider: 'EcoClean Pro', priceRange: 'AED 150 - 400', wdaEarn: 200, type: 'Cleaning', description: 'Non-toxic, eco-friendly cleaning service using plant-based products safe for family and pets.', icon: 'fa-sparkles', image: 'linear-gradient(to bottom right, #8b5cf6, #7c3aed)', accessibility: ['Wheelchair Access'] },
    { id: 's4', name: 'EV Charging Installation', provider: 'Volt UAE', priceRange: 'AED 2,000 - 5,000', wdaEarn: 400, type: 'Energy', description: 'Home EV charging station installation. Compatible with all electric vehicles.', icon: 'fa-car-battery', image: 'linear-gradient(to bottom right, #3b82f6, #2563eb)', accessibility: ['Wheelchair Access', 'Ground Floor Preferred'] },
    { id: 's5', name: 'Composting Setup Service', provider: 'Urban Farm', priceRange: 'AED 300 - 600', wdaEarn: 250, type: 'Garden', description: 'Start composting at home. We set up the system and teach you how to turn waste into fertilizer.', icon: 'fa-leaf', image: 'linear-gradient(to bottom right, #22c55e, #16a34a)', accessibility: ['Garden Access Required'] },
    { id: 's6', name: 'Water Conservation Audit', provider: 'AquaSave', priceRange: 'AED 200 - 500', wdaEarn: 150, type: 'Water', description: 'Professional audit to identify water waste and provide solutions to reduce consumption.', icon: 'fa-tint', image: 'linear-gradient(to bottom right, #06b6d4, #0891b2)', accessibility: ['Full Home Access'] },
  ];

  const experiences: Experience[] = [
    { id: 'e1', name: 'Beach Cleanup Jumeirah', date: 'Jan 25, 2026', price: 0, wdaEarn: 300, image: 'https://images.unsplash.com/photo-1618477461853-5f8dd68aa395?auto=format&fit=crop&q=80&w=600', description: 'Join us for a morning of beach cleaning. All equipment provided. Protect our coastlines!', participants: 45, location: 'Jumeirah Beach' },
    { id: 'e2', name: 'Ghaf Tree Planting', date: 'Feb 5, 2026', price: 50, wdaEarn: 500, image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600', description: 'Plant the UAE national tree! Contribute to the ghaf forest initiative and learn about native ecosystems.', participants: 120, location: 'Al Qudra' },
    { id: 'e3', name: 'Zero Waste Workshop', date: 'Feb 12, 2026', price: 100, wdaEarn: 200, image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=600', description: 'Learn practical tips to reduce waste in your daily life. Includes DIY cleaning products session.', participants: 30, location: 'Dubai Sustainable City' },
    { id: 'e4', name: 'Desert Conservation Tour', date: 'Feb 20, 2026', price: 250, wdaEarn: 400, image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=600', description: 'Explore the desert ecosystem with expert guides. Learn about native wildlife and conservation efforts.', participants: 25, location: 'Dubai Desert Conservation Reserve' },
    { id: 'e5', name: 'Urban Farming Class', date: 'Feb 28, 2026', price: 75, wdaEarn: 150, image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=600', description: 'Grow your own food! Learn balcony gardening, composting, and sustainable farming techniques.', participants: 40, location: 'Urban Farm Hub, Al Quoz' },
    { id: 'e6', name: 'Coral Reef Education', date: 'Mar 5, 2026', price: 150, wdaEarn: 350, image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&q=80&w=600', description: 'Interactive session about marine ecosystems and coral reef conservation. Snorkeling optional.', participants: 20, location: 'Fujairah Coast' },
  ];

  const filteredProducts = products.filter(p => 
    (categoryFilter === 'All' || p.category === categoryFilter) &&
    (p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-[var(--bg-primary)] min-h-full pb-32">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[var(--bg-primary)]/95 backdrop-blur-xl pt-12 pb-3 px-5 border-b border-[var(--border-light)]/50">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--forest-deep)] to-[var(--teal)] flex items-center justify-center text-white shadow-lg">
              <i className="fas fa-store"></i>
            </div>
            <div>
              <div className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">Balance</div>
              <div className="text-xl font-extrabold text-[var(--text-primary)] font-jakarta leading-none">{wdaBalance.toLocaleString()} <span className="text-xs text-[var(--forest-light)]">Wda</span></div>
            </div>
          </div>
          <button 
            onClick={() => onNavigate(ScreenName.WALLET)}
            className="w-10 h-10 rounded-xl bg-[var(--bg-tertiary)] flex items-center justify-center hover:bg-[var(--forest-light)] hover:text-white transition-all"
            aria-label="View wallet"
          >
            <i className="fas fa-wallet"></i>
          </button>
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
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center text-gray-400 hover:text-[var(--forest-light)] transition-colors"
            aria-label="Voice search"
          >
            <i className="fas fa-microphone text-xs"></i>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-5 pt-4">
        <div className="bg-[var(--bg-tertiary)] p-1 rounded-2xl flex relative">
          <div
            className={`absolute top-1 bottom-1 w-[33%] bg-white rounded-xl shadow-sm transition-all duration-300 ease-out`}
            style={{ left: activeTab === 'products' ? '1%' : activeTab === 'services' ? '34%' : '67%' }}
          ></div>
          <button
            onClick={() => setActiveTab('products')}
            className={`flex-1 min-w-[33%] py-3 rounded-xl text-[10px] font-bold uppercase relative z-10 transition-colors ${activeTab === 'products' ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}
            aria-label="Products tab"
          >
            <i className="fas fa-shopping-bag mr-1.5"></i> Products
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`flex-1 min-w-[33%] py-3 rounded-xl text-[10px] font-bold uppercase relative z-10 transition-colors ${activeTab === 'services' ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}
            aria-label="Services tab"
          >
            <i className="fas fa-concierge-bell mr-1.5"></i> Services
          </button>
          <button
            onClick={() => setActiveTab('experiences')}
            className={`flex-1 min-w-[33%] py-3 rounded-xl text-[10px] font-bold uppercase relative z-10 transition-colors ${activeTab === 'experiences' ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}
            aria-label="Experiences tab"
          >
            <i className="fas fa-calendar-alt mr-1.5"></i> Events
          </button>
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="animate-[fadeIn_0.3s_ease-out]">
            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 -mx-2 px-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    categoryFilter === cat 
                      ? 'bg-[var(--text-primary)] text-white border-[var(--text-primary)]' 
                      : 'bg-white text-[var(--text-secondary)] border-[var(--border-light)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map(product => (
                <div 
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="bg-white rounded-[24px] overflow-hidden border border-[var(--border-light)] shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedProduct(product)}
                >
                  <div className="relative h-40 bg-gray-100">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm">
                      <i className="fas fa-coins text-[8px]"></i>
                      +{product.wdaEarn} Wda
                    </div>
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-[9px] font-bold text-[var(--text-primary)]">
                      {product.category}
                    </div>
                    {/* POD: Audio description button */}
                    <button 
                      className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors shadow-sm opacity-0 group-hover:opacity-100"
                      aria-label={`Listen to ${product.name} description`}
                      onClick={(e) => { e.stopPropagation(); const utterance = new SpeechSynthesisUtterance(`${product.name}. ${product.description}`); window.speechSynthesis.speak(utterance); }}
                    >
                      <i className="fas fa-volume-up text-[10px]"></i>
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
                    {/* POD: Eco Rating Badge */}
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

        {/* SERVICES TAB */}
        {activeTab === 'services' && (
          <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
            {services.map(service => (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="bg-white rounded-[24px] p-4 border border-[var(--border-light)] shadow-sm hover:shadow-md transition-all cursor-pointer group relative"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedService(service)}
              >
                {/* POD: Audio description button */}
                <button 
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors opacity-0 group-hover:opacity-100 z-10"
                  aria-label={`Listen to ${service.name} description`}
                  onClick={(e) => { e.stopPropagation(); const utterance = new SpeechSynthesisUtterance(`${service.name}. ${service.description}`); window.speechSynthesis.speak(utterance); }}
                >
                  <i className="fas fa-volume-up text-[9px]"></i>
                </button>
                <div className="flex items-start gap-4">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-sm"
                    style={{ background: service.image }}
                  >
                    <i className={`fas ${service.icon} text-white`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <div className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wide">{service.provider}</div>
                        <h4 className="font-bold text-[var(--text-primary)]">{service.name}</h4>
                      </div>
                      <div className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shrink-0 ml-2">
                        <i className="fas fa-coins text-[8px]"></i>
                        +{service.wdaEarn}
                      </div>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] mb-2 line-clamp-2">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--forest-deep)]">{service.priceRange}</span>
                      <div className="flex items-center gap-2">
                        {service.accessibility.slice(0, 2).map((acc, i) => (
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

        {/* EXPERIENCES TAB */}
        {activeTab === 'experiences' && (
          <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
            {experiences.map(exp => (
              <div
                key={exp.id}
                onClick={() => setSelectedExperience(exp)}
                className="bg-white rounded-[24px] overflow-hidden border border-[var(--border-light)] shadow-sm hover:shadow-md transition-all cursor-pointer group relative"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedExperience(exp)}
              >
                {/* POD: Audio description button */}
                <button 
                  className="absolute top-3 right-12 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors shadow-sm z-20"
                  aria-label={`Listen to ${exp.name} description`}
                  onClick={(e) => { e.stopPropagation(); const utterance = new SpeechSynthesisUtterance(`${exp.name}. ${exp.description}. Date: ${exp.date}. Location: ${exp.location}`); window.speechSynthesis.speak(utterance); }}
                >
                  <i className="fas fa-volume-up text-[10px]"></i>
                </button>
                <div className="relative h-44">
                  <img src={exp.image} alt={exp.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-[var(--text-primary)] flex items-center gap-2">
                    <i className="fas fa-calendar text-[var(--forest-light)]"></i>
                    {exp.date}
                  </div>
                  <div className="absolute top-3 right-3 bg-amber-100 backdrop-blur-sm px-2 py-1 rounded-full text-[10px] font-bold text-amber-700 flex items-center gap-1 shadow-sm">
                    <i className="fas fa-coins text-[8px]"></i>
                    +{exp.wdaEarn} Wda
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h4 className="font-bold text-white text-lg mb-1">{exp.name}</h4>
                    <div className="flex items-center gap-3 text-white/80 text-[10px]">
                      <span><i className="fas fa-map-marker-alt mr-1"></i>{exp.location}</span>
                      <span><i className="fas fa-users mr-1"></i>{exp.participants} going</span>
                    </div>
                    {/* POD: Accessibility info */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[8px] px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full flex items-center gap-1">
                        <i className="fas fa-universal-access"></i>
                        {exp.location.includes('Beach') ? 'Beach Access' : exp.location.includes('Desert') ? 'Off-road' : 'Indoor'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {exp.price === 0 ? (
                        <span className="text-lg font-bold text-emerald-600">FREE</span>
                      ) : (
                        <>
                          <span className="text-[10px] text-[var(--text-muted)] line-through">AED {exp.price + 50}</span>
                          <span className="text-lg font-bold text-[var(--text-primary)]">AED {exp.price}</span>
                        </>
                      )}
                    </div>
                    <button className="px-4 py-2 bg-[var(--forest-light)] text-white rounded-xl text-xs font-bold hover:bg-[var(--forest-deep)] transition-colors">
                      Register
                    </button>
                  </div>
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
              <img src={selectedProduct.image} alt={selectedProduct.name} className="absolute inset-0 w-full h-full object-cover" />
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
                  {[1,2,3,4,5].map(star => (
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

      {/* EXPERIENCE DETAIL MODAL */}
      {selectedExperience && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={() => setSelectedExperience(null)}>
          <div className="bg-[var(--bg-primary)] w-full rounded-t-[32px] overflow-hidden flex flex-col animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <div className="h-64 relative flex items-center justify-center overflow-hidden">
              <img src={selectedExperience.image} alt={selectedExperience.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              <button onClick={() => setSelectedExperience(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 text-white flex items-center justify-center hover:bg-black/30 backdrop-blur-md z-20">
                <i className="fas fa-times"></i>
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-bold flex items-center gap-1">
                    <i className="fas fa-coins text-[8px]"></i>
                    +{selectedExperience.wdaEarn} Wda
                  </span>
                  <span className="px-2 py-1 bg-white/20 backdrop-blur-md text-white rounded-full text-[10px] font-bold">
                    <i className="fas fa-users mr-1"></i>
                    {selectedExperience.participants} spots taken
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white">{selectedExperience.name}</h2>
              </div>
            </div>

            <div className="p-6 bg-[var(--bg-primary)] -mt-4 rounded-t-[32px] relative z-10 flex-1 overflow-y-auto">
              <div className="flex items-center gap-4 mb-4 p-4 bg-[var(--bg-tertiary)] rounded-2xl">
                <div className="flex-1">
                  <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wide">Date & Time</div>
                  <div className="font-bold text-[var(--text-primary)]">{selectedExperience.date}</div>
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wide">Location</div>
                  <div className="font-bold text-[var(--text-primary)]">{selectedExperience.location}</div>
                </div>
              </div>

              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">{selectedExperience.description}</p>

              <div className="bg-emerald-50 rounded-2xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-[var(--text-primary)]">Registration</span>
                  <span className="text-2xl font-bold text-emerald-600">
                    {selectedExperience.price === 0 ? 'FREE' : `AED ${selectedExperience.price}`}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-emerald-100">
                  <span className="text-sm text-[var(--text-secondary)]">Wda Reward</span>
                  <span className="font-bold text-emerald-600">+{selectedExperience.wdaEarn} Wda</span>
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
    </div>
  );
};

export default ShopScreen;
