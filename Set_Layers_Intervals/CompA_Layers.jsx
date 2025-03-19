#include "../My_Libs/IntervalsLibs.jsx"

(function () {
    // Функция заполнения массива одинаковым значением
    function fillArray(count, value) {
        var arr = [];
        for (var i = 0; i < count; i++) {
            arr.push(value);
        }
        return arr;
    }

    // Определяем интервалы (в кадрах). Ниже – ваш пример, его можно менять.
    // var intervals = fillArray(5, 15)
    //     .concat([80])
    //     .concat(fillArray(11, 45))
    //     .concat(fillArray(3, 40));

    // Берём активную композицию как "A"
    var compA = app.project.activeItem;
    if (!compA || !(compA instanceof CompItem)) {
        alert("Выберите композицию A в панели Project и откройте её на таймлайне.");
        return;
    }

    // Проверяем, достаточно ли слоёв (если слоёв меньше, чем интервалов, в конце можно проигнорировать часть интервалов или просто вывести предупреждение)
    if (compA.numLayers < intervals.length + 1) {
        alert("В композиции A меньше слоёв, чем интервальных значений. Проверьте intervals или количество слоёв.");
        // Можно продолжить работу или выйти – выбирайте под свою задачу
        // return;
    }

    app.beginUndoGroup("Расставляем слои в композиции A");
    
    var startTime = 0;
    // Проходим по слоям, расставляем по интервалам
    for (var i = 1; i <= compA.numLayers; i++) {
        var layer = compA.layer(i);

        // Назначаем startTime (время в секундах), переводим кадры в секунды по frameRate
        layer.startTime = startTime / compA.frameRate;

        // Для слоя i добавляем следующий интервал (i-1, т.к. массив intervals идёт с 0)
        if (i <= intervals.length) {
            startTime += intervals[i - 1]; 
        } else {
            // Если интервалов не хватает на все слои — тогда ничего не добавляем,
            // либо как-то обрабатываем дальше, на ваше усмотрение
        }
    }

    app.endUndoGroup();
})();
