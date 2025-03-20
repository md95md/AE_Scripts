function copyPositionsFlex() {
    var comp = app.project.activeItem;
    if (!(comp instanceof CompItem)) {
        alert("Сначала откройте композицию в окне Timeline.");
        return;
    }

    var selectedLayers = comp.selectedLayers;
    var totalLayers = selectedLayers.length;

    // Проверяем, что слоёв минимум 2 и общее количество – чётное
    if (totalLayers < 2 || (totalLayers % 2 !== 0)) {
        alert("Необходимо выбрать чётное количество слоёв (хотя бы 2).");
        return;
    }

    // Сколько слоёв пойдёт в каждую группу
    var half = totalLayers / 2;

    // Разбиваем выбранные слои на две группы
    var groupA = [];
    var groupB = [];

    for (var i = 0; i < half; i++) {
        groupA.push(selectedLayers[i]);
    }
    for (var j = half; j < totalLayers; j++) {
        groupB.push(selectedLayers[j]);
    }

    // Копируем Position
    for (var k = 0; k < half; k++) {
        var posA = groupA[k].property("Position").value;
        groupB[k].property("Position").setValue(posA);
    }

    alert("Позиции успешно скопированы!\n" +
          "Скопировано: " + half + " пар слоёв.");
}

// Запускаем сразу
copyPositionsFlex();
