/* 
  MasterPanel.jsx
  Сохраните в Scripts/ScriptUI Panels
*/

#target "aftereffects"
#targetengine "session"

// Пример: подключим общий файл с массивом intervals (если нужно)
#include "../My_Libs/IntervalsLibs.jsx"

// Также можно подключить конкретные скрипты (или функции) 
// (Будьте внимательны к путям! Может понадобиться "../" или "./" и т.п.)
#include "../Countdown_Title/CreateNullLayer.jsx"
#include "../Countdown_Title/CreateTextLayer.jsx"
// ... и т.д.

// Функция, создающая панель
function buildMasterPanel(thisObj) {
    var myPanel = (thisObj instanceof Panel)
        ? thisObj
        : new Window("palette", "AE Master Panel", undefined, {resizeable:true});

    // Группируем элементы в главный контейнер
    myPanel.orientation = "column";
    myPanel.alignChildren = ["fill", "top"];

    // ------------------------------
    // Пример: блок (группа) для Countdown_Title
    // ------------------------------
    var grpCountdown = myPanel.add("panel", undefined, "Countdown Title");
    grpCountdown.orientation = "column";
    grpCountdown.alignChildren = ["fill", "top"];

    var btnCreateNull = grpCountdown.add("button", undefined, "Create Null Layer");
    btnCreateNull.onClick = function() {
        // Вызов функции из подключённого скрипта CreateNullLayer.jsx
        // Предположим, там объявлена функция createNullLayer()
        if (typeof createNullLayer === "function") {
            createNullLayer();
        } else {
            alert("Функция createNullLayer() не найдена.");
        }
    };

    var btnCreateText = grpCountdown.add("button", undefined, "Create Text Layer");
    btnCreateText.onClick = function() {
        // Предположим, в CreateTextLayer.jsx есть функция createTextLayerDynamicKeys
        if (typeof createTextLayerDynamicKeys === "function") {
            createTextLayerDynamicKeys();
        } else {
            alert("Функция createTextLayerDynamicKeys() не найдена.");
        }
    };

    // ------------------------------
    // Пример: блок (группа) для Set Layers Intervals
    // ------------------------------
    var grpSetIntervals = myPanel.add("panel", undefined, "Set Layers Intervals");
    grpSetIntervals.orientation = "column";
    grpSetIntervals.alignChildren = ["fill", "top"];

    // Допустим, вы хотите поле ввода fps, или сколько-то
    var fpsGroup = grpSetIntervals.add("group");
    fpsGroup.add("statictext", undefined, "FPS:");
    var fpsEdit = fpsGroup.add("edittext", undefined, "29.97");
    fpsEdit.characters = 5; // ширина поля

    var btnSetIntervals = grpSetIntervals.add("button", undefined, "Set Intervals");
    btnSetIntervals.onClick = function() {
        // Например, в Set_Layers_Intervals.jsx у вас есть функция applyIntervals
        var fpsValue = parseFloat(fpsEdit.text);
        if (isNaN(fpsValue)) {
            alert("Некорректное значение FPS.");
            return;
        }
        // Вызываем функцию, передаём параметр, если нужно
        if (typeof applyIntervals === "function") {
            applyIntervals(fpsValue);
        } else {
            alert("Функция applyIntervals() не найдена.");
        }
    };

    // ------------------------------
    // И т.д. – для других групп/скриптов
    // ------------------------------

    // Важно: если это панель (Panel), просто возвращаем, 
    // если окно (Window), показываем
    if (myPanel instanceof Window) {
        myPanel.center();
        myPanel.show();
    }
    return myPanel;
}

// Автоматический запуск при загрузке (для панели)
var masterPanelRef = buildMasterPanel(this);
