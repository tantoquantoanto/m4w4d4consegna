const createButton = document.querySelector("#createButton");

let productName = document.querySelector("#productName");
let productDescription = document.querySelector("#productDescription");
let productBrand = document.querySelector("#productBrand");
let productImage = document.querySelector("#productImage");
let productPrice = document.querySelector("#productPrice");

const create = async () => {
  let name = productName.value.trim();
  let description = productDescription.value.trim();
  let brand = productBrand.value.trim();
  let imageUrl = productImage.value.trim();
  let price = parseFloat(productPrice.value);

  if (!name || !brand || !description || isNaN(price)) {
    alert("Per favore, compila tutti i campi correttamente.");
    return;
  }

  let productToCreate = {
    name,
    description,
    brand,
    imageUrl,
    price,
  };

  try {
    const postProduct = await fetch(
      "https://striveschool-api.herokuapp.com/api/product/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNjZTNkNmZlN2VmODAwMTUwNjc2MjQiLCJpYXQiOjE3MjQ3MDM3MDIsImV4cCI6MTcyNTkxMzMwMn0.ReiHgMMzcOmtfXz_mJe_7TA1hfq_03nxTC5_yg4v-F0",
        },
        body: JSON.stringify(productToCreate),
      }
    );

    if (!postProduct.ok) {
      throw new Error("Errore durante la creazione del prodotto");
    }

    const data = await postProduct.json();
    console.log(data);
  } catch (error) {
    console.error("Errore:", error);
  }
};

createButton.addEventListener("click", (e) => {
  e.preventDefault();
  create();
  Swal.fire({
    title: "Prodotto creato con successo",
  });
});
