// Прості функції для модального вікна - без складних залежностей
function openRegistrationModal() {
    console.log('=== ВІДКРИВАЄМО МОДАЛКУ ===');
    const modal = document.getElementById('registration-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Примусово показуємо модалку
        setTimeout(() => {
            modal.classList.add('active');
            console.log('Модалка додана, клас active:', modal.classList.contains('active'));
        }, 50);
    } else {
        console.error(' Модальне вікно не знайдено!');
    }
}

function closeRegistrationModal() {
    console.log('=== ЗАКРИВАЄМО МОДАЛКУ ===');
    const modal = document.getElementById('registration-modal');
    if (modal) {
        modal.classList.remove('active');
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Проста функція для сповіщень
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'linear-gradient(135deg, #4361ee, #3a0ca3)'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        border: 2px solid ${type === 'success' ? '#22c55e' : '#4361ee'};
        z-index: 10001;
        max-width: 400px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    `;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Таймер турніру
let tournamentCountdownTimer;

function updateTournamentCountdown() {
    const tournamentDate = new Date('2025-10-16T18:00:00').getTime();
    const now = new Date().getTime();
    const distance = tournamentDate - now;

    if (distance < 0) {
        clearInterval(tournamentCountdownTimer);
        const timerElement = document.querySelector('.countdown-timer');
        if (timerElement) {
            timerElement.innerHTML = `
                <div class="tournament-started">
                    <i class="fas fa-trophy"></i>
                    <div>Турнір розпочався!</div>
                </div>
            `;
        }
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Оновлюємо тільки якщо елементи існують
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
    if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
    if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
    if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
}

// Сповіщення про турніри
function notifyTournament(tournamentName) {
    showNotification(`🔔 Ви будете повідомлені про турнір "${tournamentName}"`, 'info');
    
    const btn = event.target.closest('.notify-btn');
    if (btn) {
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> СПОВІЩЕННЯ ВКЛ';
        btn.style.background = 'var(--neon-cyan)';
        btn.style.color = 'var(--dark-bg)';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            btn.style.color = '';
            btn.disabled = false;
        }, 3000);
    }
}

// Плавна прокрутка
function scrollToRegistration() {
    const element = document.querySelector('.active-tournament');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function scrollToUpcoming() {
    const element = document.querySelector('.upcoming-tournaments');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function scrollToMap() {
    const element = document.querySelector('.map-section');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Ініціалізація при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== СТОРІНКА ТУРНІРІВ ЗАВАНТАЖЕНА ===');

    // Запускаємо таймер
    if (document.querySelector('.countdown-timer')) {
        tournamentCountdownTimer = setInterval(updateTournamentCountdown, 1000);
        updateTournamentCountdown();
    }

    // Обробка форми реєстрації
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Зупиняємо вспливання
            
            console.log('=== ФОРМА ВІДПРАВЛЕНА ===');
            
            const teamName = this.querySelector('input[type="text"]').value;
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ВІДПРАВКА...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification(`🎉 Команда "${teamName}" успішно зареєстрована!`, 'success');
                this.reset();
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Закриваємо модалку тільки після успішної відправки
                setTimeout(() => {
                    closeRegistrationModal();
                }, 1000);
            }, 2000);
        });
    }

    // Обробник для закриття модалки
    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeRegistrationModal();
        });
    }

    // Закриття при кліку поза модалкою
    window.addEventListener('click', function(event) {
        if (event.target.id === 'registration-modal') {
            closeRegistrationModal();
        }
    });

    // Закриття по ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeRegistrationModal();
        }
    });

    // Запобігаємо закриттю при кліку всередині модалки
    const modalContent = document.querySelector('.cyber-modal');
    if (modalContent) {
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    console.log('=== ІНІЦІАЛІЗАЦІЯ ЗАВЕРШЕНА ===');
});

// Додаємо обробники для кнопок реєстрації
document.addEventListener('DOMContentLoaded', function() {
    // Знаходимо всі кнопки реєстрації
    const registerButtons = document.querySelectorAll('.register-btn, [onclick*="openRegistrationModal"]');
    registerButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openRegistrationModal();
        });
    });
});
// Прості функції для модалки
function openRegistrationModal(e) {
    if (e) e.preventDefault();
    console.log('ВІДКРИТИ МОДАЛКУ');
    const modal = document.getElementById('registration-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(() => modal.classList.add('active'), 50);
    }
}

function closeRegistrationModal() {
    console.log('ЗАКРИТИ МОДАЛКУ');
    const modal = document.getElementById('registration-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Запобігаємо закриттю при кліку всередині
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('registration-modal');
    const modalContent = document.querySelector('.cyber-modal');
    
    if (modal && modalContent) {
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeRegistrationModal();
            }
        });
    }
    
    // Закриття по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeRegistrationModal();
    });

});
