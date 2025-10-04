// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Sticky Navigation
window.addEventListener('scroll', () => {
    const header = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Gallery Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        galleryItems.forEach((item, index) => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                setTimeout(() => {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1) translateY(0)';
                    }, 50);
                }, index * 50); // Staggered animation
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8) translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Removed lightbox functionality since all gallery items now have embedded Instagram content

// Removed testimonial slider code as testimonials section was removed

// EmailJS Configuration for Contact Form
// SETUP REQUIRED: Replace these with your actual EmailJS credentials
// 1. Go to https://www.emailjs.com/
// 2. Create account and add Gmail service
// 3. Create email template
// 4. Copy your Service ID, Template ID, and Public Key below

const EMAILJS_SERVICE_ID = 'service_your_service_id_here'; // Replace with your actual Service ID
const EMAILJS_TEMPLATE_ID = 'template_your_template_id_here'; // Replace with your actual Template ID
const EMAILJS_PUBLIC_KEY = 'your_public_key_here'; // Replace with your actual Public Key

// Initialize EmailJS
(function() {
    console.log('Initializing EmailJS...');
    console.log('EmailJS library loaded:', typeof emailjs !== 'undefined');
    console.log('Service ID configured:', EMAILJS_SERVICE_ID !== 'service_your_service_id_here');
    console.log('Template ID configured:', EMAILJS_TEMPLATE_ID !== 'template_your_template_id_here');
    console.log('Public Key configured:', EMAILJS_PUBLIC_KEY !== 'your_public_key_here');

    // Only initialize if EmailJS is loaded and credentials are set
    if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'your_public_key_here') {
        try {
            emailjs.init(EMAILJS_PUBLIC_KEY);
            console.log('✅ EmailJS initialized successfully with public key');
        } catch (error) {
            console.error('❌ EmailJS initialization failed:', error);
        }
    } else {
        console.warn('⚠️ EmailJS not fully configured - form will use demo mode');
        console.log('To enable email sending:');
        console.log('1. Sign up at https://www.emailjs.com/');
        console.log('2. Add your Gmail service');
        console.log('3. Create an email template');
        console.log('4. Update the constants in script.js');
    }
})();

// Form Handling with EmailJS
const inquiryForm = document.getElementById('inquiryForm');

inquiryForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    console.log('Form submission started');

    // Show loading state
    const submitBtn = inquiryForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
        // Get form data
        const formData = new FormData(inquiryForm);
        const data = Object.fromEntries(formData);

        console.log('Form data collected:', data);

        // Validate required fields
        if (!data.name || !data.email || !data.service || !data.message) {
            throw new Error('Please fill in all required fields');
        }

        // Prepare email parameters
        const emailParams = {
            from_name: data.name,
            from_email: data.email,
            company: data.company || 'Not specified',
            service: data.service,
            message: data.message,
            to_email: 'isitakangsabanik@gmail.com',
            reply_to: data.email
        };

        console.log('Email parameters prepared:', emailParams);

        // Check if EmailJS is available and configured
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS library not loaded. Please check your internet connection.');
        }

        if (EMAILJS_SERVICE_ID === 'service_your_service_id_here' ||
            EMAILJS_TEMPLATE_ID === 'template_your_template_id_here' ||
            EMAILJS_PUBLIC_KEY === 'your_public_key_here') {
            throw new Error('EmailJS not configured. Please add your credentials to script.js');
        }

        console.log('Sending email via EmailJS...');

        // Send email using EmailJS
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            emailParams
        );

        console.log('Email sent successfully!', response);

        // Success message
        alert(`Thank you for your inquiry, ${data.name}! We'll get back to you soon.`);

        // Reset form
        inquiryForm.reset();

    } catch (error) {
        console.error('Email sending failed:', error);

        // Show specific error message
        let errorMessage = 'Sorry, there was an error sending your message. ';

        if (error.message.includes('EmailJS')) {
            errorMessage += 'Please check your EmailJS configuration.';
        } else if (error.message.includes('required fields')) {
            errorMessage += 'Please fill in all required fields.';
        } else {
            errorMessage += 'Please try again or contact us directly at isitakangsabanik@gmail.com';
        }

        alert(errorMessage);
    } finally {
        // Always reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        console.log('Form submission completed');
    }
});

