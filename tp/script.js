// Simulation de données aléatoires pour la station météo
function generateRandomWeatherData() {
  const temperature = (Math.random() * 40 - 10).toFixed(1); // Température entre -10°C et 30°C
  const humidity = Math.floor(Math.random() * 100); // Humidité entre 0% et 100%
  const pressure = (Math.random() * 1000 + 900).toFixed(1); // Pression entre 900 hPa et 1100 hPa

  document.getElementById('temperature').innerText = temperature;
  document.getElementById('humidity').innerText = humidity;
  document.getElementById('pressure').innerText = pressure;

  updateCharts(temperature, humidity, pressure);
}

// Fonction pour mettre à jour les graphiques
function updateCharts(temperature, humidity, pressure) {
  const timeNow = new Date().toLocaleTimeString();

  updateChart(temperatureChart, timeNow, temperature);
  updateChart(humidityChart, timeNow, humidity);
  updateChart(pressureChart, timeNow, pressure);
}

// Fonction pour mettre à jour un graphique spécifique
function updateChart(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets[0].data.push(data);
  chart.update();
}

// Création des graphiques pour la température, l'humidité et la pression atmosphérique
const temperatureCtx = document.getElementById('temperatureChart').getContext('2d');
const humidityCtx = document.getElementById('humidityChart').getContext('2d');
const pressureCtx = document.getElementById('pressureChart').getContext('2d');

const temperatureChart = new Chart(temperatureCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Température (°C)',
      data: [],
      borderColor: 'red',
      borderWidth: 1,
      fill: false
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10
        }
      }
    }
  }
});

const humidityChart = new Chart(humidityCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Humidité (%)',
      data: [],
      borderColor: 'blue',
      borderWidth: 1,
      fill: false
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10
        }
      }
    }
  }
});

const pressureChart = new Chart(pressureCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Pression Atmosphérique (hPa)',
      data: [],
      borderColor: 'green',
      borderWidth: 1,
      fill: false
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10
        }
      }
    }
  }
});

function calculateAverage(dataArray) {
  const filteredData = dataArray.filter(value => !isNaN(value));
  if (filteredData.length === 0) {
    return 0;
  }
  const sum = filteredData.reduce((acc, value) => acc + value, 0);
  return (sum / filteredData.length).toFixed(2);
}

document.getElementById('chart-container').style.display = 'none';

function showTemperatureChart() {
  document.getElementById('temperatureChart').style.display = 'block';
  document.getElementById('humidityChart').style.display = 'none';
  document.getElementById('pressureChart').style.display = 'none';
  document.getElementById('chart-container').style.display = 'block';
}

function showHumidityChart() {
  document.getElementById('temperatureChart').style.display = 'none';
  document.getElementById('humidityChart').style.display = 'block';
  document.getElementById('pressureChart').style.display = 'none';
  document.getElementById('chart-container').style.display = 'block';
}

function showPressureChart() {
  document.getElementById('temperatureChart').style.display = 'none';
  document.getElementById('humidityChart').style.display = 'none';
  document.getElementById('pressureChart').style.display = 'block';
  document.getElementById('chart-container').style.display = 'block';
}

function closeCharts() {
  document.getElementById('temperatureChart').style.display = 'none';
  document.getElementById('humidityChart').style.display = 'none';
  document.getElementById('pressureChart').style.display = 'none';
  document.getElementById('chart-container').style.display = 'none';
}

function showAverage() {
  const temperatureData = temperatureChart.data.datasets[0].data.map(value => parseFloat(value));
  const humidityData = humidityChart.data.datasets[0].data.map(value => parseFloat(value));
  const pressureData = pressureChart.data.datasets[0].data.map(value => parseFloat(value));

  const temperatureAverage = calculateAverage(temperatureData);
  const humidityAverage = calculateAverage(humidityData);
  const pressureAverage = calculateAverage(pressureData);

 alert(`Moyenne - Température: ${temperatureAverage} °C,\n Humidité: ${humidityAverage}%,\n Pression: ${pressureAverage} hPa`);
}

// Appel de la fonction pour générer des données aléatoires toutes les 5 secondes (à titre d'exemple)
setInterval(generateRandomWeatherData, 5000); // Toutes les 5 secondes
