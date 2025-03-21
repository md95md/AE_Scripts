#include "C:/Program Files/Adobe/Adobe After Effects 2025/Support Files/Scripts/UI_CounterDynamic/Main_DogsUICounter.jsx"

function createDockableUI(thisObj) {
    var dialog =
        thisObj instanceof Panel
            ? thisObj
            : new Window("palette", "My Panel", undefined, { resizable: true });

    dialog.onResizing = dialog.onResize = function () {
        this.layout.resize();
    };

    return dialog;
}

function showWindow(myWindow) {
    if (myWindow instanceof Window) {
        myWindow.center();
        myWindow.show();
    }

    if (myWindow instanceof Panel) {
        myWindow.layout.layout(true);
        myWindow.layout.resize();
    }
}

// Создаём UI окно
var win = createDockableUI(this);
win.text = "Name";
win.preferredSize.width = 512;
win.preferredSize.height = 512;
win.orientation = "column";
win.alignChildren = ["center", "top"];
win.spacing = 10;
win.margins = 16;

// Статичный текст
var statictext1 = win.add("statictext", undefined, "How many dogs to find?");

// Группа для поля ввода и кнопки
var group1 = win.add("group", undefined);
group1.orientation = "row";
group1.alignChildren = ["left", "center"];
group1.spacing = 10;
group1.margins = 0;

// Панель ввода числа
var panel1 = group1.add("panel", undefined, "Choose comp UI");
panel1.orientation = "column";
panel1.alignChildren = ["left", "top"];
panel1.spacing = 20;
panel1.margins = 40;

// Поле ввода числа
var inputNumber = panel1.add("edittext", undefined, "30");
inputNumber.characters = 5;

var splitButton = panel1.add("button", undefined, "Shift dogs layers");

splitButton.onClick = function () {
    var value = parseInt(inputNumber.text, 10);
    if (isNaN(value) || value <= 0) {
        alert("Введите корректное число!");
        return;
    }

    SetLayersIntervals(value); //вызываем внешнюю функцию
};

// Кнопка "Запуск кода"
var runButton = panel1.add("button", undefined, "Run");

// Обработчик нажатия кнопки
runButton.onClick = function () {
    var value = parseInt(inputNumber.text, 10);
    if (isNaN(value) || value < 0) {
        alert("Введите корректное число!");
        return;
    }


    // Теперь вызываем скрипты только после нажатия
    createTextLayerDynamicKeys(value);
    createMarkersLayer(value);
};


// ===== Группа 2 =====
var statictext2 = win.add("statictext", undefined, "Reverse numbers:");

var group2 = win.add("group", undefined);
group2.orientation = "row";
group2.alignChildren = ["left", "center"];
group2.spacing = 10;
group2.margins = 0;

var panel2 = group2.add("panel", undefined, "Choose comp Title_N_Dogs");
panel2.orientation = "column";
panel2.alignChildren = ["left", "top"];
panel2.spacing = 20;
panel2.margins = 40;

var inputNumberReverse = panel2.add("edittext", undefined, "30");
inputNumberReverse.characters = 5;

var runButtonReverse = panel2.add("button", undefined, "Run (reverse numbers)");
runButtonReverse.onClick = function () {
    var value = parseInt(inputNumberReverse.text, 10);
    if (isNaN(value) || value < 0) {
        alert("Введите корректное число!");
        return;
    }

    createTextLayerReverseKeys(value);
    createMarkersLayer(value);
};


win.layout.layout(true);
if (!(win instanceof Panel)) {
    win.show();
}
