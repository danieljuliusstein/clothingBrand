document.addEventListener('DOMContentLoaded', () => {
  // Define types
  interface LoginCredentials {
    email: string;
    password: string;
  }

  // ModalLogin Class
  class ModalLogin {
    private emailInput: HTMLInputElement;
    private passwordInput: HTMLInputElement;
    private submitButton: HTMLButtonElement;
    private modal: HTMLElement;
    private errorMessage: HTMLElement;
    private closeModalButton: HTMLElement;
    private accountButton: HTMLButtonElement;

    constructor() {
      this.emailInput = document.querySelector('#login-email') as HTMLInputElement;
      this.passwordInput = document.querySelector('#login-password') as HTMLInputElement;
      this.submitButton = document.querySelector('#login-button') as HTMLButtonElement;
      this.modal = document.querySelector('#loginModal') as HTMLElement;
      this.errorMessage = document.querySelector('#login-error-message') as HTMLElement;
      this.closeModalButton = document.querySelector('#close-modal-btn') as HTMLElement;
      this.accountButton = document.querySelector('.account-btn') as HTMLButtonElement;

      this.addEventListeners();
    }

    private addEventListeners(): void {
      this.accountButton.addEventListener('click', () => this.openModal());
      this.submitButton.addEventListener('click', (e) => this.handleLogin(e));
      this.closeModalButton.addEventListener('click', () => this.closeModal());
      window.addEventListener('click', (e) => {
        if (e.target === this.modal) this.closeModal();
      });
    }

    private openModal(): void {
      this.modal.style.display = 'flex';
      this.emailInput.value = '';
      this.passwordInput.value = '';
      this.errorMessage.textContent = '';
    }

    private closeModal(): void {
      this.modal.style.display = 'none';
    }

    private handleLogin(e: Event): void {
      e.preventDefault();
      const credentials: LoginCredentials = {
        email: this.emailInput.value.trim(),
        password: this.passwordInput.value.trim(),
      };

      if (this.validateForm(credentials)) {
        this.submitButton.disabled = true;
        this.submitButton.textContent = 'Signing In...';
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
      this.errorMessage.textContent = '';
      return true;
    }

    private isValidEmail(email: string): boolean {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return emailPattern.test(email);
    }

    private showError(message: string): void {
      this.errorMessage.textContent = message;
    }
  }

  // ProductActions Class
  class ProductActions {
    private cartCount = 0;
    private wishlistCount = 0;
    private cartCountDisplay: HTMLElement;
    private wishlistCountDisplay: HTMLElement;

    constructor() {
      this.cartCountDisplay = document.getElementById('cart-count') as HTMLElement;
      this.wishlistCountDisplay = document.querySelector('.wishlist-count') as HTMLElement;
      this.initEventListeners();
    }

    private initEventListeners(): void {
      document.querySelectorAll('.add-to-cart').forEach((button) => {
        button.addEventListener('click', () => this.addToCart(button as HTMLButtonElement));
      });
      document.querySelectorAll('.wishlist-toggle').forEach((button) => {
        button.addEventListener('click', () => this.toggleWishlist(button as HTMLButtonElement));
      });
    }

    private addToCart(button: HTMLButtonElement): void {
      this.cartCount++;
      this.cartCountDisplay.textContent = this.cartCount.toString();
      button.textContent = 'Added!';
      setTimeout(() => (button.textContent = 'Add to Cart'), 1000);
    }

    private toggleWishlist(button: HTMLButtonElement): void {
      const icon = button.querySelector('i') as HTMLElement;
      const isAdded = icon.classList.contains('fas');
      if (isAdded) {
        icon.classList.replace('fas', 'far');
        this.wishlistCount--;
      } else {
        icon.classList.replace('far', 'fas');
        this.wishlistCount++;
      }
      this.wishlistCountDisplay.textContent = this.wishlistCount.toString();
    }
  }

  // SearchFeature Class (Placeholder until search input is added to HTML)
  class SearchFeature {
    private searchInput: HTMLInputElement | null;
    private searchButton: HTMLButtonElement | null;

    constructor() {
      this.searchInput = document.querySelector('#product-search') as HTMLInputElement | null;
      this.searchButton = document.querySelector('#search-button') as HTMLButtonElement | null;
      if (this.searchInput && this.searchButton) this.addEventListeners();
    }

    private addEventListeners(): void {
      this.searchInput!.addEventListener('input', () => this.handleSearch());
      this.searchButton!.addEventListener('click', () => this.handleSearch());
    }

    private handleSearch(): void {
      const query = this.searchInput!.value.trim().toLowerCase();
      console.log(query ? `Searching for: ${query}` : 'No search query entered.');
    }
  }

  // Button Handlers
  const ctaButton = document.getElementById('cta-button') as HTMLButtonElement;
  const checkoutButton = document.getElementById('checkout-btn') as HTMLButtonElement;

  ctaButton.addEventListener('click', () => console.log('Shop Now clicked'));
  checkoutButton.addEventListener('click', () => console.log('Checkout clicked'));

  // Initialize classes
  new ModalLogin();
  new ProductActions();
  new SearchFeature();
});