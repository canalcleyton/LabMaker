[
    {
        "id": "a0b920b616cfd474",
        "type": "tab",
        "label": "Fluxo 3",
        "disabled": false,
        "info": "",
        "env": []
    },
    {
        "id": "mqtt-in",
        "type": "mqtt in",
        "z": "a0b920b616cfd474",
        "name": "DHT22 Sensor",
        "topic": "sensor/dht22",
        "qos": "0",
        "datatype": "json",
        "broker": "4503e5470c9a9357",
        "nl": false,
        "rap": false,
        "inputs": 0,
        "x": 120,
        "y": 220,
        "wires": [
            [
                "process-node"
            ]
        ]
    },
    {
        "id": "process-node",
        "type": "function",
        "z": "a0b920b616cfd474",
        "name": "Processar Dados",
        "func": "const temp = msg.payload.temperatura;\nconst hum = msg.payload.umidade;\n\n// Validação de dados\nif (temp < -40 || temp > 80 || hum < 0 || hum > 100) {\nreturn null;\n}\n\n// Verificação de alertas\nlet status = \"normal\";\nif (temp > 30) status = \"alta_temperatura\";\nif (temp < 10) status = \"baixa_temperatura\";\nif (hum > 80) status = \"alta_umidade\";\nif (hum < 20) status = \"baixa_umidade\";\n\n// Preparar mensagens\nconst tempMsg = { payload: temp, topic: \"temperatura\" };\nconst humMsg = { payload: hum, topic: \"umidade\" };\nconst statusMsg = { payload: status, topic: \"status\" };\n\nreturn [tempMsg, humMsg, statusMsg];",
        "outputs": 3,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 230,
        "y": 120,
        "wires": [
            [
                "chart-temp",
                "ceb6f96acc930456"
            ],
            [
                "chart-hum"
            ],
            [
                "alert-node"
            ]
        ]
    },
    {
        "id": "chart-temp",
        "type": "ui-chart",
        "z": "a0b920b616cfd474",
        "group": "6dc24590df83cb2f",
        "name": "Temperatura",
        "label": "Temperatura (°C)",
        "order": 1,
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
        "x": 530,
        "y": 120,
        "wires": [
            []
        ]
    },
    {
        "id": "chart-hum",
        "type": "ui-chart",
        "z": "a0b920b616cfd474",
        "group": "6dc24590df83cb2f",
        "name": "Umidade",
        "label": "Umidade (%)",
        "order": 2,
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
        "x": 500,
        "y": 180,
        "wires": [
            []
        ]
    },
    {
        "id": "alert-node",
        "type": "switch",
        "z": "a0b920b616cfd474",
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
        "x": 340,
        "y": 300,
        "wires": [
            [
                "notification"
            ]
        ]
    },
    {
        "id": "notification",
        "type": "ui-notification",
        "z": "a0b920b616cfd474",
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
        "x": 510,
        "y": 280,
        "wires": [
            []
        ]
    },
    {
        "id": "ceb6f96acc930456",
        "type": "ui-gauge",
        "z": "a0b920b616cfd474",
        "name": "Medidor de Temperatura",
        "group": "1ccc457a33169364",
        "order": 1,
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
        "x": 490,
        "y": 60,
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
