const nombre = document.querySelector("#nombre"),
  apellido = document.querySelector("#apellido");

class Usuario {
  constructor(nombre, apellido) {
    this.nombre = nombre;
    this.apellido = apellido;
  }
}

//-----FUNCIONES CAMBIO DE PAGINA

function Alert1() {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Bienvenido devuelta",
    text: "¡Esperemos te encuentres bien! ",
    backdrop: `
    rgba(92, 184, 92, 0.05);
`,
    showConfirmButton: false,
    timer: 1500,
  });

  cambiarPagina();
}

function Alert2() {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Bienvenido a nuestra web",
    text: "¡Esperemos te encuentres bien! ",
    backdrop: `
    rgba(92, 184, 92, 0.05);
`,
    showConfirmButton: false,
    timer: 1500,
  });

  cambiarPagina();
}

function cambiarPagina() {
  setTimeout(() => {
    window.location.href = "../pages/home.html";
  }, 1500);
}

//-----FUNCIONES

function guardarUsuario(usuario) {
  return usuarios.push(usuario);
}

function guardarEnStorage(el) {
  return localStorage.setItem("usuarios", JSON.stringify(el));
}

//Promise de lectura de usuario
const mensajeLogin = (res) => {
  return new Promise((resolve, reject) => {
    //Promise
    if (res) {
      resolve("Datos leidos correctamente.");
    } else {
      reject("Datos erroneos.");
    }
  });
};

//-----ACCIONAR WEB
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

const acceso = document.querySelector("#form-login");
acceso.addEventListener("submit", (e) => {
  e.preventDefault();
  let foundUser = usuarios.some((el) => {
    return (
      el.nombre.toLowerCase() === nombre.value.toLowerCase() &&
      el.apellido.toLowerCase() === apellido.value.toLowerCase()
    );
  });

  if (foundUser == false) {
    let newUser = new Usuario(nombre.value, apellido.value);
    guardarUsuario(newUser);
    guardarEnStorage(usuarios);
    acceso.reset();

    mensajeLogin(foundUser)
      .then((res) => {
        Alert1();
      })
      .catch((rej) => {
        Alert2;
      });
  } else {
    mensajeLogin(foundUser)
      .then((res) => {
        Alert1();
      })
      .catch((rej) => {
        Alert2;
      });
  }
});
