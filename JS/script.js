
window.addEventListener('load', () => {
  const pantallaCarga = document.getElementById('pantalla-carga');
  const progreso = document.getElementById('progreso');
  const porcentajeCarga = document.getElementById('porcentaje-carga');
  
  let porcentaje = 0;
  const intervalo = setInterval(() => {
      porcentaje += 1;
      progreso.style.width = porcentaje + '%';
      porcentajeCarga.textContent = porcentaje + '%';
      

      if (porcentaje === 100) {
          clearInterval(intervalo);
          setTimeout(() => {
              pantallaCarga.style.display = 'none'; // Ocultar la pantalla de carga
          }, 500); // Espera medio segundo después de llegar al 100%
      }
  }, 50); // Ajusté la velocidad a 50 ms por ciclo para ver más claramente la animación
});
// Carrusel
let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

// Mostrar la diapositiva correspondiente
function showSlide(index) {
  const carouselContainer = document.querySelector('.carousel-container');
  const slideWidth = slides[0].clientWidth;
  carouselContainer.style.transform = `translateX(-${index * slideWidth}px)`; // Corrección: se añadió el símbolo ` ` y ${} correctamente
}

// Cambiar a la siguiente diapositiva
function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  showSlide(currentIndex);
}

// Ajustar el ancho de las diapositivas al redimensionar la ventana
window.addEventListener('resize', () => {
  showSlide(currentIndex);
});

// Iniciar el carrusel automático cuando el DOM esté completamente cargado
window.onload = function() {
  setInterval(nextSlide, 3000); // Intervalo de 3 segundos
  showSlide(currentIndex);
};

// Función para manejar el clic en una categoría
document.querySelectorAll('.categoria').forEach(categoria => {
  categoria.addEventListener('click', function() {
    const categoriaSeleccionada = this.getAttribute('data-categoria');
    const productos = productosPorCategoria[categoriaSeleccionada];
    const productosContainer = this.querySelector('.productos');

    // Si ya hay productos cargados, solo mostrar u ocultar el contenedor
    if (productosContainer.innerHTML.trim() !== '') {
      productosContainer.style.display = productosContainer.style.display === 'none' ? 'block' : 'none';
      return;
    }

    // Limpiar el contenedor de productos
    productosContainer.innerHTML = '';

    // Mostrar productos en la tarjeta
    productos.forEach(producto => {
      const productoHTML = `
        <div class="producto">
          <img src="${producto.img}" alt="${producto.nombre}">
          <div class="detalle-producto">
            <h4>${producto.nombre}</h4>
            <p>${producto.precio}</p>
          </div>
        </div>
      `;
      productosContainer.innerHTML += productoHTML;
    });

    productosContainer.style.display = 'block';  // Mostrar productos después de cargarlos
  });
});

// Función para mostrar la sección seleccionada y actualizar la clase activa
function mostrarSeccion(id) {
  // Ocultar todas las secciones
  var secciones = document.querySelectorAll('.seccion');
  secciones.forEach(function(seccion) {
      seccion.classList.remove('activa'); // Remueve la clase activa
      seccion.style.display = 'none'; // Oculta la sección
  });

  // Mostrar la sección seleccionada
  var seccionSeleccionada = document.getElementById(id);
  if (seccionSeleccionada) {
      seccionSeleccionada.classList.add('activa'); // Agrega la clase activa a la sección seleccionada
      seccionSeleccionada.style.display = 'block'; // Muestra la sección seleccionada
  }
}

// Función para manejar el clic en los enlaces y cambiar el hash en la URL
function mostrarSeccionConHash(event, id) {
  event.preventDefault(); // Evita el comportamiento predeterminado del enlace

  // Actualiza el hash en la URL
  window.location.hash = id;

  // Llama a la función para mostrar la sección
  mostrarSeccion(id);
}

// Mostrar la sección correspondiente según el hash al cargar la página
window.addEventListener('load', function() {
  var hash = window.location.hash.substring(1); // Elimina el '#' del hash
  if (hash) {
      mostrarSeccion(hash);
  } else {
      mostrarSeccion('inicio'); // Muestra la sección de inicio por defecto si no hay hash
  }
});

// Manejar cambios en el hash para mostrar la sección correspondiente
window.addEventListener('hashchange', function() {
  var hash = window.location.hash.substring(1);
  mostrarSeccion(hash);
});
// Modal de imágenes
const gallery = document.getElementById("gallery");
const showMoreBtn = document.getElementById("showMoreBtn");
const showLessBtn = document.getElementById("showLessBtn");

// Seleccionamos los elementos necesarios para el modal
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const closeModal = document.querySelector(".close");
const galleryItems = document.querySelectorAll(".gallery-item");

// Cuando se hace clic en una imagen
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        modal.style.display = "block";
        modalImage.src = item.src; // Se carga la imagen seleccionada en el modal
    });
});

// Cuando se hace clic en el botón de cerrar (X)
closeModal.addEventListener('click', () => {
    modal.style.display = "none";
});

// Cerrar el modal al hacer clic fuera de la imagen
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Galería de imágenes con "Ver más"
const images = document.querySelectorAll('.gallery-item');
let limit = 6;

// Mostrar solo las primeras 'limit' imágenes al inicio
for (let i = limit; i < images.length; i++) {
    images[i].style.display = 'none';
}

// Mostrar más imágenes al hacer clic en "Mostrar más"
showMoreBtn.addEventListener('click', () => {
    for (let i = limit; i < images.length; i++) {
        images[i].style.display = 'block';
    }
    showMoreBtn.style.display = 'none';  // Ocultar el botón de "Mostrar más"
    showLessBtn.style.display = 'inline-block';  // Mostrar el botón de "Mostrar menos"
});

// Ocultar imágenes al hacer clic en "Mostrar menos"
showLessBtn.addEventListener('click', () => {
    for (let i = limit; i < images.length; i++) {
        images[i].style.display = 'none';  // Ocultar las imágenes adicionales
    }
    showLessBtn.style.display = 'none';  // Ocultar el botón de "Mostrar menos"
    showMoreBtn.style.display = 'inline-block';  // Mostrar el botón de "Mostrar más"
});
