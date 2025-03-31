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

// Custom Cursor Effect
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
let ringX = 0;
let ringY = 0;

// Only enable custom cursor on devices with a fine pointer (mouse)
if (window.matchMedia("(pointer: fine)").matches) {
    // Update dot position immediately on mousemove
    document.addEventListener('mousemove', (e) => {
        // Dot follows the mouse instantly
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';

        // Update the target position for the ring (same as the dot)
        ringX = e.clientX;
        ringY = e.clientY;
    });

    // Smoothly animate the ring position using requestAnimationFrame
    function animateRing() {
        // Get the current position of the ring
        const currentX = parseFloat(cursorRing.style.left || 0);
        const currentY = parseFloat(cursorRing.style.top || 0);

        // Interpolate the ring's position toward the dot's position
        const ease = 0.3; // Adjust this value for more/less delay (0.05 = slower, 0.2 = faster)
        const newX = currentX + (ringX - currentX) * ease;
        const newY = currentY + (ringY - currentY) * ease;

        // Update the ring's position
        cursorRing.style.left = newX + 'px';
        cursorRing.style.top = newY + 'px';

        // Continue the animation loop
        requestAnimationFrame(animateRing);
    }

    // Start the animation loop for the ring
    animateRing();

    // Hide the custom cursor when the mouse leaves the window
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorRing.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
    });

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .skill, .project');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorDot.classList.add('active');
            cursorRing.classList.add('active');
        });
        element.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('active');
            cursorRing.classList.remove('active');
        });
    });
}

// skill bar

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
    
    // Update cursor colors based on theme
    updateCursorColors();
});

function updateCursorColors() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    
    if (body.classList.contains('light-mode')) {
        cursorDot.style.background = 'rgba(0, 0, 0, 0.7)';
        cursorRing.style.borderColor = 'rgba(0, 0, 0, 0.5)';
    } else {
        cursorDot.style.background = '#ff6200';
        cursorRing.style.borderColor = 'rgb(255, 100, 0, 0.5)';
    }
}

// Initialize cursor colors
updateCursorColors();



// Click effect for cursor
document.addEventListener('mousedown', () => {
    cursorDot.classList.add('clicked');
    cursorRing.classList.add('clicked');
});

document.addEventListener('mouseup', () => {
    cursorDot.classList.remove('clicked');
    cursorRing.classList.remove('clicked');
});


// Cursor-following background gradient
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    document.body.style.setProperty('--cursor-x', x);
    document.body.style.setProperty('--cursor-y', y);
    
    const gradient = document.querySelector('body::before');
    if (gradient) {
        gradient.style.transform = `translate(
            calc(-50% + ${(x - 0.5) * 100}px), 
            calc(-50% + ${(y - 0.5) * 100}px)
        )`;
    }
});

// Combine with your existing float animation
const bgGradient = document.createElement('style');
bgGradient.innerHTML = `
    body::before {
        left: calc(var(--cursor-x, 0.5) * 100%);
        top: calc(var(--cursor-y, 0.5) * 100%);
        animation: float 20s infinite linear;
    }
`;
document.head.appendChild(bgGradient);

// Cursor position variables
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let gradientX = mouseX;
let gradientY = mouseY;
const followSpeed = 0.03; // Lower = more delay (0.02-0.1 works best)

// Update mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth follow animation loop
function animateGradient() {
    // Calculate distance to move
    const dx = mouseX - gradientX;
    const dy = mouseY - gradientY;
    
    // Apply easing
    gradientX += dx * followSpeed;
    gradientY += dy * followSpeed;
    
    // Update CSS custom properties
    document.documentElement.style.setProperty('--gradient-x', `${gradientX}px`);
    document.documentElement.style.setProperty('--gradient-y', `${gradientY}px`);
    
    requestAnimationFrame(animateGradient);
}

// Initialize gradient position styles
const gradientStyle = document.createElement('style');
gradientStyle.textContent = `
    body::before {
        left: var(--gradient-x, 50%);
        top: var(--gradient-y, 50%);
    }
`;
document.head.appendChild(gradientStyle);

// Start animation
animateGradient();


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