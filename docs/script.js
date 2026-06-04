// Interactive Minecraft-style UI
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation functionality
    const navSlots = document.querySelectorAll('.nav-slot');
    const sections = {
        'home': document.querySelector('.hero-section'),
        'features': document.querySelector('.features-section'),
        'downloads': document.querySelector('.installer-card'),
        'wiki': document.querySelector('.installation-section'),
        'community': document.querySelector('.footer')
    };

    navSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            // Update active state
            navSlots.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            
            // Scroll to section
            const page = this.dataset.page;
            if (sections[page]) {
                sections[page].scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });

    // Download tracking
    const downloadBtn = document.querySelector('.download-btn.primary');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            // Track download (optional analytics)
            console.log('Wonderlands installer downloaded');
            
            // Show confirmation message
            showNotification('Download started! Check your downloads folder.', 'success');
            
            // You can add Google Analytics or custom tracking here
            // gtag('event', 'download', { 'event_category': 'modpack', 'event_label': 'installer' });
        });
    }

    // Animate stats on scroll
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateStats() {
        if (animated) return;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            if (isNaN(target)) return;
            
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            }, 20);
        });
        animated = true;
    }

    // Trigger animation when stats come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    });

    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) observer.observe(statsGrid);

    // Add tooltip-like effect on feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Version checker (checks GitHub for latest release)
    function checkForUpdates() {
        fetch('https://api.github.com/repos/fabric-wonderlands/fabric-wonderlands/releases/latest')
            .then(response => response.json())
            .then(data => {
                const latestVersion = data.tag_name;
                const currentVersion = document.querySelector('.version-number').textContent;
                
                if (latestVersion !== currentVersion) {
                    showNotification(`New version ${latestVersion} available! Update recommended.`, 'info');
                }
            })
            .catch(err => console.log('Update check failed:', err));
    }

    // Check for updates every hour
    setInterval(checkForUpdates, 3600000);
    checkForUpdates(); // Initial check

    // Floating animation for Minecraft icon
    const minecraftIcon = document.querySelector('.minecraft-icon');
    if (minecraftIcon) {
        setInterval(() => {
            minecraftIcon.style.transform = 'scale(1.1)';
            setTimeout(() => {
                minecraftIcon.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }

    // Add background particle effect (like minecraft XP orbs)
    function createParticle() {
        const particle = document.createElement('div');
        particle.innerHTML = ['✨', '⭐', '💎', '⚡'][Math.floor(Math.random() * 4)];
        particle.style.position = 'fixed';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = '-20px';
        particle.style.fontSize = '20px';
        particle.style.opacity = '0.8';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '999';
        particle.style.animation = `fall ${3 + Math.random() * 2}s linear`;
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 5000);
    }

    // Add CSS for falling animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Create particles periodically
    setInterval(createParticle, 3000);

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#FF9800'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-family: 'Press Start 2P', monospace;
            font-size: 10px;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Add slide animations
    const animStyle = document.createElement('style');
    animStyle.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(animStyle);

    console.log('Wonderlands website loaded! ⚔️ Welcome, adventurer!');
});
