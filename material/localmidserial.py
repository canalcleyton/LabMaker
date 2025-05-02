import serial
import json
import paho.mqtt.client as mqtt
import time

# Configurações
SERIAL_PORT = "COM4"
BAUD_RATE = 9600
MQTT_BROKER = "localhost"
MQTT_PORT = 1883

# Cliente MQTT
##mqtt_client = mqtt.Client(client_id="PythonClient", protocol=mqtt.MQTTv311)  # Usar a versão mais recente
mqtt_client = mqtt.Client(client_id="PythonClient", protocol=mqtt.MQTTv311, 
                          callback_api_version=mqtt.CallbackAPIVersion.VERSION2)
mqtt_client.connect(MQTT_BROKER, MQTT_PORT, 60)

# Conexão serial
ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
print("Lendo dados da porta serial e publicando no MQTT...")

while True:
    try:
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').strip()
            try:
                data = json.loads(line)  # Tenta carregar como JSON
                
                # Obtém o ID do dispositivo do JSON
                device_id = data.get("id", "unknown_device")
                mqtt_topic = f"sensor/dht22/{device_id}"  # Tópico específico para o dispositivo

                # Publicar no MQTT
                mqtt_client.publish(mqtt_topic, json.dumps(data))  # Publica os dados no tópico específico
                print(f"Publicado em {mqtt_topic}: {data}")
            except json.JSONDecodeError:
                print(f"Dado recebido não está em formato JSON: {line}")  # Imprime a linha não-JSON
    except Exception as e:
        print(f"Erro: {e}")
    
    time.sleep(0.1)