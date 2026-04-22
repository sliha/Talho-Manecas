'use strict';

// ─── DATA ───────────────────────────────────────────────────────────────────
const products = [
  { id:1, name:'Entrecôte de Vaca', category:'fresca', price:18.90, desc:'Corte nobre com marmoreado perfeito para grelhar.', img:'https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=400&q=80' },
  { id:2, name:'Lombo de Novilho', category:'fresca', price:22.50, desc:'Suave e tenro, ideal para assados e churrasco.', img:'https://images.unsplash.com/photo-1588347818148-c8ea2e9e9acf?w=400&q=80' },
  { id:3, name:'Frango do Campo', category:'fresca', price:7.90, desc:'Criado ao ar livre, sabor autêntico e natural.', img:'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&q=80' },
  { id:4, name:'Costeletas de Porco', category:'fresca', price:9.50, desc:'Peça tradicional, perfeita para assar ou grelhar.', img:'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=400&q=80' },
  { id:5, name:'Borrego Inteiro', category:'fresca', price:28.00, desc:'Borrego nacional, peça inteira para festas e ocasiões especiais.', img:'https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=400&q=80' },
  { id:6, name:'Bifes de Peru', category:'fresca', price:8.50, desc:'Leves e nutritivos, ideais para refeições rápidas.', img:'https://images.unsplash.com/photo-1602525962574-3d0e8a2bc14e?w=400&q=80' },
  { id:7, name:'Hambúrgueres Artesanais', category:'congelado', price:12.90, desc:'Pack de 4 unidades, receita própria sem conservantes.', img:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80' },
  { id:8, name:'Chouriço Fumado', category:'congelado', price:6.50, desc:'Produção artesanal, fumado com madeira de qualidade.', img:'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=400&q=80' },
  { id:9, name:'Kebab Temperado', category:'congelado', price:10.90, desc:'Mistura de carnes temperadas, pronto a cozinhar.', img:'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80' },
  { id:10, name:'Vinho Tinto Alentejano', category:'vinho', price:8.90, desc:'Encorpado, com notas de frutos vermelhos e baunilha.', img:'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80' },
  { id:11, name:'Vinho Verde Branco', category:'vinho', price:6.50, desc:'Fresco e ligeiramente efervescente, perfeito com peixe.', img:'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=400&q=80' },
  { id:12, name:'Rosé Premium', category:'vinho', price:7.90, desc:'Elegante e frutado, ideal para refeições de verão.', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
];

let cart = [];
let payMethod = 'card';

// ─── NAVIGATION ─────────────────────────────────────────────────────────────
function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (page === 'produtos') renderProducts('todas');
  if (page === 'encomendas') renderOrderProducts();
}

function toggleMenu() {
  const nav = document.getElementById('navMobile');
  nav.classList.toggle('open');
}

// ─── RENDER HOME PRODUCTS ────────────────────────────────────────────────────
function renderHomeProducts() {
  const el = document.getElementById('homeProducts');
  const featured = products.filter(p => p.category === 'fresca').slice(0, 3);
  el.innerHTML = featured.map(p => productCardHTML(p)).join('');
}

// ─── RENDER PRODUCT GRID ─────────────────────────────────────────────────────
function renderProducts(cat) {
  const filtered = cat === 'todas' ? products : products.filter(p => p.category === cat);
  document.getElementById('productGrid').innerHTML = filtered.map(p => productCardHTML(p)).join('');
}

function filterProducts(cat, btn) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderProducts(cat);
}

function productCardHTML(p) {
  return `<div class="product-card">
    <img class="product-img" src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&q=80'">
    <div class="product-body">
      <div class="product-category">${catLabel(p.category)}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-desc">${p.desc}</div>
      <div class="product-footer">
        <span class="product-price">€${p.price.toFixed(2)}/kg</span>
        <button class="add-btn" id="addbtn-${p.id}" onclick="addToCart(${p.id})">+ Adicionar</button>
      </div>
    </div>
  </div>`;
}

function catLabel(c) {
  return { fresca:'🥩 Carne Fresca', congelado:'❄️ Congelado', vinho:'🍷 Vinho' }[c] || c;
}

// ─── RENDER ORDER PRODUCTS ────────────────────────────────────────────────────
function renderOrderProducts() {
  const el = document.getElementById('orderProductList');
  el.innerHTML = products.map(p => `
    <div class="order-product">
      <img src="${p.img}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&q=80'">
      <div class="order-product-info">
        <strong>${p.name}</strong>
        <span>${catLabel(p.category)}</span>
      </div>
      <span class="order-product-price">€${p.price.toFixed(2)}</span>
      <button class="add-btn" id="orderbtn-${p.id}" onclick="addToCart(${p.id})">+ Add</button>
    </div>
  `).join('');
}

