function fillArray(n, value)
{
    var arr = [];
    for (var i = 0; i < n; i++) {
        arr.push(value);
    }
    return arr;
}

// Объявляем массив интервалов (в кадрах):
var intervals = fillArray(5, 45).concat([80]).concat(fillArray(11, 45)).concat(fillArray(3, 40));
