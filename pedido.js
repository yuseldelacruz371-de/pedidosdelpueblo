const servicioActivo = true; 

const options = document.getElementById("options");
const cart = document.getElementById("cart");
const statusBox = document.getElementById("serviceStatus");
const whatsappBtn = document.querySelector(".whatsapp");

let items = [];
let currentSection = null;

if (!servicioActivo) {
  statusBox.textContent = "🔴 Servicio no disponible por el momento";
  statusBox.className = "status closed";
  whatsappBtn.disabled = true;
  whatsappBtn.style.opacity = "0.5";
} else {
  statusBox.textContent = "🟢 Servicio disponible - Puedes hacer tu pedido";
  statusBox.className = "status open";
}

function showSection(type) {
  if (currentSection === type) {
    options.classList.add("hidden");
    options.innerHTML = "";
    currentSection = null;
    return;
  }

  currentSection = type;
  options.classList.remove("hidden");
  options.innerHTML = "";

  const data = {
    mandado: ["Bodega Aurrera", "Tres B", "Noryuli", "Tortillería Pona", "Tortillería Lupita"],
    comida: ["Taquería", "Liro Pizza"],
    farmacia: ["Farmacias Similares", "Farmacia El Centro"]
  };

  if (type === "mensajeria") {
    createInput("Describe el mandado que necesitas");
    return;
  }

  data[type].forEach(place => {
    const btn = document.createElement("button");
    btn.textContent = place;
    btn.onclick = () => createInput(`¿Qué deseas pedir en ${place}?`, place);
    options.appendChild(btn);
  });
}

function createInput(placeholder, place = "") {
  options.innerHTML = "";

  const input = document.createElement("textarea");
  input.placeholder = placeholder;

  const addBtn = document.createElement("button");
  addBtn.textContent = "Agregar al carrito";

  addBtn.onclick = () => {
    if (!input.value.trim()) return;
    const item = place ? `${place}: ${input.value}` : `Mandado: ${input.value}`;
    items.push(item);
    renderCart();
    input.value = "";
  };

  options.appendChild(input);
  options.appendChild(addBtn);
}

function renderCart() {
  cart.innerHTML = "";
  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item;

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.onclick = () => editItem(index);

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.onclick = () => removeItem(index);

    li.appendChild(editBtn);
    li.appendChild(delBtn);
    cart.appendChild(li);
  });
}

function removeItem(index) {
  items.splice(index, 1);
  renderCart();
}

function editItem(index) {
  const nuevo = prompt("Edita tu pedido:", items[index]);
  if (nuevo) {
    items[index] = nuevo;
    renderCart();
  }
}

function sendWhatsApp() {
  

  if (items.length === 0) {
    alert("Agrega al menos un pedido");
    return;
  }

  const message = `
📦 PEDIDO NUEVO

${items.map(i => "• " + i).join("\n")}

📍 Zona: ${zone.value}
🏠 Calle: ${street.value}

📌 Referencia: ${reference.value}

👤 Nombre: ${name.value}

`;

  window.open(`https://wa.me/+527811046148?text=${encodeURIComponent(message)}`);
}


