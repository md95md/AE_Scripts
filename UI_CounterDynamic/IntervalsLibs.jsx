function fillArray(n, value) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        arr.push(value);
    }
    return arr;
}

var intervals = fillArray(2, 45)
    .concat([80])
    .concat(fillArray(10, 45))
    .concat([80])
    .concat(fillArray(20, 45));
