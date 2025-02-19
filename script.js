// DOM Elements
const cartBtn = document.querySelector('.cart-btn');
const cartSidebar = document.querySelector('.cart-sidebar');
const closeCartBtn = document.querySelector('.close-cart');
const cartCount = document.getElementById('cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const menuToggle = document.querySelector('.menu-toggle');
const wishlistToggles = document.querySelectorAll('.wishlist-toggle');
const loginModal = document.getElementById('loginModal');
const accountBtn = document.querySelector('.account-btn');
const modalClose = document.querySelector('.modal-close');
const heroSlider = document.querySelector('.hero-slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider-arrow.prev');
const nextBtn = document.querySelector('.slider-arrow.next');

// State
let itemsInCart = 0;
let currentSlide = 0;
let isCartOpen = false;
let isModalOpen = false;

// Cart Functionality
function toggleCart() {
    isCartOpen = !isCartOpen;
    cartSidebar.style.transform = isCartOpen ? 'translateX(0)' : 'translateX(100%)';
}

cartBtn.addEventListener('click', toggleCart);
closeCartBtn.addEventListener('click', toggleCart);

// Add to Cart
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        itemsInCart++;
        cartCount.textContent = itemsInCart;
        
        // Animation for cart count
        cartCount.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartCount.style.transform = 'scale(1)';
        }, 200);

        // Button feedback
        const originalText = button.textContent;
        button.textContent = 'Added to Cart ✓';
        button.style.backgroundColor = 'var(--success-color)';
        button.style.pointerEvents = 'none';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
            button.style.pointerEvents = 'auto';
        }, 1500);

        // Open cart sidebar
        if (!isCartOpen) {
            toggleCart();
        }
    });
});

// Wishlist Functionality
wishlistToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const icon = toggle.querySelector('i');
        icon.classList.toggle('far');
        icon.classList.toggle('fas');
        icon.style.color = icon.classList.contains('fas') ? '#d63031' : '';
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

// Auto-advance slider
setInterval(nextSlide, 5000);

// Mobile Menu
menuToggle.addEventListener('click', () => {
    document.querySelector('.main-nav').classList.toggle('show');
});

// Smooth Scroll
document.documentElement.style.scrollBehavior = 'smooth';

// Product Image Hover Effects
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    const image = card.querySelector('img');
    
    card.addEventListener('mouseenter', () => {
        image.style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1)';
    });
});

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        if (email) {
            // Here you would typically send this to your backend
            alert('Thank you for subscribing!');
            newsletterForm.reset();
        }
    });
}

// Initialize
updateSlide();

// Handle Mobile Swipe for Hero Slider
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
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide(); // Swipe left
        } else {
            prevSlide(); // Swipe right
        }
    }
}

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.category-card, .product-card').forEach(el => {
    observer.observe(el);
});

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("product-search");

searchButton.addEventListener("click", () => {
    const searchText = searchInput.value.trim();
    if (searchText) {
        console.log(`Searching for: ${searchText}`);
        // Add your search logic here
    }
});
