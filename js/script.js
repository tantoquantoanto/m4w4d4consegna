import { startLoading, stopLoading } from "./loader.js";

const firstSection = document.querySelector("#firstSection");
const cartItemsContainer = document.getElementById("cartItems");
const cartIcon = document.getElementById("cartIcon");
const cartCount = document.getElementById("cartCount");
const offCanvas = new bootstrap.Offcanvas(
  document.getElementById("offcanvasExample")
);

let cart = []; 

/* Funzione per salvare il carrello nel localStorage*/
const saveCartToLocalStorage = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Funzione per aggiornare il carrello dal local storage
const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCart();
  }
};

/* Funzione per aggiornare il carrello*/
const updateCart = () => {
  cartItemsContainer.innerHTML = ""; 
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item", "mb-3");
    itemElement.innerHTML = `
      <p><strong>${item.name}</strong> - € ${item.price}</p>
      <button class="btn btn-danger btn-sm" data-index="${index}">Rimuovi</button>
    `;
    cartItemsContainer.appendChild(itemElement);
  });

  const cartTotalElement = document.getElementById("cartTotal");
  cartTotalElement.textContent = `Totale: € ${total}`;


  document.querySelectorAll(".btn-danger").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      cart.splice(index, 1);
      updateCart(); 
      updateCartCount(); 
      saveCartToLocalStorage(); 
      Swal.fire({
        title: "Carrello aggiornato con successo",
        imageUrl:
          "https://plus.unsplash.com/premium_photo-1681487985079-b299ac8ba1df?q=80&w=2857&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imageHeight: 200,
        imageAlt: "product image",
      });
    });
  });

  updateCartCount(); 
  saveCartToLocalStorage(); 
};

/* Funzione per aggiornare il contatore in base ai prodotti nel carrello*/
const updateCartCount = () => {
  cartCount.textContent = cart.length; 
};

/* funzione per mostrare offcanvas al click sull'icona*/
cartIcon.addEventListener("click", () => {
  offCanvas.show();
});

/* Funzione per popolare la pagina con dati dei prodotti*/
const useData = (productsArray) => {
  setTimeout(() => {
    productsArray.forEach((product) => {
      const col = document.createElement("div");
      const card = document.createElement("div");
      const cardImg = document.createElement("img");
      const cardDescription = document.createElement("p");
      const cardBody = document.createElement("div");
      const cardLink = document.createElement("a");
      const addCart = document.createElement("button");
      const cardTitle = document.createElement("h5");
      const cardPrice = document.createElement("span");

      col.setAttribute("class", "col-6 col-md-3");
      card.setAttribute("class", "card mt-3 h-100");
      cardBody.classList.add("card-body");
      cardImg.src = product.imageUrl;
      cardImg.classList.add("cardImg");
      cardTitle.classList.add("card-title");
      cardTitle.textContent = product.name;
      cardDescription.classList.add("card-description");
      cardDescription.textContent = product.description;
      cardPrice.classList.add("card-price");
      cardPrice.textContent = `€ ${product.price}`;
      cardLink.innerText = "Visualizza prodotto";
      cardLink.href = `./product.html?id=${product._id}`;
      cardLink.classList.add("btn", "btn-primary");

      addCart.classList.add("addCart", "btn", "mt-2");
      addCart.textContent = "Aggiungi al carrello";

      /* funzione per aggiungere prodotti al carrello*/
      addCart.addEventListener("click", () => {
        cart.push(product);
        updateCart(); 
        updateCartCount();
        Swal.fire({
          title: "Prodotto aggiunto con successo",
          imageUrl: product.imageUrl,
          imageHeight: 200,
          imageAlt: "product image",
        });
      });

      cardBody.append(
        cardTitle,
        cardDescription,
        cardImg,
        cardPrice,
        cardLink,
        addCart
      );
      card.appendChild(cardBody);
      col.appendChild(card);
      firstSection.appendChild(col);
    });
    stopLoading();
  }, 3000);
};


const call = async () => {
  startLoading();
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/product/",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNjZTNkNmZlN2VmODAwMTUwNjc2MjQiLCJpYXQiOjE3MjQ3MDM3MDIsImV4cCI6MTcyNTkxMzMwMn0.ReiHgMMzcOmtfXz_mJe_7TA1hfq_03nxTC5_yg4v-F0",
      },
    }
  );
  const data = await response.json();
  useData(data);
};


loadCartFromLocalStorage();


call();
