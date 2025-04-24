[
    {
        "id": "1260593154d2b1e8",
        "type": "tab",
        "label": "Fluxo 1",
        "disabled": false,
        "info": "",
        "env": []
    },
    {
        "id": "aab0fb7a5453abb6",
        "type": "mqtt in",
        "z": "1260593154d2b1e8",
        "name": "DHT22 Sensor",
        "topic": "sensor/dht22/#",
        "qos": "0",
        "datatype": "json",
        "broker": "4503e5470c9a9357",
        "nl": false,
        "rap": false,
        "inputs": 0,
        "x": 240,
        "y": 280,
        "wires": [
            [
                "60e053d3a20a6d91"
            ]
        ]
    },
    {
        "id": "60e053d3a20a6d91",
        "type": "function",
        "z": "1260593154d2b1e8",
        "name": "Processar Dados",
        "func": "const temp = msg.payload.temperatura;\nconst hum = msg.payload.umidade;\nconst deviceId = msg.payload.id;\n\n// Validação de dados\nif (temp < -40 || temp > 80 || hum < 0 || hum > 100) {\n    return null;\n}\n\n// Verificação de alertas\nlet status = \"normal\";\nif (temp > 30) status = \"alta_temperatura\";\nif (temp < 10) status = \"baixa_temperatura\";\nif (hum > 80) status = \"alta_umidade\";\nif (hum < 20) status = \"baixa_umidade\";\n\n// Preparar mensagens\nconst tempMsg = { payload: temp, topic: `temperatura/${deviceId}` };\nconst humMsg = { payload: hum, topic: `umidade/${deviceId}` };\nconst statusMsg = { payload: status, topic: `status/${deviceId}` };\n\nreturn [tempMsg, humMsg, statusMsg];",
        "outputs": 3,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 350,
        "y": 180,
        "wires": [
            [
                "49bd41133125a0e8",
                "a46654419336cf4d"
            ],
            [
                "42d3042b901c4d03"
            ],
            [
                "c1bacb45aecc7530"
            ]
        ]
    },
    {
        "id": "49bd41133125a0e8",
        "type": "ui-chart",
        "z": "1260593154d2b1e8",
        "group": "6dc24590df83cb2f",
        "name": "Temperatura",
        "label": "Temperatura (°C)",
        "order": 2,
        "chartType": "line",
        "category": "temp",
        "categoryType": "msg",
        "xAxisLabel": "",
        "xAxisProperty": "",
        "xAxisPropertyType": "timestamp",
        "xAxisType": "time",
        "xAxisFormat": "",
        "xAxisFormatType": "auto",
        "xmin": "",
        "xmax": "",
        "yAxisLabel": "Graus Celsius",
        "yAxisProperty": "",
        "yAxisPropertyType": "msg",
        "ymin": "-15",
        "ymax": "45",
        "bins": "",
        "stackSeries": false,
        "pointRadius": "",
        "showLegend": false,
        "removeOlder": "",
        "removeOlderPoints": "",
        "colors": [
            "#1f77b4",
            "#aec7e8",
            "#ff7f0e",
            "#2ca02c",
            "#98df8a",
            "#ff0000",
            "#ff9896",
            "#9467bd",
            "#c5b0d5"
        ],
        "textColor": [
            "#666666"
        ],
        "textColorDefault": false,
        "gridColor": [
            "#e5e5e5"
        ],
        "gridColorDefault": false,
        "width": "6",
        "height": "6",
        "className": "",
        "interpolation": "linear",
        "x": 650,
        "y": 180,
        "wires": [
            []
        ]
    },
    {
        "id": "42d3042b901c4d03",
        "type": "ui-chart",
        "z": "1260593154d2b1e8",
        "group": "6dc24590df83cb2f",
        "name": "Umidade",
        "label": "Umidade (%)",
        "order": 3,
        "chartType": "line",
        "category": "hum",
        "categoryType": "msg",
        "xAxisLabel": "",
        "xAxisProperty": "",
        "xAxisPropertyType": "timestamp",
        "xAxisType": "time",
        "xAxisFormat": "",
        "xAxisFormatType": "auto",
        "xmin": "",
        "xmax": "",
        "yAxisLabel": "",
        "yAxisProperty": "",
        "yAxisPropertyType": "property",
        "ymin": "",
        "ymax": "",
        "bins": "",
        "stackSeries": false,
        "pointRadius": "",
        "showLegend": false,
        "removeOlder": "",
        "removeOlderPoints": "",
        "colors": [
            "#1f77b4",
            "#aec7e8",
            "#ff7f0e",
            "#2ca02c",
            "#98df8a",
            "#d62728",
            "#ff9896",
            "#9467bd",
            "#c5b0d5"
        ],
        "textColor": [
            "#666666"
        ],
        "textColorDefault": true,
        "gridColor": [
            "#e5e5e5"
        ],
        "gridColorDefault": true,
        "width": "12",
        "height": "6",
        "className": "",
        "interpolation": "linear",
        "x": 620,
        "y": 240,
        "wires": [
            []
        ]
    },
    {
        "id": "c1bacb45aecc7530",
        "type": "switch",
        "z": "1260593154d2b1e8",
        "name": "Verificar Alertas",
        "property": "status",
        "propertyType": "msg",
        "rules": [
            {
                "t": "neq",
                "v": "normal",
                "vt": "str"
            }
        ],
        "repair": false,
        "outputs": 1,
        "x": 460,
        "y": 360,
        "wires": [
            [
                "d1df500fb024069c"
            ]
        ]
    },
    {
        "id": "d1df500fb024069c",
        "type": "ui-notification",
        "z": "1260593154d2b1e8",
        "ui": "4344ffad474cf9f4",
        "colorDefault": false,
        "color": "#000000",
        "displayTime": "",
        "showCountdown": false,
        "outputs": 1,
        "allowDismiss": false,
        "dismissText": "",
        "allowConfirm": false,
        "confirmText": "",
        "raw": false,
        "className": "",
        "name": "Alerta",
        "x": 630,
        "y": 340,
        "wires": [
            []
        ]
    },
    {
        "id": "a46654419336cf4d",
        "type": "ui-gauge",
        "z": "1260593154d2b1e8",
        "name": "Medidor de Temperatura",
        "group": "1ccc457a33169364",
        "order": 2,
        "width": 3,
        "height": 3,
        "gtype": "gauge-34",
        "gstyle": "needle",
        "title": "Medidor de Temperatura",
        "units": "units",
        "icon": "",
        "prefix": "",
        "suffix": "",
        "segments": [
            {
                "from": "0",
                "color": "#5cd65c"
            },
            {
                "from": "4",
                "color": "#ffc800"
            },
            {
                "from": "7",
                "color": "#ea5353"
            }
        ],
        "min": "-15",
        "max": "45",
        "sizeThickness": 16,
        "sizeGap": 4,
        "sizeKeyThickness": 8,
        "styleRounded": true,
        "styleGlow": false,
        "className": "",
        "x": 610,
        "y": 120,
        "wires": []
    },
    {
        "id": "4503e5470c9a9357",
        "type": "mqtt-broker",
        "name": "",
        "broker": "localhost",
        "port": 1883,
        "clientid": "",
        "autoConnect": true,
        "usetls": false,
        "protocolVersion": "3",
        "keepalive": 60,
        "cleansession": true,
        "autoUnsubscribe": true,
        "birthTopic": "sensor/dht22",
        "birthQos": "0",
        "birthRetain": "false",
        "birthPayload": "",
        "birthMsg": {},
        "closeTopic": "",
        "closeQos": "0",
        "closeRetain": "false",
        "closePayload": "",
        "closeMsg": {},
        "willTopic": "",
        "willQos": "0",
        "willRetain": "false",
        "willPayload": "",
        "willMsg": {},
        "userProps": "",
        "sessionExpiry": ""
    },
    {
        "id": "6dc24590df83cb2f",
        "type": "ui-group",
        "name": "Temperatura e Umidade",
        "page": "16627b3330493ab7",
        "width": 6,
        "height": 1,
        "order": 2,
        "showTitle": true,
        "className": "",
        "visible": true,
        "disabled": "false",
        "groupType": "default"
    },
    {
        "id": "4344ffad474cf9f4",
        "type": "ui-base",
        "name": "DHT22",
        "path": "/dashboard",
        "appIcon": "",
        "includeClientData": true,
        "acceptsClientConfig": [
            "ui-notification",
            "ui-control"
        ],
        "showPathInSidebar": false,
        "headerContent": "page",
        "navigationStyle": "default",
        "titleBarStyle": "fixed",
        "showReconnectNotification": true,
        "notificationDisplayTime": 1,
        "showDisconnectNotification": true,
        "allowInstall": true
    },
    {
        "id": "1ccc457a33169364",
        "type": "ui-group",
        "name": "Temperatura",
        "page": "16627b3330493ab7",
        "width": 6,
        "height": 1,
        "order": 1,
        "showTitle": true,
        "className": "",
        "visible": "true",
        "disabled": "false",
        "groupType": "default"
    },
    {
        "id": "16627b3330493ab7",
        "type": "ui-page",
        "name": "Monitor Ambiental",
        "ui": "4344ffad474cf9f4",
        "path": "/page1",
        "icon": "home",
        "layout": "grid",
        "theme": "default",
        "breakpoints": [
            {
                "name": "Default",
                "px": "0",
                "cols": "3"
            },
            {
                "name": "Tablet",
                "px": "576",
                "cols": "6"
            },
            {
                "name": "Small Desktop",
                "px": "768",
                "cols": "9"
            },
            {
                "name": "Desktop",
                "px": "1024",
                "cols": "12"
            }
        ],
        "order": 1,
        "className": "",
        "visible": true,
        "disabled": false
    }
]
