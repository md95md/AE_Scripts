#include "IntervalsLibs.jsx"

function createMarkersLayer(maxValue)
{
    var comp = app.project.activeItem;
    if (!(comp instanceof CompItem)) {
        alert("Пожалуйста, откройте композицию.");
        return;
    }

    if (typeof intervals === "undefined" || !Array.isArray(intervals)) {
        alert("Ошибка: 'intervals' не определён или не является массивом.");
        return;
    }

    var nullLayer = comp.layers.addNull();
    nullLayer.name = "Intervals Markers";

    var markerProp = nullLayer.property("Marker");
    while (markerProp.numKeys > 0) {
        markerProp.removeKey(markerProp.numKeys);
    }

    var frameRate = comp.frameRate;
    var oneFrame  = 1 / frameRate;
    var t = 8 * oneFrame; 

    var count = Math.min(maxValue, intervals.length);

    for (var i = 1; i < count + 1; i++) {
        var marker = new MarkerValue("Dog: " + i);
        markerProp.setValueAtTime(t, marker);

        t += intervals[i] * oneFrame;
    }
}
