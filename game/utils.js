const e = sel => document.querySelector(sel)

const log = console.log.bind(console)

const rectIntersects = function(a, b) {
    const o = a
    if (b.y > o.y && b.y < o.y + o.h) {
        if (b.x > o.x && b.x < o.x + o.w) {
            return true
        }
    }
    return false
}

const aInb = function(x, x1, x2) {
    return x >= x1 && x <= x2
}
