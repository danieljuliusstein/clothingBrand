// script.js

// DOM Elements
const filterButtons = document.querySelectorAll('.filter-btn');
const quickViewModal = document.getElementById('quickViewModal');
const quickViewContent = quickViewModal.querySelector('.quick-view-content');
const quickViewClose = quickViewModal.querySelector('.modal-close');
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
const modalClose = document.querySelector('.modal-close');
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
const productCards = document.querySelectorAll('.product-card');
const shopNowBtn = document.getElementById('cta-button');
const promoClose = document.querySelector('.close-promo');
const backToTop = document.getElementById('back-to-top');
const recentItemsContainer = document.getElementById('recent-items');
const sortSelect = document.getElementById('sort');

// State
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
let currentSlide = 0;
let isCartOpen = false;
let isWishlistOpen = false;
let isModalOpen = false;
let currentFilter = 'all';
// Initialize UI
function init() {
    updateCartUI();
    updateWishlistUI();
    updateSlide();
    updateRecentlyViewedUI();
    
}
init();

// Cart Functionality
function toggleCart() {
    isCartOpen = !isCartOpen;
    cartSidebar.style.transform = isCartOpen ? 'translateX(0)' : 'translateX(100%)';
}

cartBtn.addEventListener('click', toggleCart);
closeCartBtn.addEventListener('click', toggleCart);

function addToCart(button) {
    const productCard = button.closest('.product-card');
    const name = productCard.querySelector('h3').textContent;
    const price = parseFloat(productCard.querySelector('.price').textContent.replace('$', ''));
    const image = productCard.querySelector('img').src;

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

    if (!isCartOpen) toggleCart();
}

addToCartButtons.forEach(button => button.addEventListener('click', () => addToCart(button)));

function updateCartUI() {
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

    document.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', () => updateQuantity(btn.dataset.index, -1));
    });
    document.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', () => updateQuantity(btn.dataset.index, 1));
    });
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => removeFromCart(btn.dataset.index));
    });
}

function updateQuantity(index, change) {
    const item = cart[index];
    item.quantity = Math.max(1, item.quantity + change);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

// Wishlist Functionality
function toggleWishlist() {
    isWishlistOpen = !isWishlistOpen;
    wishlistSidebar.style.transform = isWishlistOpen ? 'translateX(0)' : 'translateX(100%)';
}

wishlistBtn.addEventListener('click', toggleWishlist);
closeWishlistBtn.addEventListener('click', toggleWishlist);

function updateWishlistUI() {
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

    document.querySelectorAll('.wishlist-item .remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            wishlist.splice(btn.dataset.index, 1);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            updateWishlistUI();
            updateProductCardWishlistUI();
        });
    });

    updateProductCardWishlistUI();
}

function updateProductCardWishlistUI() {
    wishlistToggles.forEach(toggle => {
        const productCard = toggle.closest('.product-card');
        const name = productCard.querySelector('h3').textContent;
        const icon = toggle.querySelector('i');
        const isInWishlist = wishlist.some(item => item.name === name);

        icon.classList.toggle('far', !isInWishlist);
        icon.classList.toggle('fas', isInWishlist);
        icon.style.color = isInWishlist ? '#d63031' : '';
    });

    document.querySelector('.wishlist-count').textContent = wishlist.length;
}

wishlistToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const productCard = toggle.closest('.product-card');
        const name = productCard.querySelector('h3').textContent;
        const price = parseFloat(productCard.querySelector('.price').textContent.replace('$', ''));
        const image = productCard.querySelector('img').src;

        const index = wishlist.findIndex(item => item.name === name);
        if (index === -1) {
            wishlist.push({ name, price, image });
        } else {
            wishlist.splice(index, 1);
        }

        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistUI();
    });
});

// Login Modal
function toggleModal() {
    isModalOpen = !isModalOpen;
    loginModal.style.display = isModalOpen ? 'flex' : 'none';
}

accountBtn.addEventListener('click', toggleModal);
modalClose.addEventListener('click', toggleModal);
loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) toggleModal();
});

// Hero Slider
function updateSlide() {
    slides.forEach((slide, index) => {
        slide.style.display = index === currentSlide ? 'block' : 'none';
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

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);
setInterval(nextSlide, 5000);

// Mobile Swipe for Hero Slider
let touchStartX = 0;
let touchEndX = 0;

heroSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

heroSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) nextSlide();
    if (touchEndX - touchStartX > swipeThreshold) prevSlide();
}

// Mobile Menu
menuToggle.addEventListener('click', () => {
    document.querySelector('.main-nav').classList.toggle('show');
});

// Checkout Functionality
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    checkoutModal.style.display = 'flex';
});

