[
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
        "id": "4503e5470c9a9357",
        "type": "mqtt-broker",
        "name": "",
        "broker": "200.129.151.72",
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
        "birthPayload": "{\"temperatura\":22.5,\"umidade\":68.5}",
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
    }
]