// ─── CART ────────────────────────────────────────────────────────────────────
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(i => i.id === id);
  if (existing) { existing.qty++; }
  else { cart.push({ ...product, qty: 1 }); }
  updateCartUI();

  const btns = document.querySelectorAll(`[id$="btn-${id}"]`);
  btns.forEach(btn => {
    btn.classList.add('added');
    btn.textContent = '✓ Adicionado';
    setTimeout(() => { btn.classList.remove('added'); btn.textContent = id > 6 ? '+ Add' : '+ Adicionar'; }, 1500);
  });
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  updateCartUI();
}

function updateCartUI() {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  document.getElementById('cartCount').textContent = count;

  const renderItems = (containerId, removable = true) => {
    const el = document.getElementById(containerId);
    if (!el) return;
    if (cart.length === 0) {
      el.innerHTML = '<p class="empty-cart">O carrinho está vazio.</p>';
      return;
    }
    el.innerHTML = cart.map(i => `
      <div class="cart-item">
        <div class="cart-item-info">
          <strong>${i.name}</strong>
          <span>€${i.price.toFixed(2)}/kg</span>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${i.id},-1)">−</button>
          <span>${i.qty}</span>
          <button class="qty-btn" onclick="changeQty(${i.id},1)">+</button>
        </div>
        ${removable ? `<button class="cart-item-remove" onclick="removeFromCart(${i.id})">✕</button>` : ''}
      </div>
    `).join('');
  };

  renderItems('cartItems');
  renderItems('cartDrawerItems');

  const summary = document.getElementById('cartSummary');
  const drawerFooter = document.getElementById('cartDrawerFooter');
  if (cart.length > 0) {
    summary && summary.classList.remove('hidden');
    drawerFooter && drawerFooter.classList.remove('hidden');
  } else {
    summary && summary.classList.add('hidden');
    drawerFooter && drawerFooter.classList.add('hidden');
  }

  const totalEl = document.getElementById('cartTotal');
  const drawerTotalEl = document.getElementById('cartDrawerTotal');
  if (totalEl) totalEl.textContent = '€' + total.toFixed(2);
  if (drawerTotalEl) drawerTotalEl.textContent = '€' + total.toFixed(2);
}

function openCart() {
  document.getElementById('cartOverlay').classList.add('open');
  document.getElementById('cartDrawer').classList.add('open');
  updateCartUI();
}

function closeCart() {
  document.getElementById('cartOverlay').classList.remove('open');
  document.getElementById('cartDrawer').classList.remove('open');
}

// ─── PAYMENT ─────────────────────────────────────────────────────────────────
function selectPayment(method, btn) {
  payMethod = method;
  document.querySelectorAll('.pay-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('payCard').classList.toggle('hidden', method !== 'card');
  document.getElementById('payMbway').classList.toggle('hidden', method !== 'mbway');
}

function formatCard(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 16);
  input.value = v.replace(/(\d{4})(?=\d)/g, '$1 ');
}

function formatExpiry(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 4);
  if (v.length >= 3) v = v.substring(0,2) + '/' + v.substring(2);
  input.value = v;
}

function finalizeOrder() {
  if (cart.length === 0) { alert('Adicione produtos ao carrinho primeiro.'); return; }
  const store = document.getElementById('pickupStore').value;
  if (!store) { alert('Por favor selecione uma loja para levantamento.'); return; }

  if (payMethod === 'card') {
    const num = document.getElementById('cardNumber').value.replace(/\s/g,'');
    const exp = document.getElementById('cardExpiry').value;
    const cvv = document.getElementById('cardCvv').value;
    const name = document.getElementById('cardName').value;
    if (num.length < 16 || !exp.includes('/') || cvv.length < 3 || !name) {
      alert('Por favor preencha todos os dados do cartão.'); return;
    }
  } else {
    const phone = document.getElementById('mbwayPhone').value;
    if (phone.length < 9) { alert('Por favor insira um número de telemóvel válido.'); return; }
  }

  cart = [];
  updateCartUI();
  document.getElementById('successModal').classList.add('open');
}

function closeModal() {
  document.getElementById('successModal').classList.remove('open');
  navigate('home');
}

