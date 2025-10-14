// ====== ІНІЦІАЛІЗАЦІЯ ПРИ ЗАВАНТАЖЕННІ СТОРІНКИ ======
document.addEventListener('DOMContentLoaded', function() {
    // Ініціалізація всіх каруселей
    initAllCarousels();
    
    // Ініціалізація турнірів
    initTournaments();
    
    // Ініціалізація відгуків
    initReviews();
    
    // Анімація статистики
    initStats();
    
    // Створення випадкових спалахів
    createRandomFlashes();
    
    // Перевірка елементів турнірів
    checkTournamentElements();
});

// ====== СИСТЕМА КАРУСЕЛЕЙ ======
function initAllCarousels() {
    // Знаходимо всі карусельні контейнери
    const carousels = document.querySelectorAll('.image-slider');
    
    carousels.forEach((carousel, index) => {
        initCarousel(carousel, index);
    });
}

function initCarousel(carousel, carouselIndex) {
    const track = carousel.querySelector('.image-track');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');

    if (!track || !prevBtn || !nextBtn) return;

    const items = Array.from(track.children);
    if (items.length === 0) return;

    let currentIndex = 0;

    function calculateVisibleItems() {
        const containerWidth = carousel.offsetWidth;
        const itemWidth = items[0].offsetWidth;
        const gap = parseInt(getComputedStyle(track).gap) || 0;
        
        // Скільки елементів поміщається в контейнер
        return Math.floor(containerWidth / (itemWidth + gap));
    }

    function canScroll() {
        const visibleItems = calculateVisibleItems();
        return items.length > visibleItems;
    }

    function updateCarousel() {
        if (!canScroll()) {
            // Якщо скрол неможливий - вимикаємо кнопки та скидаємо позицію
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            track.style.transform = 'translateX(0)';
            return;
        }

        // Вмикаємо кнопки
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';

        const itemWidth = items[0].offsetWidth;
        const gap = parseInt(getComputedStyle(track).gap) || 0;
        const totalWidth = itemWidth + gap;
        const visibleItems = calculateVisibleItems();
        
        // Обмеження індексу, щоб уникнути пустих місць
        const maxIndex = Math.max(0, items.length - visibleItems);
        currentIndex = Math.min(currentIndex, maxIndex);
        
        track.style.transform = `translateX(-${currentIndex * totalWidth}px)`;
        
        // Оновлюємо стан кнопок
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        prevBtn.style.cursor = currentIndex === 0 ? 'default' : 'pointer';
        nextBtn.style.cursor = currentIndex >= maxIndex ? 'default' : 'pointer';
    }

    nextBtn.addEventListener('click', () => {
        if (!canScroll()) return;
        
        const visibleItems = calculateVisibleItems();
        const maxIndex = Math.max(0, items.length - visibleItems);
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        if (!canScroll()) return;
        
        const visibleItems = calculateVisibleItems();
        const maxIndex = Math.max(0, items.length - visibleItems);
        currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
        updateCarousel();
    });

    // Адаптація при зміні розміру вікна
    window.addEventListener('resize', () => {
        updateCarousel();
    });

    // Початкова ініціалізація
    updateCarousel();
}

// ====== СИСТЕМА ТУРНІРІВ ======
function initTournaments() {
    const tournaments = document.querySelectorAll('.tournament');
    const preview = document.querySelector('.tournament-preview');
    
    if (!preview || tournaments.length === 0) {
        console.log('Елементи турнірів не знайдені');
        return;
    }
    
    const previewImg = preview.querySelector('img');

    tournaments.forEach(tournament => {
        tournament.addEventListener('mouseenter', () => {
            const imgSrc = tournament.dataset.img;
            if (imgSrc) {
                previewImg.src = imgSrc;
                preview.style.display = 'block';
            }
        });
        tournament.addEventListener('mouseleave', () => {
            preview.style.display = 'none';
        });
    });
}

// ====== СИСТЕМА ВІДГУКІВ ======
function initReviews() {
    // Ініціалізуємо відгуки тільки якщо вони є на сторінці
    if (document.querySelector('.footer-reviews')) {
        initReviewInteractions();
    }
}

function initReviewInteractions() {
    document.querySelectorAll('.review').forEach(addReviewInteraction);
}

