// --- Premium Minecraft Portal Engine ---

// 1. Pixel Dust Particles
const particleContainer = document.getElementById('pixel-particles');
if (particleContainer) {
    const createParticle = () => {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 2; // 2-6px
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 8 + 5; // 5-13s

        particle.style.cssText = `
            position: absolute;
            bottom: -10px;
            left: ${startX}px;
            width: ${size}px;
            height: ${size}px;
            background: rgba(77, 240, 77, ${Math.random() * 0.4});
            box-shadow: 0 0 ${size}px var(--accent-color);
            pointer-events: none;
            z-index: 1;
            opacity: 0;
            animation: floatUp ${duration}s linear forwards;
        `;

        particleContainer.appendChild(particle);

        // Remove after animation
        setTimeout(() => particle.remove(), duration * 1000);
    };

    // Style the animation dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes floatUp {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            20% { opacity: 0.6; }
            80% { opacity: 0.3; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Continuous generation
    setInterval(createParticle, 300);
}

// 2. Premium Smooth Pixel Cursor
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

const animateCursor = () => {
    // Lerp for smoothness
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;

    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    if (cursor) cursor.style.transform = `translate3d(${cursorX - 7}px, ${cursorY - 7}px, 0)`;
    if (follower) follower.style.transform = `translate3d(${followerX - 20}px, ${followerY - 20}px, 0)`;

    requestAnimationFrame(animateCursor);
};
animateCursor();

// 3. Hover Interactions
const interactives = document.querySelectorAll('a, button, .skill-card, .project-card, .glass-panel');
interactives.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));

    // Magnetic pop
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - (rect.left + rect.width / 2)) * 0.1;
        const y = (e.clientY - (rect.top + rect.height / 2)) * 0.1;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.02)`;
    });
    el.addEventListener('mouseleave', () => {
        el.style.transform = `translate3d(0, 0, 0) scale(1)`;
    });
});

// 4. Scroll Reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

// 5. Ambient Music Toggle Logic
const musicBtn = document.getElementById('sound-toggle');
let audioPlaying = false;
// Note: We use a placeholder for ambient sound
const ambientAudio = new Audio();
ambientAudio.loop = true;

if (musicBtn) {
    musicBtn.addEventListener('click', () => {
        audioPlaying = !audioPlaying;
        const icon = musicBtn.querySelector('i');
        if (audioPlaying) {
            icon.classList.replace('fa-volume-xmark', 'fa-volume-high');
            musicBtn.style.opacity = '1';
            // ambientAudio.play().catch(e => console.log("Audio requires interaction"));
        } else {
            icon.classList.replace('fa-volume-high', 'fa-volume-xmark');
            musicBtn.style.opacity = '0.5';
            // ambientAudio.pause();
        }
    });
}

// 6. Parallax Hero
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const bg = document.querySelector('.video-background');
    if (bg) {
        bg.style.transform = `translate3d(-50%, -50%, 0) translateY(${scrolled * 0.2}px)`;
    }
});
