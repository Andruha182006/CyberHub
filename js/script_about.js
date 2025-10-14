// JavaScript для сторінки "Про автора"
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сторінка "Про автора" завантажена');
    
    // Ініціалізація анімацій для сторінки
    initAuthorAnimations();
    
    // Додавання інтерактивності для елементів
    initAuthorInteractions();
});

function initAuthorAnimations() {
    // Додаткові анімації для сторінки автора
    const authorCard = document.querySelector('.author-card');
    const skillItems = document.querySelectorAll('.skill-item');
    
    if (authorCard) {
        // Додаємо ефект при появі картки
        authorCard.style.opacity = '0';
        authorCard.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            authorCard.style.transition = 'all 0.8s ease';
            authorCard.style.opacity = '1';
            authorCard.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Анімація появи навичок з затримкою
    skillItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 500 + (index * 100));
    });
}

function initAuthorInteractions() {
    const contactLinks = document.querySelectorAll('.contact-item a');
    const skillItems = document.querySelectorAll('.skill-item');
    
    // Ефект при кліку на контактні посилання
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Додаємо візуальний фідбек
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Додаткові ефекти для навичок
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'all 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Ефект для аватара
    const avatar = document.querySelector('.author-avatar');
    if (avatar) {
        avatar.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'all 0.3s ease';
        });
        
        avatar.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

// Додаткові функції для сторінки
function copyEmail() {
    const email = 'andrii.hurskyi.pp.2024@lpnu.ua';
    navigator.clipboard.writeText(email).then(() => {
        // Можна додати сповіщення про копіювання
        console.log('Email скопійовано: ' + email);
    });
}

// Глобальні функції
window.copyEmail = copyEmail;