// Функція для додавання взаємодії з відгуками
function addReviewInteraction(review) {
    const likeBtn = review.querySelector('.like-btn');
    const replyBtn = review.querySelector('.reply-btn');
    const repliesContainer = review.querySelector('.replies');

    // Like button functionality
    if (likeBtn) {
        likeBtn.addEventListener('click', () => {
            likeBtn.classList.toggle('liked');
        });
    }

    // Reply button functionality
    if (replyBtn && repliesContainer) {
        replyBtn.addEventListener('click', () => {
            // Check if a form already exists to avoid duplicates
            if (review.querySelector('.reply-form')) return;

            // Create the reply form
            const replyForm = document.createElement('div');
            replyForm.classList.add('reply-form');
            replyForm.innerHTML = `
                <input type="text" class="reply-name" placeholder="Ваше ім'я" required>
                <textarea class="reply-text" placeholder="Ваша відповідь..." required></textarea>
                <div class="reply-form-actions">
                    <button type="button" class="cancel-reply-btn">Скасувати</button>
                    <button type="button" class="submit-reply-btn">Відправити</button>
                </div>
            `;

            // Add the form to the replies container
            repliesContainer.appendChild(replyForm);

            // Handle form submission
            replyForm.querySelector('.submit-reply-btn').addEventListener('click', function() {
                const nameInput = replyForm.querySelector('.reply-name');
                const textInput = replyForm.querySelector('.reply-text');
                const name = nameInput.value.trim();
                const text = textInput.value.trim();

                if (name && text) {
                    // Create the new reply element
                    const replyDiv = document.createElement('div');
                    replyDiv.classList.add('reply');
                    replyDiv.innerHTML = `
                        <p>${escapeHtml(text)}</p>
                        <span class="reply-author">– ${escapeHtml(name)}</span>
                    `;
                    repliesContainer.appendChild(replyDiv);
                    
                    // Remove the form
                    replyForm.remove();
                } else {
                    alert('Будь ласка, заповніть усі поля.');
                }
            });

            // Handle cancel action
            replyForm.querySelector('.cancel-reply-btn').addEventListener('click', function() {
                replyForm.remove();
            });
        });
    }
}

// ====== СИСТЕМА СТАТИСТИКИ ======
function initStats() {
    // Анімація статистики
    const onlineNow = document.getElementById('online-now');
    const matchesToday = document.getElementById('matches-today');
    const tournamentsUpcoming = document.getElementById('tournaments-upcoming');
    
    if (onlineNow && matchesToday && tournamentsUpcoming) {
        setTimeout(() => {
            animateCounter(onlineNow, 24);
            animateCounter(matchesToday, 8);
            animateCounter(tournamentsUpcoming, 3);
        }, 500);
    } else {
        console.log('Елементи статистики не знайдені');
    }
}

// Анімація підрахунку чисел
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ====== КІБЕРПАНК ЕФЕКТИ ======
function createRandomFlashes() {
    const overlay = document.querySelector('.cyberpunk-overlay');
    if (!overlay) return;
    
    for (let i = 0; i < 5; i++) {
        const flash = document.createElement('div');
        flash.className = 'random-flash';
        flash.style.cssText = `
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
            width: ${Math.random() * 100 + 50}px;
            height: ${Math.random() * 3 + 1}px;
        `;
        overlay.appendChild(flash);
    }
}

// ====== СИСТЕМА БРОНЮВАННЯ ======
class CompactBookingModal {
    constructor() {
        this.prices = {
            pc: { 1: 100, 2: 180, 3: 250, 4: 300 },
            vr: { 1: 150, 2: 270, 3: 350, 4: 400 }
        };
        this.currentType = 'pc';
        this.currentDuration = 1;
        this.init();
    }

    init() {
        this.bindEvents();
        this.attachToFooterButtons();
        this.updateCompactSummary();
    }

