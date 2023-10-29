let chart;
// Генерация пастельного цвета
function getRandomPastelColor() {
    const red = Math.round((Math.random() + 1) * 127);
    const green = Math.round((Math.random() + 1) * 127);
    const blue = Math.round((Math.random() + 1) * 127);
    return `rgb(${red}, ${green}, ${blue})`;
}

function loadRegionContent(regionKey) {
    fetch(`${regionKey}.html`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content-area').innerHTML = data;
        });
}

document.addEventListener('DOMContentLoaded', function () {
    chart = Highcharts.mapChart('container', {
        chart: {
            map: 'countries/kh/kh-all'
        },
        tooltip: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        title: {
            text: 'Карта Камбоджи'
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },
        legend: {
            enabled: false
        },
        accessibility: {
            enabled: false
        },
        plotOptions: {
            series: {
                turboThreshold: 5000,
                point: {
                    events: {
                        click: function () {
                            loadRegionContent(this['hc-key']);
                        }
                    }
                }
            }
        },
        series: [{
            data: Highcharts.maps['countries/kh/kh-all'].features.map(region => ({
                'hc-key': region.properties['hc-key'],
                color: getRandomPastelColor()
            })),
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function() {
                    return getTranslation(this.point['hc-key']);
                }
            }
        }]
    });

    // Добавляем список регионов
    const regionsListDiv = document.getElementById('regions-list');
    Highcharts.maps['countries/kh/kh-all'].features.forEach(region => {
        const regionItem = document.createElement('li');
        regionItem.textContent = translations[region.properties['hc-key']] || region.properties.name;
        regionItem.className = 'region-item';
        regionItem.addEventListener('click', function() {
            loadRegionContent(region.properties['hc-key']);
        });
        regionsListDiv.appendChild(regionItem);
    });
});
