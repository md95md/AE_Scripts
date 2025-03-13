function createTextLayerDynamicKeys()
{
    var comp = app.project.activeItem;
    if (!(comp instanceof CompItem))
    {
        alert("Пожалуйста, откройте композицию.");
        return;
    }

    var textLayer = comp.layer("My Text Layer");
    if (!textLayer)
    {
        alert("Слой 'My Text Layer' не найден.");
        return;
    }

    var sourceTextProp = textLayer.property("Source Text");
    var positionProp   = textLayer.property("Transform").property("Position");
    var opacityProp    = textLayer.property("Transform").property("Opacity");
        
    function removeAllKeys(prop)
    {
        for (var i = prop.numKeys; i >= 1; i--)
            prop.removeKey(i);
    }
    removeAllKeys(sourceTextProp);
    removeAllKeys(positionProp);
    removeAllKeys(opacityProp);

    var textValues = [];
    for (var i = 20; i >= 0; i--)
    {
        textValues.push(i.toString());
    }
        
    var frameRate = comp.frameRate;
    var oneFrame  = 1 / frameRate;
    var basePos = positionProp.value;
    var t = 8 * oneFrame;

    app.beginUndoGroup("Dynamic Keys (Text Layer)");
        
    function checkValue(value)
    {
        if (value >= 20) {
            return -5;
        } else if (value <= 9) {
            return 10;
        } else {
            return 0;
        }
    }

    for (var i = 0; i < textValues.length - 1; i++)
    {
        var xOffset = checkValue(parseInt(textValues[i], 10));
        var currDoc = new TextDocument(textValues[i]);
        sourceTextProp.setValueAtTime(t, currDoc);

        var nextDoc = new TextDocument(textValues[i+1]);
        sourceTextProp.setValueAtTime(t + oneFrame, nextDoc);

        positionProp.setValueAtTime(t - 8 * oneFrame, [ basePos[0] + xOffset, basePos[1] ]);

        var posAtT = [ basePos[0] + xOffset, basePos[1] + 42 ];
        positionProp.setValueAtTime(t, posAtT);

        xOffset = checkValue(parseInt(textValues[i+1], 10));

        var posAtT1 = [ basePos[0] + xOffset, basePos[1] - 22 ];
        positionProp.setValueAtTime(t + oneFrame, posAtT1);

        positionProp.setValueAtTime(t + 7 * oneFrame, [ basePos[0] + xOffset, basePos[1] ]);

        opacityProp.setValueAtTime(t - 2 * oneFrame, 100);
        opacityProp.setValueAtTime(t, 0);
        opacityProp.setValueAtTime(t + oneFrame, 0);
        opacityProp.setValueAtTime(t + 2 * oneFrame, 100);

        t = (t + oneFrame) + (intervals[i] * oneFrame);
    }
        
    var finalDoc = new TextDocument(textValues[textValues.length - 1]);
    sourceTextProp.setValueAtTime(t, finalDoc);

    app.endUndoGroup();
}
