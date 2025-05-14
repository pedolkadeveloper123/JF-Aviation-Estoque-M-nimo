document.getElementById("login-btn").addEventListener("click", function () {
  const USER = "jfaviation.com";
  const PASS = "54321";

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("login-error");

  if (username === USER && password === PASS) {
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    loadProducts();
  } else {
    error.textContent = "Usuário ou senha incorretos.";   
  }
});

function logout() {
  document.getElementById("app").classList.add("hidden");
  document.getElementById("login-screen").classList.remove("hidden");
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("login-error").textContent = "";
}

function addProduct() {
  const name = document.getElementById("product-name").value.trim();
  const qty = parseInt(document.getElementById("product-qty").value);
  const min = parseInt(document.getElementById("product-min").value);

  if (!name || isNaN(qty) || isNaN(min)) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const product = { name, qty, min };
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));
  loadProducts();

  document.getElementById("product-name").value = "";
  document.getElementById("product-qty").value = "";
  document.getElementById("product-min").value = "";
}

function deleteProduct(index) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  loadProducts();
}

function loadProducts() {
  const table = document.getElementById("products-table");
  table.innerHTML = "";
  let products = JSON.parse(localStorage.getItem("products")) || [];

  products.forEach((product, index) => {
    const row = document.createElement("tr");
    const lowStock = product.qty < product.min ? "low-stock" : "";

    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.qty}</td>
      <td>${product.min}</td>
      <td class="${lowStock}">${product.qty < product.min ? "Abaixo do mínimo" : "OK"}</td>
      <td><button onclick="deleteProduct(${index})">Remover</button></td>
    `;
    table.appendChild(row);
  });
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
