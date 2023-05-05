//===== CAMBIA COLOR LA NAVBAR AL SCROLLEAR
const navbar = document.querySelector(".navbar");
const imgCart = document.querySelector("#imgCart");
const ContadorCart = document.querySelector("#contador-productos");
window.addEventListener("scroll", () => {
  window.scrollY >= 56
    ? navbar.classList.add("navbar-scrolled", "navbar-dark") &
      navbar.classList.remove("bg-warning") &
      ContadorCart.classList.add("contador-color") &
      (imgCart.innerHTML =
        '<img src="../img/carrito/cart2.png" alt="" class="cart-img">')
    : navbar.classList.remove("navbar-scrolled", "navbar-dark") &
      navbar.classList.add("bg-warning") &
      ContadorCart.classList.remove("contador-color") &
      (imgCart.innerHTML =
        '<img src="../img/carrito/cart.svg" alt="" class="cart-img">');
});
//=====

//---DOCUMENT QUERYSELECTOR

//CARRITO DE COMPRA
const btnCart = document.querySelector(".container-cart-icon");
const containerCartProducts = document.querySelector(
  ".container-cart-products"
);

//DESPLIEGUE DE CONTENIDO AL TOCAR CARRITO
btnCart.addEventListener("click", () => {
  containerCartProducts.classList.toggle("hidden-cart");
});

//CONTENIDO EN DIV A AGREGAR, AL CARRITO
const cartInfo = document.querySelector(".cart-product");
const rowProduct = document.querySelector(".row-product");

//ARRAY DE PRODUCTOS PEDIDOS
const productList = document.querySelector(".container-items");

//TOTAL DEL CARRITO E INDICE DE PEDIDOS
const valorTotal = document.querySelector(".total-pagar");
const totalPedidos = document.getElementById("contador-productos");

//---OBJETO PRODUCTO A TRAVES DE API

const productos = [];

const readApiObjectProducts = (arr) => {
  for (const item of arr) {
    const { id, nombre, precio } = item;
    productos.push(item);
  }
};

async function fetchApi() {
  const res = await fetch("../data/data.json");
  const data = await res.json();
  readApiObjectProducts(data);
}

fetchApi();

//---VARIABLES

let orden = numOrden();
let carrito = [];

//---FUNCIONES

function mayorQue(n) {
  return (m) => m > n;
}

function agregarCart(add) {
  carrito.push(add);
}

function numOrden() {
  let mesa = Math.random() * 100;
  return Math.floor(mesa);
}

function carritoVacioHTML() {
  containerCartProducts.innerHTML = `
        <p class="cart-vacio text-center">El carrito esta vacío.</p>
    `;
}

//Funcion grande
function agregarHTML() {
  if (!carrito.length) {
    carritoVacioHTML();
  }

  //Limpia el HTML anterior
  rowProduct.innerHTML = "";

  let totalCompra = 0;
  let totalCantProds = 0;

  carrito.forEach((prod) => {
    const containerProduct = document.createElement("div");
    containerProduct.classList.add("cart-product");

    containerProduct.innerHTML = `
      <div class="info-cart-product d-flex justify-content-between align-items-center">
        <span class="cantidad producto-carrito">${prod.cantidad}</span>
        <p class="titulo-producto-carrito mt-3">${prod.nombre}</p>
        <span class="precio-producto-carrito">${prod.precio}</span>
      </div>
      <img src="../img/carrito/close.png" class="cart-img-x">
    `;

    rowProduct.append(containerProduct);

    //Multiplica cantidad por precio. (.slice para separar el '$')
    totalCompra = totalCompra + parseInt(prod.cantidad * prod.precio.slice(1));
    totalCantProds = totalCantProds + prod.cantidad;
  });

  valorTotal.innerText = `$${totalCompra}`;
  totalPedidos.innerText = totalCantProds;
}

//=================================//
//---ACCIONAR DE CARRITO
//=================================//

productList.addEventListener("click", (elem) => {
  if (elem.target.classList.contains("btn-add-cart")) {
    const prod = elem.target.parentElement;
    const infoProd = {
      cantidad: 1,
      nombre: prod.querySelector("h5").textContent,
      precio: prod.querySelector(".price").textContent,
    };

    //Verifica existencia, si existe y es igual se le suma al objeto la Cantidad.
    const existencia = carrito.some((prod) => prod.nombre === infoProd.nombre);
    if (existencia) {
      const products = carrito.map((prod) => {
        if (prod.nombre === infoProd.nombre) {
          prod.cantidad++;
          return prod;
        } else {
          return prod;
        }
      });
      carrito.push();
    } else {
      carrito.push(infoProd);
    }

    //SweetAlert
    Swal.fire({
      icon: "success",
      title: "Agregado al carrito exitosamente",
      text: infoProd.nombre,
      confirmButtonText: "¡Perfecto!",
      confirmButtonColor: "#ffc107",
    });

    //Muestra el contenido al carrito ( HTML )
    agregarHTML();
  }
});

//ELIMINAR EL ITEM AL PRESIONAR LA CRUZ
rowProduct.addEventListener("click", (elem) => {
  if (elem.target.classList.contains("cart-img-x")) {
    const prod = elem.target.parentElement;
    const nombre = prod.querySelector("p").textContent;

    //filtra el nuevo carrito sin el mismo NOMBRE en este caso ( compara para eliminar )
    carrito = carrito.filter((prod) => prod.nombre !== nombre);

    //Muestra el contenido al carrito, borrando el item (HTML)
    agregarHTML();
  }
});
