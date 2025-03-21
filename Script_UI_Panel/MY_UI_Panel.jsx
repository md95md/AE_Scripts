function createDockableUI(thisObj) {
    var dialog =
        thisObj instanceof Panel
            ? thisObj
            : new Window("palette", "My Panel", undefined, { resizable: true }); // исправлено "resizable"

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

// Группа элементов
var group1 = win.add("group", undefined);
group1.orientation = "row";
group1.alignChildren = ["left", "center"];
group1.spacing = 10;
group1.margins = 0;

// Панель внутри группы
var panel1 = group1.add("panel", undefined, "Set value");
panel1.orientation = "column";
panel1.alignChildren = ["left", "top"];
panel1.spacing = 50;
panel1.margins = 50;

// Важно! Обновляем макет перед показом
win.layout.layout(true);

// Показываем окно (только если это не `Panel`)
if (!(win instanceof Panel)) {
    win.show();
}
