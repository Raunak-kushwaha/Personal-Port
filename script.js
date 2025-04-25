// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fade-in Animation on Scroll
const sections = document.querySelectorAll('.animate');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => {
    observer.observe(section);
});

// Typewriter Effect for Dynamic Text
const dynamicText = document.getElementById('dynamic-text');
const titles = [
    'Web Developer',
    'UI/UX Designer',
    'Problem Solver',
    'Creative Thinker'
]; // Add your own titles here
let currentIndex = 0;
let isErasing = false;
let charIndex = 0;
let currentText = '';

function typeWriter() {
    const text = titles[currentIndex];

    if (!isErasing && charIndex <= text.length) {
        // Typing
        currentText = text.substring(0, charIndex);
        dynamicText.textContent = currentText;
        charIndex++;
        setTimeout(typeWriter, 100); // Speed of typing (100ms per letter)
    } else if (isErasing && charIndex >= 0) {
        // Erasing
        currentText = text.substring(0, charIndex);
        dynamicText.textContent = currentText;
        charIndex--;
        setTimeout(typeWriter, 50); // Speed of erasing (50ms per letter)
    } else if (!isErasing && charIndex > text.length) {
        // Pause after typing, then start erasing
        setTimeout(() => {
            isErasing = true;
            typeWriter();
        }, 1500); // Pause for 1.5 seconds after typing
    } else if (isErasing && charIndex < 0) {
        // Move to the next title and start typing
        isErasing = false;
        charIndex = 0;
        currentIndex = (currentIndex + 1) % titles.length;
        setTimeout(typeWriter, 500); // Pause for 0.5 seconds before typing next
    }
}

// Start the typewriter effect
typeWriter();

// Skill bar
const skillBars = document.querySelectorAll('.skill-fill');
const skillSection = document.querySelectorAll('.skill');

const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.getAttribute('style').split(':')[1];
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or system preference
const savedTheme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light-mode' : '');

if (savedTheme) {
    body.classList.add(savedTheme);
    themeToggle.checked = savedTheme === 'light-mode';
}

themeToggle.addEventListener('change', () => {
    body.classList.toggle('light-mode');
    const currentTheme = body.classList.contains('light-mode') ? 'light-mode' : '';
    localStorage.setItem('theme', currentTheme);
});

// Mobile Navigation
const menuToggle = document.querySelector('.menu-toggle');
const navRight = document.querySelector('.nav-right');
const menuOverlay = document.querySelector('.menu-overlay');
const navLinks = document.querySelectorAll('.nav-links li a');

// Toggle menu
function toggleMenu() {
    menuToggle.classList.toggle('active');
    navRight.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    
    // Prevent scrolling when menu is open
    document.body.style.overflow = menuToggle.classList.contains('active') ? 'hidden' : '';
}

// Toggle menu on hamburger click
menuToggle.addEventListener('click', toggleMenu);

// Close menu when clicking the overlay
menuOverlay.addEventListener('click', toggleMenu);

// Close menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menuToggle.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Close menu on window resize if it expands beyond mobile size
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && menuToggle.classList.contains('active')) {
        toggleMenu();
    }
});