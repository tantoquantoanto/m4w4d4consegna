export function startLoading() {
  const loadingDiv = document.createElement("div");
  const loading = document.createElement("p");

  loadingDiv.id = "loading";
  loading.innerHTML = "Loading...";

  loadingDiv.appendChild(loading);

  document.body.appendChild(loadingDiv);
}

export function stopLoading() {
  document.getElementById("loading").remove();
}
