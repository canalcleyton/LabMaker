import serial
import json
import paho.mqtt.client as mqtt
import time

# Configurações
SERIAL_PORT = "COM4"
BAUD_RATE = 9600
MQTT_BROKER = "172.31.64.117"
MQTT_PORT = 1883
MQTT_TOPIC = "sensor/dht22"

# Cliente MQTT
mqtt_client = mqtt.Client(client_id="PythonClient")
mqtt_client.connect(MQTT_BROKER, MQTT_PORT, 60)

# Conexão serial
ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
print("Lendo dados da porta serial e publicando no MQTT...")

while True:
    try:
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').strip()
            data = json.loads(line)
            
            # Publicar no MQTT
            mqtt_client.publish(MQTT_TOPIC, line)  # A variável correta é mqtt_client
            print(f"Publicado: {data}")
    except Exception as e:
        print(f"Erro: {e}")
    
    time.sleep(0.1)