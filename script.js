document.addEventListener('DOMContentLoaded', () => {
  const menuContainer = document.getElementById('menu');
  const orderList = document.getElementById('orderList');
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const usernameDisplay = document.getElementById('usernameDisplay');
  const checkoutBtn = document.getElementById('checkoutBtn');
  let currentUser = null;
  let order = [];

  // Load menu from data.json
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      if (!data.menu || data.menu.length === 0) {
        menuContainer.innerHTML = '<p>No menu items available.</p>';
        return;
      }

      data.menu.forEach(item => {
        const div = document.createElement('div');
        div.className = 'menuItem';
        div.innerHTML = `
          <img src="${item.image}" alt="${item.name}" />
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <button onclick="addToOrder(${item.id})">Add to Order</button>
        `;
        menuContainer.appendChild(div);
      });
    })
    .catch(error => {
      console.error('Error loading menu:', error);
      menuContainer.innerHTML = '<p>Error loading menu.</p>';
    });
  
      data.menu-test.forEach(item => {
        const div = document.createElement('div');
        div.className = 'menuItem';
        div.innerHTML = `
          <img src="${item.image}" alt="${item.name}" />
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <button onclick="addToOrder(${item.id})">Add to Order</button>
        `;
        menuContainer.appendChild(div);
      });
    })
    .catch(error => {
      console.error('Error loading menu:', error);
      menuContainer.innerHTML = '<p>Error loading menu.</p>';
    });

  // // Load menu items from data.json
  // fetch('data.json')
  //   .then(response => response.json())
  //   .then(data => {
  //     data.menu.forEach(item => {
  //       const div = document.createElement('div');
  //       div.classList.add('menuItem');
  //       div.innerHTML = `
  //         <img src="${item.image}" alt="${item.name}">
  //         <h3>${item.name}</h3>
  //         <p>${item.description}</p>
  //         <button onclick="addToOrder(${item.id})">Add to Order</button>
  //       `;
  //       menuContainer.appendChild(div);
  //     });
  //   });

  // Add item to order
  window.addToOrder = (id) => {
    const item = order.find(i => i.id === id);
    if (item) {
      item.quantity++;
    } else {
      order.push({ id, quantity: 1 });
    }
    updateOrderSummary();
  };

  // Update order summary
  const updateOrderSummary = () => {
    orderList.innerHTML = '';
    order.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `Item ${item.id} - Quantity: ${item.quantity}`;
      orderList.appendChild(li);
    });
  };

  // Simulated sign-in (replace with real backend call in production)
  loginBtn.addEventListener('click', () => {
    const username = prompt('Enter your username:');
    if (username) {
      localStorage.setItem('user', username);
      updateAuthUI();
      alert(`Welcome, ${username}`);
    }
  });

  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('user');
    updateAuthUI();
    alert('You have been signed out.');
  });

  // Handle checkout
  checkoutBtn.addEventListener('click', () => {
    if (order.length > 0) {
      alert('Proceeding to checkout...');
      // Implement checkout functionality here
    } else {
      alert('Your order is empty');
    }
  });

    // Function to update button visibility
  function updateAuthUI() {
    const user = localStorage.getItem('user');
    const isSignedIn = !!user;

    loginBtn.style.display = isSignedIn ? 'none' : 'inline-block';
    logoutBtn.style.display = isSignedIn ? 'inline-block' : 'none';
    usernameDisplay.textContent = isSignedIn ? `Hi, ${user}!` : '';
  }

  updateAuthUI(); // Run on page load
});
