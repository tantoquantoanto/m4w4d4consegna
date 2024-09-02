const updateButton = document.getElementById("updateButton");
const main = document.querySelector("main");
let productName = document.querySelector("#productName");
let productDescription = document.querySelector("#productDescription");
let productBrand = document.querySelector("#productBrand");
let productImage = document.querySelector("#productImage");
let productPrice = document.querySelector("#productPrice");

const url = new URLSearchParams(location.search);
const id = url.get("id");

const fillProductForm = async () => {
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/product/${id}`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNjZTNkNmZlN2VmODAwMTUwNjc2MjQiLCJpYXQiOjE3MjQ3MDM3MDIsImV4cCI6MTcyNTkxMzMwMn0.ReiHgMMzcOmtfXz_mJe_7TA1hfq_03nxTC5_yg4v-F0",
      },
    }
  );
  const data = await response.json();
  productName.value = data.name;
  productDescription.value = data.description;
  productBrand.value = data.brand;
  productImage.value = data.imageUrl;
  productPrice.value = data.price;
};

fillProductForm();

const modifyProduct = async (e) => {
  e.preventDefault();

  const updatedProduct = {
    name: productName.value,
    description: productDescription.value,
    brand: productBrand.value,
    imageUrl: productImage.value,
    price: productPrice.value,
  };

  try {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/product/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNjZTNkNmZlN2VmODAwMTUwNjc2MjQiLCJpYXQiOjE3MjQ3MDM3MDIsImV4cCI6MTcyNTkxMzMwMn0.ReiHgMMzcOmtfXz_mJe_7TA1hfq_03nxTC5_yg4v-F0",
        },
        body: JSON.stringify(updatedProduct),
      }
    );

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Prodotto aggiornato",
        text: "Il prodotto è stato aggiornato con successo!",
      });
    } else {
      throw new Error("Errore durante l'aggiornamento del prodotto");
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Errore",
      text: "Si è verificato un errore durante l'aggiornamento del prodotto.",
    });
  }
};

updateButton.addEventListener("click", modifyProduct);