    bindEvents() {
        // Закриття модалки
        document.querySelector('.compact-modal__close').addEventListener('click', () => this.hide());
        document.querySelector('.compact-modal__overlay').addEventListener('click', () => this.hide());
        
        // ESC для закриття
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isVisible()) this.hide();
        });

        // Вибір типу
        document.querySelectorAll('.compact-type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.setCompactType(e.currentTarget.dataset.type);
            });
        });

        // Вибір тривалості
        document.querySelectorAll('.duration-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.setCompactDuration(parseInt(e.currentTarget.dataset.duration));
            });
        });

        // Відправка форми
        document.getElementById('compactBookingForm').addEventListener('submit', (e) => {
            this.handleCompactSubmit(e);
        });

        // Глобальні функції
        window.showCompactBooking = (type = 'pc') => {
            this.setCompactType(type);
            this.show();
        };
    }

    attachToFooterButtons() {
        // Прив'язуємо до кнопок у футері
        const pcButtons = document.querySelectorAll('.pc-btn, [class*="pc-booking"]');
        const vrButtons = document.querySelectorAll('.vr-btn, [class*="vr-booking"]');
        
        pcButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.setCompactType('pc');
                this.show();
            });
        });
        
        vrButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.setCompactType('vr');
                this.show();
            });
        });

        console.log('🔧 CompactBookingModal: Кнопки футера підключено');
    }

    setCompactType(type) {
        this.currentType = type;
        
        // Оновлюємо UI
        document.querySelectorAll('.compact-type-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.type === type);
        });
        
        this.updateCompactSummary();
    }

    setCompactDuration(duration) {
        this.currentDuration = duration;
        
        document.querySelectorAll('.duration-btn').forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.duration) === duration);
        });
        
        this.updateCompactSummary();
    }

    updateCompactSummary() {
        const price = this.prices[this.currentType][this.currentDuration];
        document.getElementById('compactSummaryPrice').textContent = `${price} грн`;
    }

    show() {
        document.getElementById('compactBookingModal').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    hide() {
        document.getElementById('compactBookingModal').style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    isVisible() {
        return document.getElementById('compactBookingModal').style.display === 'block';
    }

    handleCompactSubmit(e) {
        e.preventDefault();
        
        const formData = {
            type: this.currentType,
            duration: this.currentDuration,
            price: this.prices[this.currentType][this.currentDuration],
            name: document.querySelector('.compact-input[type="text"]').value,
            phone: document.querySelector('.compact-input[type="tel"]').value,
            date: document.querySelector('.compact-input[type="date"]').value,
            time: document.querySelector('.compact-input[type="time"]').value
        };

        if (!this.validateCompactForm(formData)) {
            return;
        }

        this.sendCompactBooking(formData);
    }

    validateCompactForm(data) {
        if (!data.name || !data.phone || !data.date || !data.time) {
            this.showCompactError('Заповніть всі поля');
            return false;
        }
        
        if (!data.phone.match(/^[\+]?[0-9]{10,13}$/)) {
            this.showCompactError('Невірний номер телефону');
            return false;
        }
        
        return true;
    }

    showCompactError(message) {
        // Можна додати маленьке спливаюче сповіщення
        alert(`⚠️ ${message}`);
    }

    sendCompactBooking(data) {
        console.log('Компактне бронювання:', data);
        
        const submitBtn = document.querySelector('.compact-submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = `
            <svg class="submit-icon" width="16" height="16" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            Відправка...
        `;
        submitBtn.disabled = true;
        
        // Симуляція відправки
        setTimeout(() => {
            this.showCompactSuccess(data);
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }

    showCompactSuccess(data) {
        const typeText = data.type === 'pc' ? 'PC' : 'VR';
        const message = `✅ Заброньовано!\n${typeText} • ${data.duration} год\n${data.date} ${data.time}\n${data.price} грн`;
        
        alert(message);
        this.hide();
        document.getElementById('compactBookingForm').reset();
        this.setCompactType('pc');
        this.setCompactDuration(1);
    }
}

// ====== ДОПОМІЖНІ ФУНКЦІЇ ======

// Helper function to prevent HTML injection
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Перевірка елементів турнірів
function checkTournamentElements() {
    const elements = {
        'Таймер': document.querySelector('.countdown-timer'),
        'Турнірні картки': document.querySelectorAll('.tournament-card').length,
        'Модальне вікно': document.getElementById('registration-modal')
    };
    
    console.log('Перевірка елементів турнірів:', elements);
}

// ====== ГЛОБАЛЬНІ ФУНКЦІЇ ДЛЯ HTML ======

// Функції для виклику з кнопок
function openQuickBookingPC() {
    if (window.compactBooking) {
        window.compactBooking.setCompactType('pc');
        window.compactBooking.show();
    }
}

function openQuickBookingVR() {
    if (window.compactBooking) {
        window.compactBooking.setCompactType('vr');
        window.compactBooking.show();
    }
}

// Функції для модальних вікон (заглушки)
function openBookingModal() {
    alert('Форма бронювання PC - тут буде модальне вікно');
}

function openVRBookingModal() {
    alert('Форма бронювання VR - тут буде модальне вікно');
}

// ====== ІНІЦІАЛІЗАЦІЯ СИСТЕМИ БРОНЮВАННЯ ======
document.addEventListener('DOMContentLoaded', () => {
    window.compactBooking = new CompactBookingModal();
});

// Автоматичне підключення до існуючих кнопок
document.addEventListener('DOMContentLoaded', function() {
    // Знаходимо всі кнопки бронювання в футері
    const bookingElements = document.querySelectorAll('.booking-btn, [class*="book"], [onclick*="book"]');
    
    bookingElements.forEach(element => {
        if (element.textContent.toLowerCase().includes('pc') || element.classList.contains('pc-btn')) {
            element.onclick = openQuickBookingPC;
        } else if (element.textContent.toLowerCase().includes('vr') || element.classList.contains('vr-btn')) {
            element.onclick = openQuickBookingVR;
        } else {
            element.onclick = openQuickBookingPC; // За замовчуванням PC
        }
        
        // Додаємо стиль для індикації
        element.style.cursor = 'pointer';
    });
});