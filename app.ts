document.addEventListener('DOMContentLoaded', () => {
    // Get modal and buttons
    const openModalButton = document.getElementById('open-modal-btn') as HTMLButtonElement;
    const closeModalButton = document.getElementById('close-modal-btn') as HTMLButtonElement;
    const modal = document.getElementById('loginModal') as HTMLElement;
    const form = document.getElementById('login-form') as HTMLFormElement;
    const emailInput = document.getElementById('login-email') as HTMLInputElement;
    const passwordInput = document.getElementById('login-password') as HTMLInputElement;
    const errorMessage = document.getElementById('login-error-message') as HTMLElement;
  
    // Open modal when the "Sign In" button is clicked
    openModalButton.addEventListener('click', () => {
      modal.style.display = 'flex';
      // Ensure that inputs are reset each time the modal opens
      errorMessage.style.display = 'none';
      emailInput.value = '';
      passwordInput.value = '';
    });
  
    // Close modal when the "×" button is clicked
    closeModalButton.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  
    // Handle form submission
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
  
      // Basic validation
      if (!email || !password) {
        errorMessage.textContent = 'Both fields are required.';
        errorMessage.style.display = 'block';
        return;
      }
  
      // Simulating successful login submission
      console.log('Form submitted with:', { email, password });
  
      // Reset error message after submission
      errorMessage.style.display = 'none';
  
      // Here you can send the data to a server using fetch or XMLHttpRequest
      // Example: fetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) });
  
      // Close modal after successful submission (optional)
      modal.style.display = 'none';
    });
  
    // Dynamic input focus effect
    emailInput.addEventListener('focus', () => {
      emailInput.style.borderColor = '#007BFF'; // Highlight on focus (you can replace this color with your accent)
    });
  
    emailInput.addEventListener('blur', () => {
      emailInput.style.borderColor = ''; // Remove highlight when focus is lost
    });
  
    passwordInput.addEventListener('focus', () => {
      passwordInput.style.borderColor = '#007BFF'; // Highlight on focus
    });
  
    passwordInput.addEventListener('blur', () => {
      passwordInput.style.borderColor = ''; // Remove highlight when focus is lost
    });
  
    // Button hover effect using TypeScript (you can also use CSS for this, but this is a dynamic approach)
    const loginButton = document.getElementById('login-button') as HTMLButtonElement;
    loginButton.addEventListener('mouseover', () => {
      loginButton.style.backgroundColor = '#0056b3'; // Darken button color on hover
    });
  
    loginButton.addEventListener('mouseout', () => {
      loginButton.style.backgroundColor = ''; // Reset button color after hover
    });
  
    // Optional: Add focus effect on button (similar to input focus)
    loginButton.addEventListener('focus', () => {
      loginButton.style.outline = '2px solid #0056b3'; // Adding outline on focus
    });
  
    loginButton.addEventListener('blur', () => {
      loginButton.style.outline = ''; // Remove outline when focus is lost
    });
  });
  
  // Define types for login input
  interface LoginCredentials {
      email: string;
      password: string;
  }
  
  class SearchFeature {
    private searchInput: HTMLInputElement;
    private searchButton: HTMLButtonElement;
  
    constructor() {
      this.searchInput = document.querySelector('#product-search') as HTMLInputElement;
      this.searchButton = document.querySelector('#search-button') as HTMLButtonElement;
  
      // Event listener for input field
      this.searchInput.addEventListener('input', () => this.handleSearchInput());
  
      // Event listener for the search button
      this.searchButton.addEventListener('click', () => this.handleSearchButtonClick());
    }
  
    private handleSearchInput(): void {
      const query = this.searchInput.value.toLowerCase();
      this.performSearch(query);
    }
  
    private handleSearchButtonClick(): void {
      const query = this.searchInput.value.toLowerCase();
      this.performSearch(query);
    }
  
    private performSearch(query: string): void {
      if (!query) {
        console.log('No search query entered.');
        return;
      }
  
      // Here we simulate the search operation. In a real-world scenario, you might filter or query your product list.
      console.log(`Searching for products with query: ${query}`);
  
      // Example of search action, can be replaced with real filtering logic or API request.
      this.displaySearchResults(query);
    }
  
    private displaySearchResults(query: string): void {
      // This is where you would dynamically display search results
      console.log(`Displaying search results for: ${query}`);
    }
  }
  
  // Initialize the search feature when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    new SearchFeature();
  });
  
  class ModalLogin {
    private emailInput: HTMLInputElement;
    private passwordInput: HTMLInputElement;
    private submitButton: HTMLButtonElement;
    private modal: HTMLElement;
    private errorMessage: HTMLElement;
    private closeModalButton: HTMLElement;
  
    constructor() {
      this.emailInput = document.querySelector('#login-email') as HTMLInputElement;
      this.passwordInput = document.querySelector('#login-password') as HTMLInputElement;
      this.submitButton = document.querySelector('#login-button') as HTMLButtonElement;
      this.modal = document.querySelector('#loginModal') as HTMLElement;
      this.errorMessage = document.querySelector('#login-error-message') as HTMLElement;
      this.closeModalButton = document.querySelector('.modal-close') as HTMLElement;
  
      // Open modal on page load or other triggers
      this.modal.style.display = 'flex';
  
      // Add event listener to form submission
      this.submitButton.addEventListener('click', (e) => this.handleLogin(e));
  
      // Add event listener to close modal
      this.closeModalButton.addEventListener('click', () => this.closeModal());
    }
  
    private handleLogin(e: Event): void {
      e.preventDefault();
  
      const credentials: LoginCredentials = {
        email: this.emailInput.value,
        password: this.passwordInput.value,
      };
  
      if (this.validateForm(credentials)) {
        this.submitButton.disabled = true;
        this.submitButton.textContent = 'Signing In...';
  
        // Simulate a login process with a timeout (for demonstration purposes)
        setTimeout(() => {
          this.submitButton.disabled = false;
          this.submitButton.textContent = 'Sign In';
          alert('Login Successful!');
          this.closeModal();
        }, 2000);
      }
    }
  
    private validateForm(credentials: LoginCredentials): boolean {
      if (!credentials.email || !credentials.password) {
        this.showError('Please fill in both email and password.');
        return false;
      }
  
      if (!this.isValidEmail(credentials.email)) {
        this.showError('Please enter a valid email address.');
        return false;
      }
  
      this.errorMessage.textContent = ''; // Clear error message
      return true;
    }
  
    private isValidEmail(email: string): boolean {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return emailPattern.test(email);
    }
  
    private showError(message: string): void {
      this.errorMessage.textContent = message;
    }
  
    private closeModal(): void {
      this.modal.style.display = 'none';
    }
  }
  
  // Initialize the modal logic
  document.addEventListener('DOMContentLoaded', () => {
    new ModalLogin();
  });
  
  // Product actions (Add to Cart, Wishlist, etc.)
  
  document.addEventListener('DOMContentLoaded', () => {
    // Get elements for Add to Cart button, Heart Icon, and Cart count
    const addToCartButtons = document.querySelectorAll('.add-to-cart') as NodeListOf<HTMLButtonElement>;
    const wishlistButtons = document.querySelectorAll('.wishlist-toggle') as NodeListOf<HTMLButtonElement>;
    const cartCountDisplay = document.getElementById('cart-count') as HTMLElement;
    const wishlistCountDisplay = document.querySelector('.wishlist-count') as HTMLElement;
  
    let cartCount = 0;
    let wishlistCount = 0;
  
    // Add to Cart button logic
    addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Increment cart count when clicked
        cartCount++;
        cartCountDisplay.textContent = cartCount.toString(); // Update the cart count display
        console.log('Item added to cart. Current cart count:', cartCount);
  
        // Optional: Show a temporary message when an item is added to the cart
        button.textContent = 'Added!';
        setTimeout(() => {
          button.textContent = 'Add to Cart';
        }, 1000); // Reset button text after 1 second
      });
    });
  
    // Heart Icon (Wishlist) toggle logic
    wishlistButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Toggle between favorite and not favorite
        const icon = button.querySelector('i') as HTMLElement;
  
        if (icon.classList.contains('far')) {
          icon.classList.remove('far');
          icon.classList.add('fas'); // Filled heart
          wishlistCount++;
        } else {
          icon.classList.remove('fas');
          icon.classList.add('far'); // Unfilled heart
          wishlistCount--;
        }
  
        // Update the wishlist count display
        wishlistCountDisplay.textContent = wishlistCount.toString();
  
        console.log('Wishlist count:', wishlistCount);
      });
    });
  
    // Optional: Add focus effect to the buttons (Add to Cart and Heart Icon)
    addToCartButtons.forEach(button => {
      button.addEventListener('focus', () => {
        button.style.outline = '2px solid #0056b3'; // Focus outline for Add to Cart button
      });
  
      button.addEventListener('blur', () => {
        button.style.outline = ''; // Remove outline when focus is lost
      });
    });
  
    wishlistButtons.forEach(button => {
      button.addEventListener('focus', () => {
        button.style.outline = '2px solid #0056b3'; // Focus outline for Heart Icon
      });
  
      button.addEventListener('blur', () => {
        button.style.outline = ''; // Remove outline when focus is lost
      });
    });
  });
  