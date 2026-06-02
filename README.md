# 📋 Clipboard History — Chrome Extension

> Kopyaladığın her şeyi sakla, tek tıkla geri getir.  
> Save everything you copy, bring it back with one click.

---

## 🇹🇷 Türkçe

### Nedir?

**Clipboard History**, tarayıcıda `Ctrl+C` ile kopyaladığın metinleri otomatik olarak kaydeden, listeleyen ve tek tıkla yeniden kopyalamanı sağlayan sade ve şık bir Chrome eklentisidir. Uzun makale bölümleri, kod parçacıkları, linkler — ne kopyalarsan kaybolmaz.

### Özellikler

- 📌 **Otomatik Kayıt** — Ctrl+C ile kopyalanan her metin anında geçmişe eklenir
- 🗂️ **50 Öğeye Kadar Geçmiş** — En güncel kopyalar en üstte sıralanır
- 🖱️ **Tek Tıkla Kopyala** — Listeden bir satıra tıkla, anında panonuza alınsın
- 🔍 **Anlık Arama** — Geçmişte arama yap, eşleşen kısımlar vurgulanır
- 🗑️ **Tekli veya Toplu Silme** — İstemediğini sil ya da tümünü temizle
- ⏱️ **Zaman Damgası** — "Az önce", "5 dk önce" gibi gösterim
- 🌙 **Karanlık Tema** — Göz yormayan koyu mor arayüz
- ✅ **Kopyalama Onayı** — Her kopyalamada yeşil "Kopyalandı!" bildirimi

### Kurulum

> Chrome Web Store'da yayınlanmamıştır. Geliştirici modu ile yüklenir.

1. Bu repoyu bilgisayarına klonla veya ZIP olarak indir
   ```
   git clone https://github.com/kullanici-adi/clipboard-history-extension.git
   ```
2. Chrome'da adres çubuğuna yaz: `chrome://extensions`
3. Sağ üst köşeden **Geliştirici modu**nu aç
4. **"Paketlenmemiş öğe yükle"** butonuna tıkla
5. İndirilen klasörü seç → eklenti yüklendi!

### Nasıl Çalışır?

| Bileşen | Görev |
|---|---|
| `content.js` | Her sayfada `copy` olayını dinler, metni background'a iletir |
| `background.js` | Metni `chrome.storage.local`'a kaydeder, tekrarları yönetir |
| `popup.html/js/css` | Geçmişi listeler, arama & silme işlemlerini yönetir |

### İzinler

| İzin | Neden? |
|---|---|
| `storage` | Kopyaları yerel olarak saklamak için |
| `clipboardRead` | Kopyalanan metnin içeriğini okumak için |
| `scripting` | İçerik scriptini sayfalara enjekte etmek için |

> ⚠️ Hiçbir veri dışarıya gönderilmez. Her şey tarayıcınızda kalır.

---

## 🇬🇧 English

### What is it?

**Clipboard History** is a clean and minimal Chrome extension that automatically saves every text you copy with `Ctrl+C`, lists them in a popup, and lets you re-copy any entry with a single click. Code snippets, article quotes, links — nothing gets lost.

### Features

- 📌 **Auto-save** — Every Ctrl+C copy is instantly stored in history
- 🗂️ **Up to 50 entries** — Most recent copies appear at the top
- 🖱️ **One-click re-copy** — Click any row to copy it back to clipboard
- 🔍 **Live search** — Filter your history instantly with highlighted matches
- 🗑️ **Delete single or all** — Remove specific entries or wipe the whole list
- ⏱️ **Timestamps** — Shows "Just now", "5 min ago", etc.
- 🌙 **Dark theme** — Easy-on-the-eyes dark purple UI
- ✅ **Copy confirmation** — Green "Copied!" toast on every copy action

### Installation

> Not published on the Chrome Web Store. Load it as an unpacked extension.

1. Clone or download this repository
   ```
   git clone https://github.com/your-username/clipboard-history-extension.git
   ```
2. Open Chrome and navigate to `chrome://extensions`
3. Enable **Developer mode** (top right toggle)
4. Click **"Load unpacked"**
5. Select the downloaded folder → done!

### How It Works

| Component | Role |
|---|---|
| `content.js` | Listens for `copy` events on every page and forwards text to background |
| `background.js` | Saves entries to `chrome.storage.local`, handles deduplication |
| `popup.html/js/css` | Renders the history list, handles search, copy, and delete |

### Permissions

| Permission | Why? |
|---|---|
| `storage` | To save clipboard entries locally |
| `clipboardRead` | To read the copied text content |
| `scripting` | To inject the content script into pages |

> ⚠️ No data is ever sent externally. Everything stays in your browser.

---

## 📁 Project Structure

```
clipboard-history-extension/
├── manifest.json       # Extension manifest (MV3)
├── background.js       # Service worker — saves clipboard entries
├── content.js          # Content script — detects copy events
├── popup.html          # Extension popup UI
├── popup.css           # Popup styles (dark theme)
├── popup.js            # Popup logic (render, search, copy, delete)
└── icons/
    ├── icon16.png
    ├── icon32.png
    ├── icon48.png
    └── icon128.png
```

---

## 🛠️ Tech Stack

- **Manifest V3** — Latest Chrome extension standard
- **Vanilla JS** — No frameworks, no dependencies
- **Chrome Storage API** — Local, persistent storage
- **Clipboard API** — Native browser clipboard access

---

## 📸 Preview

```
┌─────────────────────────────────┐
│ 📋 Pano Geçmişi           [🗑️] │
├─────────────────────────────────┤
│ 🔍 Ara...                       │
├─────────────────────────────────┤
│ 1  Lorem ipsum dolor sit...     │
│    Az önce · 42 karakter        │
│ 2  https://github.com/...       │
│    3 dk önce · 28 karakter      │
│ 3  npm install -g vercel        │
│    1 sa önce · 24 karakter      │
└─────────────────────────────────┘
```

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

<div align="center">

Made with 💜 · Vanilla JS · Chrome MV3

</div>
