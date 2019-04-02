
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
        log('request.data:', request.data)
        r.send(request.data)
    }
}


const test = () => {
    const element = e('.test')
    log('element:', element)
    bindEvent(element, 'click', (event) => {
        const target = event.target
        log('被点击：', target)

    })


    const data = {
        'username': 'hahha',
        'password': 123,
    }
    const data_s = JSON.stringify(data)
    const request = {
        method: 'POST',
        url: '/ajax/add',
        contentType: 'application/json',
        data: data_s,
        callback: function(response) {
            log('这是后台给出的响应:', response)
        }
    }
    ajax(request)
}


const __main = () => {
    test()
}


__main()