document.getElementById('scrapeBtn').addEventListener('click', () => sendMessage('scrape'));

const sendMessage = (scrape) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    if (currentTab.url.includes('facebook.com')) {
      chrome.storage.local.set({ currentReaction: scrape }, () => {
        console.log(`Stored reaction: ${scrape}`);
      });
      chrome.runtime.sendMessage({ action: scrape });
    } else {
      console.log("Not a Facebook URL. Action not sent.");
    }
  });
}
