// ===================================
// DARK/LIGHT MODE THEME TOGGLE
// ===================================

// Initialize theme from localStorage or default to 'light'
let currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', function() {
    // Toggle between light and dark
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Update the data-theme attribute
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Save to localStorage
    localStorage.setItem('theme', currentTheme);
    
    // Add a scale animation to the button
    this.style.transform = 'scale(0.9)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 150);
});

// ===================================
// PROJECT FILTER/SORTER
// ===================================

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get the filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Filter projects
        filterProjects(filterValue);
    });
});

function filterProjects(filter) {
    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            // Show the card with animation
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 10);
        } else {
            // Hide the card
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// ===================================
// DOM MANIPULATION - DYNAMIC CONTENT
// ===================================

// Show/hide sections based on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Initialize sections with animation ready state
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
});

// ===================================
// FORM VALIDATION (CLIENT-SIDE)
// ===================================

const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

// Form inputs
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const websiteInput = document.getElementById('website');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

// Error message elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const websiteError = document.getElementById('websiteError');
const subjectError = document.getElementById('subjectError');
const messageError = document.getElementById('messageError');

// Validation functions
function validateName() {
    const name = nameInput.value.trim();
    
    if (name === '') {
        showError(nameInput, nameError, 'Name is required');
        return false;
    } else if (name.length < 2) {
        showError(nameInput, nameError, 'Name must be at least 2 characters');
        return false;
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
        showError(nameInput, nameError, 'Name can only contain letters and spaces');
        return false;
    } else {
        showSuccess(nameInput, nameError);
        return true;
    }
}

function validateEmail() {
    const email = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === '') {
        showError(emailInput, emailError, 'Email is required');
        return false;
    } else if (!emailPattern.test(email)) {
        showError(emailInput, emailError, 'Please enter a valid email address');
        return false;
    } else {
        showSuccess(emailInput, emailError);
        return true;
    }
}

function validatePhone() {
    const phone = phoneInput.value.trim();
    
    // Phone is optional, so only validate if filled
    if (phone !== '') {
        if (!/^[0-9]{10,}$/.test(phone)) {
            showError(phoneInput, phoneError, 'Phone must be at least 10 digits');
            return false;
        }
    }
    
    showSuccess(phoneInput, phoneError);
    return true;
}

function validateWebsite() {
    const website = websiteInput.value.trim();
    
    // Website is optional, so only validate if filled
    if (website !== '') {
        const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        if (!urlPattern.test(website)) {
            showError(websiteInput, websiteError, 'Please enter a valid URL');
            return false;
        }
    }
    
    showSuccess(websiteInput, websiteError);
    return true;
}

function validateSubject() {
    const subject = subjectInput.value.trim();
    
    if (subject === '') {
        showError(subjectInput, subjectError, 'Subject is required');
        return false;
    } else if (subject.length < 5) {
        showError(subjectInput, subjectError, 'Subject must be at least 5 characters');
        return false;
    } else {
        showSuccess(subjectInput, subjectError);
        return true;
    }
}

function validateMessage() {
    const message = messageInput.value.trim();
    
    if (message === '') {
        showError(messageInput, messageError, 'Message is required');
        return false;
    } else if (message.length < 10) {
        showError(messageInput, messageError, 'Message must be at least 10 characters');
        return false;
    } else {
        showSuccess(messageInput, messageError);
        return true;
    }
}

// Helper functions to show error/success states
function showError(input, errorElement, message) {
    input.classList.add('error');
    input.classList.remove('success');
    errorElement.textContent = message;
}

function showSuccess(input, errorElement) {
    input.classList.remove('error');
    input.classList.add('success');
    errorElement.textContent = '';
}

// Real-time validation on blur
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
phoneInput.addEventListener('blur', validatePhone);
websiteInput.addEventListener('blur', validateWebsite);
subjectInput.addEventListener('blur', validateSubject);
messageInput.addEventListener('blur', validateMessage);

// Real-time validation on input (for better UX)
nameInput.addEventListener('input', function() {
    if (this.classList.contains('error')) {
        validateName();
    }
});

emailInput.addEventListener('input', function() {
    if (this.classList.contains('error')) {
        validateEmail();
    }
});

phoneInput.addEventListener('input', function() {
    if (this.classList.contains('error')) {
        validatePhone();
    }
});

websiteInput.addEventListener('input', function() {
    if (this.classList.contains('error')) {
        validateWebsite();
    }
});

subjectInput.addEventListener('input', function() {
    if (this.classList.contains('error')) {
        validateSubject();
    }
});

messageInput.addEventListener('input', function() {
    if (this.classList.contains('error')) {
        validateMessage();
    }
});

// Form submission handler
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isWebsiteValid = validateWebsite();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();
    
    // Check if all validations passed
    if (isNameValid && isEmailValid && isPhoneValid && isWebsiteValid && isSubjectValid && isMessageValid) {
        // All validations passed - show success message
        showSuccessMessage();
        
        // Reset form
        contactForm.reset();
        
        // Remove success classes
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
            input.classList.remove('success');
        });
        
    } else {
        // Scroll to first error
        const firstError = document.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

function showSuccessMessage() {
    successMessage.classList.add('show');
    
    // Hide after 5 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 5000);
}

// ===================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// DYNAMIC SKILL BAR ANIMATION ON SCROLL
// ===================================

const skillBars = document.querySelectorAll('.skill-bar');
let skillsAnimated = false;

function animateSkills() {
    const skillsSection = document.getElementById('skills');
    const skillsPosition = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;
    
    if (skillsPosition < screenPosition && !skillsAnimated) {
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = level + '%';
        });
        skillsAnimated = true;
    }
}

window.addEventListener('scroll', animateSkills);

// ===================================
// CONTENT UPDATE - DYNAMIC TEXT
// ===================================

// Update year in footer automatically
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer p');
if (footerText) {
    footerText.innerHTML = `&copy; ${currentYear} My Portfolio. All rights reserved.`;
}

// ===================================
// IMAGE ERROR HANDLING
// ===================================

// Handle broken images by showing placeholder
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Create a placeholder if image fails to load
            this.style.backgroundColor = '#e9ecef';
            this.style.minHeight = '200px';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.alt = 'Image placeholder - Replace with your image';
        });
    });
});

// ===================================
// SHOW/HIDE ELEMENTS DYNAMICALLY
// ===================================

// Example: Add a "Back to Top" button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.classList.add('back-to-top');
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: var(--accent-color);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    display: none;
    z-index: 1000;
    box-shadow: 0 3px 10px rgba(0,0,0,0.3);
    transition: transform 0.3s, opacity 0.3s;
`;

document.body.appendChild(backToTopBtn);

// Show/hide back to top button
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'block';
        setTimeout(() => {
            backToTopBtn.style.opacity = '1';
        }, 10);
    } else {
        backToTopBtn.style.opacity = '0';
        setTimeout(() => {
            backToTopBtn.style.display = 'none';
        }, 300);
    }
});

// Scroll to top on click
backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
});

backToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
});

