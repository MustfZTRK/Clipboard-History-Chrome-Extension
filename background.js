const MAX_ITEMS = 50;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'COPY_EVENT' && message.text) {
    saveClipboardItem(message.text);
  }
});

async function saveClipboardItem(text) {
  const result = await chrome.storage.local.get(['clipboardHistory']);
  let history = result.clipboardHistory || [];

  // Aynı metin zaten en üstteyse ekleme
  if (history.length > 0 && history[0].text === text) return;

  // Zaten listede varsa kaldır (üste taşınacak)
  history = history.filter(item => item.text !== text);

  // Yeni öğeyi en başa ekle
  history.unshift({
    id: Date.now(),
    text: text,
    timestamp: new Date().toISOString()
  });

  // Maksimum sayıyı aş
  if (history.length > MAX_ITEMS) {
    history = history.slice(0, MAX_ITEMS);
  }

  await chrome.storage.local.set({ clipboardHistory: history });
}
