// Функції для калькулятора
function changeHours(amount) {
    const hoursInput = document.getElementById('hours');
    let currentHours = parseInt(hoursInput.value);
    let newHours = currentHours + amount;
    
    if (newHours >= 1 && newHours <= 24) {
        hoursInput.value = newHours;
        calculatePrice();
    }
}

function calculatePrice() {
    const serviceType = document.getElementById('service-type');
    const hours = document.getElementById('hours');
    const priceElement = document.getElementById('price');
    
    const pricePerHour = parseInt(serviceType.value);
    const totalHours = parseInt(hours.value);
    const totalPrice = pricePerHour * totalHours;
    
    // Анімація зміни ціни
    priceElement.style.transform = 'scale(1.1)';
    setTimeout(() => {
        priceElement.textContent = totalPrice;
        priceElement.style.transform = 'scale(1)';
    }, 150);
}

// Додаємо обробники подій
document.addEventListener('DOMContentLoaded', function() {
    const serviceSelect = document.getElementById('service-type');
    const hoursInput = document.getElementById('hours');
    
    serviceSelect.addEventListener('change', calculatePrice);
    hoursInput.addEventListener('input', calculatePrice);
});

// Функції для табів обладнання
function openTab(tabName) {
    // Приховати всі вмісти табів
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));
    
    // Видалити активний клас з усіх кнопок
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Показати вибраний таб та активувати кнопку
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Функції для деталей послуг
function showEquipmentDetails(type) {
    let tabToOpen = '';
    
    switch(type) {
        case 'pc':
            tabToOpen = 'standard-pc';
            break;
        case 'vr':
            tabToOpen = 'vr-equipment';
            break;
        case 'console':
            tabToOpen = 'consoles';
            break;
    }
    
    // Перейти до секції обладнання
    document.querySelector('.equipment-section').scrollIntoView({ 
        behavior: 'smooth' 
    });
    
    // Відкрити відповідний таб
    setTimeout(() => {
        const tabButton = Array.from(document.querySelectorAll('.tab-btn'))
            .find(btn => btn.onclick.toString().includes(tabToOpen));
        if (tabButton) tabButton.click();
    }, 500);
}

function showTournamentInfo() {
    alert('Для детальної інформації про організацію турнірів, будь ласка, зв\'яжіться з нами по телефону або напишіть на пошту.');
}

// Модальне вікно
function openBookingModal() {
    document.getElementById('booking-modal').style.display = 'block';
}

function closeBookingModal() {
    document.getElementById('booking-modal').style.display = 'none';
}

// Обробники подій
document.addEventListener('DOMContentLoaded', function() {
    // Ініціалізація калькулятора
    calculatePrice();
    
    // Обробники для модального вікна
    document.querySelector('.close-modal').addEventListener('click', closeBookingModal);
    
    // Закриття модального вікна при кліку поза ним
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('booking-modal');
        if (event.target === modal) {
            closeBookingModal();
        }
    });
    
    // Оновлення ціни при зміні значень
    document.getElementById('service-type').addEventListener('change', calculatePrice);
    document.getElementById('hours').addEventListener('input', calculatePrice);
});

// Функція для відправки форми бронювання
document.getElementById('booking-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Дякуємо за бронювання! Ми зв\'яжемося з вами найближчим часом для підтвердження.');
    closeBookingModal();
    this.reset();
});
// Функції для футера
function openVRBookingModal() {
    document.getElementById('booking-modal').style.display = 'block';
    // Можна додати логіку для автоматичного вибору VR послуги
}

function openConsoleBookingModal() {
    document.getElementById('booking-modal').style.display = 'block';
    // Можна додати логіку для автоматичного вибору консолі
}

// Анімація статистики
function animateStats() {
    const stats = [
        { id: 'online-now', target: 24 },
        { id: 'matches-today', target: 8 },
        { id: 'tournaments-upcoming', target: 3 },
        { id: 'avg-wait-time', target: 5 }
    ];

    stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        if (element) {
            let current = 0;
            const increment = stat.target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= stat.target) {
                    current = stat.target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, 40);
        }
    });
}

// Запуск анімації при завантаженні
document.addEventListener('DOMContentLoaded', function() {
    // Запустити анімацію статистики
    setTimeout(animateStats, 1000);
    
    // Оновлення статусу роботи
    updateWorkingStatus();
});

// Функція для оновлення статусу роботи
function updateWorkingStatus() {
    const now = new Date();
    const currentHour = now.getHours();
    const isOpen = currentHour >= 0 && currentHour < 24; // 24/7
    
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');
    
    if (isOpen) {
        statusDot.classList.add('open');
        statusText.textContent = 'Зараз відкрито';
    } else {
        statusDot.classList.remove('open');
        statusDot.style.background = '#ff4444';
        statusDot.style.boxShadow = '0 0 10px #ff4444';
        statusText.textContent = 'Зараз зачинено';
    }
}
// Services hero particles animation
function createServicesHeroParticles() {
    const particlesContainer = document.getElementById('servicesHeroParticles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'services-hero-particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 8 + 's';
        
        // Random color
        const colors = ['var(--neon-cyan)', 'var(--neon-pink)', 'var(--electric-blue)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }
}

// Smooth scroll functions
function scrollToCalculator() {
    document.querySelector('.calculator-section').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function scrollToPackages() {
    document.querySelector('.packages-section').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    createServicesHeroParticles();
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all service cards and sections
    document.querySelectorAll('.service-card, .package-card, .additional-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
// ====== ВЗАЄМОДІЯ З ПАКЕТАМИ ======
document.addEventListener("DOMContentLoaded", () => {
    const packageButtons = document.querySelectorAll(".package-btn");
    const bookingModal = document.getElementById("booking-modal");
    const closeModal = bookingModal.querySelector(".close-modal");
    const bookingForm = bookingModal.querySelector("#booking-form");
    const serviceSelect = bookingForm.querySelector("select");

    // натискання "Обрати"
    packageButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".package-card");
            const packageName = card.querySelector("h3").innerText;
            const packagePrice = card.querySelector(".package-price").innerText;

            // відкриваємо модальне вікно
            bookingModal.style.display = "flex";
            document.body.style.overflow = "hidden";

            // автоматично заповнюємо послугу
            serviceSelect.innerHTML = `
                <option selected>${packageName} (${packagePrice})</option>
                <option>ПК Геймінг</option>
                <option>VR Зона</option>
                <option>Консолі</option>
            `;
        });
    });

    // закриття модалки
    closeModal.addEventListener("click", () => {
        bookingModal.style.display = "none";
        document.body.style.overflow = "";
    });

    // клік поза модалкою — закрити
    bookingModal.addEventListener("click", (e) => {
        if (e.target === bookingModal) {
            bookingModal.style.display = "none";
            document.body.style.overflow = "";
        }
    });

    // надсилання форми
    bookingForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert(" Ваше бронювання прийнято! Ми зв’яжемось із вами найближчим часом.");
        bookingModal.style.display = "none";
        document.body.style.overflow = "";
        bookingForm.reset();
    });
});