// ─── CHAT ASSISTENTE ─────────────────────────────────────────────────────────
const botReplies = [
  { keys: ['olá','ola','oi','bom dia','boa tarde','boa noite','hey','hello'], reply: 'Olá! 👋 Bem-vindo ao Talho Manecas. Posso ajudar com produtos, encomendas ou localização.' },
  { keys: ['carne','carnes','produto','produtos','o que','menu','catalogo','catálogo'], reply: 'Temos uma seleção premium de:\n🥩 Carnes frescas (vaca, novilho, porco, frango, borrego)\n❄️ Congelados (hambúrgueres, kebab, chouriço)\n🍷 Vinhos selecionados\n\nVeja todos os produtos na secção Produtos!' },
  { keys: ['encomend','pedido','comprar','encomendar','carrinho'], reply: 'Pode encomendar online em 3 passos:\n1️⃣ Escolha os produtos\n2️⃣ Adicione ao carrinho\n3️⃣ Finalize e levante na loja\n\nSem taxas de entrega. Rápido e fácil!' },
  { keys: ['onde','loja','lojas','localiz','morada','endereço'], reply: 'Temos 3 lojas em Braga:\n📍 Quinta da Capela – R. Dr. Francisco Machado Owen, 8\n📍 Lamaçães – Av. Dr. António Palha\n📍 Celeirós – Av. de São Lourenço, 78' },
  { keys: ['horário','horario','hora','aberto','abre','fecha'], reply: 'O nosso horário é:\n⏰ Segunda a Sexta: 08h00 – 19h30\n⏰ Sábado: 08h00 – 13h00\n🔒 Domingo: Encerrado' },
  { keys: ['telefone','telef','contacto','ligar','chamar'], reply: 'Pode contactar-nos por:\n📞 Quinta da Capela: 253 214 440\n📞 Lamaçães: 253 619 358\n📞 Celeirós: 253 693 510\n📧 talhomanecas@gmail.com' },
  { keys: ['preço','preco','quanto','custo','valor'], reply: 'Os preços variam consoante o produto. Consulte a nossa secção de Produtos para ver todos os preços atualizados! 🥩' },
  { keys: ['pagamento','pagar','mbway','cartão','cartao'], reply: 'Aceitamos:\n💳 Cartão de crédito/débito\n📱 MBWay\n\nO pagamento é feito no momento do levantamento em loja.' },
  { keys: ['qualidade','fresco','fresca','bom','boa','excelente'], reply: 'A qualidade é a nossa prioridade! Trabalhamos com os melhores fornecedores nacionais e garantimos carne fresca todos os dias. 🏆' },
  { keys: ['whatsapp','zap','mensagem'], reply: 'Pode falar connosco pelo WhatsApp! Clique no botão verde no canto inferior direito. 💬' },
  { keys: ['obrigad','obg','thanks','thank'], reply: 'De nada! É sempre um prazer ajudar. Se precisar de mais alguma coisa, estou aqui! 😊' },
];

function getBotReply(msg) {
  const lower = msg.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
  for (const item of botReplies) {
    if (item.keys.some(k => lower.includes(k))) return item.reply;
  }
  return 'Posso ajudar com informações sobre produtos, encomendas, localização e horários. Como posso ajudar? 😊';
}

function toggleChat() {
  const box = document.getElementById('chatBox');
  const iconOpen = document.getElementById('chatIconOpen');
  const iconClose = document.getElementById('chatIconClose');
  const isOpen = box.classList.toggle('open');
  iconOpen.style.display = isOpen ? 'none' : 'block';
  iconClose.style.display = isOpen ? 'block' : 'none';
}

function sendChat() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';
  appendMsg(msg, 'user');
  showTyping();
  setTimeout(() => {
    removeTyping();
    appendMsg(getBotReply(msg), 'bot');
  }, 800 + Math.random() * 600);
}

function sendSuggestion(text) {
  document.getElementById('chatInput').value = text;
  sendChat();
  document.querySelector('.chat-suggestions') && document.querySelector('.chat-suggestions').remove();
}

function appendMsg(text, type) {
  const container = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'msg ' + type;
  div.textContent = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function showTyping() {
  const container = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'msg bot typing'; div.id = 'typingIndicator';
  div.innerHTML = '<span></span><span></span><span></span>';
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function removeTyping() {
  const el = document.getElementById('typingIndicator');
  if (el) el.remove();
}

// ─── CONTACTS ────────────────────────────────────────────────────────────────
function submitContact(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = '✓ Mensagem enviada!';
  btn.style.background = '#28a745';
  setTimeout(() => { btn.textContent = 'Enviar Mensagem'; btn.style.background = ''; e.target.reset(); }, 3000);
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderHomeProducts();
  renderProducts('todas');
  renderOrderProducts();
  updateCartUI();

  window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) { header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)'; }
    else { header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)'; }
  });
});
