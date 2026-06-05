// ── 1. DOM REFERENCES ──────────────────────────────────────────────
const hamburger          = document.getElementById('hamburger');
const nav                = document.getElementById('nav');
const recipeGrid         = document.getElementById('recipeGrid');
const favGrid            = document.getElementById('favGrid');
const modalOverlay       = document.getElementById('modalOverlay');
const openFormBtn        = document.getElementById('openFormBtn');
const modalClose         = document.getElementById('modalClose');
const saveRecipeBtn      = document.getElementById('saveRecipeBtn');
const searchInput        = document.getElementById('searchInput');
const categoryFilter     = document.getElementById('categoryFilter');
const shoppingPanel      = document.getElementById('shoppingPanel');
const shoppingItems      = document.getElementById('shoppingItems');
const closeShoppingPanel = document.getElementById('closeShoppingPanel');
const detailOverlay      = document.getElementById('detailOverlay');
const detailModal        = document.getElementById('detailModal');
const filterTabs         = document.getElementById('filterTabs');
const navHome            = document.getElementById('navHome');
const navFavorites       = document.getElementById('navFavorites');
const navShopping        = document.getElementById('navShopping');
const homeView           = document.getElementById('homeView');
const favoritesView      = document.getElementById('favoritesView');
const toastEl            = document.getElementById('toast');

// ── 2. DATA ────────────────────────────────────────────────────────
let recipes = [
  { id:1, name:'Jollof Rice',     category:'dinner',    cuisine:'Nigerian',       emoji:'🍚',
    ingredients:['2 cups long-grain rice','3 tbsp tomato paste','2 large onions','1 tsp seasoning','2 cups chicken stock','2 tbsp vegetable oil','Salt to taste'],
    instructions:'Heat oil in a pot, fry tomato paste and onions for 10 minutes. Add chicken stock and bring to a boil. Add washed rice, cover and cook on low heat for 25-30 minutes until rice is tender and sauce is absorbed.',
    isFavorite:false },
  { id:2, name:'Avocado Toast',   category:'breakfast', cuisine:'International',  emoji:'🥑',
    ingredients:['2 thick slices sourdough bread','1 ripe avocado','Juice of ½ lemon','Sea salt & black pepper','Red pepper flakes','1 egg (optional)'],
    instructions:'Toast bread until golden and crispy. Mash avocado with lemon juice, salt and pepper. Spread generously on toast. Top with red pepper flakes. Add a poached egg if desired.',
    isFavorite:false },
  { id:3, name:'Chicken Pasta',   category:'dinner',    cuisine:'Italian',        emoji:'🍝',
    ingredients:['200g penne pasta','2 chicken breasts','200ml heavy cream','3 garlic cloves','50g parmesan','Salt & pepper','Fresh basil','1 tbsp olive oil'],
    instructions:'Cook pasta al dente. Slice chicken, season and fry in olive oil until golden. Add minced garlic, then cream. Simmer 5 minutes, add drained pasta and parmesan. Toss, garnish with basil.',
    isFavorite:true },
  { id:4, name:'Mango Smoothie',  category:'snack',     cuisine:'Tropical',       emoji:'🥭',
    ingredients:['2 ripe mangoes (peeled and diced)','1 cup cold milk or coconut milk','1 tbsp honey','1 cup ice cubes','Pinch of cardamom'],
    instructions:'Peel and dice mangoes. Add all ingredients to a blender. Blend on high for 60 seconds until completely smooth. Taste and adjust sweetness. Pour into glasses and serve immediately.',
    isFavorite:false },
  { id:5, name:'Chocolate Cake',  category:'dessert',   cuisine:'American',       emoji:'🎂',
    ingredients:['2 cups all-purpose flour','¾ cup cocoa powder','2 cups sugar','2 large eggs','1 cup butter (melted)','1 cup milk','2 tsp baking powder','1 tsp vanilla'],
    instructions:'Preheat oven to 180°C. Mix dry ingredients. Whisk wet ingredients separately, then combine. Pour into greased pan and bake 35-40 minutes. Check with toothpick. Cool before frosting.',
    isFavorite:false },
  { id:6, name:'Veggie Stir Fry', category:'lunch',     cuisine:'Asian',          emoji:'🥦',
    ingredients:['2 cups mixed vegetables (broccoli, carrots, snap peas)','2 tbsp soy sauce','1 tbsp sesame oil','2 garlic cloves','1 tsp ginger','Cooked rice to serve'],
    instructions:'Heat sesame oil in a wok over high heat. Add garlic and ginger, stir 30 seconds. Add vegetables in order of hardness. Toss constantly for 5-7 minutes. Add soy sauce, cook 1 more minute. Serve over rice.',
    isFavorite:false }
];

