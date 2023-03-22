"use strict";
chrome.contextMenus.create({
    id: 'copy-title',
    title: "复制标题",
    contexts: ["page"]
});
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === 'copy-title') {
        if (tab)
            getTitle(tab);
    }
});
function getTitle(tab) {
    chrome.scripting.executeScript({
        target: { tabId: (tab === null || tab === void 0 ? void 0 : tab.id) || 0 },
        func: function () {
            var textArea = document.createElement("textarea");
            textArea.value = document.title;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
        }
    });
}
