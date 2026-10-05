// Items are loaded from and saved to the Netlify Database via /api/items.

const nameInput = document.getElementById('name');
const addButton = document.getElementById('add');
const list = document.getElementById('list');
const count = document.getElementById('count');

// Newest first, as returned by the API.
let items = [];

function render() {
  count.textContent = items.length === 1 ? '1 item' : items.length + ' items';

  if (items.length === 0) {
    list.innerHTML = '<li class="empty">No items yet. Add your first item above.</li>';
    return;
  }

  list.innerHTML = '';
  items.forEach(function (item) {
    const li = document.createElement('li');
    li.textContent = item.name;
    const when = document.createElement('span');
    when.className = 'when';
    when.textContent = new Date(item.created_at).toLocaleString();
    li.appendChild(when);
    list.appendChild(li);
  });
}

async function loadItems() {
  try {
    const res = await fetch('/api/items');
    if (!res.ok) throw new Error('Request failed: ' + res.status);
    items = await res.json();
    render();
  } catch (err) {
    console.error(err);
    list.innerHTML = '<li class="empty">Could not load items. Please refresh the page.</li>';
  }
}

async function addItem() {
  const name = nameInput.value.trim();
  if (!name) {
    nameInput.focus();
    return;
  }

  addButton.disabled = true;
  try {
    const res = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name })
    });
    if (!res.ok) throw new Error('Request failed: ' + res.status);
    const item = await res.json();
    items.unshift(item);
    nameInput.value = '';
    render();
  } catch (err) {
    console.error(err);
    alert('Could not save the item. Please try again.');
  } finally {
    addButton.disabled = false;
    nameInput.focus();
  }
}

addButton.addEventListener('click', addItem);
nameInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') addItem();
});

loadItems();
