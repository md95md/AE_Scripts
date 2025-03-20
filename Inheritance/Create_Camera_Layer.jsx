function createMergedLayerWithCustomIntervals() {
    app.beginUndoGroup("Create Merged Layer with Custom Intervals");

    var comp = app.project.activeItem;
    if (!(comp instanceof CompItem)) {
        alert("Сначала откройте композицию в окне Timeline.");
        return;
    }

    var selectedLayers = comp.selectedLayers;
    if (selectedLayers.length === 0) {
        alert("Выделите хотя бы один слой.");
        return;
    }

    // ---------------------------------------------------------------------
    // Пример «заглушки» для функции интервалов. 
    // В реальном проекте замените на свою реализацию.
    // ---------------------------------------------------------------------
    function getIntervalTime(index) {
        // Допустим, хотим шаг 0.5 секунды между ключами:
        return index * 0.5; 
    }

    // Создаём Null-слой для записи ключей
    var newNull = comp.layers.addNull();
    newNull.name = "Merged Layer with Intervals";

    var newPos = newNull.property("ADBE Transform Group").property("ADBE Position");
    var newScale = newNull.property("ADBE Transform Group").property("ADBE Scale");

    // Массив, в котором будем складывать все «записи» с информацией о ключах
    // Для наглядности каждая запись: {posValue: [...], scaleValue: [...], index: ...}
    // Можно также хранить старое время, слой и т.д. — смотрите по задаче
    var allKeys = [];

    // Счётчик общего числа ключей (чтобы определить, какой по счёту ключ создаём)
    var globalKeyIndex = 0;

    // Проходим по всем выбранным слоям
    for (var i = 0; i < selectedLayers.length; i++) {
        var layer = selectedLayers[i];
        
        // Берём Position/Scale. Если нужно «мировое» положение, используем valueAtTime(..., true).
        var layerPos = layer.property("ADBE Transform Group").property("ADBE Position");
        var layerScale = layer.property("ADBE Transform Group").property("ADBE Scale");

        var numPosKeys = layerPos.numKeys;

        // Считываем ключи
        for (var k = 1; k <= numPosKeys; k++) {
            var keyTime = layerPos.keyTime(k);
            // Локальная или глобальная позиция?
            // var posValue = layerPos.keyValue(k); // чисто ключевое (локальное)
            // или
            var posValue = layerPos.valueAtTime(keyTime, true); // мировая позиция

            // Аналогично scale
            var scaleValue = layerScale.valueAtTime(keyTime, false);

            // Добавляем запись в массив
            allKeys.push({
                posValue: posValue,
                scaleValue: scaleValue,
                originalTime: keyTime,   // если хотим знать исходное время
                globalIndex: globalKeyIndex
            });
            globalKeyIndex++;
        }
    }

    // Теперь у нас в allKeys лежат все ключи.
    // Расставим их на новом слое по «придуманному» таймингу через getIntervalTime(index).

    // Перебираем allKeys и создаём реальные ключи на newNull
    for (var j = 0; j < allKeys.length; j++) {
        // Новый момент времени — из нашей функции
        var newTime = getIntervalTime(j);

        // Записываем
        newPos.setValueAtTime(newTime, allKeys[j].posValue);
        newScale.setValueAtTime(newTime, allKeys[j].scaleValue);
    }

    alert("Готово! Создан слой \"" + newNull.name + "\" и расставлены ключи с пользовательскими интервалами.");

    app.endUndoGroup();
}

createMergedLayerWithCustomIntervals();
