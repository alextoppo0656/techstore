import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import './Home.css';

export default function Home() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState(350000);

  const filtered = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    if (activeCategory !== 'All') {
      list = list.filter(p => p.category === activeCategory);
    }

    list = list.filter(p => p.price <= priceRange);

    switch (sortBy) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      case 'reviews': list.sort((a, b) => b.reviews - a.reviews); break;
      default: break;
    }

    return list;
  }, [search, activeCategory, sortBy, priceRange]);

  return (
    <main className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-label fade-up" style={{ animationDelay: '0.05s' }}>
            New arrivals 2024
          </div>
          <h1 className="hero-title fade-up" style={{ animationDelay: '0.12s' }}>
            Tech that moves<br />
            <em>the world forward.</em>
          </h1>
          <p className="hero-subtitle fade-up" style={{ animationDelay: '0.2s' }}>
            Curated gadgets from the world's best brands. Fast shipping, easy returns.
          </p>
          <div className="hero-actions fade-up" style={{ animationDelay: '0.28s' }}>
            <a href="#shop" className="btn-primary">Shop Now</a>
            <a href="#featured" className="btn-ghost">View Featured</a>
          </div>
        </div>

        <div className="hero-visual fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="hero-card hero-card-1">
            <img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MME73?wid=500&hei=500&fmt=jpeg&qlt=95" alt="AirPods" />
          </div>
          <div className="hero-card hero-card-2">
            <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80" alt="MacBook" />
          </div>
          <div className="hero-badge">
            <span className="badge-num">500+</span>
            <span className="badge-txt">Products</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-bar">
        <div className="stats-inner">
          <div className="stat"><span>12</span><p>Brands</p></div>
          <div className="stat-divider" />
          <div className="stat"><span>500+</span><p>Products</p></div>
          <div className="stat-divider" />
          <div className="stat"><span>4.8★</span><p>Avg Rating</p></div>
          <div className="stat-divider" />
          <div className="stat"><span>Free</span><p>Shipping ₹999+</p></div>
        </div>
      </section>

      {/* Categories */}
      <section className="section" id="categories">
        <div className="section-inner">
          <div className="section-header">
            <h2 className="section-title">Browse by category</h2>
          </div>
          <div className="category-pills">
            {categories.map(cat => (
              <button
                key={cat}
                className={`cat-pill${activeCategory === cat ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Shop */}
      <section className="section" id="shop">
        <div className="section-inner">
          <div className="shop-controls">
            <div className="search-wrap">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                className="search-input"
                placeholder="Search products, brands..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button className="search-clear" onClick={() => setSearch('')}>✕</button>
              )}
            </div>

            <div className="filter-controls">
              <div className="price-filter">
                <label>Max: ₹{(priceRange / 100).toFixed(0)}k</label>
                <input
                  type="range"
                  min={1000}
                  max={350000}
                  step={1000}
                  value={priceRange}
                  onChange={e => setPriceRange(Number(e.target.value))}
                />
              </div>

              <select
                className="sort-select"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="default">Sort: Default</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="rating">Best Rated</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>
          </div>

          <div className="results-count">
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'} found
            {activeCategory !== 'All' && <span> in <strong>{activeCategory}</strong></span>}
          </div>

          {filtered.length > 0 ? (
            <div className="products-grid">
              {filtered.map((p, i) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  style={{ animationDelay: `${i * 0.05}s` }}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span>🔍</span>
              <p>No products match your filters.</p>
              <button onClick={() => { setSearch(''); setActiveCategory('All'); setPriceRange(350000); }}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
