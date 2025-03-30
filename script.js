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

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
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