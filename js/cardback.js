const cardBackContainer = document.getElementById("cardBackContainer");
// funzione per rimuovere la col associata all'elemento
const deleteProductCol = (colElement) => {
  
  colElement.remove();
};
// funzione GET
const call = async () => {
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
  storageData(data);
};

const deleteProduct = async (id, colElement) => {
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/product/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNjZTNkNmZlN2VmODAwMTUwNjc2MjQiLCJpYXQiOjE3MjQ3MDM3MDIsImV4cCI6MTcyNTkxMzMwMn0.ReiHgMMzcOmtfXz_mJe_7TA1hfq_03nxTC5_yg4v-F0",
      },
    }
  );

  if (response.ok) {
   // Rimuove la card se la delete è andata a buon fine
    deleteProductCol(colElement);
  } else {
    console.error("Failed to delete product");
  }
};

const storageData = (productsArray) => {
  productsArray.forEach((product) => {
    const col = document.createElement("div");
    col.classList.add("col-3");
    const card = document.createElement("div");
    const cardDescription = document.createElement("p");
    const cardBody = document.createElement("div");
    const deleteButton = document.createElement("a");
    const updateButton = document.createElement("a");
    const cardTitle = document.createElement("h5");
    const cardPrice = document.createElement("span");

    deleteButton.classList.add("deleteButton");
    deleteButton.textContent = "Elimina prodotto";

    // Al click chiama la funzione delete, passando come parametro la col da rimuovere
    deleteButton.addEventListener("click", (e) => {
      e.preventDefault();
      deleteProduct(product._id, col);
    });

    updateButton.classList.add("updateButton");
    updateButton.textContent = "Modifica prodotto";
    updateButton.href = `update.html?id=${product._id}`;

    col.classList.add("col-3");
    card.classList.add("card");
    cardBody.classList.add("card-body");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = product.name;
    cardDescription.classList.add("card-description");
    cardDescription.textContent = product.description;
    cardPrice.classList.add("card-price");
    cardPrice.textContent =  `€${product.price}`;

    cardBody.append(
      cardTitle,
      cardDescription,
      cardPrice,
      deleteButton,
      updateButton
    );
    card.appendChild(cardBody);
    col.appendChild(card);
    cardBackContainer.appendChild(col);
  });
};

call();
