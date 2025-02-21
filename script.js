document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const filterButtons = document.querySelectorAll('.filter-btn');
    const quickViewModal = document.getElementById('quickViewModal');
    const quickViewContent = quickViewModal?.querySelector('.quick-view-content');
    const quickViewClose = quickViewModal?.querySelector('.modal-close');
    const toast = document.getElementById('toast');
    const cartBtn = document.querySelector('.cart-btn');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCartBtn = document.querySelector('.close-cart');
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const menuToggle = document.querySelector('.menu-toggle');
    const wishlistBtn = document.querySelector('.wishlist-btn');
    const wishlistSidebar = document.querySelector('.wishlist-sidebar');
    const closeWishlistBtn = document.querySelector('.close-wishlist');
    const wishlistToggles = document.querySelectorAll('.wishlist-toggle');
    const wishlistItemsContainer = document.getElementById('wishlist-items');
    const loginModal = document.getElementById('loginModal');
    const accountBtn = document.querySelector('.account-btn');
    const modalClose = document.querySelector('#close-modal-btn');
    const heroSlider = document.querySelector('.hero-slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutModal = document.getElementById('checkoutModal');
    const closeCheckoutModal = document.querySelectorAll('#checkoutModal .modal-close');
    const confirmCheckout = document.getElementById('confirm-checkout');
    const searchInput = document.getElementById('product-search');
    const searchButton = document.getElementById('search-button');
    const shopNowBtn = document.getElementById('cta-button');
    const promoClose = document.querySelector('.close-promo');
    const backToTop = document.getElementById('back-to-top');
    const recentItemsContainer = document.getElementById('recent-items');
    const recentTrack = document.querySelector('.carousel-track');
    const recentPrevBtn = document.querySelector('.recently-viewed .carousel-arrow.prev');
    const recentNextBtn = document.querySelector('.recently-viewed .carousel-arrow.next');
    const sortSelect = document.getElementById('sort');
    const productCards = document.querySelectorAll('.product-card');
  
    // State
    let cart = [];
    try {
      cart = JSON.parse(localStorage.getItem('cart')) || [];
    } catch (e) {
      console.error('Cart parse error:', e);
    }
  
    let wishlist = [];
    try {
      wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    } catch (e) {
      console.error('Wishlist parse error:', e);
    }
  
    let recentlyViewed = [];
    try {
      recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    } catch (e) {
      console.error('Recently viewed parse error:', e);
    }
  
    let currentSlide = 0;
    let isCartOpen = false;
    let isWishlistOpen = false;
    let isModalOpen = false;
    let currentFilter = 'all';
  
    // Product data for suggestions
    const products = Array.from(productCards).map(card => ({
      name: card.querySelector('h3')?.textContent || '',
      price: parseFloat(card.querySelector('.price')?.textContent.replace('$', '') || '0'),
      image: card.querySelector('img')?.src || '',
      category: card.dataset.category || 'all'
    }));
  
    // Initialize Tippy.js for search suggestions
    const tippyInstance = tippy(searchInput, {
      content: '',
      placement: 'bottom',
      trigger: 'manual',
      interactive: true,
      maxWidth: 400,
      animation: 'shift-away',
      theme: 'light',
      onShow(instance) {
        const query = searchInput.value.trim();
        if (!query) return false;
      }
    });
  
    // Initialize UI
    function init() {
      updateCartUI();
      updateWishlistUI();
      updateSlide();
      updateRecentlyViewedUI();
      filterProductsByCategory();
      updateCarouselArrows();
      if (cartSidebar) cartSidebar.setAttribute('aria-expanded', 'false');
      if (wishlistSidebar) wishlistSidebar.setAttribute('aria-expanded', 'false');
      if (loginModal) loginModal.setAttribute('aria-hidden', 'true');
      filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.category === currentFilter));
    }
    init();
  
    // Cart Functions
    function toggleCart() {
      if (!cartSidebar) return;
      isCartOpen = !isCartOpen;
      cartSidebar.style.transform = isCartOpen ? 'translateX(0)' : 'translateX(100%)';
      cartSidebar.setAttribute('aria-expanded', isCartOpen);
    }
  
    function addToCart(button) {
      const productCard = button.closest('.product-card');
      if (!productCard) return;
      const name = productCard.querySelector('h3')?.textContent || 'Unknown Item';
      const priceText = productCard.querySelector('.price')?.textContent || '$0.00';
      const price = parseFloat(priceText.replace('$', '')) || 0;
      const image = productCard.querySelector('img')?.src || '';
  
      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ name, price, image, quantity: 1 });
      }
  
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartUI();
  
      button.textContent = 'Added to Cart ✓';
      button.style.backgroundColor = 'var(--success-color)';
      setTimeout(() => {
        button.textContent = 'Add to Cart';
        button.style.backgroundColor = '';
      }, 1500);
  
      showToast('Added to cart!', 'success');
      if (!isCartOpen) toggleCart();
    }
  
    function updateCartUI() {
      if (!cartCount || !cartItemsContainer || !cartTotal) return;
      cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartItemsContainer.innerHTML = '';
      let total = 0;
  
      cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
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
  
    // Wishlist Functions
    function toggleWishlist() {
      if (!wishlistSidebar) return;
      isWishlistOpen = !isWishlistOpen;
      wishlistSidebar.style.transform = isWishlistOpen ? 'translateX(0)' : 'translateX(100%)';
      wishlistSidebar.setAttribute('aria-expanded', isWishlistOpen);
    }
  
    function updateWishlistUI() {
      if (!wishlistItemsContainer) return;
      wishlistItemsContainer.innerHTML = '';
      wishlist.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('wishlist-item');
        itemElement.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div class="wishlist-item-details">
            <h4>${item.name}</h4>
            <p>$${item.price.toFixed(2)}</p>
            <button class="remove-btn" data-index="${index}">Remove</button>
          </div>
        `;
        wishlistItemsContainer.appendChild(itemElement);
      });
  
      updateProductCardWishlistUI();
    }
  
    function updateProductCardWishlistUI() {
      wishlistToggles.forEach(toggle => {
        const productCard = toggle.closest('.product-card');
        if (!productCard) return;
        const name = productCard.querySelector('h3')?.textContent || '';
        const icon = toggle.querySelector('i');
        if (!icon) return;
        const isInWishlist = wishlist.some(item => item.name === name);
  
        icon.classList.toggle('far', !isInWishlist);
        icon.classList.toggle('fas', isInWishlist);
        icon.style.color = isInWishlist ? '#ff4757' : '';
      });
  
      const wishlistCount = document.querySelector('.wishlist-count');
      if (wishlistCount) wishlistCount.textContent = wishlist.length;
    }
  
    // Login Modal Functions
    function toggleModal() {
      if (!loginModal) return;
      isModalOpen = !isModalOpen;
      loginModal.style.display = isModalOpen ? 'flex' : 'none';
      loginModal.setAttribute('aria-hidden', !isModalOpen);
    }
  
    // Hero Slider Functions
    function updateSlide() {
      slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
      });
    }
  
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlide();
    }
  
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlide();
    }
  
    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchStartX - touchEndX > swipeThreshold) nextSlide();
      if (touchEndX - touchStartX > swipeThreshold) prevSlide();
    }
  
    // Search and Filter Functions
    function showSuggestions(query) {
      if (!query) {
        tippyInstance.hide();
        return;
      }
  
      const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
  
      if (filteredProducts.length === 0) {
        tippyInstance.hide();
        return;
      }
  
      const suggestionHTML = filteredProducts.map(product => `
        <div class="suggestion-item" data-name="${product.name}">
          <img src="${product.image}" alt="${product.name}">
          <span>${product.name} - $${product.price.toFixed(2)}</span>
        </div>
      `).join('');
  
      tippyInstance.setContent(`<div>${suggestionHTML}</div>`);
      tippyInstance.show();
  
      tippyInstance.popper.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
          searchInput.value = item.dataset.name;
          tippyInstance.hide();
          filterProducts();
        });
      });
    }
  
    function filterProducts() {
      const query = searchInput?.value.trim().toLowerCase() || '';
      const allCards = document.querySelectorAll('.product-card');
      allCards.forEach(card => {
        const name = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const matchesSearch = name.includes(query);
        const matchesCategory = (currentFilter === 'all' || card.dataset.category === currentFilter);
        card.style.display = (matchesSearch && matchesCategory) ? 'block' : 'none';
      });
      showSuggestions(query);
    }
  
    function filterProductsByCategory() {
      const allCards = document.querySelectorAll('.product-card');
      allCards.forEach(card => {
        card.style.display = (currentFilter === 'all' || card.dataset.category === currentFilter) ? 'block' : 'none';
      });
    }
  
    // Recently Viewed Functions
    function updateRecentlyViewedUI() {
      if (!recentItemsContainer) return;
      recentItemsContainer.innerHTML = '';
      recentlyViewed.slice(-3).forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('product-card');
        itemElement.innerHTML = `
          <div class="product-image">
            <img src="${item.image}" alt="${item.name}">
            <button class="wishlist-toggle" aria-label="Add to Wishlist">
              <i class="${wishlist.some(w => w.name === item.name) ? 'fas' : 'far'} fa-heart"></i>
            </button>
            <div class="quick-add">
              <i class="fas fa-shopping-cart"></i> Quick Add
            </div>
          </div>
          <div class="product-info">
            <h3>${item.name}</h3>
            <div class="product-meta">
              <p class="price">$${item.price.toFixed(2)}</p>
            </div>
            <button class="add-to-cart">Add to Cart</button>
          </div>
        `;
        recentItemsContainer.appendChild(itemElement);
      });
  
      attachProductCardListeners(recentItemsContainer);
      updateCarouselArrows();
    }
  
    function updateCarouselArrows() {
      if (!recentTrack) return;
      const maxScroll = recentTrack.scrollWidth - recentTrack.clientWidth;
      if (recentPrevBtn) recentPrevBtn.style.display = recentTrack.scrollLeft > 0 ? 'block' : 'none';
      if (recentNextBtn) recentNextBtn.style.display = recentTrack.scrollLeft < maxScroll - 1 ? 'block' : 'none';
    }
  
    // Quick View Functions
    function showQuickView(productCard) {
      if (!quickViewModal || !quickViewContent) return;
      const name = productCard.querySelector('h3')?.textContent || 'Unknown Item';
      const priceText = productCard.querySelector('.price')?.textContent || '$0.00';
      const price = parseFloat(priceText.replace('$', '')) || 0;
      const image = productCard.querySelector('img')?.src || '';
      const colors = productCard.querySelector('.colors')?.innerHTML || '';
      const sizes = productCard.querySelector('.size-select')?.innerHTML || '<option>Select Size</option>';
  
      quickViewContent.innerHTML = `
        <img src="${image}" alt="${name}">
        <h3>${name}</h3>
        <p>$${price.toFixed(2)}</p>
        <div class="colors">${colors}</div>
        <select class="size-select">${sizes}</select>
        <button class="add-to-cart">Add to Cart</button>
      `;
      quickViewModal.style.display = 'flex';
  
      quickViewContent.querySelector('.add-to-cart').addEventListener('click', () => {
        const button = {
          closest: () => ({
            querySelector: sel => sel === 'h3' ? { textContent: name } : sel === '.price' ? { textContent: `$${price}` } : sel === 'img' ? { src: image } : null
          })
        };
        addToCart(button);
        quickViewModal.style.display = 'none';
      });
    }
  
    // Utility Functions
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
  
    function attachProductCardListeners(container) {
      container.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => addToCart(btn));
      });
      container.querySelectorAll('.wishlist-toggle').forEach(toggle => {
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
      container.querySelectorAll('.quick-add').forEach(btn => {
        btn.addEventListener('click', () => {
          const productCard = btn.closest('.product-card');
          if (productCard) showQuickView(productCard);
        });
      });
    }
  
    // Event Listeners
    if (cartBtn) cartBtn.addEventListener('click', toggleCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', toggleCart);
    addToCartButtons.forEach(button => button.addEventListener('click', () => addToCart(button)));
  
    if (cartItemsContainer) {
      cartItemsContainer.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        if (e.target.classList.contains('decrease')) updateQuantity(index, -1);
        if (e.target.classList.contains('increase')) updateQuantity(index, 1);
        if (e.target.classList.contains('remove-btn')) removeFromCart(index);
      });
    }
  
    if (wishlistBtn) wishlistBtn.addEventListener('click', toggleWishlist);
    if (closeWishlistBtn) closeWishlistBtn.addEventListener('click', toggleWishlist);
  
    if (accountBtn) accountBtn.addEventListener('click', toggleModal);
    if (modalClose) modalClose.addEventListener('click', toggleModal);
    if (loginModal) loginModal.addEventListener('click', e => {
      if (e.target === loginModal) toggleModal();
    });
  
    if (slides.length > 0) {
      slides.forEach(slide => slide.classList.remove('active'));
      slides[currentSlide].classList.add('active');
    }
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    setInterval(nextSlide, 5000);
  
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
  
    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        document.querySelector('.main-nav')?.classList.toggle('show');
      });
    }
  
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
          showToast('Your cart is empty!', 'error');
          return;
        }
        if (checkoutModal) checkoutModal.style.display = 'flex';
      });
    }
    closeCheckoutModal.forEach(btn => btn.addEventListener('click', () => {
      if (checkoutModal) checkoutModal.style.display = 'none';
    }));
    if (confirmCheckout) {
      confirmCheckout.addEventListener('click', () => {
        showToast('Purchase confirmed!', 'success');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
        if (checkoutModal) checkoutModal.style.display = 'none';
        toggleCart();
      });
    }
  
    let searchTimeout;
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          const query = searchInput.value.trim();
          filterProducts();
        }, 300);
      });
      searchInput.addEventListener('blur', () => {
        setTimeout(() => tippyInstance.hide(), 200);
      });
      searchInput.addEventListener('focus', () => {
        const query = searchInput.value.trim();
        if (query) showSuggestions(query);
      });
    }
    if (searchButton) searchButton.addEventListener('click', filterProducts);
  
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.category;
        filterProductsByCategory();
      });
    });
  
    if (shopNowBtn) {
      shopNowBtn.addEventListener('click', () => {
        const featuredProductsSection = document.querySelector('.featured-products');
        if (featuredProductsSection) {
          featuredProductsSection.scrollIntoView({ behavior: 'smooth' });
          shopNowBtn.style.transform = 'scale(0.95)';
          setTimeout(() => {
            shopNowBtn.style.transform = 'scale(1)';
          }, 200);
        }
      });
    }
  
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
  
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      if (!backToTop) return;
      if (scrollPosition > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
        backToTop.style.transform = 'translateY(0)';
      } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
        backToTop.style.transform = 'translateY(20px)';
      }
    });
    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        backToTop.classList.add('scrolling');
        setTimeout(() => backToTop.classList.remove('scrolling'), 300);
      });
    }
  
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', e => {
        if (e.target.closest('.add-to-cart') || e.target.closest('.wishlist-toggle') || e.target.closest('.quick-add')) return;
        const name = card.querySelector('h3')?.textContent || '';
        const priceText = card.querySelector('.price')?.textContent || '$0.00';
        const price = parseFloat(priceText.replace('$', '')) || 0;
        const image = card.querySelector('img')?.src || '';
        if (!recentlyViewed.some(item => item.name === name)) {
          recentlyViewed.push({ name, price, image });
          localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
          updateRecentlyViewedUI();
        }
      });
    });
  
    if (recentTrack) {
      if (recentPrevBtn) recentPrevBtn.addEventListener('click', () => {
        recentTrack.scrollBy({ left: -300, behavior: 'smooth' });
      });
      if (recentNextBtn) recentNextBtn.addEventListener('click', () => {
        recentTrack.scrollBy({ left: 300, behavior: 'smooth' });
      });
      recentTrack.addEventListener('scroll', updateCarouselArrows);
    }
  
    function sortProducts() {
      if (!sortSelect) return;
      const sortBy = sortSelect.value;
      const productsGrid = document.querySelector('.products-grid');
      if (!productsGrid) return;
      const products = Array.from(productsGrid.querySelectorAll('.product-card'));
  
      if (sortBy === 'name-asc') {
        products.sort((a, b) => (a.querySelector('h3')?.textContent || '').localeCompare(b.querySelector('h3')?.textContent || ''));
      } else if (sortBy === 'name-desc') {
        products.sort((a, b) => (b.querySelector('h3')?.textContent || '').localeCompare(a.querySelector('h3')?.textContent || ''));
      } else if (sortBy === 'price-low') {
        products.sort((a, b) => (parseFloat(a.querySelector('.price')?.textContent.replace('$', '') || 0)) - (parseFloat(b.querySelector('.price')?.textContent.replace('$', '') || 0)));
      } else if (sortBy === 'price-high') {
        products.sort((a, b) => (parseFloat(b.querySelector('.price')?.textContent.replace('$', '') || 0)) - (parseFloat(a.querySelector('.price')?.textContent.replace('$', '') || 0)));
      }
  
      productsGrid.innerHTML = '';
      products.forEach(product => productsGrid.appendChild(product));
      attachProductCardListeners(productsGrid);
    }
  
    if (sortSelect) sortSelect.addEventListener('change', sortProducts);
  
    document.querySelectorAll('.quick-add').forEach(btn => {
      btn.addEventListener('click', () => {
        const productCard = btn.closest('.product-card');
        if (productCard) showQuickView(productCard);
      });
    });
    if (quickViewClose) quickViewClose.addEventListener('click', () => {
      if (quickViewModal) quickViewModal.style.display = 'none';
    });
    if (quickViewModal) quickViewModal.addEventListener('click', e => {
      if (e.target === quickViewModal) quickViewModal.style.display = 'none';
    });
  
    document.documentElement.style.scrollBehavior = 'smooth';
  
    document.querySelectorAll('.product-card').forEach(card => {
      const image = card.querySelector('img');
      if (image) {
        card.addEventListener('mouseenter', () => image.style.transform = 'scale(1.05)');
        card.addEventListener('mouseleave', () => image.style.transform = 'scale(1)');
      }
    });
  
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = e.target.querySelector('input')?.value || '';
        if (email) {
          showToast('Thank you for subscribing!', 'success');
          e.target.reset();
        }
      });
    }
  
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
  