#include "IntervalsLibs.jsx"

function createTextLayerDynamicKeys(maxValue) {
    var comp = app.project.activeItem;
    if (!(comp instanceof CompItem)) {
        alert("Пожалуйста, откройте композицию в окне проекта");
        return;
    }

    // Ищем слой с текстом
    var textLayer = null;
    for (var i = 1; i <= comp.numLayers; i++) {
        if (comp.layer(i).name === "UI dogs counter") {
            textLayer = comp.layer(i);
            break;
        }
    }

    if (!textLayer) {
        alert("UI dogs counter' не найден. Создаю новый.");
        textLayer = comp.layers.addText("0");
        textLayer.name = "UI dogs counter";
    }

    var sourceTextProp = textLayer.property("Source Text");

    function removeAllKeys(prop) {
        for (var i = prop.numKeys; i >= 1; i--) {
            prop.removeKey(i);
        }
    }
    removeAllKeys(sourceTextProp);

    // Проверяем, загружен ли массив intervals
    if (typeof intervals === "undefined" || !Array.isArray(intervals)) {
        alert("Ошибка: массив 'intervals' не найден или пуст!");
        return;
    }

    // Используем введённое пользователем число
    var textValues = [];
    for (var i = 0; i <= maxValue; i++) {
        textValues.push(i.toString());
    }

    var frameRate = comp.frameRate;
    var oneFrame  = 1 / frameRate;
    var t = 8 * oneFrame; // Стартовое время

    app.beginUndoGroup("Dynamic Keys (Text Layer)");

    for (var i = 0; i < textValues.length - 1; i++) {
        var currDoc = new TextDocument(textValues[i]);
        sourceTextProp.setValueAtTime(t, currDoc);

        var nextDoc = new TextDocument(textValues[i+1]);
        sourceTextProp.setValueAtTime(t + oneFrame, nextDoc);

        // ✅ Теперь вместо фиксированного `8 * oneFrame` используется `intervals[i]`
        if (i < intervals.length) {
            t += (intervals[i] * oneFrame);
        } else {
            t += (8 * oneFrame); // Если интервалов не хватает, используем стандартное значение
        }
    }

    var finalDoc = new TextDocument(textValues[textValues.length - 1]);
    sourceTextProp.setValueAtTime(t, finalDoc);

    app.endUndoGroup();
}


//Title
function createTextLayerReverseKeys(maxValue) {
    var comp = app.project.activeItem;
    if (!(comp instanceof CompItem)) {
        alert("Пожалуйста, откройте композицию.");
        return;
    }

    var textLayer = null;
    for (var i = 1; i <= comp.numLayers; i++) {
        if (comp.layer(i).name === "Title text counter") {
            textLayer = comp.layer(i);
            break;
        }
    }

    if (!textLayer) {
        alert("Слой 'Title text counter' не найден. Создаю новый.");
        textLayer = comp.layers.addText("0");
        textLayer.name = "Title text counter";
    }

    var sourceTextProp = textLayer.property("Source Text");
    var positionProp   = textLayer.property("Transform").property("Position");
    var opacityProp    = textLayer.property("Transform").property("Opacity");

    function removeAllKeys(prop) {
        for (var i = prop.numKeys; i >= 1; i--) {
            prop.removeKey(i);
        }
    }

    removeAllKeys(sourceTextProp);
    removeAllKeys(positionProp);
    removeAllKeys(opacityProp);

    if (typeof intervals === "undefined" || !Array.isArray(intervals)) {
        alert("Ошибка: массив 'intervals' не найден или пуст!");
        return;
    }

    function checkValue(value) {
        if (value >= maxValue) {
            return -5;
        } else if (value <= 9) {
            return 10;
        } else {
            return 0;
        }
    }

    var frameRate = comp.frameRate;
    var oneFrame  = 1 / frameRate;
    var basePos = positionProp.value;
    var t = 8 * oneFrame;

    var count = Math.min(maxValue, intervals.length);

    app.beginUndoGroup("Reverse Text Keys");

    for (var i = 0; i < count; i++) {
        var currentNum = maxValue - i;
        var nextNum = currentNum - 1;

        var xOffset = checkValue(currentNum);
        var currDoc = new TextDocument(currentNum.toString());
        sourceTextProp.setValueAtTime(t, currDoc);

        if (nextNum >= 0) {
            var nextDoc = new TextDocument(nextNum.toString());
            sourceTextProp.setValueAtTime(t + oneFrame, nextDoc);
        }

        // ===== ПОЗИЦИЯ =====
        positionProp.setValueAtTime(t - 8 * oneFrame, [ basePos[0] + xOffset, basePos[1] ]);

        var posAtT = [ basePos[0] + xOffset, basePos[1] + 42 ];
        positionProp.setValueAtTime(t, posAtT);

        xOffset = checkValue(nextNum);

        var posAtT1 = [ basePos[0] + xOffset, basePos[1] - 22 ];
        positionProp.setValueAtTime(t + oneFrame, posAtT1);

        positionProp.setValueAtTime(t + 7 * oneFrame, [ basePos[0] + xOffset, basePos[1] ]);

        // ===== ПРОЗРАЧНОСТЬ =====
        opacityProp.setValueAtTime(t - 2 * oneFrame, 100);
        opacityProp.setValueAtTime(t, 0);
        opacityProp.setValueAtTime(t + oneFrame, 0);
        opacityProp.setValueAtTime(t + 2 * oneFrame, 100);

        // Сдвигаем время на следующий интервал
        t += intervals[i] * oneFrame;
    }

    // Финальное значение текста
    if (maxValue - count >= 0) {
        var finalDoc = new TextDocument((maxValue - count).toString());
        sourceTextProp.setValueAtTime(t, finalDoc);
    }

    app.endUndoGroup();
}
