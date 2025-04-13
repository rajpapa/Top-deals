// Sidebar Toggle
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebarClose = document.getElementById('sidebar-close');
const sidebar = document.getElementById('sidebar');

sidebarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  const isActive = sidebar.classList.contains('active');
  sidebarToggle.querySelector('i').classList.toggle('fa-bars', !isActive);
  sidebarToggle.querySelector('i').classList.toggle('fa-times', isActive);
  sidebarToggle.setAttribute('aria-expanded', isActive);
});

sidebarClose.addEventListener('click', () => {
  sidebar.classList.remove('active');
  sidebarToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
  sidebarToggle.setAttribute('aria-expanded', 'false');
});

// Search Functionality
const searchInput = document.getElementById('search-input');
const productsContainer = document.getElementById('products-container');
const cards = productsContainer.getElementsByClassName('card');

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  Array.from(cards).forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    const desc = card.querySelector('p').textContent.toLowerCase();
    card.style.display = (title.includes(searchTerm) || desc.includes(searchTerm)) ? 'block' : 'none';
  });
});

// Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
let activeCategory = 'all';
let activePrice = null;

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.dataset.filter) {
      activeCategory = button.dataset.filter;
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    } else if (button.dataset.price) {
      activePrice = button.dataset.price;
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    }
    applyFilters();
  });
});

function applyFilters() {
  Array.from(cards).forEach(card => {
    const category = card.dataset.category;
    const price = card.dataset.price;
    const matchesCategory = activeCategory === 'all' || category === activeCategory;
    const matchesPrice = !activePrice || price === activePrice;
    card.style.display = matchesCategory && matchesPrice ? 'block' : 'none';
  });
}

// Sort Functionality
const sortSelect = document.getElementById('sort-select');

sortSelect.addEventListener('change', () => {
  const sortValue = sortSelect.value;
  const cardArray = Array.from(cards);

  cardArray.sort((a, b) => {
    const priceA = parseFloat(a.querySelector('.price').textContent.match(/₹(\d+)/)[1]);
    const priceB = parseFloat(b.querySelector('.price').textContent.match(/₹(\d+)/)[1]);
    if (sortValue === 'price-low') return priceA - priceB;
    if (sortValue === 'price-high') return priceB - priceA;
    return 0; // Default
  });

  cardArray.forEach(card => productsContainer.appendChild(card));
});