// Ctrl+C ile kopyalama olayını dinle
document.addEventListener('copy', () => {
  // Kısa bir gecikme ile clipboard'u oku (tarayıcı clipboard'u güncelledikten sonra)
  setTimeout(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && text.trim().length > 0) {
        chrome.runtime.sendMessage({
          type: 'COPY_EVENT',
          text: text.trim()
        });
      }
    } catch (err) {
      // Clipboard okuma izni yoksa sessizce geç
    }
  }, 100);
});
