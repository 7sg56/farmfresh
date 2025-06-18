document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    // User menu toggle
    const userMenuButton = document.getElementById('userMenuButton');
    const userDropdown = document.getElementById('userDropdown');
    
    // Search input focus effects
    const searchInput = document.getElementById('searchInput');
    const locationInput = document.getElementById('locationInput');

    // Mobile menu functionality
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        
        // Toggle menu icon
        const icon = mobileMenuButton.querySelector('svg');
        if (mobileMenu.classList.contains('hidden')) {
            // Show hamburger icon
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
        } else {
            // Show X icon
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
        }
    });

    // User dropdown functionality
    userMenuButton.addEventListener('click', function(e) {
        e.stopPropagation();
        userDropdown.classList.toggle('hidden');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!userMenuButton.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.classList.add('hidden');
        }
        
        if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            // Reset hamburger icon
            const icon = mobileMenuButton.querySelector('svg');
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
        }
    });

    // Search input focus effects
    if (searchInput) {
        const searchContainer = searchInput.closest('.w-full');
        
        searchInput.addEventListener('focus', function() {
            searchContainer.classList.add('search-focus');
        });
        
        searchInput.addEventListener('blur', function() {
            searchContainer.classList.remove('search-focus');
        });
    }

    if (locationInput) {
        const searchContainer = locationInput.closest('.w-full');
        
        locationInput.addEventListener('focus', function() {
            searchContainer.classList.add('search-focus');
        });
        
        locationInput.addEventListener('blur', function() {
            searchContainer.classList.remove('search-focus');
        });
    }

    // Add logo hover effect
    const logo = document.querySelector('.text-2xl.font-bold.text-green-600');
    if (logo) {
        logo.classList.add('logo-hover', 'cursor-pointer');
    }

    // Add button press effects
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.classList.add('button-press');
    });

    // Smooth scroll for navbar links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Updated search functionality to include location
    const searchForm = document.querySelector('.bg-white.border.border-gray-300.rounded-full');
    if (searchForm) {
        const searchButton = searchForm.querySelector('button');
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            const searchValue = searchInput ? searchInput.value : '';
            const locationValue = locationInput ? locationInput.value : '';
            
            if (searchValue.trim()) {
                console.log('Searching for:', searchValue, 'in location:', locationValue);
                // Here you would typically make an API call or redirect to search results
                alert(`Searching for "${searchValue}" in "${locationValue}"`);
            }
        });
    }

    // Expanding Cards - Completely Rewritten
    const panels = document.querySelectorAll('.panel');
    
    // State management
    let state = {
        currentIndex: 0,
        isTransitioning: false,
        isPaused: false,
        autoSlideTimer: null
    };

    // Clear any existing timers
    const clearTimer = () => {
        if (state.autoSlideTimer) {
            clearInterval(state.autoSlideTimer);
            state.autoSlideTimer = null;
        }
    };

    // Set active panel with proper state management
    const setActivePanel = (targetIndex) => {
        // Prevent concurrent transitions
        if (state.isTransitioning || targetIndex === state.currentIndex) {
            return false;
        }

        state.isTransitioning = true;

        // Remove active from all panels
        panels.forEach(panel => panel.classList.remove('active'));
        
        // Set new active panel
        panels[targetIndex].classList.add('active');
        state.currentIndex = targetIndex;

        // Reset transition state after animation completes
        setTimeout(() => {
            state.isTransitioning = false;
        }, 2100); // Slightly longer than CSS transition

        return true;
    };

    // Auto advance to next panel
    const advancePanel = () => {
        if (!state.isPaused && !state.isTransitioning) {
            const nextIndex = (state.currentIndex + 1) % panels.length;
            setActivePanel(nextIndex);
        }
    };

    // Start auto-slide with clean timer
    const startAutoSlide = () => {
        clearTimer(); // Always clear first
        
        state.autoSlideTimer = setInterval(() => {
            advancePanel();
        }, 10000); // 10 seconds
    };

    // Stop auto-slide
    const stopAutoSlide = () => {
        clearTimer();
    };

    // Pause/Resume functionality
    const pauseAutoSlide = () => {
        state.isPaused = true;
    };

    const resumeAutoSlide = () => {
        state.isPaused = false;
    };

    // Initialize panels with click handlers and indicators
    panels.forEach((panel, index) => {
        // Click handler
        panel.addEventListener('click', (e) => {
            e.preventDefault();
            
            const success = setActivePanel(index);
            if (success) {
                // Temporarily stop auto-slide
                stopAutoSlide();
                
                // Restart after 3 seconds
                setTimeout(() => {
                    if (!state.isPaused) {
                        startAutoSlide();
                    }
                }, 3000);
            }
        });

        // Add slide indicator
        const indicator = document.createElement('div');
        indicator.className = 'slide-indicator';
        indicator.textContent = `${index + 1}/${panels.length}`;
        panel.appendChild(indicator);
    });

    // Hover pause functionality
    const displaySlide = document.querySelector('.display-slide');
    if (displaySlide) {
        displaySlide.addEventListener('mouseenter', () => {
            pauseAutoSlide();
        });

        displaySlide.addEventListener('mouseleave', () => {
            resumeAutoSlide();
        });
    }

    // Visibility change handling (tab switching)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            pauseAutoSlide();
        } else {
            resumeAutoSlide();
        }
    });

    // Initialize the slider
    if (panels.length > 0) {
        // Set first panel as active
        state.currentIndex = 0;
        panels[0].classList.add('active');
        
        // Start auto-slide after initial delay
        setTimeout(() => {
            startAutoSlide();
        }, 2000);
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        clearTimer();
    });

    // Floating Vegetables Background
    const vegetablesContainer = document.getElementById('vegetablesBackground');
    
    // Better quality PNG images with transparent backgrounds
    const vegetables = [
        // Vegetables
        'https://purepng.com/public/uploads/large/purepng.com-carrotcarrotvegetablesorangeorange-carrotdaucus-carota-481521742947yetoj.png',
        'https://purepng.com/public/uploads/large/purepng.com-red-tomatotomatovegetablered-tomatofoodvitamin-1701527249649lcqer.png',
        'https://purepng.com/public/uploads/large/purepng.com-broccolibroccoli-greenvegetablesfoodhealthy-1701527249742ljrgw.png',
        'https://purepng.com/public/uploads/large/purepng.com-cucumbercucumbervegetablegreenfreshvitamin-481521742950qmxdf.png',
        'https://purepng.com/public/uploads/large/purepng.com-green-bell-pepperbell-peppervegetablegreen-bell-peppergreen-1701527249883tzaqd.png',
        'https://purepng.com/public/uploads/large/purepng.com-avocadoavocadofoodfruitgreenvitamin-1701527249654cqvhf.png',
        'https://purepng.com/public/uploads/large/purepng.com-oniononionvegetablebrownfoodhealthy-1701527249855hwbmc.png',
        'https://purepng.com/public/uploads/large/purepng.com-cornmaize-corncornmaizevegetableyellowfood-1701527249827phesg.png',
        
        // Fruits
        'https://purepng.com/public/uploads/large/purepng.com-red-appleapplefruitsroundred-1701527249833gm0dr.png',
        'https://purepng.com/public/uploads/large/purepng.com-bananabananafruitfreshhealthyyellow-1701527249698txk3d.png',
        'https://purepng.com/public/uploads/large/purepng.com-orangeorangefruitscitrusvitamin-c-1701527249797hjmhd.png',
        'https://purepng.com/public/uploads/large/purepng.com-strawberrystrawberryfruitberrysweetred-1701527249937ypmgw.png',
        'https://purepng.com/public/uploads/large/purepng.com-grapesgrapesvinefruitpurplehealthyfood-1701527249795edjxz.png',
        'https://purepng.com/public/uploads/large/purepng.com-lemonlemonfruitcitrusyellowvitamin-c-1701527249800imnct.png'
    ];
    
    let vegetableElements = [];

    // Create floating vegetables
    const createVegetables = () => {
        const numVegetables = window.innerWidth < 768 ? 8 : 12;
        
        for (let i = 0; i < numVegetables; i++) {
            const vegetable = document.createElement('div');
            vegetable.className = 'vegetable';
            
            // Create image element
            const img = document.createElement('img');
            img.src = vegetables[Math.floor(Math.random() * vegetables.length)];
            img.alt = 'Fresh produce';
            img.loading = 'lazy';
            
            // Handle image load errors - fallback to emoji
            img.onerror = function() {
                const fallbackEmojis = ['🥕', '🍅', '🥦', '🥒', '🫑', '🥑', '🧅', '🌽', '🍎', '🍌', '🍊', '🍓', '🍇', '🍋'];
                this.style.display = 'none';
                vegetable.innerHTML = fallbackEmojis[Math.floor(Math.random() * fallbackEmojis.length)];
                vegetable.style.fontSize = window.innerWidth < 768 ? '45px' : '60px';
                vegetable.style.display = 'flex';
                vegetable.style.alignItems = 'center';
                vegetable.style.justifyContent = 'center';
            };
            
            vegetable.appendChild(img);
            
            // Random position
            vegetable.style.left = Math.random() * (window.innerWidth - 80) + 'px';
            vegetable.style.top = Math.random() * (window.innerHeight - 80) + 'px';
            
            // Random opacity variation (more subtle)
            vegetable.style.opacity = (Math.random() * 0.15 + 0.15); // Range: 0.15 - 0.3
            
            vegetablesContainer.appendChild(vegetable);
            vegetableElements.push(vegetable);
        }
    };

    // Reposition vegetables on window resize
    const handleResize = () => {
        vegetableElements.forEach(vegetable => {
            const currentLeft = parseInt(vegetable.style.left);
            const currentTop = parseInt(vegetable.style.top);
            
            // Adjust positions if they're outside new window bounds
            if (currentLeft > window.innerWidth - 80) {
                vegetable.style.left = (window.innerWidth - 80) + 'px';
            }
            if (currentTop > window.innerHeight - 80) {
                vegetable.style.top = (window.innerHeight - 80) + 'px';
            }
        });
    };

    // Gentle wandering movement
    const wanderVegetables = () => {
        vegetableElements.forEach((vegetable, index) => {
            const randomDelay = Math.random() * 4000; // Random delay up to 4 seconds
            
            setTimeout(() => {
                const newLeft = Math.random() * (window.innerWidth - 80);
                const newTop = Math.random() * (window.innerHeight - 80);
                
                vegetable.style.left = newLeft + 'px';
                vegetable.style.top = newTop + 'px';
            }, randomDelay);
        });
    };

    // Initialize vegetables
    createVegetables();

    // Event listeners
    window.addEventListener('resize', handleResize);

    // Start wandering movement every 8 seconds
    setInterval(wanderVegetables, 8000);

    // Cleanup function
    const cleanupVegetables = () => {
        window.removeEventListener('resize', handleResize);
    };

    // Add to window unload cleanup
    window.addEventListener('beforeunload', () => {
        clearTimer();
        cleanupVegetables();
    });


    // Load More Functionality with Dynamic Card Creation
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const productGrid = document.getElementById('productGrid');
    let currentlyShown = 18; // Update to reflect actual visible cards
    const totalProducts = 26;

    // Additional product data for dynamic creation
    const additionalProducts = [
        {
            name: "Radishes",
            description: "Peppery & Fresh",
            price: "$1.3",
            image: "https://images.unsplash.com/photo-1618586227284-bb684317e3a0?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "Turnips",
            description: "White & Crisp",
            price: "$1.7",
            image: "https://images.unsplash.com/photo-1588773464012-ad9e4c4f3a84?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ];

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const hiddenCards = productGrid.querySelectorAll('.product-card.hidden');
            const cardsToShow = Math.min(6, hiddenCards.length);
            
            // Show existing hidden cards first
            for (let i = 0; i < cardsToShow; i++) {
                hiddenCards[i].classList.remove('hidden');
                // Add animation
                hiddenCards[i].style.opacity = '0';
                hiddenCards[i].style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    hiddenCards[i].style.opacity = '1';
                    hiddenCards[i].style.transform = 'translateY(0)';
                }, i * 100);
            }
            
            currentlyShown += cardsToShow;
            
            // If no more hidden cards, create new ones
            if (hiddenCards.length === 0 && currentlyShown < totalProducts) {
                const remainingSlots = totalProducts - currentlyShown;
                const productsToAdd = Math.min(remainingSlots, additionalProducts.length);
                
                for (let i = 0; i < productsToAdd; i++) {
                    const product = additionalProducts[i];
                    const cardHTML = `
                        <div class="product-card bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 group" style="opacity: 0; transform: translateY(20px);">
                            <div class="aspect-square overflow-hidden">
                                <img src="${product.image}" 
                                     alt="${product.name}" 
                                     class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200">
                            </div>
                            <div class="p-3">
                                <h3 class="font-semibold text-gray-900 text-sm mb-1">${product.name}</h3>
                                <p class="text-xs text-gray-500 mb-2">${product.description}</p>
                                <div class="flex items-center justify-between">
                                    <span class="text-lg font-bold text-green-600">${product.price}</span>
                                    <button class="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1.5 rounded-lg transition-colors duration-200">
                                        ADD
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    productGrid.insertAdjacentHTML('beforeend', cardHTML);
                    
                    // Animate the new card
                    const newCard = productGrid.lastElementChild;
                    setTimeout(() => {
                        newCard.style.opacity = '1';
                        newCard.style.transform = 'translateY(0)';
                    }, (cardsToShow + i) * 100);
                }
                
                currentlyShown += productsToAdd;
            }
            
            // Update button text and counter
            const remaining = totalProducts - currentlyShown;
            const productCount = document.getElementById('productCount');
            
            if (remaining > 0) {
                loadMoreBtn.textContent = `Load ${Math.min(6, remaining)} More Products`;
                productCount.textContent = `Showing ${currentlyShown} of ${totalProducts} products`;
            } else {
                loadMoreBtn.textContent = 'All Products Loaded';
                loadMoreBtn.disabled = true;
                loadMoreBtn.classList.add('opacity-50', 'cursor-not-allowed');
                productCount.textContent = `Showing all ${totalProducts} products`;
            }
        });
    }

    // Enhanced Quick Actions (only Escape key)
    document.addEventListener('keydown', function(e) {
        // Only Escape key functionality remains
        if (e.key === 'Escape') {
            console.log('Escape pressed - no drawer to close');
        }
    });

    // Add notification for quick actions
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
});
