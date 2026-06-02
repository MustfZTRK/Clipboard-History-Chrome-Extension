const clipList = document.getElementById('clipList');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');
const toast = document.getElementById('toast');

let allItems = [];
let toastTimer = null;

// ── Yükle ──────────────────────────────────────────────
async function loadHistory() {
  const result = await chrome.storage.local.get(['clipboardHistory']);
  allItems = result.clipboardHistory || [];
  render(allItems, searchInput.value.trim());
}

// ── Render ─────────────────────────────────────────────
function render(items, query = '') {
  clipList.innerHTML = '';

  const filtered = query
    ? items.filter(i => i.text.toLowerCase().includes(query.toLowerCase()))
    : items;

  if (filtered.length === 0) {
    if (items.length === 0) {
      emptyState.style.display = 'flex';
    } else {
      emptyState.style.display = 'none';
      clipList.innerHTML = `<div class="no-results">Sonuç bulunamadı</div>`;
    }
    return;
  }

  emptyState.style.display = 'none';

  filtered.forEach((item, idx) => {
    const li = document.createElement('li');
    li.className = 'clip-item';
    li.dataset.id = item.id;

    const displayText = query ? highlightText(item.text, query) : escapeHtml(item.text);
    const timeStr = formatTime(item.timestamp);
    const charCount = item.text.length;

    li.innerHTML = `
      <span class="clip-index">${idx + 1}</span>
      <div class="clip-content">
        <div class="clip-text" title="${escapeHtml(item.text)}">${displayText}</div>
        <div class="clip-meta">${timeStr} · ${charCount} karakter</div>
      </div>
      <div class="clip-actions">
        <button class="action-btn copy-btn" title="Kopyala">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
        </button>
        <button class="action-btn delete-btn" title="Sil">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14H6L5 6"/>
          </svg>
        </button>
      </div>
    `;

    // Satıra tıkla → kopyala
    li.addEventListener('click', (e) => {
      if (e.target.closest('.delete-btn')) return;
      copyToClipboard(item.text, li);
    });

    // Sil butonu
    li.querySelector('.delete-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      deleteItem(item.id);
    });

    clipList.appendChild(li);
  });
}

// ── Kopyala ────────────────────────────────────────────
async function copyToClipboard(text, element) {
  try {
    await navigator.clipboard.writeText(text);
    element.classList.add('copied');
    setTimeout(() => element.classList.remove('copied'), 600);
    showToast();
  } catch (err) {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast();
  }
}

// ── Sil ───────────────────────────────────────────────
async function deleteItem(id) {
  allItems = allItems.filter(i => i.id !== id);
  await chrome.storage.local.set({ clipboardHistory: allItems });
  render(allItems, searchInput.value.trim());
}

// ── Tümünü temizle ────────────────────────────────────
clearBtn.addEventListener('click', async () => {
  if (allItems.length === 0) return;
  if (confirm('Tüm pano geçmişi silinsin mi?')) {
    allItems = [];
    await chrome.storage.local.set({ clipboardHistory: [] });
    render(allItems);
  }
});

// ── Arama ─────────────────────────────────────────────
searchInput.addEventListener('input', () => {
  render(allItems, searchInput.value.trim());
});

// ── Toast ─────────────────────────────────────────────
function showToast() {
  clearTimeout(toastTimer);
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

// ── Storage değişikliklerini dinle ───────────────────
chrome.storage.onChanged.addListener((changes) => {
  if (changes.clipboardHistory) {
    allItems = changes.clipboardHistory.newValue || [];
    render(allItems, searchInput.value.trim());
  }
});

// ── Yardımcılar ───────────────────────────────────────
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function highlightText(text, query) {
  const escaped = escapeHtml(text);
  const re = new RegExp(`(${escapeRegex(query)})`, 'gi');
  return escaped.replace(re, '<span class="highlight">$1</span>');
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function formatTime(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const now = new Date();
  const diff = now - d;

  if (diff < 60_000) return 'Az önce';
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)} dk önce`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)} sa önce`;

  return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
}

// ── Başlat ────────────────────────────────────────────
loadHistory();
