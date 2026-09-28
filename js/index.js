// --- Efecto Scroll Header ---
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// --- Funcionalidad Menú Hamburguesa y Animación de Scroll ---
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.querySelector('button[aria-label="Abrir menú"]');
    // Selecciona el botón de cerrar directamente si existe, o usa el de abrir como fallback
    const closeButton = document.querySelector('button[aria-label="Cerrar menú"]') || hamburgerButton;
    const navUl = document.querySelector('nav ul');
    const body = document.body;
    const navLinks = document.querySelectorAll('nav ul li a'); // Selecciona todos los links del menú

    // --- Lógica del Menú Hamburguesa ---
    const toggleMenu = () => {
        navUl.classList.toggle('nav-open');
        body.classList.toggle('mobile-nav-open'); // Para evitar scroll del fondo

        // Cambiar aria-label y texto/icono del botón
        if (navUl.classList.contains('nav-open')) {
            // Asume que el botón inicial es el de abrir y lo cambia a cerrar
            hamburgerButton.setAttribute('aria-label', 'Cerrar menú');
            hamburgerButton.textContent = '✕'; // Cambia el ícono a una X
        } else {
            hamburgerButton.setAttribute('aria-label', 'Abrir menú');
            hamburgerButton.textContent = '☰'; // Vuelve al ícono de hamburguesa
        }
    };

    if (hamburgerButton && navUl) {
        // Usa el mismo botón para abrir y cerrar
        hamburgerButton.addEventListener('click', toggleMenu);
    }

    // Cierra el menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navUl.classList.contains('nav-open')) {
               toggleMenu(); // Reutiliza la función para cerrar
            }
        });
    });

    // --- Animación de Scroll para Secciones ---
    const sections = document.querySelectorAll('.presentation, .work, .we, .gallery .box-image, .gallery .box-image-proyect, .box-image-person-ceo');

    // Verifica si IntersectionObserver es compatible
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null, // Relativo al viewport
            rootMargin: '0px',
            threshold: 0.1 // Activa cuando el 10% del elemento es visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Si el elemento entra en la vista
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Opcional: Deja de observar una vez que la animación ha ocurrido
                    // observer.unobserve(entry.target);
                }
                // Opcional: Si quieres que la animación se revierta al salir de la vista
                // else {
                //     entry.target.classList.remove('visible');
                // }
            });
        }, observerOptions);

        // Observa cada sección
        sections.forEach(section => {
            observer.observe(section);
        });

    } else {
        // Fallback para navegadores sin IntersectionObserver: Muestra las secciones directamente
        console.log("IntersectionObserver no soportado, mostrando secciones directamente.");
        sections.forEach(section => {
            section.style.opacity = '1'; // Asegura visibilidad
        });
    }
});