
const log = console.log.bind(console)

const e = (selector) => document.querySelector(selector)

const bindEvent = (element, eventName, callback) => element.addEventListener(eventName, callback)


var ajax = function(request) {
    var r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    if (request.contentType != undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    r.onreadystatechange = function() {
        if (r.readyState == 4) {
            request.callback(r.response)
        }
    }
    if (request.method == 'GET') {
        r.send()
    } else {
        // log('request.data:', request.data)
        r.send(request.data)
    }
}
