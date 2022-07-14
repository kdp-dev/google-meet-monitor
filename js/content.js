globalThis.attendanceString = undefined

setInterval(() => {
    const spanElems = [...document.getElementsByClassName("VfPpkd-vQzf8d")]
    const keepWaitingSpans = spanElems.filter(
        elem => elem.innerText === "Keep waiting"
    )
    if (keepWaitingSpans.length === 1) {
        keepWaitingSpans[0].click()
        return
    }

    const newAttendanceString = (
        (document.getElementsByClassName("Yi3Cfd") ?? [{}])[0] ?? {}
    ).innerText
    const url = new URL(document.URL)
    const meetingId = url.pathname.slice(1)

    if (
        globalThis.attendanceString !== newAttendanceString &&
        newAttendanceString !== undefined
    ) {
        globalThis.attendanceString = newAttendanceString
        chrome.runtime.sendMessage(
            { meetingId, message: newAttendanceString },
            response => {}
        )
    }
}, 5000)
