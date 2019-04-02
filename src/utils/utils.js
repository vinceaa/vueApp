const time = 1

const getPos = (block, x, y) => {
    // log('utils getpos 进行')
    const dotRadius = block.width() * 2 / 10
    const hOffset = dotRadius / 2
    const wOffset = dotRadius / 2

    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop


    const blockLeft = block.offset().left
    const blockTop = block.offset().top
    const initOffsetX = x - blockLeft
    const initOffsetY = y - blockTop
    

    const left = initOffsetX - wOffset
    const top = initOffsetY - hOffset + scrollTop
    return [left, top, dotRadius]
}


const rippleMethod = (event, element, ripple_lista, activePos, troubleStyleRibble) => {
    // activePos 是取到 dom 元素的位置
    // log('utils rippleMethod：')
    ripple_lista.push('')
    const x = event.clientX
    const y = event.clientY
    const block = getBlock(event)
    const [left, top, dotRadius] = getPos(block, x, y)
    troubleStyleRibble = {
        left: `${left}px`,
        top: `${top}px`,
        width: `${dotRadius}px`,
        height: `${dotRadius}px`,
    }
    setTimeout(() => {
        $('.rippleInit').eq(0).remove()
    }, 500);
    return troubleStyleRibble
}

const check_username = (str) => {
    const lista = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let e of str) {
        if (lista.includes(e) == false) {
            return false
        }
    }
    return true
}

const check_blank = (str) => {
    return str.includes(' ')
}


const getBlock = (event) => {
    if ($(event.target).hasClass('icon-main')) {
        return $(event.target)
    } else {
        return $(event.target).parent('.icon-main')
    }
}


const group = (lista) => {
    const groupa = []
    const l = lista.length
    const n = Math.ceil(l / 10)
    
    for (let i = 0; i < n; i++) {
        const start = i * 10
        const end = (i + 1) * 10
        const ceil = lista.slice(start, end)
        groupa.push(ceil)
    }
    return groupa
}

export {
    time,
    getPos,
    rippleMethod,
    getBlock,
    check_username,
    check_blank,
    group,
}
