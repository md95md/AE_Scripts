function fillArray(n, value) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        arr.push(value);
    }
    return arr;
}

// Наш общий массив интервалов:
var intervals = fillArray(5, 45)
    .concat([80])
    .concat(fillArray(11, 45))
    .concat([80])
    .concat(fillArray(10, 40))
    .concat(fillArray(10, 30));
