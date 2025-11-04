// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offset = 80; // Offset for better viewing
        const sectionPosition = section.offsetTop - offset;

        window.scrollTo({
            top: sectionPosition,
            behavior: 'smooth'
        });
    }
}

// Add active state to navigation buttons on scroll
window.addEventListener('scroll', () => {
    const sections = ['philosophy', 'contributions', 'team'];
    const scrollPosition = window.scrollY + 150;

    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                highlightNavButton(sectionId);
            }
        }
    });
});

// Highlight active navigation button
function highlightNavButton(activeSectionId) {
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
}

// Add scroll animation to elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
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
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add smooth scroll behavior for publication cards
    const publicationsScroll = document.querySelector('.publications-scroll');
    if (publicationsScroll) {
        let isDown = false;
        let startX;
        let scrollLeft;

        publicationsScroll.addEventListener('mousedown', (e) => {
            isDown = true;
            publicationsScroll.style.cursor = 'grabbing';
            startX = e.pageX - publicationsScroll.offsetLeft;
            scrollLeft = publicationsScroll.scrollLeft;
        });

        publicationsScroll.addEventListener('mouseleave', () => {
            isDown = false;
            publicationsScroll.style.cursor = 'grab';
        });

        publicationsScroll.addEventListener('mouseup', () => {
            isDown = false;
            publicationsScroll.style.cursor = 'grab';
        });

        publicationsScroll.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - publicationsScroll.offsetLeft;
            const walk = (x - startX) * 2;
            publicationsScroll.scrollLeft = scrollLeft - walk;
        });
    }

    // Add hover effect to team members
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Check if research image exists
    const researchImage = document.getElementById('research-image');
    if (researchImage) {
        researchImage.addEventListener('error', function() {
            this.style.display = 'none';
            this.nextElementSibling.style.display = 'block';
        });

        researchImage.addEventListener('load', function() {
            if (this.src && this.src !== window.location.href + 'research-placeholder.jpg') {
                this.style.display = 'block';
                this.nextElementSibling.style.display = 'none';
            }
        });
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        hero.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
});

// Add smooth entrance animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Prevent default link behavior and handle smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href').substring(1);
        scrollToSection(target);
    });
});