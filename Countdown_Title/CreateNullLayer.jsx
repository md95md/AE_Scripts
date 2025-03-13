function createMarkersLayer()
{
    var comp = app.project.activeItem;
    if (!(comp instanceof CompItem))
    {
        alert("Пожалуйста, откройте композицию.");
        return;
    }
    
    var nullLayer = comp.layers.addNull();
    nullLayer.name = "Markers Layer";
    
    var markerProp = nullLayer.property("Marker");
    while (markerProp.numKeys > 0)
    {
        markerProp.removeKey(markerProp.numKeys);
    }
    
    var frameRate = comp.frameRate;
    var oneFrame  = 1 / frameRate;
    
    // Начальное время для маркеров, как и в текстовом слое, начинается в 8 кадрах
    var t = 8 * oneFrame;

    for (var i = 0; i < intervals.length; i++)
    {
        t = (t + oneFrame) + (intervals[i] * oneFrame);
        var marker = new MarkerValue("Dog: " + i);
        markerProp.setValueAtTime(t, marker);
    }
}
