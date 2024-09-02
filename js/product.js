import { startLoading, stopLoading } from "./loader.js";

const title = document.getElementById("productTitle");
const description = document.getElementById("productDescription");
const image = document.getElementById("productImg");
const price = document.getElementById("productPrice");
const button = document.getElementById("addToCart");

const url = new URLSearchParams(location.search);
const id = url.get("id");

const createProductDetails = async () => {
  startLoading();
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

  title.textContent = data.name;
  description.textContent = data.description;
  image.src = data.imageUrl;
  price.textContent = `€ ${data.price}`;
  setTimeout(() => {
    stopLoading();
  }, 3000);
};

createProductDetails();
