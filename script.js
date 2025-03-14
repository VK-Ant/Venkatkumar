// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 64, // Adjust for header height
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Typing Animation
    const typedTextElement = document.getElementById('typed-text');
    const textArray = ["Kaggle Master","Generative AI Engineer", "Computer Vision Engineer", "Researcher/Problem solver","AI Engineer"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    let deletingDelay = 50;
    let newTextDelay = 2000;

    function type() {
        const currentText = textArray[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = deletingDelay;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 150;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingDelay = newTextDelay;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
        }
        
        setTimeout(type, typingDelay);
    }

    // Start typing animation
    setTimeout(type, 1000);

    // Form Submission 
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For demo purposes, just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Clear the form
            contactForm.reset();
        });
    }

    // Scroll Animations
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function handleScrollAnimations() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            if (isInViewport(section)) {
                section.classList.add('animate-fade-in');
            }
        });
        
        // Skills animation (pill badges)
        const skillsSection = document.getElementById('skills');
        if (skillsSection && isInViewport(skillsSection)) {
            const skillPills = skillsSection.querySelectorAll('.px-3.py-1');
            skillPills.forEach((pill, index) => {
                setTimeout(() => {
                    pill.style.opacity = '1';
                    pill.style.transform = 'translateY(0)';
                }, index * 50);
            });
        }
        
        // Certifications animation
        const certificationsSection = document.getElementById('certifications');
        if (certificationsSection && isInViewport(certificationsSection)) {
            const certifications = certificationsSection.querySelectorAll('.bg-gray-100');
            certifications.forEach((cert, index) => {
                setTimeout(() => {
                    cert.style.opacity = '1';
                    cert.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }
    }

    // Initialize animations
    window.addEventListener('scroll', handleScrollAnimations);
    window.addEventListener('load', handleScrollAnimations);
    
    // Add some initial styling to elements for animations
    document.querySelectorAll('#skills .px-3.py-1').forEach(pill => {
        pill.style.opacity = '0';
        pill.style.transform = 'translateY(10px)';
        pill.style.transition = 'all 0.3s ease';
    });
    
    document.querySelectorAll('#certifications .bg-gray-100').forEach(cert => {
        cert.style.opacity = '0';
        cert.style.transform = 'translateY(20px)';
        cert.style.transition = 'all 0.5s ease';
    });
    
    // Highlight active navigation item based on scroll position
    function highlightNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.scrollY;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-blue-600');
            link.classList.add('text-gray-700');
            
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.remove('text-gray-700');
                link.classList.add('text-blue-600');
            }
        });
    }
    
    // Call highlightNav on scroll
    window.addEventListener('scroll', highlightNav);
    
    // Set up year in footer copyright
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('footer p');
    if (copyrightElement) {
        copyrightElement.textContent = `© ${currentYear} Venkatkumar R. All rights reserved.`;
    }
});

// Publications animation
const publicationsSection = document.getElementById('publications');
if (publicationsSection && isInViewport(publicationsSection)) {
    const publications = publicationsSection.querySelectorAll('.bg-white');
    publications.forEach((pub, index) => {
        setTimeout(() => {
            pub.classList.add('animate-fade-in');
        }, index * 200);
    });
}