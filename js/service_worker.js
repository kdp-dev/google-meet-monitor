globalThis.idCache = {}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (!("meetingId" in request)) {
        sendResponse(false)
        return
    }

    const meetingId = request.meetingId
    const message = request.message

    if (message !== globalThis.idCache[meetingId]) {
        globalThis.idCache[meetingId] = message
        chrome.notifications.clear(meetingId, () => {
            if (message !== undefined && message !== "No one else is here") {
                chrome.notifications.create(meetingId, {
                    type: "basic",
                    title: `Meet ${meetingId}`,
                    message,
                    requireInteraction: true,
                    iconUrl: "../icons/icon128.png",
                })
            }
        })
    }

    sendResponse(true)
})
