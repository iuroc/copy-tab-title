chrome.contextMenus.create({
    id: 'copy-title',
    title: "复制标题",
    contexts: ["page"]
})
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'copy-title') {
        if (tab) getTitle(tab)
    }
})
function getTitle(tab: chrome.tabs.Tab) {
    chrome.scripting.executeScript({
        target: { tabId: tab?.id || 0 },
        func: () => {
            const textArea = document.createElement("textarea")
            textArea.value = document.title
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand("copy")
            document.body.removeChild(textArea)
        }
    })
}