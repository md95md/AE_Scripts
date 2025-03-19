#include "../My_Libs/IntervalsLibs.jsx"

(function () {

    // Берём активную (открытую) композицию
    var activeComp = app.project.activeItem;
    if (!activeComp || !(activeComp instanceof CompItem)) {
        alert("Выберите композицию в панели Project и откройте её на таймлайне.");
        return;
    }

    // Посмотрим реальное имя композиции
    // (не обязательно, но наглядно)
    alert("Выбранная композиция называется: " + activeComp.name);

    // Проверяем количество слоёв
    if (activeComp.numLayers < intervals.length + 1) {
        alert("В композиции меньше слоёв, чем интервалов. Проверьте массив intervals или композицию.");
        return;
    }

    app.beginUndoGroup("Расставляем слои в активной композиции");

    var startTime = 0;
    for (var i = 1; i <= activeComp.numLayers; i++) {
        var layer = activeComp.layer(i);
        layer.startTime = startTime / activeComp.frameRate;
        if (i <= intervals.length) {
            startTime += intervals[i - 1];
        }
    }

    app.endUndoGroup();

})();
