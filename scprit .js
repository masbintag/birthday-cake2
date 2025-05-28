document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const openingScreen = document.getElementById('opening-screen');
    const envelope = document.querySelector('.envelope');
    const mainContent = document.getElementById('main-content');
    const playButton = document.getElementById('playButton');
    const audio = document.getElementById('birthdayAudio');
    const musicToggle = document.getElementById('musicToggle');
    const vinyl = document.querySelector('.vinyl');
    const sendWishBtn = document.getElementById('sendWishBtn');
    
    // Variables
    let isPlaying = false;
    let timerInterval;
    let seconds = 0;
    let moves = 0;
    
    // Opening screen transition
    envelope.addEventListener('click', function() {
        // Create confetti effect
        createConfetti();
        
        // Hide opening screen and show main content
        setTimeout(() => {
            openingScreen.style.transform = 'scale(1.5)';
            openingScreen.style.opacity = '0';
            
            setTimeout(() => {
                openingScreen.style.display = 'none';
                mainContent.style.display = 'block';
                
                // Fade in main content
                setTimeout(() => {
                    mainContent.style.opacity = '1';
                    
                    // Start countdown
                    startCountdown();
                    
                    // Start floating balloons
                    animateBalloons();
                }, 100);
            }, 1000);
        }, 500);
    });
    
    // Music player functionality
    playButton.addEventListener('click', togglePlay);
    musicToggle.addEventListener('click', togglePlay);
    
    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            vinyl.classList.remove('playing');
        } else {
            audio.play().catch(e => console.log("Audio play failed:", e));
            playButton.innerHTML = '<i class="fas fa-pause"></i>';
            vinyl.classList.add('playing');
        }
        isPlaying = !isPlaying;
    }
    
    // Memory game functionality
    const memoryGame = document.getElementById('memoryGame');
    const gameStatus = document.getElementById('gameStatus');
    const timerDisplay = document.getElementById('timer');
    const movesDisplay = document.getElementById('moves');
    
    const symbols = ['🎁', '🎂', '🎈', '🎉', '🎊', '🥳', '🍰', '🎆'];
    const cards = [...symbols, ...symbols];
    let flippedCards = [];
    let matchedCards = [];
    
    // Initialize game
    function initGame() {
        memoryGame.innerHTML = '';
        flippedCards = [];
        matchedCards = [];
        seconds = 0;
        moves = 0;
        movesDisplay.textContent = moves;
        timerDisplay.textContent = '00:00';
        clearInterval(timerInterval);
        gameStatus.textContent = 'Temukan semua pasangan kado untuk mendapatkan kejutan!';
        
        // Shuffle cards
        cards.sort(() => Math.random() - 0.5);
        
        // Create game cards
        cards.forEach((symbol, index) => {
            const card = document.createElement('div');
            card.classList.add('card-game');
            card.dataset.symbol = symbol;
            card.dataset.index = index;
            
            const cardFront = document.createElement('div');
            cardFront.classList.add('card-front');
            cardFront.textContent = '🎁';
            
            const cardBack = document.createElement('div');
            cardBack.classList.add('card-back');
            cardBack.textContent = symbol;
            
            card.appendChild(cardFront);
            card.appendChild(cardBack);
            
            card.addEventListener('click', flipCard);
            memoryGame.appendChild(card);
        });
    }
    
    // Start timer
    function startTimer() {
        timerInterval = setInterval(() => {
            seconds++;
            const minutes = Math.floor(seconds / 60);
            const secs = seconds % 60;
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }, 1000);
    }
    
    // Flip card
    function flipCard() {
        // Start timer on first move
        if (moves === 0) {
            startTimer();
        }
        
        if (flippedCards.length < 2 && !flippedCards.includes(this) && !matchedCards.includes(this)) {
            this.classList.add('flipped');
            flippedCards.push(this);
            moves++;
            movesDisplay.textContent = moves;
            
            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }
    }
    
    // Check for match
    function checkMatch() {
        const [card1, card2] = flippedCards;
        const symbol1 = card1.dataset.symbol;
        const symbol2 = card2.dataset.symbol;
        
        if (symbol1 === symbol2) {
            matchedCards.push(card1, card2);
            card1.style.visibility = 'hidden';
            card2.style.visibility = 'hidden';
            
            if (matchedCards.length === cards.length) {
                clearInterval(timerInterval);
                gameStatus.textContent = 'Selamat! Anda menang! 🎉';
                createConfetti();
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }
        
        flippedCards = [];
    }
    
    // Wish form functionality
    sendWishBtn.addEventListener('click', function() {
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const wish = document.getElementById('wish').value;
        
        if (name && phone && wish) {
            // Format WhatsApp message
            const message = `Hai! Saya ${name}.\n\n${wish}\n\nSelamat Ulang Tahun! 🎉🎂🎁`;
            
            // Create WhatsApp link
            const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            
            // Open in new tab
            window.open(whatsappLink, '_blank');
        } else {
            alert('Silakan isi semua kolom yang diperlukan!');
        }
    });
    
    // Countdown timer
    function startCountdown() {
        // Set the birthday date (adjust to your needs)
        const birthdayDate = new Date();
        birthdayDate.setDate(birthdayDate.getDate() + 3); // 3 days from now
        
        function updateCountdown() {
            const now = new Date();
            const diff = birthdayDate - now;
            
            if (diff <= 0) {
                document.getElementById('days').textContent = '00';
                document.getElementById('hours').textContent = '00';
                document.getElementById('minutes').textContent = '00';
                document.getElementById('seconds').textContent = '00';
                return;
            }
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // Animate floating balloons
    function animateBalloons() {
        const balloons = document.querySelectorAll('.balloon');
        balloons.forEach(balloon => {
            // Reset position
            balloon.style.top = '-100px';
            
            // Start animation
            setTimeout(() => {
                balloon.style.animation = 'floatBalloon 15s infinite linear';
            }, parseFloat(balloon.style.animationDelay || '0s') * 1000);
        });
    }
    
    // Confetti effect
    function createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#ffd166', '#1a535c', '#ff9a9e'];
        const container = document.getElementById('confetti-container');
        
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.background = color;
            
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            confetti.style.opacity = Math.random() * 0.5 + 0.5;
            confetti.style.animationDelay = Math.random() * 2 + 's';
            
            container.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }
    
    // Initialize game
    initGame();
});