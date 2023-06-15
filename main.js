document.addEventListener('DOMContentLoaded', function() {
  const filterSelect = document.getElementById('filter-select');
  const consultasContainer = document.getElementById('consultas-container');
  const cartItems = document.getElementById('cart-items');
  const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
  const comprarBtn = document.getElementById('comprar');


  const products = [
    {
      id: 1,
      name: 'Consulta por WhatsApp',
      type: 'simple',
      price: 2750
    },
    {
      id: 2,
      name: 'Consulta telefónica',
      type: 'simple',
      price: 5500
    },
    {
      id: 3,
      name: 'Consulta personal',
      type: 'simple',
      price: 5500
    },
    {
      id: 4,
      name: 'Consulta de Expediente (con asesoramiento sin intervención)',
      type: 'compleja',
      price: 5500
    },
    {
      id: 5,
      name: 'Consulta de Expediente (con asesoramiento con intervención)',
      type: 'compleja',
      price: 5500
    },
    {
      id: 6,
      name: 'Contestación de demanda (con intervención en audiencias)',
      type: 'compleja',
      price: 5500
    }
  ];

  const cart = {
    items: [],

    addToCart: function(productId) {
      const product = products.find((item) => item.id === productId);
      if (product) {
        this.items.push(product);
        this.saveCart();
        renderCart();
      }
    },

    removeFromCart: function(productId) {
      const index = this.items.findIndex((item) => item.id === productId);
      if (index !== -1) {
        this.items.splice(index, 1);
        this.saveCart();
        renderCart();
      }
    },

    clearCart: function() {
      this.items = [];
      this.saveCart();
      renderCart();
    },

    saveCart: function() {
      localStorage.setItem('cart', JSON.stringify(this.items));
    },

    loadCart: function() {
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        this.items = JSON.parse(cartData);
        renderCart();
      }
    },

    calculateTotal: function() {
      return this.items.reduce((total, item) => total + item.price, 0);
    }
  };

  function renderConsultas(consultas) {
    consultasContainer.innerHTML = '';

    consultas.forEach((consulta, index) => {
      const consultaDiv = document.createElement('div');
      consultaDiv.className = 'consulta';
      consultaDiv.innerHTML = `
        <h3>${consulta.name}</h3>
        <p>Precio: $${consulta.price}</p>
        <button data-product-id="${consulta.id}">Agregar al Carrito</button>
      `;

      consultasContainer.appendChild(consultaDiv);
    });
  }

  function renderCart() {
    cartItems.innerHTML = '';

    cart.items.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${item.name} - $${item.price}</span>
        <button data-product-id="${item.id}">Eliminar</button>
      `;

      cartItems.appendChild(li);
    });

    const total = cart.calculateTotal();
    const totalElement = document.createElement('li');
    totalElement.innerHTML = `Total: $${total}`;
    cartItems.appendChild(totalElement);
  }

  consultasContainer.addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
      const productId = parseInt(event.target.dataset.productId);
      cart.addToCart(productId);
    }
  });

  cartItems.addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
      const productId = parseInt(event.target.dataset.productId);
      cart.removeFromCart(productId);
    }
  });

  vaciarCarritoBtn.addEventListener('click', function() {
    cart.clearCart();
  });

  comprarBtn.addEventListener('click', function() {
    // Lógica para completar la compra
    alert('Compra completada');
  });
 
  renderConsultas(products);
  cart.loadCart();
});




  let url = 'https://jsonplaceholder.typicode.com/users/';
    fetch(url)
        .then(response => response.json())
        .then(data => mostrarData(data))
        .catch(error => console.log(error))

    const mostrarData = (data) => {
        console.log(data)
        let body = ""
        for (var i = 0; i < data.length; i++) {      
           body += `<tr><td>${data[i].id}</td><td>${data[i].name}</td><td>${data[i].email}</td></tr>`
        }
        document.getElementById('data').innerHTML = body;
    }
