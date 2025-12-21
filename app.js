document.addEventListener('DOMContentLoaded', () => {
    
    // ==== ANIMACIÓN DE ENTRADA MEJORADA (Zoom through) ====
    const preloader = document.getElementById('preloader');
    
    if (preloader) {
        const tl = gsap.timeline({
            onComplete: () => {
                document.body.classList.remove('preloader-active');
                preloader.style.display = 'none';
            }
        });

        // Calculamos cuánto hay que mover la T para centrarla después de que se vaya "iago"
        // (Ajuste visual aproximado para que el zoom se sienta centrado)
        const centerOffset = window.innerWidth < 768 ? 20 : 40; 

        tl
        // 1. Aparece "Tiago"
        .to(".preloader-text", { 
            autoAlpha: 1, 
            duration: 0.5 
        })
        
        // 2. "iago" se va y la "T" se centra y cambia de color
        .to(".letters-iago", { 
            x: "20px",      // Pequeño rebote a la derecha...
            opacity: 0,     
            duration: 0.5, 
            ease: "power2.in"
        })
        .to(".letter-t", { 
            color: "#00ffcc",
            x: centerOffset, // Movemos la T al centro visual
            duration: 0.5,
            ease: "power2.out"
        }, "<") // Ocurre al mismo tiempo que lo anterior

        // 3. LA "T" CRECE HASTA OCUPAR TODO (El efecto túnel)
        .to(".letter-t", {
            scale: 300,        // Escala masiva para cubrir cualquier pantalla 4k
            duration: 1.2,     // Duración del viaje
            ease: "power4.in", // Empieza lento y acelera como un cohete
            transformOrigin: "50% 58%" // Ajuste fino para hacer zoom al centro de la letra
        })
        
        // 4. Desvanecer el preloader justo cuando la pantalla está llena de color
        .to("#preloader", {
            opacity: 0,
            duration: 0.4,
            ease: "none" // Lineal para que sea instantáneo
        }, "-=0.2"); // Empieza un poquito antes de que termine de crecer la T
    }
});
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
const textToType = 'diseñando páginas web desde 2024 en diversos proyectos, actualmente estudia en el Instituto Politécnico Modelo donde sigue aprendiendo sobre el desarrollo de apps y páginas web.';
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
// === Three.js 3D Background ===
function initThreeJS() {
    // 1. Verificación de seguridad: Si es móvil, NO iniciar Three.js
    if (window.innerWidth < 968) return;

    const container = document.getElementById('canvas-container');
    if (!container) return;

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // --- AJUSTES DE TAMAÑO ---
    // Antes: (1.5, 0.4...) -> Ahora: (1.1, 0.3...) para hacerlo más chico y elegante
    const geometry = new THREE.TorusKnotGeometry(1.1, 0.3, 100, 16);
    
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x00ffcc, 
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    
    const torusKnot = new THREE.Mesh(geometry, material);
    
    // --- AJUSTES DE POSICIÓN ---
    // Movemos el objeto a la derecha (X positivo)
    torusKnot.position.x = 3; 

    scene.add(torusKnot);

    // Animación
    function animate() {
        requestAnimationFrame(animate);

        torusKnot.rotation.x += 0.003;
        torusKnot.rotation.y += 0.005;

        // Efecto flotante leve
        torusKnot.position.y = Math.sin(Date.now() * 0.001) * 0.2;

        renderer.render(scene, camera);
    }

    animate();

    // Responsive: Ajustar si cambia el tamaño de ventana
    window.addEventListener('resize', () => {
        if (window.innerWidth < 968) {
            container.style.display = 'none';
        } else {
            container.style.display = 'block';
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    });
    
    // Interacción suave con el mouse
    document.addEventListener('mousemove', (event) => {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        
        // Rotación sutil basada en el mouse
        torusKnot.rotation.x += mouseY * 0.05;
        torusKnot.rotation.y += mouseX * 0.05;
    });
}

document.addEventListener('DOMContentLoaded', initThreeJS);
// === 3D Tilt Effect for Projects ===
function initTiltEffect() {
    // Solo activamos en pantallas grandes (mouse)
    if (window.matchMedia("(hover: none)").matches) return;

    const cards = document.querySelectorAll('.project-item');

    cards.forEach(card => {
        const wrapper = card.querySelector('.project-image-wrapper');
        const shine = card.querySelector('.shine');

        if (!wrapper || !shine) return;

        // Movimiento del Mouse
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            
            // Calculamos la posición del mouse dentro de la tarjeta
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculamos el centro
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculamos la rotación (máximo 15 grados para no marear)
            // Multiplicamos por valores pequeños para suavizar
            const rotateX = ((y - centerY) / centerY) * -10; // Eje X invertido
            const rotateY = ((x - centerX) / centerX) * 10;  // Eje Y normal

            // Aplicamos la rotación
            wrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

            // Calculamos el brillo (se mueve opuesto al mouse)
            // Usamos background-position o gradiente dinámico
            shine.style.opacity = '1';
            shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)`;
        });

        // Cuando el mouse sale, reseteamos suavemente
        card.addEventListener('mouseleave', () => {
            // Usamos una transición suave definida en CSS o forzada aquí
            wrapper.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            wrapper.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            shine.style.opacity = '0';
            
            // Quitamos la transición después de que termine para que el mousemove sea rápido
            setTimeout(() => {
                wrapper.style.transition = 'transform 0.1s ease-out';
            }, 500);
        });
        
        // Entrada (MouseEnter) para quitar transiciones lentas
        card.addEventListener('mouseenter', () => {
            wrapper.style.transition = 'transform 0.1s ease-out';
        });
    });
}

// Llamar a la función cuando cargue
document.addEventListener('DOMContentLoaded', initTiltEffect);

