// Clase base Animal
export class Animal {
    constructor(nombre, edad, imagen, comentarios, sonido) {
        this.nombre = nombre;
        this.edad = edad;
        this.imagen = imagen;
        this.comentarios = comentarios;
        this.sonido = sonido;
    }

    emitirSonido() {
        const audio = new Audio(this.sonido);
        audio.play();
    }
}

// Clases derivadas para cada tipo de animal
export class Leon extends Animal {
    constructor(nombre, edad, imagen, comentarios, sonido) {
        super(nombre, edad, imagen, comentarios, sonido);
    }
}

export class Lobo extends Animal {
    constructor(nombre, edad, imagen, comentarios, sonido) {
        super(nombre, edad, imagen, comentarios, sonido);
    }
}

export class Oso extends Animal {
    constructor(nombre, edad, imagen, comentarios, sonido) {
        super(nombre, edad, imagen, comentarios, sonido);
    }
}

export class Serpiente extends Animal {
    constructor(nombre, edad, imagen, comentarios, sonido) {
        super(nombre, edad, imagen, comentarios, sonido);
    }
}

export class Aguila extends Animal {
    constructor(nombre, edad, imagen, comentarios, sonido) {
        super(nombre, edad, imagen, comentarios, sonido);
    }
}