// ── 3. LOCALSTORAGE ────────────────────────────────────────────────
function saveToStorage() {
  localStorage.setItem('recipebookData', JSON.stringify(recipes));
}

function loadFromStorage() {
  const s = localStorage.getItem('recipebookData');
  if (s !== null) recipes = JSON.parse(s);
}

// ── 4. TOAST ───────────────────────────────────────────────────────
let toastTimer;
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2800);
}

// ── 5. STATS ───────────────────────────────────────────────────────
function updateStats() {
  document.getElementById('statTotal').textContent = recipes.length;
  document.getElementById('statFav').textContent   = recipes.filter(r => r.isFavorite).length;
  const cats = new Set(recipes.map(r => r.category));
  document.getElementById('statCat').textContent  = cats.size;
}

// ── 6. RENDER ──────────────────────────────────────────────────────
function buildCard(r) {
  const preview = r.ingredients.slice(0, 3)
    .map(i => `<span>• ${i}</span>`).join('');
  const heart   = r.isFavorite ? '❤' : '🤍';
  const fc      = r.isFavorite ? 'btn-icon btn-favorite active' : 'btn-icon btn-favorite';
  return `
    <div class="card" data-id="${r.id}">
      ${r.isFavorite ? `<span class="card-fav-badge">❤</span>` : ''}
      <div class="card-header">${r.emoji || '🍽'}</div>
      <div class="card-body">
        <h3 class="card-title">${r.name}</h3>
        <div class="card-meta">
          <span class="card-badge">${r.category}</span>
          <span class="card-cuisine">🌍 ${r.cuisine}</span>
        </div>
        <div class="card-ingredients">${preview}</div>
      </div>
      <div class="card-actions">
        <button class="btn-icon btn-delete"   data-id="${r.id}">🗑 Delete</button>
        <button class="btn-icon btn-shopping" data-id="${r.id}">🛒 Shop</button>
        <button class="${fc}"                 data-id="${r.id}">${heart} Fav</button>
        <button class="btn-icon btn-view"     data-id="${r.id}" style="background:#F3F4F6;color:#374151;">👁 View</button>
      </div>
    </div>`;
}

function renderRecipes(list, targetGrid) {
  const grid = targetGrid || recipeGrid;
  if (list.length === 0) {
    grid.innerHTML = `<div class="empty-state"><span class="icon">🍽</span><p>No recipes found. Add one!</p></div>`;
    return;
  }
  grid.innerHTML = list.map(buildCard).join('');
  attachCardEvents(grid);
}

// ── 7. CARD EVENTS ─────────────────────────────────────────────────
function attachCardEvents(grid) {
  (grid || recipeGrid).querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (!confirm('Delete this recipe?')) return;
      const id = Number(this.dataset.id);
      recipes = recipes.filter(r => r.id !== id);
      saveToStorage(); applyFilters(); updateStats();
      showToast('Recipe deleted.');
    });
  });
  (grid || recipeGrid).querySelectorAll('.btn-favorite').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleFavorite(Number(this.dataset.id));
    });
  });
  (grid || recipeGrid).querySelectorAll('.btn-shopping').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      openShoppingList(Number(this.dataset.id));
    });
  });
  (grid || recipeGrid).querySelectorAll('.btn-view').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      openDetail(Number(this.dataset.id));
    });
  });
}

// ── 8. HAMBURGER ───────────────────────────────────────────────────
hamburger.addEventListener('click', () => nav.classList.toggle('open'));

// ── 9. NAV VIEWS ──────────────────────────────────────────────────
navHome.addEventListener('click', (e) => {
  e.preventDefault();
  homeView.classList.add('active');
  favoritesView.classList.remove('active');
  nav.classList.remove('open');
});

navFavorites.addEventListener('click', (e) => {
  e.preventDefault();
  homeView.classList.remove('active');
  favoritesView.classList.add('active');
  const favs = recipes.filter(r => r.isFavorite);
  renderRecipes(favs, favGrid);
  nav.classList.remove('open');
});

navShopping.addEventListener('click', (e) => {
  e.preventDefault();
  nav.classList.remove('open');
  showToast('Click 🛒 Shop on any recipe card!');
});

// ── 10. MODAL ─────────────────────────────────────────────────────
openFormBtn.addEventListener('click', () => modalOverlay.classList.add('open'));
modalClose.addEventListener('click', () => { modalOverlay.classList.remove('open'); clearForm(); });
modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) { modalOverlay.classList.remove('open'); clearForm(); }
});

