document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll) library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Add hover effect to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
    });

    // Animated robot in header
    const robot = document.querySelector('.animated-robot');
    setInterval(() => {
        robot.style.animation = 'none';
        void robot.offsetWidth; // Trigger reflow
        robot.style.animation = 'float 3s ease-in-out infinite';
    }, 10000);

    // Typewriter effect for header
    const headerText = document.querySelector('.header p');
    const originalText = headerText.textContent;
    headerText.textContent = '';
    
    let i = 0;
    const typeWriter = setInterval(() => {
        if (i < originalText.length) {
            headerText.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typeWriter);
        }
    }, 50);

    // Interactive timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            timelineItems.forEach(i => i.style.opacity = '0.6');
            this.style.opacity = '1';
            this.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                timelineItems.forEach(i => {
                    i.style.opacity = '1';
                    i.style.transform = 'scale(1)';
                });
            }, 1000);
        });
    });

    // Tooltip for icons
    const icons = document.querySelectorAll('.step-icon, .type-icon, .layer-icon');
    icons.forEach(icon => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = icon.parentElement.querySelector('h3').textContent;
        icon.parentElement.appendChild(tooltip);
        
        icon.addEventListener('mouseenter', () => {
            tooltip.style.visibility = 'visible';
            tooltip.style.opacity = '1';
        });
        
        icon.addEventListener('mouseleave', () => {
            tooltip.style.visibility = 'hidden';
            tooltip.style.opacity = '0';
        });
    });

    // Dynamic stats counter for case study
    const stats = document.querySelectorAll('.stat-value');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const suffix = stat.textContent.match(/\D+$/)?.[0] || '';
        const duration = 2000;
        const steps = 20;
        const increment = target / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            stat.textContent = Math.round(current) + suffix;
        }, duration / steps);
    });
});

// Add tooltip styles dynamically
const style = document.createElement('style');
style.textContent = `
.tooltip {
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 0.8rem;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 100;
}
`;
document.head.appendChild(style);