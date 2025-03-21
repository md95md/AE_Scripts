// #include "C:/Program Files/Adobe/Adobe After Effects 2025/Support Files/Scripts/Custom/UI_CounterDynamic/Main_DogsUICounter.jsx"

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
var panel1 = group1.add("panel", undefined, "Set value");
panel1.orientation = "column";
panel1.alignChildren = ["left", "top"];
panel1.spacing = 10;
panel1.margins = 10;

// Поле ввода числа
var inputNumber = panel1.add("edittext", undefined, "30");
inputNumber.characters = 5;

// Кнопка "Запуск кода"
var runButton = panel1.add("button", undefined, "Запуск кода");

// Обработчик нажатия кнопки
runButton.onClick = function () {
    var value = parseInt(inputNumber.text, 10);
    if (isNaN(value) || value < 0) {
        alert("Введите корректное число!");
        return;
    }
    createTextLayerDynamicKeys(value);
};

win.layout.layout(true);
if (!(win instanceof Panel)) {
    win.show();
}
