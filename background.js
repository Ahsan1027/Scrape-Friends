chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const reactionBtnSelector = request.action;

  if (reactionBtnSelector) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        files: ['scripts/content.js'],
      });
    });
  }
});

let friendsQueue = [];

chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  console.log('listening for connection', message.action);
  
  if (message.action === 'triggerFromWebApp') {
    chrome.storage.local.get({ friendsData: [] }, function (result) {
      friendsQueue = result.friendsData;

      if (friendsQueue.length === 0) {
        sendResponse({
          success: true,
          data: []
        });
        return;
      }

      const chunk = [];
      for (let i = 0; i < friendsQueue.length && chunk.length < 10; i++) {
        if (!friendsQueue[i].sent) {
          friendsQueue[i].sent = true;
          chunk.push(friendsQueue[i]);
        }
      }

      chrome.storage.local.set({ friendsData: friendsQueue }, function () {
        console.log('Updated friendsData after sending chunk');
      });

      sendResponse({
        success: true,
        data: chunk
      });
    });
  }
});


