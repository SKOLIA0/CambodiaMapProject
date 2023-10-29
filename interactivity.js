document.addEventListener('DOMContentLoaded', function () {
    // Функция для подсветки элемента списка при наведении на регион на карте
    function highlightListItem(regionKey, highlight = true) {
        const listItem = document.querySelector(`.region-item[data-key="${regionKey}"]`);
        if (listItem) {
            if (highlight) {
                listItem.classList.add('highlighted');
            } else {
                listItem.classList.remove('highlighted');
            }
        }
    }

    // Функция для подсветки региона на карте при наведении на элемент списка
    function highlightMapRegion(regionKey, highlight = true) {
        const mapRegion = chart.get(regionKey);
        if (mapRegion) {
            if (highlight) {
                mapRegion.setState('hover');
            } else {
                mapRegion.setState('');
            }
        }
    }

    // Добавляем обработчики событий для элементов списка регионов
    const regionItems = document.querySelectorAll('.region-item');
    regionItems.forEach(item => {
        item.addEventListener('mouseover', function() {
            const regionKey = this.dataset.key;
            highlightMapRegion(regionKey);
        });
        item.addEventListener('mouseout', function() {
            const regionKey = this.dataset.key;
            highlightMapRegion(regionKey, false);
        });
    });

    // Добавляем обработчики событий для регионов на карте
    chart.series[0].points.forEach(point => {
        point.on('mouseOver', function() {
            highlightListItem(this['hc-key']);
        });
        point.on('mouseOut', function() {
            highlightListItem(this['hc-key'], false);
        });
    });
});
