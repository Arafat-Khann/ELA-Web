// script.js
document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        }
    });

    // Close mobile menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Play once
            }
        });
    }, observerOptions);

    const fadeSections = document.querySelectorAll('.fade-in-section');
    fadeSections.forEach(section => {
        observer.observe(section);
    });

    // Contact Form Validation (Client-side)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const formBtn = document.getElementById('formBtn');
            const originalText = formBtn.innerHTML;

            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Simulate form processing state
            formBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Redirecting to WhatsApp...';
            formBtn.disabled = true;

            setTimeout(() => {
                formBtn.innerHTML = '<i class="fa-solid fa-check mr-2"></i> Redirected!';
                formBtn.classList.add('bg-green-500', 'text-white');
                formBtn.classList.remove('bg-gold', 'text-bgDark');
                
                // Format the message for WhatsApp
                const courseText = document.getElementById('courseSelection').options[document.getElementById('courseSelection').selectedIndex].text;
                const waMessage = `Hello ELA! My name is ${name}.\n\n*Course of Interest:* ${courseText}\n*Email:* ${email}\n\n*Message:*\n${message}`;
                const encodedMessage = encodeURIComponent(waMessage);
                
                // Open WhatsApp with pre-filled text
                window.open(`https://wa.me/923339724039?text=${encodedMessage}`, '_blank');
                
                contactForm.reset();

                setTimeout(() => {
                    formBtn.innerHTML = originalText;
                    formBtn.disabled = false;
                    formBtn.classList.remove('bg-green-500', 'text-white');
                    formBtn.classList.add('bg-gold', 'text-bgDark');
                }, 3000);
            }, 800);
        });
    }
});
