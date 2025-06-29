// Enhanced Notification System for PrepShelf with Animations
class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.init();
    }

    init() {
        // Create notification container if it doesn't exist
        if (!document.getElementById('notification-container')) {
            const container = document.createElement('div');
            container.id = 'notification-container';
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 10px;
                max-width: 350px;
                pointer-events: none;
            `;
            document.body.appendChild(container);
        }

        // Add enhanced mobile responsive styles
        this.addMobileStyles();
        
        // Add animation keyframes
        this.addAnimationStyles();
    }

    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }

            @keyframes slideInTop {
                from {
                    transform: translateY(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            @keyframes slideOutTop {
                from {
                    transform: translateY(0);
                    opacity: 1;
                }
                to {
                    transform: translateY(-100%);
                    opacity: 0;
                }
            }

            @keyframes bounceIn {
                0% {
                    transform: scale(0.3);
                    opacity: 0;
                }
                50% {
                    transform: scale(1.05);
                }
                70% {
                    transform: scale(0.9);
                }
                100% {
                    transform: scale(1);
                    opacity: 1;
                }
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes pulse {
                0% {
                    box-shadow: 0 0 0 0 rgba(67, 82, 150, 0.7);
                }
                70% {
                    box-shadow: 0 0 0 10px rgba(67, 82, 150, 0);
                }
                100% {
                    box-shadow: 0 0 0 0 rgba(67, 82, 150, 0);
                }
            }

            @keyframes shake {
                0%, 100% {
                    transform: translateX(0);
                }
                10%, 30%, 50%, 70%, 90% {
                    transform: translateX(-5px);
                }
                20%, 40%, 60%, 80% {
                    transform: translateX(5px);
                }
            }

            .notification {
                animation: slideInRight 0.5s ease-out;
                transition: all 0.3s ease;
            }

            .notification.removing {
                animation: slideOutRight 0.5s ease-in;
            }

            .notification.success {
                animation: bounceIn 0.6s ease-out;
            }

            .notification.error {
                animation: shake 0.5s ease-in-out;
            }

            .notification.warning {
                animation: pulse 2s infinite;
            }

            .notification:hover {
                transform: translateY(-2px) scale(1.02);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
            }

            .notification-icon {
                animation: fadeIn 0.5s ease-out 0.2s both;
            }

            .notification-content {
                animation: fadeIn 0.5s ease-out 0.3s both;
            }

            .notification-close {
                animation: fadeIn 0.5s ease-out 0.4s both;
            }

            .notification-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                background: rgba(255, 255, 255, 0.3);
                width: 100%;
                border-radius: 0 0 8px 8px;
                overflow: hidden;
            }

            .notification-progress-bar {
                height: 100%;
                background: rgba(255, 255, 255, 0.8);
                width: 100%;
                animation: progressShrink 4s linear;
            }

            @keyframes progressShrink {
                from {
                    width: 100%;
                }
                to {
                    width: 0%;
                }
            }
        `;
        document.head.appendChild(style);
    }

    addMobileStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 576px) {
                #notification-container {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                    top: 10px;
                }
                
                .notification {
                    animation: slideInTop 0.5s ease-out;
                    pointer-events: auto;
                }
                
                .notification.removing {
                    animation: slideOutTop 0.5s ease-in;
                }
                
                .notification:hover {
                    transform: none;
                }
            }
        `;
        document.head.appendChild(style);
    }

    show(message, type = 'info', duration = 4000) {
        const notification = this.createNotification(message, type);
        this.notifications.push(notification);
        
        // Add to container
        const container = document.getElementById('notification-container');
        container.appendChild(notification);
        
        // Add progress bar for auto-removal
        if (duration > 0) {
            this.addProgressBar(notification, duration);
        }
        
        // Auto remove
        if (duration > 0) {
            setTimeout(() => {
                this.remove(notification);
            }, duration);
        }
        
        return notification;
    }

    createNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icon = this.getIcon(type);
        const color = this.getColor(type);
        const bgColor = this.getBackgroundColor(type);
        
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="fas ${icon}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-message">${message}</div>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
            <div class="notification-progress">
                <div class="notification-progress-bar"></div>
            </div>
        `;
        
        notification.style.cssText = `
            background: ${bgColor};
            color: white;
            padding: 15px 20px;
            border-radius: 12px;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            gap: 12px;
            max-width: 100%;
            word-wrap: break-word;
            position: relative;
            overflow: hidden;
            pointer-events: auto;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        `;
        
        // Add hover effects
        notification.addEventListener('mouseenter', () => {
            notification.style.transform = 'translateY(-2px) scale(1.02)';
            notification.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
        });
        
        notification.addEventListener('mouseleave', () => {
            notification.style.transform = 'translateY(0) scale(1)';
            notification.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
        });
        
        return notification;
    }

    addProgressBar(notification, duration) {
        const progressBar = notification.querySelector('.notification-progress-bar');
        if (progressBar) {
            progressBar.style.animationDuration = `${duration}ms`;
        }
    }

    getIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    getColor(type) {
        const colors = {
            success: '#ffffff',
            error: '#ffffff',
            warning: '#212529',
            info: '#ffffff'
        };
        return colors[type] || colors.info;
    }

    getBackgroundColor(type) {
        const colors = {
            success: 'linear-gradient(135deg, #28a745, #20c997)',
            error: 'linear-gradient(135deg, #dc3545, #e74c3c)',
            warning: 'linear-gradient(135deg, #ffc107, #ffca2c)',
            info: 'linear-gradient(135deg, #17a2b8, #20c997)'
        };
        return colors[type] || colors.info;
    }

    remove(notification) {
        if (notification && notification.parentElement) {
            notification.classList.add('removing');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.parentElement.removeChild(notification);
                }
                const index = this.notifications.indexOf(notification);
                if (index > -1) {
                    this.notifications.splice(index, 1);
                }
            }, 500);
        }
    }

    clearAll() {
        this.notifications.forEach(notification => {
            this.remove(notification);
        });
    }

    // Enhanced convenience methods with animations
    success(message, duration = 4000) {
        return this.show(message, 'success', duration);
    }

    error(message, duration = 5000) {
        return this.show(message, 'error', duration);
    }

    warning(message, duration = 4000) {
        return this.show(message, 'warning', duration);
    }

    info(message, duration = 3000) {
        return this.show(message, 'info', duration);
    }

    // New method for persistent notifications
    persistent(message, type = 'info') {
        return this.show(message, type, 0); // 0 duration = no auto-remove
    }

    // New method for quick notifications
    quick(message, type = 'info') {
        return this.show(message, type, 2000);
    }
}

// Initialize notification system
const notifications = new NotificationSystem();

// Global function for backward compatibility
function showNotification(message, type = 'info', duration = 4000) {
    return notifications.show(message, type, duration);
}

// Enhanced global functions
function showSuccess(message, duration = 4000) {
    return notifications.success(message, duration);
}

function showError(message, duration = 5000) {
    return notifications.error(message, duration);
}

function showWarning(message, duration = 4000) {
    return notifications.warning(message, duration);
}

function showInfo(message, duration = 3000) {
    return notifications.info(message, duration);
}

function showQuick(message, type = 'info') {
    return notifications.quick(message, type);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        NotificationSystem, 
        showNotification,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        showQuick
    };
} 