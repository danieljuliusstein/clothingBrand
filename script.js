document.addEventListener('DOMContentLoaded', () => {
  // ESSENCE Product Data (from your script, expanded with hover images)
  const products = [
    { id: 1, name: 'Essential Training Tee', price: 45, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab', hoverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f', loading: 'lazy', sizes: ['S', 'M', 'L', 'XL'] },
    { id: 2, name: 'Performance Shorts', price: 55, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3', hoverImage: 'https://images.unsplash.com/photo-1539533020942-63f77d96d6c5', loading: 'lazy', sizes: ['S', 'M', 'L', 'XL'] },
    { id: 3, name: 'Seamless Sports Bra', price: 40, image: 'https://images.unsplash.com/photo-1518674660708-0e2c0473e68e', hoverImage: 'https://images.unsplash.com/photo-1518674660709-0e2c0473e68f', loading: 'lazy', sizes: ['XS', 'S', 'M', 'L'] },
    { id: 4, name: 'Training Joggers', price: 65, image: 'https://images.unsplash.com/photo-1483721310020-03333e577078', hoverImage: 'https://images.unsplash.com/photo-1483721310021-03333e577079', loading: 'lazy', sizes: ['S', 'M', 'L', 'XL'] },
    { id: 5, name: 'Compression Leggings', price: 60, image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8', hoverImage: 'https://images.unsplash.com/photo-1506629082956-511b1aa562c9', loading: 'lazy', sizes: ['XS', 'S', 'M', 'L'] },
    { id: 6, name: 'Workout Tank', price: 35, image: 'https://images.unsplash.com/photo-1518674660708-0e2c0473e68e', hoverImage: 'https://images.unsplash.com/photo-1518674660709-0e2c0473e68f', loading: 'lazy', sizes: ['S', 'M', 'L', 'XL'] },
    { id: 7, name: 'Lightweight Jacket', price: 85, image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b', hoverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0c', loading: 'lazy', sizes: ['S', 'M', 'L', 'XL'] },
    { id: 8, name: 'Training Hoodie', price: 75, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7', hoverImage: 'https://images.unsplash.com/photo-1556821840-3a63f95609a8', loading: 'lazy', sizes: ['S', 'M', 'L', 'XL'] },
    { id: 9, name: 'Performance Socks', price: 15, image: 'https://images.unsplash.com/photo-1533678725663-c4b9f92d5634', hoverImage: 'https://images.unsplash.com/photo-1533678725664-c4b9f92d5635', loading: 'lazy', sizes: ['S', 'M', 'L'] },
    { id: 10, name: 'Compression Shorts', price: 45, image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509', hoverImage: 'https://images.unsplash.com/photo-1517438476313-10d79c077510', loading: 'lazy', sizes: ['S', 'M', 'L', 'XL'] },
    { id: 11, name: 'Training Cap', price: 25, image: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc', hoverImage: 'https://images.unsplash.com/photo-1575428652378-a2d80e2277fd', loading: 'lazy', sizes: ['One Size'] },
    { id: 12, name: 'Workout Gloves', price: 30, image: 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee', hoverImage: 'https://images.unsplash.com/photo-1583473848883-f9a5bc7fd2ef', loading: 'lazy', sizes: ['S', 'M', 'L'] }
  ];

  // DOM Elements (merged from both scripts)
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const quickViewModal = document.getElementById('quickViewModal');
  const quickViewContent = quickViewModal?.querySelector('.quick-view-content');
  const quickViewClose = quickViewModal?.querySelector('.modal-close');
  const toast = document.getElementById('toast');
  const cartBtn = document.getElementById('cartBtn') || document.querySelector('.cart-btn');
  const cartSidebar = document.getElementById('cartSidebar') || document.querySelector('.cart-sidebar');
  const closeCartBtn = document.getElementById('closeCart') || document.querySelector('.close-cart');
  const cartCount = document.getElementById('cartCount') || document.getElementById('cart-count');
  const cartItemsContainer = document.getElementById('cartItems') || document.getElementById('cart-items');
  const cartTotal = document.getElementById('cartTotal') || document.getElementById('cart-total');
  const wishlistBtn = document.getElementById('wishlistBtn') || document.querySelector('.wishlist-btn');
  const wishlistSidebar = document.getElementById('wishlistSidebar') || document.querySelector('.wishlist-sidebar');
  const closeWishlistBtn = document.getElementById('closeWishlist') || document.querySelector('.close-wishlist');
  const wishlistCount = document.getElementById('wishlistCount');
  const wishlistItemsContainer = document.getElementById('wishlistItems') || document.getElementById('wishlist-items');
  const loginModal = document.getElementById('loginModal');
  const accountBtn = document.querySelector('.account-btn');
  const modalClose = document.querySelector('#close-modal-btn');
  const heroSlider = document.querySelector('.hero-slider');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prevSlide') || document.querySelector('.slider-arrow.prev');
  const nextBtn = document.getElementById('nextSlide') || document.querySelector('.slider-arrow.next');
  const checkoutBtn = document.getElementById('checkout-btn');
  const checkoutModal = document.getElementById('checkoutModal');
  const closeCheckoutModal = document.querySelectorAll('#checkoutModal .modal-close');
  const confirmCheckout = document.getElementById('confirm-checkout');
  const searchInput = document.getElementById('product-search');
  const searchButton = document.getElementById('search-button');
  const shopNowBtn = document.getElementById('cta-button');
  const promoClose = document.querySelector('.close-promo');
  const backToTop = document.getElementById('backToTop') || document.getElementById('back-to-top');
  const productsGrid = document.getElementById('productsGrid');
  const recentItemsContainer = document.getElementById('recent-items');
  const recentTrack = document.querySelector('.carousel-track');
  const recentPrevBtn = document.querySelector('.recently-viewed .carousel-arrow.prev');
  const recentNextBtn = document.querySelector('.recently-viewed .carousel-arrow.next');

  // State (merged from both scripts)
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem('cart')) || []; } catch (e) { console.error('Cart parse error:', e); }
  let wishlist = [];
  try { wishlist = JSON.parse(localStorage.getItem('wishlist')) || []; } catch (e) { console.error('Wishlist parse error:', e); }
  let recentlyViewed = [];
  try { recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || []; } catch (e) { console.error('Recently viewed parse error:', e); }
  let currentSlide = 0;
  let isCartOpen = false;
  let isWishlistOpen = false;
  let isModalOpen = false;

  // Render ESSENCE Products with Lazy Loading and Hover Images
  function renderProducts() {
    productsGrid.innerHTML = products.map(product => `
      <div class="product-card group relative animate-fade-in">
        <div class="relative overflow-hidden mb-2 aspect-w-1 aspect-h-1">
          <img 
            src="${product.image}" 
            data-hover="${product.hoverImage}"
            alt="${product.name}" 
            class="w-full h-full object-cover lazy-image transition-opacity duration-300"
            loading="lazy"
            onload="this.classList.add('loaded')"
          >
          <img 
            src="${product.hoverImage}" 
            alt="${product.name} hover" 
            class="absolute top-0 left-0 w-full h-full object-cover hover-image opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            loading="lazy"
          >
          <button 
            class="wishlist-toggle absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition" 
            aria-label="Add to Wishlist"
            data-id="${product.id}"
          >
            <i class="${wishlist.some(w => w.id === product.id) ? 'fas' : 'far'} fa-heart text-red-500"></i>
          </button>
          <div class="quick-add absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-center py-2 transform translate-y-full group-hover:translate-y-0 transition">
            Quick View
          </div>
        </div>
        <div class="p-2">
          <h3 class="text-sm font-semibold mb-1">${product.name}</h3>
          <div class="flex justify-between items-center">
            <span class="text-sm">$${product.price}</span>
            <button 
              onclick="addToCart(${product.id})"
              class="add-to-cart bg-black text-white text-sm px-3 py-1 hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Add event listeners for wishlist toggles after rendering
    document.querySelectorAll('.wishlist-toggle').forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = parseInt(toggle.dataset.id);
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const index = wishlist.findIndex(item => item.id === product.id);
        if (index === -1) {
          wishlist.push({ id: product.id, name: product.name, price: product.price, image: product.image });
          toggle.querySelector('i').classList.replace('far', 'fas');
          showToast('Added to wishlist!', 'success');
        } else {
          wishlist.splice(index, 1);
          toggle.querySelector('i').classList.replace('fas', 'far');
          showToast('Removed from wishlist!', 'success');
        }

        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistUI();
      });
    });

    // Lazy Loading Observer
    const lazyImages = document.querySelectorAll('.lazy-image');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    }, { rootMargin: '100px' });
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // Add to Cart (merged from both scripts)
  window.addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      const existingItem = cart.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartUI();
      showToast('Added to cart!', 'success');
      if (!isCartOpen) toggleCart();
    }
  };

  // Initialize UI (from Stylish Threads)
  function init() {
    renderProducts();
    updateCartUI();
    updateWishlistUI();
    updateSlide();
    updateRecentlyViewedUI();
    if (cartSidebar) cartSidebar.setAttribute('aria-expanded', 'false');
    if (wishlistSidebar) wishlistSidebar.setAttribute('aria-expanded', 'false');
    if (loginModal) loginModal.setAttribute('aria-hidden', 'true');

    // Highlight Active Link (from your script)
    const mainNavLinks = document.querySelectorAll('.main-nav a');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    mainNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === currentPath);
    });
  }
  init();

  // Mobile Menu (from Stylish Threads)
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('show');
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true';
      menuToggle.setAttribute('aria-expanded', expanded);
    });
    document.addEventListener('click', (event) => {
      if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
        mainNav.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Cart Functionality (from Stylish Threads)
  function toggleCart() {
    if (!cartSidebar) return;
    isCartOpen = !isCartOpen;
    cartSidebar.style.transform = isCartOpen ? 'translateX(0)' : 'translateX(100%)';
    cartSidebar.setAttribute('aria-expanded', isCartOpen);
  }

  if (cartBtn) cartBtn.addEventListener('click', toggleCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', toggleCart);

  function updateCartUI() {
    if (!cartCount || !cartItemsContainer || !cartTotal) return;
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.quantity;
      const itemElement = document.createElement('div');
      itemElement.classList.add('cart-item', 'animate-fade-in');
      itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover mr-4 lazy-image" loading="lazy" onload="this.classList.add('loaded')">
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p>$${item.price.toFixed(2)} x 
            <div class="quantity-controls">
              <button class="decrease" data-index="${index}">-</button>
              <span>${item.quantity}</span>
              <button class="increase" data-index="${index}">+</button>
            </div>
          </p>
          <button class="remove-btn" data-index="${index}">Remove</button>
        </div>
      `;
      cartItemsContainer.appendChild(itemElement);
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
  }

  if (cartItemsContainer) {
    cartItemsContainer.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      if (e.target.classList.contains('decrease')) updateQuantity(index, -1);
      if (e.target.classList.contains('increase')) updateQuantity(index, 1);
      if (e.target.classList.contains('remove-btn')) removeFromCart(index);
    });
  }

  function updateQuantity(index, change) {
    const item = cart[index];
    if (!item) return;
    item.quantity = Math.max(1, item.quantity + change);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
  }

  // Wishlist Functionality (from Stylish Threads)
  function toggleWishlist() {
    if (!wishlistSidebar) return;
    isWishlistOpen = !isWishlistOpen;
    wishlistSidebar.style.transform = isWishlistOpen ? 'translateX(0)' : 'translateX(100%)';
    wishlistSidebar.setAttribute('aria-expanded', isWishlistOpen);
  }

  if (wishlistBtn) wishlistBtn.addEventListener('click', toggleWishlist);
  if (closeWishlistBtn) closeWishlistBtn.addEventListener('click', toggleWishlist);

  function updateWishlistUI() {
    if (!wishlistItemsContainer || !wishlistCount) return;
    wishlistItemsContainer.innerHTML = '';
    wishlist.forEach((item, index) => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('wishlist-item', 'animate-fade-in');
      itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover mr-4 lazy-image" loading="lazy" onload="this.classList.add('loaded')">
        <div class="wishlist-item-details">
          <h4>${item.name}</h4>
          <p>$${item.price.toFixed(2)}</p>
          <button class="remove-btn" data-index="${index}">Remove</button>
        </div>
      `;
      wishlistItemsContainer.appendChild(itemElement);
    });

    wishlistCount.textContent = wishlist.length;

    // Update wishlist toggle icons in product grid
    document.querySelectorAll('.wishlist-toggle').forEach(toggle => {
      const productId = parseInt(toggle.dataset.id);
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('far', !wishlist.some(w => w.id === productId));
        icon.classList.toggle('fas', wishlist.some(w => w.id === productId));
      }
    });
  }

  if (wishlistItemsContainer) {
    wishlistItemsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-btn')) {
        const index = e.target.dataset.index;
        wishlist.splice(index, 1);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistUI();
      }
    });
  }

  // Login Modal (from Stylish Threads)
  function toggleModal() {
    if (!loginModal) return;
    isModalOpen = !isModalOpen;
    loginModal.style.display = isModalOpen ? 'flex' : 'none';
    loginModal.setAttribute('aria-hidden', !isModalOpen);
  }
  if (accountBtn) accountBtn.addEventListener('click', toggleModal);
  if (modalClose) modalClose.addEventListener('click', toggleModal);
  if (loginModal) loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) toggleModal();
  });

  // Hero Slider (from Stylish Threads)
  function updateSlide() {
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentSlide);
      slide.classList.toggle('opacity-100', index === currentSlide);
      slide.classList.toggle('opacity-0', index !== currentSlide);
    });
  }
  if (prevBtn) prevBtn.addEventListener('click', () => { currentSlide = (currentSlide - 1 + slides.length) % slides.length; updateSlide(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { currentSlide = (currentSlide + 1) % slides.length; updateSlide(); });
  setInterval(() => { currentSlide = (currentSlide + 1) % slides.length; updateSlide(); }, 5000);

  // Touch events for carousel (from Stylish Threads)
  let touchStartX = 0;
  let touchEndX = 0;

  if (heroSlider) {
    heroSlider.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    });

    heroSlider.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  }

  // Checkout Functionality (from Stylish Threads)
  if (checkoutBtn) checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) { showToast('Your cart is empty!', 'error'); return; }
    if (checkoutModal) checkoutModal.style.display = 'flex';
  });
  closeCheckoutModal.forEach(btn => btn.addEventListener('click', () => { if (checkoutModal) checkoutModal.style.display = 'none'; }));
  if (confirmCheckout) confirmCheckout.addEventListener('click', () => {
    showToast('Purchase confirmed!', 'success');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    if (checkoutModal) checkoutModal.style.display = 'none';
    toggleCart();
  });

  // Toast Notification (from Stylish Threads)
  function showToast(message, type = 'success') {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add(type);
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
      toast.classList.remove(type);
    }, 3000);
  }

  // Back-to-Top (merged from both scripts)
  window.addEventListener('scroll', () => {
    if (!backToTop) return;
    const scrollY = window.scrollY;
    backToTop.style.opacity = scrollY > 300 ? '1' : '0';
    backToTop.style.visibility = scrollY > 300 ? 'visible' : 'hidden';
    backToTop.style.transform = scrollY > 300 ? 'translateY(0)' : 'translateY(20px)';
    backToTop.classList.toggle('opacity-100', scrollY > 500); // From ESSENCE
    backToTop.classList.toggle('opacity-0', scrollY <= 500); // From ESSENCE
  });
  if (backToTop) backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    backToTop.classList.add('scrolling');
    setTimeout(() => backToTop.classList.remove('scrolling'), 300);
  });

  // Shop Now Button (from Stylish Threads)
  if (shopNowBtn) shopNowBtn.addEventListener('click', () => {
    document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
    shopNowBtn.style.transform = 'scale(0.95)';
    setTimeout(() => shopNowBtn.style.transform = 'scale(1)', 200);
  });

  // Recently Viewed Products (from Stylish Threads)
  function updateRecentlyViewedUI() {
    if (!recentItemsContainer) return;
    recentItemsContainer.innerHTML = '';
    recentlyViewed.slice(-3).forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('product-card', 'animate-fade-in');
      itemElement.innerHTML = `
        <div class="product-image relative overflow-hidden mb-2 aspect-w-1 aspect-h-1">
          <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover lazy-image" loading="lazy" onload="this.classList.add('loaded')">
          <button class="wishlist-toggle absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition" aria-label="Add to Wishlist">
            <i class="${wishlist.some(w => w.name === item.name) ? 'fas' : 'far'} fa-heart text-red-500"></i>
          </button>
          <div class="quick-add absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-center py-2 transform translate-y-full group-hover:translate-y-0 transition">
            <i class="fas fa-shopping-cart"></i> Quick Add
          </div>
        </div>
        <div class="product-info p-2">
          <h3>${item.name}</h3>
          <div class="product-meta flex justify-between items-center">
            <p class="price">$${item.price.toFixed(2)}</p>
          </div>
          <button class="add-to-cart bg-black text-white text-sm px-3 py-1 hover:bg-gray-800 transition">Add to Cart</button>
        </div>
      `;
      recentItemsContainer.appendChild(itemElement);
    });

    recentItemsContainer.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', () => {
        const productCard = btn.closest('.product-card');
        const product = {
          id: Date.now(), // Simple ID for recently viewed items
          name: productCard.querySelector('h3')?.textContent || 'Unknown Item',
          price: parseFloat(productCard.querySelector('.price')?.textContent.replace('$', '') || '0'),
          image: productCard.querySelector('img')?.src || ''
        };
        addToCart({ closest: () => productCard });
      });
    });
    recentItemsContainer.querySelectorAll('.wishlist-toggle').forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const productCard = toggle.closest('.product-card');
        if (!productCard) return;
        const name = productCard.querySelector('h3')?.textContent || '';
        const priceText = productCard.querySelector('.price')?.textContent || '$0.00';
        const price = parseFloat(priceText.replace('$', '')) || 0;
        const image = productCard.querySelector('img')?.src || '';

        const index = wishlist.findIndex(item => item.name === name);
        if (index === -1) {
          wishlist.push({ name, price, image });
          showToast('Added to wishlist!', 'success');
        } else {
          wishlist.splice(index, 1);
          showToast('Removed from wishlist!', 'success');
        }

        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistUI();
        updateRecentlyViewedUI();
      });
    });
    recentItemsContainer.querySelectorAll('.quick-add').forEach(btn => {
      btn.addEventListener('click', () => {
        const productCard = btn.closest('.product-card');
        if (productCard) showQuickView(productCard);
      });
    });

    updateCarouselArrows();
  }

  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.add-to-cart') || e.target.closest('.wishlist-toggle') || e.target.closest('.quick-add')) return;
      const name = card.querySelector('h3')?.textContent || '';
      const priceText = card.querySelector('.price')?.textContent || card.querySelector('.text-sm')?.textContent || '$0.00';
      const price = parseFloat(priceText.replace('$', '')) || 0;
      const image = card.querySelector('img')?.src || '';
      if (!recentlyViewed.some(item => item.name === name)) {
        recentlyViewed.push({ name, price, image });
        localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
        updateRecentlyViewedUI();
      }
    });
  });

  // Carousel Navigation (from Stylish Threads)
  function updateCarouselArrows() {
    if (!recentTrack) return;
    const maxScroll = recentTrack.scrollWidth - recentTrack.clientWidth;
    if (recentPrevBtn) recentPrevBtn.style.display = recentTrack.scrollLeft > 0 ? 'block' : 'none';
    if (recentNextBtn) recentNextBtn.style.display = recentTrack.scrollLeft < maxScroll - 1 ? 'block' : 'none';
  }

  if (recentTrack) {
    if (recentPrevBtn) recentPrevBtn.addEventListener('click', () => recentTrack.scrollBy({ left: -300, behavior: 'smooth' }));
    if (recentNextBtn) recentNextBtn.addEventListener('click', () => recentTrack.scrollBy({ left: 300, behavior: 'smooth' }));
    recentTrack.addEventListener('scroll', updateCarouselArrows);
  }

  // Quick View Modal (from Stylish Threads)
  function showQuickView(productCard) {
    if (!quickViewModal || !quickViewContent) return;
    const name = productCard.querySelector('h3')?.textContent || 'Unknown Item';
    const priceText = productCard.querySelector('.price')?.textContent || productCard.querySelector('.text-sm')?.textContent || '$0.00';
    const price = parseFloat(priceText.replace('$', '')) || 0;
    const image = productCard.querySelector('img')?.src || '';

    quickViewContent.innerHTML = `
      <img src="${image}" alt="${name}" class="lazy-image" loading="lazy" onload="this.classList.add('loaded')">
      <h3>${name}</h3>
      <p>$${price.toFixed(2)}</p>
      <button class="add-to-cart">Add to Cart</button>
    `;
    quickViewModal.style.display = 'flex';

    quickViewContent.querySelector('.add-to-cart').addEventListener('click', () => {
      const button = { closest: () => ({ querySelector: (sel) => sel === 'h3' ? { textContent: name } : sel === '.price' ? { textContent: `$${price}` } : sel === 'img' ? { src: image } : null }) };
      addToCart({ closest: () => ({ id: Date.now(), name, price, image }) });
      quickViewModal.style.display = 'none';
    });
  }

  document.querySelectorAll('.quick-add').forEach(btn => {
    btn.addEventListener('click', () => {
      const productCard = btn.closest('.product-card');
      if (productCard) showQuickView(productCard);
    });
  });

  if (quickViewClose) quickViewClose.addEventListener('click', () => { if (quickViewModal) quickViewModal.style.display = 'none'; });
  if (quickViewModal) quickViewModal.addEventListener('click', e => {
    if (e.target === quickViewModal) quickViewModal.style.display = 'none';
  });

  // Promotional Banner (from Stylish Threads)
  if (promoClose) {
    promoClose.addEventListener('click', () => {
      const banner = document.querySelector('.promo-banner');
      if (banner) banner.style.display = 'none';
      localStorage.setItem('promoDismissed', 'true');
    });
  }
  if (localStorage.getItem('promoDismissed') === 'true') {
    const banner = document.querySelector('.promo-banner');
    if (banner) banner.style.display = 'none';
  }

  // Newsletter Form (from Stylish Threads)
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = e.target.querySelector('input')?.value || '';
      if (email) {
        showToast('Thank you for subscribing!', 'success');
        e.target.reset();
      }
    });
  }

  // Product Search (merged from both scripts)
  function filterProducts() {
    const query = searchInput?.value.trim().toLowerCase() || '';
    const allCards = document.querySelectorAll('.product-card');
    allCards.forEach(card => {
      const name = card.querySelector('h3')?.textContent.toLowerCase() || '';
      card.style.display = name.includes(query) ? 'block' : 'none';
    });
  }

  // Search Suggestions (from your script)
  const searchBar = document.querySelector('.search-bar');
  const suggestionsContainer = document.createElement('div');
  suggestionsContainer.className = 'search-suggestions';
  if (searchBar) searchBar.appendChild(suggestionsContainer);

  function updateSuggestions(query) {
    const productCards = Array.from(document.querySelectorAll('.product-card'));
    const matches = productCards.filter(card =>
      card.querySelector('h3')?.textContent.toLowerCase().includes(query)
    ).slice(0, 5);

    suggestionsContainer.innerHTML = matches.map(card => `
      <div class="suggestion-item">
        <img src="${card.querySelector('img')?.src}" alt="" class="lazy-image" loading="lazy" onload="this.classList.add('loaded')">
        <span>${card.querySelector('h3')?.textContent}</span>
      </div>
    `).join('');
    suggestionsContainer.style.display = query && matches.length ? 'block' : 'none';
  }

  let searchTimeout;
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      const query = searchInput.value.trim().toLowerCase();
      searchTimeout = setTimeout(() => {
        updateSuggestions(query);
        filterProducts();
      }, 300);
    });
  }
  if (searchButton) searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();
    updateSuggestions(query);
    filterProducts();
  });

  if (suggestionsContainer) {
    suggestionsContainer.addEventListener('click', (e) => {
      const item = e.target.closest('.suggestion-item');
      if (item && searchInput) {
        searchInput.value = item.querySelector('span')?.textContent || '';
        suggestionsContainer.style.display = 'none';
        filterProducts();
      }
    });
  }

  // Smooth Scroll (from your script)
  document.documentElement.style.scrollBehavior = 'smooth';

  // Product Image Hover Effects (from your script)
  document.querySelectorAll('.product-card').forEach(card => {
    const image = card.querySelector('img');
    if (image) {
      card.addEventListener('mouseenter', () => image.style.transform = 'scale(1.05)');
      card.addEventListener('mouseleave', () => image.style.transform = 'scale(1)');
    }
  });

  // Intersection Observer for Animations (from your script)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px', threshold: 0.1 });

  document.querySelectorAll('.category-card, .product-card').forEach(el => observer.observe(el));
});