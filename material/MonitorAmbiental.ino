#include <DHT.h>
#include <ArduinoJson.h>
#include <SoftwareSerial.h>

// Definições do sensor DHT22
#define DHTPIN 6          // Pino onde o DHT22 está conectado
#define DHTTYPE DHT22     // Tipo do sensor DHT

DHT dht(DHTPIN, DHTTYPE);

// Definições da porta serial externa
SoftwareSerial extSerial(4, 5); // RX (pino 4), TX (pino 5)

// Intervalo de leitura do sensor (em milissegundos)
const unsigned long READ_INTERVAL = 7000; // Intervalo de leitura (7s)

// Variáveis para controle de tempo
unsigned long lastReadTime = 0;

// Função para inicializar o sistema
void setup() {
    // Inicializa a comunicação serial padrão para depuração (opcional)
    Serial.begin(115200);
    delay(100); // Pequeno delay para estabilizar a comunicação

    // Inicializa a comunicação serial externa (COM3 no SimulIDE)
    extSerial.begin(9600); // Taxa de transmissão ajustada para 9600 bps
    delay(100);

    // Inicializa o sensor DHT
    dht.begin();
    Serial.println("Sistema iniciado. Aguardando leitura de dados...");
    extSerial.println("Sistema iniciado. Aguardando leitura de dados...");
}

// Função para ler dados do sensor e enviar via SoftwareSerial
void readAndSendData() {
    // Lê os dados do sensor DHT22
    float h = dht.readHumidity();
    float t = dht.readTemperature();

    // Verifica se as leituras falharam
    if (isnan(h) || isnan(t)) {
        Serial.println("Falha ao ler do DHT!");
        extSerial.println("Falha ao ler do DHT!");
        return;
    }

    // Cria um documento JSON usando ArduinoJson
    StaticJsonDocument<200> doc;
    doc["temperatura"] = t;
    doc["umidade"] = h;

    // Serializa o JSON em um buffer
    char buffer[200];
    serializeJson(doc, buffer);

    // Envia os dados via SoftwareSerial (COM3 no SimulIDE)
    extSerial.println(buffer);

    // Exibe os dados no monitor serial padrão para depuração (opcional)
    Serial.print("Dados enviados: ");
    Serial.println(buffer);
}

// Função principal de loop
void loop() {
    // Verifica se é hora de ler os dados do sensor
    unsigned long now = millis();
    if (now - lastReadTime >= READ_INTERVAL) {
        lastReadTime = now;
        readAndSendData(); // Lê e envia os dados via SoftwareSerial
    }
}