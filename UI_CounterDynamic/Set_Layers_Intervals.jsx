#include "IntervalsLibs.jsx"
#include "CreateNullLayer.jsx"

function SetLayersIntervals(maxValue) {
    var activeComp = app.project.activeItem;
    if (!activeComp || !(activeComp instanceof CompItem)) {
        alert("Выберите композицию в панели Project и откройте её на таймлайне.");
        return;
    }

    if (typeof intervals === "undefined" || !Array.isArray(intervals)) {
        alert("Массив 'intervals' не найден.");
        return;
    }

    if (activeComp.numLayers < maxValue) {
        alert("В композиции меньше слоёв, чем нужно (" + maxValue + ").");
        return;
    }

    var count = Math.min(maxValue, intervals.length);
    var frameRate = activeComp.frameRate;
    var oneFrame = 1 / frameRate;

    app.beginUndoGroup("Расставляем слои в активной композиции");

    // Начинаем, как и в текстовом слое и маркерах — с 8 кадров
    var t = 8 * oneFrame;

    for (var i = 1; i <= count; i++) {
        var layer = activeComp.layer(i);
        layer.startTime = t;

        // Двигаем t по интервалу (точно так же, как в createMarkersLayer)
        t += intervals[i - 1] * oneFrame;
    }

    app.endUndoGroup();

    // Создаём маркеры в тех же точках
    createMarkersLayer(maxValue);
}
