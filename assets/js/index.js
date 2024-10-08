import { Leon, Lobo, Oso, Serpiente, Aguila } from './animal.js';

let animales = [];

// Cargar datos de animales
fetch('animales.json')
    .then(response => response.json())
    .then(data => {
        animales = data.animales;
    })
    .catch(error => console.error('Error cargando animales:', error));

// Función para crear una instancia de un animal
function agregarAnimal() {
    const nombre = document.getElementById('animal').value;
    const edad = document.getElementById('edad').value;
    const comentarios = document.getElementById('comentarios').value;
    const animalData = animales.find(a => a.name === nombre);
    
    if (!animalData) {
        alert('Animal no reconocido');
        return;
    }

    const imagen = `assets/imgs/${animalData.imagen}`;
    const sonido = `assets/sounds/${animalData.sonido}`;

    let animal;
    switch (nombre) {
        case 'Leon':
            animal = new Leon(nombre, edad, imagen, comentarios, sonido);
            break;
        case 'Lobo':
            animal = new Lobo(nombre, edad, imagen, comentarios, sonido);
            break;
        case 'Oso':
            animal = new Oso(nombre, edad, imagen, comentarios, sonido);
            break;
        case 'Serpiente':
            animal = new Serpiente(nombre, edad, imagen, comentarios, sonido);
            break;
        case 'Aguila':
            animal = new Aguila(nombre, edad, imagen, comentarios, sonido);
            break;
        default:
            alert('Animal no reconocido');
            return;
    }

    // Validar que todos los campos estén completos
    if (nombre && edad && comentarios) {
        mostrarAnimalEnTabla(animal);
        resetFormulario();
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

// Función para mostrar el animal en la tabla
function mostrarAnimalEnTabla(animal) {
    const animalesContainer = document.getElementById('Animales');
    const div = document.createElement('div');
    div.classList.add('animal-card');

    div.innerHTML = `
        <div class="card text-white bg-secondary position-relative">
            <img src="${animal.imagen}" class="card-img-top" alt="${animal.nombre}" onclick="mostrarDetalle('${animal.nombre}', '${animal.edad}', '${animal.comentarios}')">
            <button class="btn btn-sound" onclick="emitirSonido('${animal.sonido}')">
                <img src="assets/imgs/audio.svg" alt="Sonido">
            </button>
            <div class="card-body">
                <h5 class="card-title">${animal.nombre}</h5>
            </div>
        </div>
    `;

    animalesContainer.appendChild(div);
}

// Función para emitir el sonido del animal
function emitirSonido(sonido) {
    const player = document.getElementById('player');
    player.src = sonido;
    player.play();
}

// Función para mostrar el detalle del animal en una ventana modal
function mostrarDetalle(nombre, edad, comentarios) {
    const animal = animales.find(a => a.name === nombre);
    if (animal) {
        const modalBody = document.querySelector('#exampleModal .modal-body');
        modalBody.innerHTML = `
            <div class="text-center">
                <img src="assets/imgs/${animal.imagen}" class="img-fluid mb-3" alt="${animal.name}">
                <h5>${animal.name}</h5>
                <p>Edad: ${edad}</p>
                <p>Comentarios: ${comentarios}</p>
            </div>
        `;
        const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
        modal.show();
    } else {
        alert('Animal no encontrado');
    }
}

// Función para resetear el formulario
function resetFormulario() {
    document.getElementById('animal').selectedIndex = 0;
    document.getElementById('edad').selectedIndex = 0;
    document.getElementById('comentarios').value = '';
    document.getElementById('preview').innerHTML = '';
}

// Función para mostrar la imagen de preview
function mostrarPreview() {
    const animalSeleccionado = document.getElementById('animal').value;
    const animalData = animales.find(a => a.name === animalSeleccionado);
    if (animalData) {
        const previewContainer = document.getElementById('preview');
        previewContainer.innerHTML = `<img src="assets/imgs/${animalData.imagen}" class="img-fluid preview-image" alt="${animalData.name}">`;
    } else {
        const previewContainer = document.getElementById('preview');
        previewContainer.innerHTML = '';
    }
}

// Función autoejecutable IIFE
(function() {
    document.getElementById('btnRegistrar').addEventListener('click', agregarAnimal);
    document.getElementById('animal').addEventListener('change', mostrarPreview);
    
    // Hacer las funciones globales para que puedan ser llamadas desde el HTML
    window.emitirSonido = emitirSonido;
    window.mostrarDetalle = mostrarDetalle;
})();