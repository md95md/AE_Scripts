#include "IntervalsLibs.jsx"

function SetLayersIntervals(maxValue) {
    var activeComp = app.project.activeItem;
    if (!activeComp || !(activeComp instanceof CompItem)) {
        alert("Выберите композицию в панели Project и откройте её на таймлайне.");
        return;
    }

    if (activeComp.numLayers < maxValue) {
        alert("В композиции меньше слоёв, чем нужно (" + maxValue + ").");
        return;
    }

    if (typeof intervals === "undefined" || !Array.isArray(intervals)) {
        alert("Массив 'intervals' не найден.");
        return;
    }

    var count = Math.min(maxValue, intervals.length);

    app.beginUndoGroup("Расставляем слои в активной композиции");

    var startTime = 0;
    for (var i = 1; i <= count; i++) {
        var layer = activeComp.layer(i);
        layer.startTime = startTime / activeComp.frameRate;
        startTime += intervals[i - 1];
    }

    app.endUndoGroup();
}
