// ==========================================================================
// VELA PRIVÉ - LUXURY HOTEL & MANAGEMENT ENGINE
// Pure Vanilla JavaScript Application Architecture
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  VelaApp.init();
});

const VelaApp = {
  // Application State
  state: {
    hotels: [],
    destinations: [],
    offers: [],
    reviews: [],
    bookings: [],
    wishlist: [],
    activeCategory: 'all',
    activeView: 'home', // 'home', 'dashboard', 'admin'
    filters: {
      searchQuery: '',
      destination: '',
      maxPrice: 10000,
      minRating: 0,
      amenities: [],
      sortBy: 'recommended'
    },
    currentHotel: null,
    bookingDraft: {
      hotel: null,
      room: null,
      checkIn: '',
      checkOut: '',
      nights: 3,
      adults: 2,
      roomsCount: 1,
      guestName: 'Alexander Vance',
      guestEmail: 'alexander.vance@velaprive.com',
      guestPhone: '+1 (555) 392-8812',
      specialRequests: '',
      promoCode: '',
      discountAmount: 0,
      subtotal: 0,
      tax: 0,
      serviceFee: 150,
      total: 0
    },
    bookingStep: 1,
    theme: 'dark'
  },

  // Initialize System
  init() {
    this.loadPersistedData();
    this.setupTheme();
    this.setupDefaultDates();
    this.renderDestinations();
    this.renderOffers();
    this.renderReviews();
    this.renderHotels();
    this.bindEvents();
    this.updateWishlistCount();
  },

  // Load from LocalStorage or Default Data
  loadPersistedData() {
    // Hotels
    const savedHotels = localStorage.getItem('vela_hotels');
    this.state.hotels = savedHotels ? JSON.parse(savedHotels) : [...INITIAL_HOTELS];

    // Destinations & Offers
    this.state.destinations = typeof DESTINATIONS_DATA !== 'undefined' ? [...DESTINATIONS_DATA] : [];
    this.state.offers = typeof SPECIAL_OFFERS !== 'undefined' ? [...SPECIAL_OFFERS] : [];
    this.state.reviews = typeof REVIEWS_SAMPLE !== 'undefined' ? [...REVIEWS_SAMPLE] : [];

    // Bookings
    const savedBookings = localStorage.getItem('vela_bookings');
    this.state.bookings = savedBookings ? JSON.parse(savedBookings) : [...INITIAL_BOOKINGS];

    // Wishlist
    const savedWishlist = localStorage.getItem('vela_wishlist');
    this.state.wishlist = savedWishlist ? JSON.parse(savedWishlist) : ['vela-paris', 'vela-maldives'];

    // Theme
    const savedTheme = localStorage.getItem('vela_theme') || 'dark';
    this.state.theme = savedTheme;
  },

  // Theme Handling
  setupTheme() {
    document.documentElement.setAttribute('data-theme', this.state.theme);
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.innerHTML = this.state.theme === 'dark' 
        ? '<i class="fa-regular fa-sun"></i>' 
        : '<i class="fa-regular fa-moon"></i>';
    }
  },

  toggleTheme() {
    this.state.theme = this.state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.state.theme);
    localStorage.setItem('vela_theme', this.state.theme);
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.innerHTML = this.state.theme === 'dark' 
        ? '<i class="fa-regular fa-sun"></i>' 
        : '<i class="fa-regular fa-moon"></i>';
    }
    this.showToast(`Switched to ${this.state.theme.toUpperCase()} luxury theme`, 'fa-palette');
  },

  // Setup Default Dates for Booking Widget
  setupDefaultDates() {
    const today = new Date();
    const checkInDate = new Date(today);
    checkInDate.setDate(today.getDate() + 14);

    const checkOutDate = new Date(checkInDate);
    checkOutDate.setDate(checkInDate.getDate() + 4);

    const formatDate = (date) => date.toISOString().split('T')[0];

    const checkInInput = document.getElementById('search-checkin');
    const checkOutInput = document.getElementById('search-checkout');

    if (checkInInput) checkInInput.value = formatDate(checkInDate);
    if (checkOutInput) checkOutInput.value = formatDate(checkOutDate);

    this.state.bookingDraft.checkIn = formatDate(checkInDate);
    this.state.bookingDraft.checkOut = formatDate(checkOutDate);
    this.state.bookingDraft.nights = 4;
  },

  // Bind UI Event Listeners
  bindEvents() {
    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    });

    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    if (mobileBtn && navLinks) {
      mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
      });
    }

    // Navigation Links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        const targetView = link.getAttribute('data-view');
        if (targetView) {
          e.preventDefault();
          this.switchView(targetView);
          if (navLinks) navLinks.classList.remove('active');
        }
      });
    });

    // Brand Logo Click
    const brandLogo = document.getElementById('brand-logo');
    if (brandLogo) {
      brandLogo.addEventListener('click', () => this.switchView('home'));
    }

    // Search Widget Guests Dropdown
    const guestsField = document.getElementById('widget-guests-field');
    const guestsDropdown = document.getElementById('guests-dropdown');
    if (guestsField && guestsDropdown) {
      guestsField.addEventListener('click', (e) => {
        if (!e.target.closest('.counter-controls')) {
          guestsDropdown.classList.toggle('active');
        }
      });

      document.addEventListener('click', (e) => {
        if (!guestsField.contains(e.target)) {
          guestsDropdown.classList.remove('active');
        }
      });
    }

    // Guest Counter Buttons
    this.bindCounterControls();

    // Booking Search Button
    const searchBtn = document.getElementById('booking-search-btn');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => this.handleHeroSearch());
    }

    // Category Tabs
    document.querySelectorAll('.cat-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.state.activeCategory = tab.getAttribute('data-category');
        this.renderHotels();
      });
    });

    // Search Input in Discovery
    const filterSearch = document.getElementById('filter-search');
    if (filterSearch) {
      filterSearch.addEventListener('input', (e) => {
        this.state.filters.searchQuery = e.target.value.toLowerCase();
        this.renderHotels();
      });
    }

    // Price Range Slider
    const priceSlider = document.getElementById('price-range-slider');
    const priceDisplay = document.getElementById('price-max-display');
    if (priceSlider && priceDisplay) {
      priceSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        this.state.filters.maxPrice = val;
        priceDisplay.textContent = `$${val.toLocaleString()}`;
        this.renderHotels();
      });
    }

    // Rating Radio / Checkbox
    document.querySelectorAll('input[name="filter-rating"]').forEach(input => {
      input.addEventListener('change', (e) => {
        this.state.filters.minRating = parseFloat(e.target.value);
        this.renderHotels();
      });
    });

    // Amenities Checkboxes
    document.querySelectorAll('.amenity-filter-cb').forEach(cb => {
      cb.addEventListener('change', () => {
        const checkedAmenities = Array.from(document.querySelectorAll('.amenity-filter-cb:checked'))
          .map(cb => cb.value);
        this.state.filters.amenities = checkedAmenities;
        this.renderHotels();
      });
    });

    // Sort Dropdown
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.state.filters.sortBy = e.target.value;
        this.renderHotels();
      });
    }

    // Reset Filters Button
    const resetBtn = document.getElementById('reset-filters-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.resetFilters());
    }

    // Wishlist Navbar Button
    const wishlistNavBtn = document.getElementById('nav-wishlist-btn');
    if (wishlistNavBtn) {
      wishlistNavBtn.addEventListener('click', () => {
        this.switchView('dashboard');
        this.switchDashboardTab('wishlist');
      });
    }

    // Modal Close Buttons
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-overlay');
        if (modal) modal.classList.remove('active');
      });
    });

    // Close Modal on Overlay Backdrop Click
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    });

    // Keyboard ESC Close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
      }
    });

    // Dashboard Sub-navigation Tabs
    document.querySelectorAll('.dash-tab-btn').forEach(tab => {
      tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');
        this.switchDashboardTab(tabName);
      });
    });

    // Promo Code Apply Button
    const promoBtn = document.getElementById('apply-promo-btn');
    if (promoBtn) {
      promoBtn.addEventListener('click', () => this.applyPromoCode());
    }

    // Booking Wizard Stepper Next / Prev Buttons
    const nextStepBtn = document.getElementById('booking-next-btn');
    const prevStepBtn = document.getElementById('booking-prev-btn');
    if (nextStepBtn) {
      nextStepBtn.addEventListener('click', () => this.nextBookingStep());
    }
    if (prevStepBtn) {
      prevStepBtn.addEventListener('click', () => this.prevBookingStep());
    }

    // Print Voucher Button
    const printBtn = document.getElementById('print-voucher-btn');
    if (printBtn) {
      printBtn.addEventListener('click', () => window.print());
    }

    // Admin: Add Hotel Form Submit
    const addHotelForm = document.getElementById('add-hotel-form');
    if (addHotelForm) {
      addHotelForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleAddNewHotel();
      });
    }
  },

  // Bind Counter controls
  bindCounterControls() {
    const adultMinus = document.getElementById('adult-minus');
    const adultPlus = document.getElementById('adult-plus');
    const adultCount = document.getElementById('adult-count');

    const roomMinus = document.getElementById('room-minus');
    const roomPlus = document.getElementById('room-plus');
    const roomCount = document.getElementById('room-count');

    const summaryText = document.getElementById('guests-summary-text');

    const updateDisplay = () => {
      if (adultCount) adultCount.textContent = this.state.bookingDraft.adults;
      if (roomCount) roomCount.textContent = this.state.bookingDraft.roomsCount;
      if (summaryText) {
        summaryText.textContent = `${this.state.bookingDraft.adults} Guests, ${this.state.bookingDraft.roomsCount} Room`;
      }
    };

    if (adultMinus && adultPlus) {
      adultMinus.addEventListener('click', () => {
        if (this.state.bookingDraft.adults > 1) {
          this.state.bookingDraft.adults--;
          updateDisplay();
        }
      });
      adultPlus.addEventListener('click', () => {
        if (this.state.bookingDraft.adults < 10) {
          this.state.bookingDraft.adults++;
          updateDisplay();
        }
      });
    }

    if (roomMinus && roomPlus) {
      roomMinus.addEventListener('click', () => {
        if (this.state.bookingDraft.roomsCount > 1) {
          this.state.bookingDraft.roomsCount--;
          updateDisplay();
        }
      });
      roomPlus.addEventListener('click', () => {
        if (this.state.bookingDraft.roomsCount < 5) {
          this.state.bookingDraft.roomsCount++;
          updateDisplay();
        }
      });
    }
  },

  // View Switching (Home vs Customer Dashboard vs Hotel Admin)
  switchView(viewName) {
    this.state.activeView = viewName;
    const homeSection = document.getElementById('home-view');
    const dashboardSection = document.getElementById('dashboard-view');
    const adminSection = document.getElementById('admin-view');

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-view') === viewName);
    });

    if (homeSection) homeSection.style.display = viewName === 'home' ? 'block' : 'none';
    if (dashboardSection) dashboardSection.style.display = viewName === 'dashboard' ? 'block' : 'none';
    if (adminSection) adminSection.style.display = viewName === 'admin' ? 'block' : 'none';

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (viewName === 'dashboard') {
      this.renderCustomerDashboard();
    } else if (viewName === 'admin') {
      this.renderAdminDashboard();
    }
  },

  // Hero Search Trigger
  handleHeroSearch() {
    const destInput = document.getElementById('search-destination');
    const checkInInput = document.getElementById('search-checkin');
    const checkOutInput = document.getElementById('search-checkout');

    if (destInput && destInput.value.trim() !== '') {
      this.state.filters.searchQuery = destInput.value.trim().toLowerCase();
    }
    if (checkInInput && checkOutInput) {
      this.state.bookingDraft.checkIn = checkInInput.value;
      this.state.bookingDraft.checkOut = checkOutInput.value;
      const start = new Date(checkInInput.value);
      const end = new Date(checkOutInput.value);
      const nights = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));
      this.state.bookingDraft.nights = nights;
    }

    this.renderHotels();
    const discoveryElem = document.getElementById('discovery');
    if (discoveryElem) {
      discoveryElem.scrollIntoView({ behavior: 'smooth' });
    }
    this.showToast('Curating extraordinary sanctuaries for your dates...', 'fa-compass');
  },

  // Render Destinations
  renderDestinations() {
    const grid = document.getElementById('destinations-grid');
    if (!grid) return;

    grid.innerHTML = this.state.destinations.map(d => `
      <div class="destination-card" onclick="VelaApp.filterByDestination('${d.name}')">
        <img class="destination-img" src="${d.image}" alt="${d.name}" loading="lazy" />
        <div class="destination-overlay">
          <h3 class="destination-name">${d.name}</h3>
          <p class="destination-tagline">${d.tagline}</p>
          <div class="destination-meta">
            <span>${d.hotelCount} Sanctuaries</span>
            <span>From ${d.startingPrice} / night</span>
          </div>
        </div>
      </div>
    `).join('');
  },

  filterByDestination(destinationName) {
    this.state.filters.searchQuery = destinationName.toLowerCase();
    const searchInput = document.getElementById('filter-search');
    if (searchInput) searchInput.value = destinationName;
    this.renderHotels();
    const discoveryElem = document.getElementById('discovery');
    if (discoveryElem) discoveryElem.scrollIntoView({ behavior: 'smooth' });
  },

  // Render Offers
  renderOffers() {
    const grid = document.getElementById('offers-grid');
    if (!grid) return;

    grid.innerHTML = this.state.offers.map(o => `
      <div class="offer-card">
        <div class="offer-header">
          <img class="offer-img" src="${o.image}" alt="${o.title}" loading="lazy" />
          <span class="offer-badge">${o.badge}</span>
        </div>
        <div class="offer-body">
          <span class="section-tag">${o.hotelName}</span>
          <h3 style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: 8px;">${o.title}</h3>
          <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">${o.description}</p>
          <div class="offer-promo-code">PROMO: <strong>${o.promoCode}</strong> (${o.discount})</div>
          <div>
            <button class="btn-gold" style="width: 100%; font-size: 0.85rem;" onclick="VelaApp.quickBookOffer('${o.promoCode}')">
              Claim Privilege
            </button>
          </div>
        </div>
      </div>
    `).join('');
  },

  quickBookOffer(promoCode) {
    this.state.bookingDraft.promoCode = promoCode;
    const firstHotel = this.state.hotels[0];
    this.openHotelDetails(firstHotel.id);
    this.showToast(`Applied exclusive promo code ${promoCode}`, 'fa-tag');
  },

  // Render Reviews
  renderReviews() {
    const grid = document.getElementById('reviews-grid');
    if (!grid) return;

    grid.innerHTML = this.state.reviews.map(r => `
      <div class="glass-panel review-card">
        <div class="review-header">
          <img class="review-avatar" src="${r.avatar}" alt="${r.author}" />
          <div>
            <h4 class="review-author-name">${r.author}</h4>
            <span class="review-author-location">${r.location} • <span style="color: var(--accent-emerald);">Verified Stay</span></span>
          </div>
        </div>
        <div class="review-rating-stars">
          ${'<i class="fa-solid fa-star"></i>'.repeat(Math.floor(r.rating))}
        </div>
        <h5 style="font-weight: 600; margin-bottom: 6px;">"${r.title}"</h5>
        <p class="review-comment">"${r.comment}"</p>
      </div>
    `).join('');
  },

  // Render Hotels with Active Filters
  renderHotels() {
    const container = document.getElementById('hotels-grid');
    const resultCount = document.getElementById('results-count');
    if (!container) return;

    // Filter Logic
    let filtered = this.state.hotels.filter(hotel => {
      // Category Filter
      if (this.state.activeCategory !== 'all') {
        if (hotel.category !== this.state.activeCategory) return false;
      }

      // Search Query
      if (this.state.filters.searchQuery) {
        const query = this.state.filters.searchQuery;
        const matchName = hotel.name.toLowerCase().includes(query);
        const matchCity = hotel.city.toLowerCase().includes(query);
        const matchCountry = hotel.country.toLowerCase().includes(query);
        const matchDestination = hotel.destination.toLowerCase().includes(query);
        const matchAmenities = hotel.amenities.some(a => a.toLowerCase().includes(query));
        if (!matchName && !matchCity && !matchCountry && !matchDestination && !matchAmenities) {
          return false;
        }
      }

      // Max Price
      if (hotel.startingPrice > this.state.filters.maxPrice) {
        return false;
      }

      // Min Rating
      if (this.state.filters.minRating > 0 && hotel.rating < this.state.filters.minRating) {
        return false;
      }

      // Amenities filter
      if (this.state.filters.amenities.length > 0) {
        const hasAllAmenities = this.state.filters.amenities.every(amenity => 
          hotel.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    });

    // Sorting Logic
    if (this.state.filters.sortBy === 'price-asc') {
      filtered.sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (this.state.filters.sortBy === 'price-desc') {
      filtered.sort((a, b) => b.startingPrice - a.startingPrice);
    } else if (this.state.filters.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (this.state.filters.sortBy === 'popular') {
      filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    if (resultCount) {
      resultCount.textContent = `Showing ${filtered.length} extraordinary ${filtered.length === 1 ? 'sanctuary' : 'sanctuaries'}`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;" class="glass-panel">
          <i class="fa-solid fa-hotel" style="font-size: 3rem; color: var(--gold-primary); margin-bottom: 20px;"></i>
          <h3 style="font-family: var(--font-serif); font-size: 1.8rem; margin-bottom: 10px;">No Sanctuaries Found</h3>
          <p style="color: var(--text-secondary); max-width: 450px; margin: 0 auto 24px;">
            We couldn't match any properties with your exact filter criteria. Try adjusting your price range or selected amenities.
          </p>
          <button class="btn-gold" onclick="VelaApp.resetFilters()">Reset All Filters</button>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(hotel => {
      const isFav = this.state.wishlist.includes(hotel.id);
      return `
        <div class="hotel-card" data-hotel-id="${hotel.id}">
          <div class="card-media">
            <img class="card-image" src="${hotel.mainImage}" alt="${hotel.name}" loading="lazy" />
            <span class="card-badge">${hotel.badge}</span>
            <button class="favorite-btn ${isFav ? 'favorited' : ''}" onclick="VelaApp.toggleWishlist('${hotel.id}', event)" title="Save to Wishlist">
              <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </button>
          </div>
          <div class="card-content">
            <div class="card-location">
              <i class="fa-solid fa-location-dot"></i>
              <span>${hotel.destination}</span>
            </div>
            <h3 class="card-title">${hotel.name}</h3>
            <div class="card-rating-row">
              <span class="rating-pill">★ ${hotel.rating.toFixed(2)}</span>
              <span style="color: var(--text-muted);">(${hotel.reviewsCount} reviews)</span>
              <span style="margin-left: auto; color: var(--gold-light); font-size: 0.8rem; font-weight: 600;">${hotel.category}</span>
            </div>
            <div class="amenities-tags">
              ${hotel.amenities.slice(0, 3).map(a => `<span class="amenity-tag">${a}</span>`).join('')}
              ${hotel.amenities.length > 3 ? `<span class="amenity-tag">+${hotel.amenities.length - 3} more</span>` : ''}
            </div>
            <div class="card-footer">
              <div class="price-box">
                <span class="price-starting">Starting from</span>
                <div>
                  <span class="price-value">$${hotel.startingPrice.toLocaleString()}</span>
                  <span class="price-unit"> / night</span>
                </div>
              </div>
              <div style="display: flex; gap: 8px;">
                <button class="btn-outline" style="padding: 10px 16px; font-size: 0.85rem;" onclick="VelaApp.openHotelDetails('${hotel.id}')">
                  Details
                </button>
                <button class="btn-gold" style="padding: 10px 18px; font-size: 0.85rem;" onclick="VelaApp.initiateBooking('${hotel.id}')">
                  Book
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  // Reset Filters
  resetFilters() {
    this.state.filters = {
      searchQuery: '',
      destination: '',
      maxPrice: 10000,
      minRating: 0,
      amenities: [],
      sortBy: 'recommended'
    };
    this.state.activeCategory = 'all';

    const searchInput = document.getElementById('filter-search');
    if (searchInput) searchInput.value = '';

    const priceSlider = document.getElementById('price-range-slider');
    const priceDisplay = document.getElementById('price-max-display');
    if (priceSlider) priceSlider.value = 10000;
    if (priceDisplay) priceDisplay.textContent = '$10,000';

    document.querySelectorAll('.amenity-filter-cb').forEach(cb => cb.checked = false);
    document.querySelectorAll('input[name="filter-rating"]').forEach(r => r.checked = r.value === '0');
    document.querySelectorAll('.cat-tab').forEach(t => t.classList.toggle('active', t.getAttribute('data-category') === 'all'));

    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) sortSelect.value = 'recommended';

    this.renderHotels();
    this.showToast('Filters reset to defaults', 'fa-rotate-left');
  },

  // Toggle Wishlist
  toggleWishlist(hotelId, event) {
    if (event) event.stopPropagation();
    const index = this.state.wishlist.indexOf(hotelId);
    let hotel = this.state.hotels.find(h => h.id === hotelId);

    if (index > -1) {
      this.state.wishlist.splice(index, 1);
      this.showToast(`Removed "${hotel ? hotel.name : 'Hotel'}" from Wishlist`, 'fa-heart-crack');
    } else {
      this.state.wishlist.push(hotelId);
      this.showToast(`Saved "${hotel ? hotel.name : 'Hotel'}" to Wishlist`, 'fa-heart');
    }

    localStorage.setItem('vela_wishlist', JSON.stringify(this.state.wishlist));
    this.updateWishlistCount();
    this.renderHotels();

    if (this.state.activeView === 'dashboard') {
      this.renderCustomerDashboard();
    }
  },

  updateWishlistCount() {
    const badge = document.getElementById('nav-wishlist-count');
    if (badge) {
      badge.textContent = this.state.wishlist.length;
    }
  },

  // Open Hotel Details Modal
  openHotelDetails(hotelId) {
    const hotel = this.state.hotels.find(h => h.id === hotelId);
    if (!hotel) return;
    this.state.currentHotel = hotel;

    const modal = document.getElementById('hotel-details-modal');
    if (!modal) return;

    // Gallery
    const mainImg = document.getElementById('modal-main-img');
    const thumbsContainer = document.getElementById('modal-gallery-thumbs');
    if (mainImg) mainImg.src = hotel.gallery[0];
    if (thumbsContainer) {
      thumbsContainer.innerHTML = hotel.gallery.map((imgUrl, i) => `
        <div class="gallery-thumb ${i === 0 ? 'active' : ''}" onclick="VelaApp.switchGalleryImage('${imgUrl}', this)">
          <img src="${imgUrl}" alt="Gallery ${i}" />
        </div>
      `).join('');
    }

    // Header & Meta
    document.getElementById('modal-hotel-name').textContent = hotel.name;
    document.getElementById('modal-hotel-tagline').textContent = hotel.tagline;
    document.getElementById('modal-hotel-location').textContent = hotel.address;
    document.getElementById('modal-hotel-rating').textContent = `★ ${hotel.rating.toFixed(2)} (${hotel.reviewsCount} verified reviews)`;
    document.getElementById('modal-hotel-badge').textContent = hotel.badge;
    document.getElementById('modal-hotel-description').textContent = hotel.description;

    // Highlights
    const highlightsContainer = document.getElementById('modal-highlights-list');
    if (highlightsContainer) {
      highlightsContainer.innerHTML = hotel.highlights.map(h => `
        <li style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px; color: var(--text-secondary);">
          <i class="fa-solid fa-crown" style="color: var(--gold-primary);"></i>
          <span>${h}</span>
        </li>
      `).join('');
    }

    // Amenities
    const amenitiesContainer = document.getElementById('modal-amenities-list');
    if (amenitiesContainer) {
      amenitiesContainer.innerHTML = hotel.amenities.map(a => `
        <div style="background: var(--bg-elevated); padding: 8px 14px; border-radius: 8px; font-size: 0.85rem; border: 1px solid var(--border-light); display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-check" style="color: var(--gold-primary);"></i>
          <span>${a}</span>
        </div>
      `).join('');
    }

    // Policies
    document.getElementById('modal-policy-checkin').textContent = hotel.policies.checkIn;
    document.getElementById('modal-policy-checkout').textContent = hotel.policies.checkOut;
    document.getElementById('modal-policy-cancellation').textContent = hotel.policies.cancellation;
    document.getElementById('modal-policy-pets').textContent = hotel.policies.pets;

    // Available Rooms
    const roomsContainer = document.getElementById('modal-rooms-container');
    if (roomsContainer) {
      roomsContainer.innerHTML = hotel.rooms.map(room => `
        <div class="room-card-item">
          <img class="room-thumb" src="${room.image}" alt="${room.name}" />
          <div>
            <h4 style="font-family: var(--font-serif); font-size: 1.15rem; margin-bottom: 4px;">${room.name}</h4>
            <div style="font-size: 0.85rem; color: var(--text-muted); display: flex; gap: 16px; margin-bottom: 8px; flex-wrap: wrap;">
              <span><i class="fa-solid fa-ruler-combined"></i> ${room.size}</span>
              <span><i class="fa-solid fa-bed"></i> ${room.bedType}</span>
              <span><i class="fa-solid fa-user-group"></i> Up to ${room.capacity} guests</span>
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              ${room.amenities.map(a => `<span class="amenity-tag" style="font-size: 0.75rem;">${a}</span>`).join('')}
              ${room.freeBreakfast ? '<span class="amenity-tag" style="color: var(--accent-emerald);"><i class="fa-solid fa-mug-hot"></i> Free Breakfast</span>' : ''}
            </div>
          </div>
          <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 10px;">
            <div>
              ${room.discountPrice ? `<div style="text-decoration: line-through; font-size: 0.85rem; color: var(--text-muted);">$${room.price.toLocaleString()}</div>` : ''}
              <div style="font-family: var(--font-display); font-size: 1.4rem; font-weight: 700; color: var(--gold-light);">
                $${(room.discountPrice || room.price).toLocaleString()}
              </div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">per night (excl. taxes)</div>
            </div>
            <button class="btn-gold" style="padding: 10px 20px; font-size: 0.85rem;" onclick="VelaApp.selectRoomAndProceed('${hotel.id}', '${room.id}')">
              Select Suite
            </button>
          </div>
        </div>
      `).join('');
    }

    modal.classList.add('active');
  },

  switchGalleryImage(imgUrl, thumbElem) {
    const mainImg = document.getElementById('modal-main-img');
    if (mainImg) mainImg.src = imgUrl;
    document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
    if (thumbElem) thumbElem.classList.add('active');
  },

  // Initiate Booking from Hotel Card or Details
  initiateBooking(hotelId) {
    const hotel = this.state.hotels.find(h => h.id === hotelId);
    if (!hotel) return;
    this.openHotelDetails(hotelId);
  },

  selectRoomAndProceed(hotelId, roomId) {
    const hotel = this.state.hotels.find(h => h.id === hotelId);
    if (!hotel) return;
    const room = hotel.rooms.find(r => r.id === roomId) || hotel.rooms[0];

    this.state.bookingDraft.hotel = hotel;
    this.state.bookingDraft.room = room;

    // Close Details modal
    const detailsModal = document.getElementById('hotel-details-modal');
    if (detailsModal) detailsModal.classList.remove('active');

    // Calculate initial totals
    this.calculateBookingTotals();

    // Open Multi-Step Booking Modal
    this.state.bookingStep = 1;
    this.updateBookingStepUI();

    const bookingModal = document.getElementById('booking-flow-modal');
    if (bookingModal) bookingModal.classList.add('active');
  },

  calculateBookingTotals() {
    const draft = this.state.bookingDraft;
    const ratePerNight = draft.room ? (draft.room.discountPrice || draft.room.price) : 1500;
    const nights = draft.nights || 3;
    
    draft.subtotal = ratePerNight * nights;
    let discount = 0;

    if (draft.promoCode === 'PARISLUXE' || draft.promoCode === 'LUXURY2026') {
      discount = Math.round(draft.subtotal * 0.20);
    } else if (draft.promoCode === 'MALDIVESVIP' || draft.promoCode === 'SWISSGOLD') {
      discount = 350;
    }

    draft.discountAmount = discount;
    draft.tax = Math.round((draft.subtotal - discount) * 0.12);
    draft.serviceFee = 150;
    draft.total = (draft.subtotal - discount) + draft.tax + draft.serviceFee;
  },

  applyPromoCode() {
    const input = document.getElementById('booking-promo-input');
    if (!input) return;
    const code = input.value.trim().toUpperCase();

    if (code === 'LUXURY2026' || code === 'PARISLUXE' || code === 'MALDIVESVIP' || code === 'SWISSGOLD') {
      this.state.bookingDraft.promoCode = code;
      this.calculateBookingTotals();
      this.renderBookingStep3Summary();
      this.showToast(`Privilege code ${code} applied successfully!`, 'fa-check');
    } else {
      this.showToast('Invalid privilege code. Please verify and retry.', 'fa-triangle-exclamation');
    }
  },

  // Multi-step Booking Stepper Controller
  updateBookingStepUI() {
    const step = this.state.bookingStep;

    // Update Step Indicators
    for (let i = 1; i <= 5; i++) {
      const node = document.getElementById(`step-node-${i}`);
      if (node) {
        node.classList.toggle('active', i === step);
        node.classList.toggle('completed', i < step);
      }
      const pane = document.getElementById(`booking-step-pane-${i}`);
      if (pane) {
        pane.style.display = i === step ? 'block' : 'none';
      }
    }

    const prevBtn = document.getElementById('booking-prev-btn');
    const nextBtn = document.getElementById('booking-next-btn');

    if (prevBtn) prevBtn.style.display = (step === 1 || step === 5) ? 'none' : 'inline-flex';
    if (nextBtn) {
      if (step === 4) {
        nextBtn.innerHTML = '<i class="fa-solid fa-lock"></i> Authorize Payment & Reserve';
      } else if (step === 5) {
        nextBtn.style.display = 'none';
      } else {
        nextBtn.innerHTML = 'Continue <i class="fa-solid fa-arrow-right"></i>';
        nextBtn.style.display = 'inline-flex';
      }
    }

    // Step-specific rendering
    if (step === 1) {
      this.renderBookingStep1();
    } else if (step === 2) {
      // Step 2 is Guest Info form
    } else if (step === 3) {
      this.renderBookingStep3Summary();
    } else if (step === 4) {
      this.renderBookingStep4Payment();
    } else if (step === 5) {
      this.renderBookingStep5Confirmation();
    }
  },

  renderBookingStep1() {
    const draft = this.state.bookingDraft;
    document.getElementById('step1-hotel-name').textContent = draft.hotel.name;
    document.getElementById('step1-room-name').textContent = draft.room.name;
    document.getElementById('step1-dates-summary').textContent = `${draft.checkIn} to ${draft.checkOut} (${draft.nights} Nights)`;
    document.getElementById('step1-guests-summary').textContent = `${draft.adults} Guests, ${draft.roomsCount} Suite`;
    document.getElementById('step1-rate-night').textContent = `$${(draft.room.discountPrice || draft.room.price).toLocaleString()} / night`;
  },

  renderBookingStep3Summary() {
    const draft = this.state.bookingDraft;
    const ratePerNight = draft.room ? (draft.room.discountPrice || draft.room.price) : 1500;

    document.getElementById('summary-room-calc').textContent = `$${ratePerNight.toLocaleString()} × ${draft.nights} nights`;
    document.getElementById('summary-room-subtotal').textContent = `$${draft.subtotal.toLocaleString()}`;
    document.getElementById('summary-tax').textContent = `$${draft.tax.toLocaleString()}`;
    document.getElementById('summary-service-fee').textContent = `$${draft.serviceFee.toLocaleString()}`;
    
    const discountRow = document.getElementById('summary-discount-row');
    const discountVal = document.getElementById('summary-discount-val');
    if (discountRow && discountVal) {
      if (draft.discountAmount > 0) {
        discountRow.style.display = 'flex';
        discountVal.textContent = `-$${draft.discountAmount.toLocaleString()}`;
      } else {
        discountRow.style.display = 'none';
      }
    }

    document.getElementById('summary-total').textContent = `$${draft.total.toLocaleString()}`;
  },

  renderBookingStep4Payment() {
    const draft = this.state.bookingDraft;
    document.getElementById('payment-total-display').textContent = `$${draft.total.toLocaleString()}`;
    
    // Live card preview typing
    const cardInput = document.getElementById('card-number-input');
    const cardNameInput = document.getElementById('card-name-input');
    const cardExpInput = document.getElementById('card-exp-input');

    if (cardInput) {
      cardInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '').substring(0, 16);
        val = val.match(/.{1,4}/g)?.join(' ') || val;
        e.target.value = val;
        document.getElementById('card-preview-number').textContent = val || '•••• •••• •••• ••••';
      });
    }

    if (cardNameInput) {
      cardNameInput.addEventListener('input', (e) => {
        document.getElementById('card-preview-holder').textContent = e.target.value.toUpperCase() || 'ALEXANDER VANCE';
      });
    }

    if (cardExpInput) {
      cardExpInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '').substring(0, 4);
        if (val.length >= 2) val = val.substring(0, 2) + '/' + val.substring(2);
        e.target.value = val;
        document.getElementById('card-preview-expiry').textContent = val || '12/28';
      });
    }
  },

  renderBookingStep5Confirmation() {
    const draft = this.state.bookingDraft;
    const newBookingId = `VP-${Math.floor(100000 + Math.random() * 900000)}`;

    const confirmedBooking = {
      id: newBookingId,
      hotelId: draft.hotel.id,
      hotelName: draft.hotel.name,
      roomName: draft.room.name,
      location: draft.hotel.destination,
      image: draft.hotel.mainImage,
      checkIn: draft.checkIn,
      checkOut: draft.checkOut,
      nights: draft.nights,
      guests: draft.adults,
      guestName: draft.guestName,
      guestEmail: draft.guestEmail,
      guestPhone: draft.guestPhone,
      totalAmount: draft.total,
      status: 'Confirmed',
      paymentMethod: 'Amex Centurion **** 8092',
      specialRequests: draft.specialRequests || 'VIP Welcome Champagne on arrival.'
    };

    // Save to State and LocalStorage
    this.state.bookings.unshift(confirmedBooking);
    localStorage.setItem('vela_bookings', JSON.stringify(this.state.bookings));

    // Populate Confirmation UI
    document.getElementById('confirm-booking-id').textContent = newBookingId;
    document.getElementById('confirm-hotel-name').textContent = confirmedBooking.hotelName;
    document.getElementById('confirm-room-name').textContent = confirmedBooking.roomName;
    document.getElementById('confirm-guest-name').textContent = confirmedBooking.guestName;
    document.getElementById('confirm-dates').textContent = `${confirmedBooking.checkIn} to ${confirmedBooking.checkOut} (${confirmedBooking.nights} Nights)`;
    document.getElementById('confirm-total').textContent = `$${confirmedBooking.totalAmount.toLocaleString()}`;

    this.showToast('Reservation Confirmed! Welcome to VELA PRIVÉ.', 'fa-circle-check');
  },

  nextBookingStep() {
    if (this.state.bookingStep === 2) {
      // Collect Guest Details
      const name = document.getElementById('guest-name-input')?.value.trim();
      const email = document.getElementById('guest-email-input')?.value.trim();
      const phone = document.getElementById('guest-phone-input')?.value.trim();
      const requests = document.getElementById('guest-requests-input')?.value.trim();

      if (!name || !email) {
        this.showToast('Please provide your name and contact email', 'fa-circle-exclamation');
        return;
      }

      this.state.bookingDraft.guestName = name;
      this.state.bookingDraft.guestEmail = email;
      this.state.bookingDraft.guestPhone = phone || '+1 (555) 392-8812';
      this.state.bookingDraft.specialRequests = requests;
    }

    if (this.state.bookingStep < 5) {
      this.state.bookingStep++;
      this.updateBookingStepUI();
    }
  },

  prevBookingStep() {
    if (this.state.bookingStep > 1) {
      this.state.bookingStep--;
      this.updateBookingStepUI();
    }
  },

  // Customer Dashboard
  renderCustomerDashboard() {
    const bookingsList = document.getElementById('my-bookings-container');
    const wishlistContainer = document.getElementById('my-wishlist-container');

    // Upcoming & Past Bookings
    if (bookingsList) {
      if (this.state.bookings.length === 0) {
        bookingsList.innerHTML = `
          <div class="glass-panel" style="text-align: center; padding: 48px;">
            <i class="fa-solid fa-suitcase-rolling" style="font-size: 2.5rem; color: var(--gold-primary); margin-bottom: 16px;"></i>
            <h3>No Active Stays Found</h3>
            <p style="color: var(--text-secondary); margin-bottom: 20px;">You do not have any upcoming reservations with VELA PRIVÉ.</p>
            <button class="btn-gold" onclick="VelaApp.switchView('home')">Explore Sanctuaries</button>
          </div>
        `;
      } else {
        bookingsList.innerHTML = this.state.bookings.map(b => `
          <div class="glass-panel" style="padding: 24px; margin-bottom: 20px; display: grid; grid-template-columns: 180px 1fr auto; gap: 24px; align-items: center;">
            <img src="${b.image}" alt="${b.hotelName}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 12px;" />
            <div>
              <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 6px;">
                <span class="status-badge ${b.status.toLowerCase()}">${b.status}</span>
                <span style="font-family: monospace; font-size: 0.85rem; color: var(--gold-light);">${b.id}</span>
              </div>
              <h4 style="font-family: var(--font-serif); font-size: 1.25rem; margin-bottom: 4px;">${b.hotelName}</h4>
              <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 6px;">${b.roomName}</p>
              <div style="font-size: 0.85rem; color: var(--text-muted); display: flex; gap: 16px;">
                <span><i class="fa-solid fa-calendar"></i> ${b.checkIn} → ${b.checkOut}</span>
                <span><i class="fa-solid fa-user"></i> ${b.guestName}</span>
                <span><i class="fa-solid fa-receipt"></i> $${b.totalAmount.toLocaleString()}</span>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <button class="btn-outline" style="padding: 8px 16px; font-size: 0.8rem;" onclick="VelaApp.viewBookingVoucher('${b.id}')">
                <i class="fa-solid fa-ticket"></i> View Voucher
              </button>
              ${b.status !== 'Cancelled' ? `
                <button class="btn-outline" style="padding: 8px 16px; font-size: 0.8rem; border-color: rgba(239, 68, 68, 0.4); color: var(--accent-ruby);" onclick="VelaApp.cancelBooking('${b.id}')">
                  Cancel Stay
                </button>
              ` : ''}
            </div>
          </div>
        `).join('');
      }
    }

    // Wishlist Tab
    if (wishlistContainer) {
      const savedHotels = this.state.hotels.filter(h => this.state.wishlist.includes(h.id));
      if (savedHotels.length === 0) {
        wishlistContainer.innerHTML = `
          <div class="glass-panel" style="text-align: center; padding: 48px;">
            <i class="fa-solid fa-heart" style="font-size: 2.5rem; color: var(--gold-primary); margin-bottom: 16px;"></i>
            <h3>Your Wishlist is Empty</h3>
            <p style="color: var(--text-secondary); margin-bottom: 20px;">Explore our private sanctuaries and save your favorites.</p>
            <button class="btn-gold" onclick="VelaApp.switchView('home')">Discover Properties</button>
          </div>
        `;
      } else {
        wishlistContainer.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
            <span style="font-size: 1rem; color: var(--text-secondary);">Saved (${savedHotels.length} Properties)</span>
            <button class="btn-outline" style="font-size: 0.85rem;" onclick="VelaApp.openCompareModal()">
              <i class="fa-solid fa-code-compare"></i> Compare Properties
            </button>
          </div>
          <div class="hotels-grid">
            ${savedHotels.map(hotel => `
              <div class="hotel-card">
                <div class="card-media">
                  <img class="card-image" src="${hotel.mainImage}" alt="${hotel.name}" />
                  <button class="favorite-btn favorited" onclick="VelaApp.toggleWishlist('${hotel.id}', event)">
                    <i class="fa-solid fa-heart"></i>
                  </button>
                </div>
                <div class="card-content">
                  <span class="card-location"><i class="fa-solid fa-location-dot"></i> ${hotel.destination}</span>
                  <h4 class="card-title">${hotel.name}</h4>
                  <div class="card-footer">
                    <div>
                      <span class="price-starting">From</span>
                      <span class="price-value">$${hotel.startingPrice.toLocaleString()}</span>
                    </div>
                    <button class="btn-gold" style="padding: 8px 16px; font-size: 0.85rem;" onclick="VelaApp.openHotelDetails('${hotel.id}')">
                      View
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        `;
      }
    }
  },

  switchDashboardTab(tabName) {
    document.querySelectorAll('.dash-tab-btn').forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-tab') === tabName);
    });

    const panes = ['trips', 'wishlist', 'loyalty', 'profile'];
    panes.forEach(p => {
      const el = document.getElementById(`dash-pane-${p}`);
      if (el) el.style.display = p === tabName ? 'block' : 'none';
    });
  },

  cancelBooking(bookingId) {
    const booking = this.state.bookings.find(b => b.id === bookingId);
    if (booking && confirm(`Are you sure you want to cancel your reservation at ${booking.hotelName}?`)) {
      booking.status = 'Cancelled';
      localStorage.setItem('vela_bookings', JSON.stringify(this.state.bookings));
      this.renderCustomerDashboard();
      this.showToast(`Reservation ${bookingId} cancelled`, 'fa-circle-xmark');
    }
  },

  viewBookingVoucher(bookingId) {
    const booking = this.state.bookings.find(b => b.id === bookingId);
    if (!booking) return;

    this.state.bookingDraft.hotel = { name: booking.hotelName, destination: booking.location };
    this.state.bookingDraft.room = { name: booking.roomName };
    this.state.bookingDraft.checkIn = booking.checkIn;
    this.state.bookingDraft.checkOut = booking.checkOut;
    this.state.bookingDraft.nights = booking.nights;
    this.state.bookingDraft.adults = booking.guests;
    this.state.bookingDraft.guestName = booking.guestName;
    this.state.bookingDraft.total = booking.totalAmount;

    this.state.bookingStep = 5;
    this.updateBookingStepUI();

    document.getElementById('confirm-booking-id').textContent = booking.id;
    document.getElementById('confirm-hotel-name').textContent = booking.hotelName;
    document.getElementById('confirm-room-name').textContent = booking.roomName;
    document.getElementById('confirm-guest-name').textContent = booking.guestName;
    document.getElementById('confirm-dates').textContent = `${booking.checkIn} to ${booking.checkOut} (${booking.nights} Nights)`;
    document.getElementById('confirm-total').textContent = `$${booking.totalAmount.toLocaleString()}`;

    const bookingModal = document.getElementById('booking-flow-modal');
    if (bookingModal) bookingModal.classList.add('active');
  },

  // Wishlist Comparison Modal
  openCompareModal() {
    const savedHotels = this.state.hotels.filter(h => this.state.wishlist.includes(h.id));
    if (savedHotels.length < 2) {
      this.showToast('Please add at least 2 properties to your wishlist to compare them', 'fa-info');
      return;
    }

    const modal = document.getElementById('compare-modal');
    const tableBody = document.getElementById('compare-table-body');
    if (!modal || !tableBody) return;

    tableBody.innerHTML = `
      <tr>
        <th style="padding: 12px; color: var(--gold-primary);">Property</th>
        ${savedHotels.map(h => `<td style="padding: 12px; font-weight: 700;">${h.name}</td>`).join('')}
      </tr>
      <tr>
        <th style="padding: 12px; color: var(--gold-primary);">Location</th>
        ${savedHotels.map(h => `<td style="padding: 12px;">${h.destination}</td>`).join('')}
      </tr>
      <tr>
        <th style="padding: 12px; color: var(--gold-primary);">Nightly Rate</th>
        ${savedHotels.map(h => `<td style="padding: 12px; font-family: var(--font-display); color: var(--gold-light); font-weight: 700;">$${h.startingPrice.toLocaleString()}</td>`).join('')}
      </tr>
      <tr>
        <th style="padding: 12px; color: var(--gold-primary);">Guest Rating</th>
        ${savedHotels.map(h => `<td style="padding: 12px;">★ ${h.rating.toFixed(2)} (${h.reviewsCount} reviews)</td>`).join('')}
      </tr>
      <tr>
        <th style="padding: 12px; color: var(--gold-primary);">Key Amenities</th>
        ${savedHotels.map(h => `<td style="padding: 12px; font-size: 0.85rem;">${h.amenities.slice(0, 4).join(', ')}</td>`).join('')}
      </tr>
      <tr>
        <th style="padding: 12px; color: var(--gold-primary);">Action</th>
        ${savedHotels.map(h => `
          <td style="padding: 12px;">
            <button class="btn-gold" style="padding: 8px 16px; font-size: 0.8rem;" onclick="VelaApp.openHotelDetails('${h.id}'); document.getElementById('compare-modal').classList.remove('active');">
              View Sanctuary
            </button>
          </td>
        `).join('')}
      </tr>
    `;

    modal.classList.add('active');
  },

  // Admin Dashboard Management Portal
  renderAdminDashboard() {
    // KPI Calculations
    const totalRev = this.state.bookings.reduce((sum, b) => b.status !== 'Cancelled' ? sum + b.totalAmount : sum, 0);
    const activeBookings = this.state.bookings.filter(b => b.status === 'Confirmed').length;
    const totalRooms = this.state.hotels.reduce((sum, h) => sum + h.rooms.reduce((rSum, r) => rSum + r.availableCount, 0), 0);
    const occupancyRate = Math.min(94, Math.round((activeBookings / (totalRooms || 25)) * 100) + 72);

    document.getElementById('admin-kpi-revenue').textContent = `$${totalRev.toLocaleString()}`;
    document.getElementById('admin-kpi-bookings').textContent = this.state.bookings.length;
    document.getElementById('admin-kpi-occupancy').textContent = `${occupancyRate}%`;
    document.getElementById('admin-kpi-rooms').textContent = totalRooms;

    // Admin Bookings Table
    const tableBody = document.getElementById('admin-bookings-table-body');
    if (tableBody) {
      tableBody.innerHTML = this.state.bookings.map(b => `
        <tr>
          <td><strong style="font-family: monospace; color: var(--gold-light);">${b.id}</strong></td>
          <td>${b.guestName}</td>
          <td>${b.hotelName}</td>
          <td>${b.checkIn} → ${b.checkOut}</td>
          <td>$${b.totalAmount.toLocaleString()}</td>
          <td>
            <select class="form-control" style="padding: 4px 10px; font-size: 0.8rem;" onchange="VelaApp.updateBookingStatus('${b.id}', this.value)">
              <option value="Confirmed" ${b.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
              <option value="Checked In" ${b.status === 'Checked In' ? 'selected' : ''}>Checked In</option>
              <option value="Completed" ${b.status === 'Completed' ? 'selected' : ''}>Completed</option>
              <option value="Cancelled" ${b.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
          </td>
        </tr>
      `).join('');
    }

    // Room Inventory Controller
    const inventoryGrid = document.getElementById('admin-rooms-inventory');
    if (inventoryGrid) {
      inventoryGrid.innerHTML = this.state.hotels.map(h => `
        <div class="glass-panel" style="padding: 20px; margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h4 style="font-family: var(--font-serif); font-size: 1.15rem;">${h.name}</h4>
            <span style="font-size: 0.85rem; color: var(--gold-primary);">${h.destination}</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${h.rooms.map(r => `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: var(--bg-elevated); border-radius: 8px;">
                <span>${r.name} (${r.size})</span>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="color: var(--gold-light); font-weight: 600;">$${r.price}/nt</span>
                  <label style="display: flex; align-items: center; gap: 6px; font-size: 0.85rem; cursor: pointer;">
                    <input type="checkbox" ${r.availableCount > 0 ? 'checked' : ''} onchange="VelaApp.toggleRoomAvailability('${h.id}', '${r.id}', this.checked)" />
                    <span>Available</span>
                  </label>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('');
    }
  },

  updateBookingStatus(bookingId, newStatus) {
    const booking = this.state.bookings.find(b => b.id === bookingId);
    if (booking) {
      booking.status = newStatus;
      localStorage.setItem('vela_bookings', JSON.stringify(this.state.bookings));
      this.showToast(`Updated reservation ${bookingId} to ${newStatus}`, 'fa-pen-to-square');
    }
  },

  toggleRoomAvailability(hotelId, roomId, isAvailable) {
    const hotel = this.state.hotels.find(h => h.id === hotelId);
    if (hotel) {
      const room = hotel.rooms.find(r => r.id === roomId);
      if (room) {
        room.availableCount = isAvailable ? 3 : 0;
        localStorage.setItem('vela_hotels', JSON.stringify(this.state.hotels));
        this.showToast(`Room inventory updated for ${room.name}`, 'fa-boxes-stacked');
      }
    }
  },

  openAddHotelModal() {
    const modal = document.getElementById('add-hotel-modal');
    if (modal) modal.classList.add('active');
  },

  handleAddNewHotel() {
    const name = document.getElementById('new-hotel-name').value.trim();
    const destination = document.getElementById('new-hotel-destination').value.trim();
    const city = document.getElementById('new-hotel-city').value.trim();
    const country = document.getElementById('new-hotel-country').value.trim();
    const category = document.getElementById('new-hotel-category').value;
    const price = parseInt(document.getElementById('new-hotel-price').value) || 1500;
    const imageUrl = document.getElementById('new-hotel-image').value.trim() || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80';
    const description = document.getElementById('new-hotel-desc').value.trim() || 'A bespoke luxury sanctuary designed for distinguished international guests.';

    const newHotel = {
      id: `vela-${Date.now()}`,
      name,
      tagline: 'Private Luxury Sanctuary',
      destination,
      city,
      country,
      category,
      badge: 'New Collection 2026',
      rating: 5.0,
      reviewsCount: 1,
      startingPrice: price,
      currency: 'USD',
      mainImage: imageUrl,
      gallery: [imageUrl, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'],
      description,
      address: destination,
      coordinates: { lat: 0, lng: 0 },
      stars: 5,
      featured: true,
      trending: true,
      amenities: ['Private Butler', 'Panoramic Views', 'Fine Dining', 'Spa & Wellness', 'Free High-Speed Wi-Fi'],
      highlights: ['Newly added exclusive private collection property'],
      policies: {
        checkIn: '15:00',
        checkOut: '12:00',
        cancellation: 'Free cancellation up to 48 hours prior to arrival',
        pets: 'Upon inquiry',
        smoking: 'Non-smoking sanctuary'
      },
      rooms: [
        {
          id: `room-${Date.now()}-1`,
          name: 'Imperial Signature Suite',
          size: '85 m² / 915 sq ft',
          capacity: 2,
          bedType: '1 Grand Emperor King',
          price: price,
          discountPrice: null,
          image: imageUrl,
          amenities: ['Panoramic Views', 'Marble Bath', 'Champagne Welcome'],
          freeBreakfast: true,
          freeCancellation: true,
          availableCount: 3
        }
      ]
    };

    this.state.hotels.unshift(newHotel);
    localStorage.setItem('vela_hotels', JSON.stringify(this.state.hotels));

    document.getElementById('add-hotel-modal').classList.remove('active');
    document.getElementById('add-hotel-form').reset();

    this.renderHotels();
    this.renderAdminDashboard();
    this.showToast(`Sanctuary "${name}" successfully listed in luxury portfolio!`, 'fa-crown');
  },

  // Toast Notification System
  showToast(message, iconClass = 'fa-circle-info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i class="fa-solid ${iconClass}"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 20);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3800);
  }
};