// Test function for EmailJS (call testEmailJS() in browser console)
window.testEmailJS = function() {
    console.log('🧪 Testing EmailJS Configuration...');

    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS library not loaded');
        return;
    }

    if (EMAILJS_SERVICE_ID === 'service_your_service_id_here') {
        console.error('❌ Service ID not configured');
        return;
    }

    if (EMAILJS_TEMPLATE_ID === 'template_your_template_id_here') {
        console.error('❌ Template ID not configured');
        return;
    }

    if (EMAILJS_PUBLIC_KEY === 'your_public_key_here') {
        console.error('❌ Public Key not configured');
        return;
    }

    console.log('✅ All credentials configured');
    console.log('Service ID:', EMAILJS_SERVICE_ID);
    console.log('Template ID:', EMAILJS_TEMPLATE_ID);
    console.log('Public Key:', EMAILJS_PUBLIC_KEY.substring(0, 10) + '...');

    // Test email send
    const testParams = {
        from_name: 'Test User',
        from_email: 'test@example.com',
        company: 'Test Company',
        service: 'Video Production',
        message: 'This is a test message from the EmailJS test function.',
        to_email: 'isitakangsabanik@gmail.com'
    };

    console.log('📤 Sending test email...');

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, testParams)
        .then(function(response) {
            console.log('✅ Test email sent successfully!', response);
            alert('Test email sent! Check your inbox at isitakangsabanik@gmail.com');
        })
        .catch(function(error) {
            console.error('❌ Test email failed:', error);
            alert('Test email failed. Check the console for details.');
        });
};

// Smooth Scrolling for CTA Button
document.querySelector('.cta-button').addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for fixed header
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
});

// Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.gallery-item, .step, .inquiry-form').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.classList.toggle('dark-theme', currentTheme === 'dark');

// Update toggle button icon based on current theme
function updateToggleIcon() {
    const isDark = body.classList.contains('dark-theme');
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

// Initialize toggle icon
updateToggleIcon();

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');

    // Save theme preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    // Update toggle icon
    updateToggleIcon();
});

// Instagram Embed Functionality
function refreshInstagramEmbeds() {
    if (window.instgrm && typeof window.instgrm.Embeds !== 'undefined') {
        window.instgrm.Embeds.process();
    }
}

// Video loading optimization
document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.querySelector('.hero-video');

    // Handle video loading
    if (heroVideo) {
        heroVideo.addEventListener('loadstart', function() {
            console.log('Video loading started');
        });

        heroVideo.addEventListener('canplay', function() {
            console.log('Video can play');
        });

        heroVideo.addEventListener('error', function() {
            console.log('Video failed to load, showing fallback image');
            // Fallback image will show automatically via CSS
        });

        // Preload video for better performance
        heroVideo.preload = 'metadata';
    }
});

// Initialize Instagram embeds when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initial load with multiple attempts to ensure embeds load
    setTimeout(refreshInstagramEmbeds, 1000);
    setTimeout(refreshInstagramEmbeds, 2000);
    setTimeout(refreshInstagramEmbeds, 3000);

    // Refresh embeds when gallery section becomes visible
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Multiple refresh attempts when section becomes visible
                    setTimeout(refreshInstagramEmbeds, 500);
                    setTimeout(refreshInstagramEmbeds, 1000);
                    setTimeout(refreshInstagramEmbeds, 1500);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(gallerySection);
    }

    // Refresh embeds after theme changes
    themeToggle.addEventListener('click', () => {
        setTimeout(refreshInstagramEmbeds, 300);
    });

    // Add click handlers to gallery items to ensure videos play
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Don't interfere with existing link clicks
            if (e.target.tagName === 'A') return;

            // Try to trigger play on any video elements within the embed
            const iframes = this.querySelectorAll('iframe');
            iframes.forEach(iframe => {
                try {
                    // Send play command to iframe if it's a video
                    iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                } catch (error) {
                    // Ignore errors - Instagram handles its own playback
                }
            });

            // Refresh Instagram embeds on click to ensure they're active
            setTimeout(refreshInstagramEmbeds, 100);
        });
    });
});