    document.addEventListener('DOMContentLoaded', () => {
      // 1. Control del menú hamburguesa móvil
      const menuBtn = document.getElementById('mobile-menu-btn');
      const mobileMenu = document.getElementById('mobile-menu');
      const iconOpen = document.getElementById('icon-open');
      const iconClose = document.getElementById('icon-close');
      const mobileLinks = document.querySelectorAll('.mobile-link');

      function toggleMenu() {
        const isHidden = mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden');
        iconOpen.classList.toggle('hidden', isHidden);
        iconClose.classList.toggle('hidden', !isHidden);
      }

      menuBtn.addEventListener('click', toggleMenu);

      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (!mobileMenu.classList.contains('hidden')) {
            toggleMenu();
          }
        });
      });

      // 2. Sombra dinámica en la Navbar al hacer scroll
      const navbar = document.getElementById('navbar');
      window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
          navbar.classList.add('shadow-xl', 'shadow-black/30', 'bg-slate-950/95');
        } else {
          navbar.classList.remove('shadow-xl', 'shadow-black/30', 'bg-slate-950/95');
        }
      });

      // 3. Animaciones sutiles de aparición al hacer scroll (IntersectionObserver)
      const revealElements = document.querySelectorAll('.reveal');
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-6');
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach(el => revealObserver.observe(el));

      // 4. Validación y confirmación elegante del formulario de contacto
      const contactForm = document.getElementById('contact-form');
      const formError = document.getElementById('form-error');
      const formSuccess = document.getElementById('form-success');
      const successDetail = document.getElementById('success-detail');
      const resetFormBtn = document.getElementById('reset-form-btn');

      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const marca = document.getElementById('marca').value.trim();
        const email = document.getElementById('email').value.trim();
        const servicio = document.getElementById('servicio').value;
        const mensaje = document.getElementById('mensaje').value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nombre || !emailRegex.test(email) || !mensaje) {
          formError.classList.remove('hidden');
          return;
        }

        formError.classList.add('hidden');

        // Personalizar el mensaje de confirmación con los datos ingresados
        const proyectoTexto = marca ? ` para <strong class="text-white">${marca}</strong>` : '';
        successDetail.innerHTML = `
          ¡Gracias, <strong class="text-white">${nombre}</strong>! Hemos recibido tu solicitud sobre <span class="text-amber-400 font-semibold">${servicio}</span>${proyectoTexto}. Te escribiremos pronto a <span class="underline text-slate-200">${email}</span>.
        `;

        contactForm.classList.add('hidden');
        formSuccess.classList.remove('hidden');
      });

      resetFormBtn.addEventListener('click', () => {
        contactForm.reset();
        formSuccess.classList.add('hidden');
        contactForm.classList.remove('hidden');
      });
    });

    function abrirModalEquipo() {
  const modal = document.getElementById('modalEquipo');
  const contenido = document.getElementById('contenidoModalEquipo');

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';

  // Activa la animación en el siguiente frame para que se vea el desplazamiento
  requestAnimationFrame(() => {
    modal.classList.remove('opacity-0');
    contenido.classList.remove('translate-y-16', 'scale-95', 'opacity-0');
    contenido.classList.add('translate-y-0', 'scale-100', 'opacity-100');
  });
}

function cerrarModalEquipo() {
  const modal = document.getElementById('modalEquipo');
  const contenido = document.getElementById('contenidoModalEquipo');

  // Inicia el desplazamiento hacia abajo y desvanecimiento
  modal.classList.add('opacity-0');
  contenido.classList.remove('translate-y-0', 'scale-100', 'opacity-100');
  contenido.classList.add('translate-y-16', 'scale-95', 'opacity-0');

  // Espera los 300ms de la transición antes de ocultarlo por completo
  setTimeout(() => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }, 300);
}

// Cerrar con la tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cerrarModalEquipo();
});