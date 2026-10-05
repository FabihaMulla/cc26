// Starter version: items live only in the page.
// After you add the Netlify Database, the Netlify agent will change this
// file so items are saved to the database instead.

const nameInput = document.getElementById('name');
const addButton = document.getElementById('add');
const list = document.getElementById('list');
const count = document.getElementById('count');

const items = [];

function render() {
  count.textContent = items.length === 1 ? '1 item' : items.length + ' items';

  if (items.length === 0) {
    list.innerHTML = '<li class="empty">No items yet. Add your first item above.</li>';
    return;
  }

  list.innerHTML = '';
  items.slice().reverse().forEach(function (item) {
    const li = document.createElement('li');
    li.textContent = item.name;
    const when = document.createElement('span');
    when.className = 'when';
    when.textContent = item.time;
    li.appendChild(when);
    list.appendChild(li);
  });
}

function addItem() {
  const name = nameInput.value.trim();
  if (!name) {
    nameInput.focus();
    return;
  }
  items.push({ name: name, time: new Date().toLocaleString() });
  nameInput.value = '';
  nameInput.focus();
  render();
}

addButton.addEventListener('click', addItem);
nameInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') addItem();
});

render();
