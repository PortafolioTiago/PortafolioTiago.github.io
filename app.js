// === Reloj ===
function updateClock() {
    const clock = document.getElementById("clock");
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    clock.textContent = `${hours}:${minutes}`;
}
setInterval(updateClock, 1000);
updateClock();

// === Typing Effect (una sola vez) ===
const typingElement = document.getElementById('typingText');
const cursorElement = document.getElementById('typingCursor');
const textToType = 'diseñando paginas web desde 2024 en diversos proyectos, actualmente estudia en el Instituto Politecnico Modelo donde sigue aprendiendo sobre el desarrollo de apps y paginas web.';
let charIndex = 0;
let hasTyped = false;

function typeText() {
    if (charIndex < textToType.length) {
        typingElement.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 75);
    } else {
        setTimeout(() => {
            cursorElement.style.display = 'none';
        }, 500);
    }
}

const typingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasTyped) {
            hasTyped = true;
            setTimeout(typeText, 500);
            typingObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('.about-section');
if (aboutSection) {
    typingObserver.observe(aboutSection);
}

// === Slide-up animación secuencial ===
const animatedLines = document.querySelectorAll("[data-animate]");

function showSequentially() {
    animatedLines.forEach((line) => {
        const rect = line.getBoundingClientRect();
        const visible = rect.top < window.innerHeight - 80;
        if (visible && !line.classList.contains("visible")) {
            const delay = parseInt(line.dataset.delay) || 0;
            setTimeout(() => {
                line.classList.add("visible");
            }, delay);
        }
    });
}

window.addEventListener("scroll", showSequentially);
window.addEventListener("load", showSequentially);

// === Parallax effect ===
window.addEventListener("scroll", () => {
    const hero = document.querySelector(".hero");
    const offset = window.scrollY;
    
    if (offset > 20) {
        hero.classList.add("scrolled");
    } else {
        hero.classList.remove("scrolled");
    }

    const parallaxSections = document.querySelectorAll('[data-parallax]');
    parallaxSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const scrollProgress = (window.innerHeight - rect.top) / window.innerHeight;
        
        if (scrollProgress > 0 && scrollProgress < 1.5) {
            const translateY = (scrollProgress - 0.5) * -30;
            section.style.transform = `translateY(${translateY}px)`;
        }
    });
});

// === GSAP Animations for Projects ===
gsap.registerPlugin(ScrollTrigger);

// Animar skills icons con entrada escalonada
const skillIcons = document.querySelectorAll(".skill-icon");

skillIcons.forEach((icon, index) => {
    gsap.to(icon, {
        scrollTrigger: {
            trigger: ".skills-icons",
            start: "top 70%",
            toggleActions: "play none none reverse"
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: "power3.out"
    });
});

// Efecto de flotación continua para los íconos
skillIcons.forEach((icon) => {
    const randomY = Math.random() * 15 + 10;
    const randomDuration = Math.random() * 2 + 3;
    
    gsap.to(icon, {
        y: `+=${randomY}`,
        duration: randomDuration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
});

// Animar proyectos con entrada escalonada
const projectItems = document.querySelectorAll(".project-item");

projectItems.forEach((item, index) => {
    gsap.to(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.15,
        ease: "power3.out"
    });
});

// Parallax en videos
projectItems.forEach(item => {
    const media = item.querySelector('video');
    
    if (media) {
        gsap.to(media, {
            scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: -30,
            ease: 'none'
        });
    }
});

// === Video hover effect ===
const projectWrappers = document.querySelectorAll('.project-image-wrapper');

projectWrappers.forEach(wrapper => {
    const video = wrapper.querySelector('video');
    
    if (video) {
        // Precargar el video
        video.load();
        
        wrapper.addEventListener('mouseenter', () => {
            video.play().catch(err => {
                console.log('Error al reproducir video:', err);
            });
        });
        
        wrapper.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    }
});

// === Copy Email to Clipboard ===
const emailBox = document.getElementById('emailBox');
const emailText = 'tiago@ejemplo.com';

if (emailBox) {
    emailBox.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(emailText);
            emailBox.classList.add('copied');
            setTimeout(() => {
                emailBox.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('Error al copiar:', err);
            const textArea = document.createElement('textarea');
            textArea.value = emailText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            emailBox.classList.add('copied');
            setTimeout(() => {
                emailBox.classList.remove('copied');
            }, 2000);
        }
    });
}