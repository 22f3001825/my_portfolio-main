// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const closeMenuBtn = document.querySelector('.close-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
});

closeMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Scroll Animation
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
};

// Initialize Three.js background
function initThreeJsBackground() {
    const container = document.getElementById('three-background');
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Materials
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.01,
        color: 0x2563eb,
        transparent: true,
        opacity: 0.6
    });
    
    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Position camera
    camera.position.z = 2;
    
    // Animation
    const animate = () => {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        
        renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Typing animation for tagline
function initTypingAnimation() {
    const tagline = document.querySelector('.tagline');
    const text = tagline.innerText;
    tagline.innerHTML = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            tagline.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 500);
}

// Skill bars animation
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const skillName = item.querySelector('.skill-name').innerText;
        const skillLevel = getSkillLevel(skillName);
        
        const levelBar = document.createElement('div');
        levelBar.className = 'skill-level-bar';
        
        const levelFill = document.createElement('div');
        levelFill.className = 'skill-level-fill';
        levelFill.style.width = `0%`;
        levelFill.setAttribute('data-width', `${skillLevel}%`);
        
        levelBar.appendChild(levelFill);
        item.appendChild(levelBar);
    });
    
    // Animate skill bars when visible
    const skillSections = document.querySelectorAll('.skills-category');
    
    const animateSkillBars = () => {
        skillSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                const fillBars = section.querySelectorAll('.skill-level-fill');
                fillBars.forEach(bar => {
                    const targetWidth = bar.getAttribute('data-width');
                    bar.style.width = targetWidth;
                });
            }
        });
    };
    
    window.addEventListener('scroll', animateSkillBars);
}

// Helper function to assign skill levels
function getSkillLevel(skillName) {
    const skillLevels = {
        'Python': 90,
        'Scikit-learn': 65,
        'Pandas': 90,
        'NumPy': 85,
        'Flask': 50,
        'SQLite': 45,
        'Excel': 90,
        'Matplotlib': 80,
        'JavaScript': 60,
        'Machine Learning': 95,
        'Deep Learning': 55,
        'NLP': 35,
        'Data Visualization': 85,
        'Statistics': 85,
        'TensorFlow': 50,
        'HTML5': 85,
        'CSS3': 80,
        'REST API': 65,
        'Responsive Design': 80
    };
    
    return skillLevels[skillName] || 70; // Default to 70% if not specified
}

// Dark mode toggle
function initDarkMode() {
    const header = document.querySelector('header');
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'dark-mode-toggle';
    toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    
    header.querySelector('.nav-container').appendChild(toggleBtn);
    
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// Scroll to top button
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-top-btn';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Form validation and submission
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    const showError = (input, message) => {
        const formGroup = input.parentElement;
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.innerText = message;
        formGroup.appendChild(errorElement);
    };
    
    const clearErrors = () => {
        document.querySelectorAll('.error-message').forEach(error => error.remove());
    };
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();
        
        let valid = true;
        
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required');
            valid = false;
        }
        
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required');
            valid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email');
            valid = false;
        }
        
        if (subjectInput.value.trim() === '') {
            showError(subjectInput, 'Subject is required');
            valid = false;
        }
        
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Message is required');
            valid = false;
        }
        
        if (valid) {
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.disabled = true;
            submitBtn.innerText = 'Sending...';
            
            setTimeout(() => {
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerText = originalText;
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.innerText = 'Your message has been sent successfully!';
                contactForm.appendChild(successMsg);
                
                setTimeout(() => {
                    successMsg.remove();
                }, 5000);
            }, 1500);
        }
    });
}

// Email validation helper
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Project card interactions
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const projectImg = card.querySelector('.project-img');
        const projectContent = card.querySelector('.project-content');
        
        card.addEventListener('mouseenter', () => {
            projectImg.style.height = '220px';
            projectContent.style.transform = 'translateY(-20px)';
        });
        
        card.addEventListener('mouseleave', () => {
            projectImg.style.height = '200px';
            projectContent.style.transform = 'translateY(0)';
        });
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add event listeners
window.addEventListener('load', () => {
    fadeInOnScroll();
    
    // Initialize all features
    if (typeof THREE !== 'undefined') {
        initThreeJsBackground();
    }
    
    initTypingAnimation();
    initSkillBars();
    initDarkMode();
    initScrollToTop();
    initFormValidation();
    initProjectCards();
    initSmoothScroll();
});

// Check on scroll
window.addEventListener('scroll', fadeInOnScroll);