saveRecipeBtn.addEventListener('click', function() {
  const name        = document.getElementById('recipeName').value.trim();
  const ingredients = document.getElementById('recipeIngredients').value
    .split('\n').map(l => l.trim()).filter(Boolean);

  if (!name || !ingredients.length) {
    showToast('⚠ Please enter a name and at least one ingredient.');
    return;
  }

  recipes.push({
    id:           Date.now(),
    name,
    category:     document.getElementById('recipeCategory').value,
    cuisine:      document.getElementById('recipeCuisine').value.trim() || 'Not specified',
    emoji:        document.getElementById('recipeEmoji').value.trim() || '🍽',
    ingredients,
    instructions: document.getElementById('recipeInstructions').value.trim(),
    isFavorite:   false
  });

  saveToStorage(); applyFilters(); updateStats();
  modalOverlay.classList.remove('open');
  clearForm();
  showToast('✅ Recipe added!');
});

function clearForm() {
  ['recipeName','recipeCuisine','recipeIngredients','recipeInstructions','recipeEmoji']
    .forEach(id => document.getElementById(id).value = '');
}

// ── 11. SEARCH & FILTER ────────────────────────────────────────────
let activeTab = 'all';

filterTabs.querySelectorAll('.filter-tab').forEach(tab => {
  tab.addEventListener('click', function() {
    filterTabs.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    activeTab = this.dataset.cat;
    categoryFilter.value = activeTab;
    applyFilters();
  });
});

function applyFilters() {
  const s = searchInput.value.toLowerCase().trim();
  const c = categoryFilter.value;
  activeTab = c;
  filterTabs.querySelectorAll('.filter-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.cat === c);
  });
  const filtered = recipes.filter(r =>
    (r.name.toLowerCase().includes(s) || r.cuisine.toLowerCase().includes(s)) &&
    (c === 'all' || r.category === c)
  );
  renderRecipes(filtered, recipeGrid);
}

searchInput.addEventListener('input', applyFilters);
categoryFilter.addEventListener('change', applyFilters);

// ── 12. SHOPPING LIST ──────────────────────────────────────────────
closeShoppingPanel.addEventListener('click', () => shoppingPanel.classList.remove('open'));

function openShoppingList(id) {
  const r = recipes.find(recipe => recipe.id === id);
  if (!r) return;

  shoppingItems.innerHTML = `
    <p style="font-weight:700;color:var(--green-dark);margin-bottom:14px;font-size:1rem;">
      ${r.emoji} ${r.name}
    </p>
    ${r.ingredients.map((ing, i) => `
      <div class="shopping-item" id="si${i}">
        <input type="checkbox" class="shopping-item-check" onchange="
          this.parentElement.classList.toggle('checked', this.checked)
        ">
        ${ing}
      </div>`).join('')}
    <p style="margin-top:14px;color:var(--muted);font-size:0.82rem;">
      ${r.ingredients.length} item${r.ingredients.length !== 1 ? 's' : ''} total
    </p>`;

  shoppingPanel.classList.add('open');
}

// ── 13. DETAIL VIEW ────────────────────────────────────────────────
detailOverlay.addEventListener('click', e => {
  if (e.target === detailOverlay) detailOverlay.classList.remove('open');
});

function openDetail(id) {
  const r = recipes.find(recipe => recipe.id === id);
  if (!r) return;

  detailModal.innerHTML = `
    <div class="detail-hero">
      <button class="detail-close" onclick="document.getElementById('detailOverlay').classList.remove('open')">✕</button>
      <span class="detail-emoji">${r.emoji || '🍽'}</span>
      <h2 class="detail-name">${r.name}</h2>
    </div>
    <div class="detail-body">
      <div class="detail-badges">
        <span class="card-badge">${r.category}</span>
        <span class="card-badge" style="background:#E0F2FE;color:#0369A1;">🌍 ${r.cuisine}</span>
        ${r.isFavorite ? `<span class="card-badge" style="background:#FEF3C7;color:#92400E;">❤ Favorite</span>` : ''}
      </div>
      <h3 class="detail-section-title">🥕 Ingredients</h3>
      <ul class="detail-ingredients">
        ${r.ingredients.map(i => `<li>${i}</li>`).join('')}
      </ul>
      ${r.instructions ? `
        <h3 class="detail-section-title">📋 Instructions</h3>
        <div class="detail-instructions">${r.instructions}</div>
      ` : ''}
    </div>`;

  detailOverlay.classList.add('open');
}

// ── 14. FAVORITE TOGGLE ────────────────────────────────────────────
function toggleFavorite(id) {
  const r = recipes.find(recipe => recipe.id === id);
  if (!r) return;
  r.isFavorite = !r.isFavorite;
  saveToStorage(); applyFilters(); updateStats();
  showToast(r.isFavorite ? `❤ Added to favorites!` : `🤍 Removed from favorites.`);
}

// ── 15. INIT ───────────────────────────────────────────────────────
function init() {
  loadFromStorage();
  renderRecipes(recipes, recipeGrid);
  updateStats();
}

init();