closeCheckoutModal.forEach(btn => btn.addEventListener('click', () => {
    checkoutModal.style.display = 'none';
}));

confirmCheckout.addEventListener('click', () => {
    alert('Thank you for your purchase!');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    checkoutModal.style.display = 'none';
    toggleCart();
});

// Product Search
function filterProducts() {
    const query = searchInput.value.trim().toLowerCase();
    productCards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = name.includes(query) ? 'block' : 'none';
    });
}

searchInput.addEventListener('input', filterProducts);
searchButton.addEventListener('click', filterProducts);

// Shop Now Button Functionality
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

// Promotional Banner
promoClose.addEventListener('click', () => {
    document.querySelector('.promo-banner').style.display = 'none';
    localStorage.setItem('promoDismissed', 'true');
});

if (localStorage.getItem('promoDismissed') === 'true') {
    document.querySelector('.promo-banner').style.display = 'none';
}

// Back-to-Top Button (Enhanced Version)
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
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

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    backToTop.classList.add('scrolling'); // Add class for click feedback
    setTimeout(() => backToTop.classList.remove('scrolling'), 300);
});

// Recently Viewed Products
function updateRecentlyViewedUI() {
    recentItemsContainer.innerHTML = '';
    recentlyViewed.slice(-3).forEach(item => { // Show last 3 viewed
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

    // Reattach event listeners for new elements
    recentItemsContainer.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => addToCart(btn));
    });
    recentItemsContainer.querySelectorAll('.wishlist-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = toggle.closest('.product-card');
            const name = productCard.querySelector('h3').textContent;
            const price = parseFloat(productCard.querySelector('.price').textContent.replace('$', ''));
            const image = productCard.querySelector('img').src;

            const index = wishlist.findIndex(item => item.name === name);
            if (index === -1) {
                wishlist.push({ name, price, image });
            } else {
                wishlist.splice(index, 1);
            }

            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            updateWishlistUI();
            updateRecentlyViewedUI();
        });
    });
}

productCards.forEach(card => {
    card.addEventListener('click', (e) => {
        if (e.target.closest('.add-to-cart') || e.target.closest('.wishlist-toggle')) return;
        const name = card.querySelector('h3').textContent;
        const price = parseFloat(card.querySelector('.price').textContent.replace('$', ''));
        const image = card.querySelector('img').src;
        if (!recentlyViewed.some(item => item.name === name)) {
            recentlyViewed.push({ name, price, image });
            localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
            updateRecentlyViewedUI();
        }
    });
});

// Product Sorting
function sortProducts() {
    const sortBy = sortSelect.value;
    const products = Array.from(productCards);
    const productsGrid = document.querySelector('.featured-products .products-grid');

    if (sortBy === 'name-asc') {
        products.sort((a, b) => a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent));
    } else if (sortBy === 'name-desc') {
        products.sort((a, b) => b.querySelector('h3').textContent.localeCompare(a.querySelector('h3').textContent));
    } else if (sortBy === 'price-low') {
        products.sort((a, b) => parseFloat(a.querySelector('.price').textContent.replace('$', '')) - parseFloat(b.querySelector('.price').textContent.replace('$', '')));
    } else if (sortBy === 'price-high') {
        products.sort((a, b) => parseFloat(b.querySelector('.price').textContent.replace('$', '')) - parseFloat(a.querySelector('.price').textContent.replace('$', '')));
    }

    productsGrid.innerHTML = '';
    products.forEach(product => productsGrid.appendChild(product));

    // Reattach event listeners after sorting
    productsGrid.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => addToCart(btn));
    });
    productsGrid.querySelectorAll('.wishlist-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = toggle.closest('.product-card');
            const name = productCard.querySelector('h3').textContent;
            const price = parseFloat(productCard.querySelector('.price').textContent.replace('$', ''));
            const image = productCard.querySelector('img').src;

            const index = wishlist.findIndex(item => item.name === name);
            if (index === -1) {
                wishlist.push({ name, price, image });
            } else {
                wishlist.splice(index, 1);
            }

            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            updateWishlistUI();
            updateRecentlyViewedUI();
        });
    });
}

sortSelect.addEventListener('change', sortProducts);

// Smooth Scroll
document.documentElement.style.scrollBehavior = 'smooth';

// Product Image Hover Effects
productCards.forEach(card => {
    const image = card.querySelector('img');
    card.addEventListener('mouseenter', () => image.style.transform = 'scale(1.05)');
    card.addEventListener('mouseleave', () => image.style.transform = 'scale(1)');
});

// Newsletter Form
document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    if (email) {
        alert('Thank you for subscribing!');
        e.target.reset();
    }
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, { rootMargin: '0px', threshold: 0.1 });

document.querySelectorAll('.category-card, .product-card').forEach(el => observer.observe(el));