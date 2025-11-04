// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offset = 80;
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

// Publications scroll functionality
function initPublicationsScroll() {
    const scrollContainer = document.getElementById('publicationsScroll');
    const leftArrow = document.getElementById('scrollLeft');
    const rightArrow = document.getElementById('scrollRight');

    if (!scrollContainer || !leftArrow || !rightArrow) return;

    const scrollAmount = 400; // Scroll by one card width approximately

    // Left arrow click
    leftArrow.addEventListener('click', () => {
        scrollContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    // Right arrow click
    rightArrow.addEventListener('click', () => {
        scrollContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Update arrow visibility based on scroll position
    function updateArrowVisibility() {
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        
        if (scrollContainer.scrollLeft <= 0) {
            leftArrow.style.opacity = '0.3';
            leftArrow.style.cursor = 'not-allowed';
        } else {
            leftArrow.style.opacity = '1';
            leftArrow.style.cursor = 'pointer';
        }

        if (scrollContainer.scrollLeft >= maxScroll - 5) {
            rightArrow.style.opacity = '0.3';
            rightArrow.style.cursor = 'not-allowed';
        } else {
            rightArrow.style.opacity = '1';
            rightArrow.style.cursor = 'pointer';
        }
    }

    scrollContainer.addEventListener('scroll', updateArrowVisibility);
    updateArrowVisibility(); // Initial check

    // Drag to scroll functionality
    let isDown = false;
    let startX;
    let scrollLeft;

    scrollContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        scrollContainer.style.cursor = 'grabbing';
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
    });

    scrollContainer.addEventListener('mouseleave', () => {
        isDown = false;
        scrollContainer.style.cursor = 'grab';
    });

    scrollContainer.addEventListener('mouseup', () => {
        isDown = false;
        scrollContainer.style.cursor = 'grab';
    });

    scrollContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainer.scrollLeft = scrollLeft - walk;
    });
}

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

    // Initialize publications scroll
    initPublicationsScroll();

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
            if (this.src && this.src !== window.location.href + '/static/images/contributions.png') {
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
