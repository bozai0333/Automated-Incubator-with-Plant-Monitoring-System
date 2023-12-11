var ctx1 = $("#temperatureChart").get(0).getContext("2d");
var myChart1 = new Chart(ctx1, {
  type: "line",
  data: {
    labels: [], // Data labels will be populated dynamically
    datasets: [
      {
        label: "Temperature (°C)",
        data: [], // Data will be fetched and updated
        backgroundColor: "rgba(0, 156, 255, .5)",
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        min: 0, // Set the minimum y-axis value to 0
        max: 100, // Set the maximum y-axis value to 100
      },
    },
  },
});

var ctx2 = $("#humidityChart").get(0).getContext("2d");
var myChart2 = new Chart(ctx2, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Humidity (%)",
        data: [],
        backgroundColor: "rgba(0, 156, 255, .5)",
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 100,
      },
    },
  },
});

var ctx3 = $("#MoistureChart").get(0).getContext("2d");
var myChart3 = new Chart(ctx3, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Humidity (%)",
        data: [],
        backgroundColor: "rgba(0, 156, 255, .5)",
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 100,
      },
    },
  },
});

// var ctx4 = $("#MoistureChart2").get(0).getContext("2d");
// var myChart4 = new Chart(ctx4, {
//   type: "line",
//   data: {
//     labels: [],
//     datasets: [
//       {
//         label: "Humidity (%)",
//         data: [],
//         backgroundColor: "rgba(0, 156, 255, .5)",
//         fill: false,
//       },
//     ],
//   },
//   options: {
//     responsive: true,
//     scales: {
//       y: {
//         min: 0,
//         max: 100,
//       },
//     },
//   },
// });


//intake fan chart
var ctx6 = $("#intakeFanChart").get(0).getContext("2d");
var myChart6 = new Chart(ctx6, {
  type: "line",
  data: {
    labels: [], // Data labels will be populated dynamically
    datasets: [
      {
        label: "Fan Speed (rpm)",
        data: [], // Data will be fetched and updated
        backgroundColor: "rgba(0, 156, 255, .5)",
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        min: 0, // Set the minimum y-axis value to 0
        max: 1700, // Set the maximum y-axis value to 100
      },
    },
  },
});

//Exhuast fan chart
var ctx7 = $("#exhaustFanChart").get(0).getContext("2d");
var myChart7 = new Chart(ctx7, {
  type: "line",
  data: {
    labels: [], // Data labels will be populated dynamically
    datasets: [
      {
        label: "Fan Speed (rpm)",
        data: [], // Data will be fetched and updated
        backgroundColor: "rgba(0, 156, 255, .5)",
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        min: 0, // Set the minimum y-axis value to 0
        max: 1700, // Set the maximum y-axis value to 100
      },
    },
  },
});

//External temperature and humidity chart
var ctx8 = $("#exTemperatureChart").get(0).getContext("2d");
var myChart8 = new Chart(ctx8, {
  type: "line",
  data: {
    labels: [], // Data labels will be populated dynamically
    datasets: [
      {
        label: "External Temperature (°C)",
        data: [], // Data will be fetched and updated
        backgroundColor: "rgba(0, 156, 255, .5)",
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        min: 0, // Set the minimum y-axis value to 0
        max: 100, // Set the maximum y-axis value to 100
      },
    },
  },
});

var ctx9 = $("#exHumidityChart").get(0).getContext("2d");
var myChart9 = new Chart(ctx9, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "External Humidity (%)",
        data: [],
        backgroundColor: "rgba(0, 156, 255, .5)",
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 100,
      },
    },
  },
});

//EC and pH chart
var ctx10 = $("#ECchart").get(0).getContext("2d");
var myChart10 = new Chart(ctx10, {
  type: "line",
  data: {
    labels: [], // Data labels will be populated dynamically
    datasets: [
      {
        label: "Electrical conductivity (ppm)",
        data: [], // Data will be fetched and updated
        backgroundColor: "rgba(0, 156, 255, .5)",
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        min: 0, // Set the minimum y-axis value to 0
        max: 1000, // Set the maximum y-axis value to 5
      },
    },
  },
});

var ctx11 = $("#PHchart").get(0).getContext("2d");
var myChart11 = new Chart(ctx11, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "pH",
        data: [],
        backgroundColor: "rgba(0, 156, 255, .5)",
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 14,
      },
    },
  },
});



// Function to fetch and update data for myChart
function updateMyChart1() {
  // Make an AJAX request to fetch temperature data from the database
  fetch("/api/sensors?sensor_id=dht22_1")
    .then((response) => response.json())
    .then((data) => {
      var timestamps = data.map((item) => {
        var date = new Date(item.timestamp);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var formattedTime =
          hours.toString().padStart(2, "0") +
          ":" +
          minutes.toString().padStart(2, "0") +
          ":" +
          seconds.toString().padStart(2, "0");
        return formattedTime;
      });

      var temperatureData = data.map((item) => item.readings.temperature);

      // Reverse the arrays to display the latest readings on the right side
      timestamps = timestamps.reverse();
      temperatureData = temperatureData.reverse();

      // Update the chart with the new data
      myChart1.data.labels = timestamps;
      myChart1.data.datasets[0].data = temperatureData;
      myChart1.update();
    })
    .catch((error) => console.error(error));
}

function updateMyChart2() {
  fetch("/api/sensors?sensor_id=dht22_1")
    .then((response) => response.json())
    .then((data) => {
      var timestamps = data.map((item) => {
        var date = new Date(item.timestamp);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var formattedTime =
          hours.toString().padStart(2, "0") +
          ":" +
          minutes.toString().padStart(2, "0") +
          ":" +
          seconds.toString().padStart(2, "0");
        return formattedTime;
      });

      var humidityData = data.map((item) => item.readings.humidity);


      timestamps = timestamps.reverse();
      humidityData = humidityData.reverse();

      myChart2.data.labels = timestamps;
      myChart2.data.datasets[0].data = humidityData;
      myChart2.update();
    })
    .catch((error) => console.error(error));
}

function updateMyChart3() {
  fetch("/api/sensors?sensor_id=cMoistureSensor")
    .then((response) => response.json())
    .then((data) => {
      var timestamps = data.map((item) => {
        var date = new Date(item.timestamp);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var formattedTime =
          hours.toString().padStart(2, "0") +
          ":" +
          minutes.toString().padStart(2, "0") +
          ":" +
          seconds.toString().padStart(2, "0");
        return formattedTime;
      });

      var soil_humidity_data = data.map(
        (item) => item.readings.soil_moisture_1
      );


      timestamps = timestamps.reverse();
      soil_humidity_data = soil_humidity_data.reverse();

      myChart3.data.labels = timestamps;
      myChart3.data.datasets[0].data = soil_humidity_data;
      myChart3.update();
    })
    .catch((error) => console.error(error));
}

// function updateMyChart4() {
//   fetch("/api/sensors?sensor_id=cMoistureSensor")
//     .then((response) => response.json())
//     .then((data) => {
//       var timestamps = data.map((item) => {
//         var date = new Date(item.timestamp);
//         var hours = date.getHours();
//         var minutes = date.getMinutes();
//         var seconds = date.getSeconds();
//         var formattedTime =
//           hours.toString().padStart(2, "0") +
//           ":" +
//           minutes.toString().padStart(2, "0") +
//           ":" +
//           seconds.toString().padStart(2, "0");
//         return formattedTime;
//       });

//       var soil_humidity_data = data.map(
//         (item) => item.readings.soil_moisture_2
//       );


//       timestamps = timestamps.reverse();
//       soil_humidity_data = soil_humidity_data.reverse();

//       // Update the chart with the new data
//       myChart4.data.labels = timestamps;
//       myChart4.data.datasets[0].data = soil_humidity_data;
//       myChart4.update();
//     })
//     .catch((error) => console.error(error));
// }

function updateMyChart5() {
  fetch("/api/sensors?sensor_id=cMoistureSensor")
    .then((response) => response.json())
    .then((data) => {
      var timestamps = data.map((item) => {
        var date = new Date(item.timestamp);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var formattedTime =
          hours.toString().padStart(2, "0") +
          ":" +
          minutes.toString().padStart(2, "0") +
          ":" +
          seconds.toString().padStart(2, "0");
        return formattedTime;
      });

      var soil_humidity_data = data.map(
        (item) => item.readings.soil_moisture_3
      );


      timestamps = timestamps.reverse();
      soil_humidity_data = soil_humidity_data.reverse();

      // Update the chart with the new data
      myChart5.data.labels = timestamps;
      myChart5.data.datasets[0].data = soil_humidity_data;
      myChart5.update();
    })
    .catch((error) => console.error(error));
}

function updateMyChart6() {
  fetch("/api/sensors?sensor_id=c_fan_speed")
    .then((response) => response.json())
    .then((data) => {
      var timestamps = data.map((item) => {
        var date = new Date(item.timestamp);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var formattedTime =
          hours.toString().padStart(2, "0") +
          ":" +
          minutes.toString().padStart(2, "0") +
          ":" +
          seconds.toString().padStart(2, "0");
        return formattedTime;
      });

      var intake_fan_data = data.map((item) => item.inspeed);


      timestamps = timestamps.reverse();
      intake_fan_data = intake_fan_data.reverse();

      // Update the chart with the new data
      myChart6.data.labels = timestamps;
      myChart6.data.datasets[0].data = intake_fan_data;
      myChart6.update();
    })
    .catch((error) => console.error(error));
}

//GET Exhaust fan chart data
function updateMyChart7() {
  fetch("/api/sensors?sensor_id=c_fan_speed")
    .then((response) => response.json())
    .then((data) => {
      var timestamps = data.map((item) => {
        var date = new Date(item.timestamp);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var formattedTime =
          hours.toString().padStart(2, "0") +
          ":" +
          minutes.toString().padStart(2, "0") +
          ":" +
          seconds.toString().padStart(2, "0");
        return formattedTime;
      });

      var exhaust_fan_data = data.map((item) => item.exspeed);


      timestamps = timestamps.reverse();
      exhaust_fan_data = exhaust_fan_data.reverse();

      // Update the chart with the new data
      myChart7.data.labels = timestamps;
      myChart7.data.datasets[0].data = exhaust_fan_data;
      myChart7.update();
    })
    .catch((error) => console.error(error));
}

function updateMyChart8() {
  // Make an AJAX request to fetch temperature data from the database
  fetch("/api/sensors?sensor_id=dht22_2")
    .then((response) => response.json())
    .then((data) => {
      var timestamps = data.map((item) => {
        var date = new Date(item.timestamp);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var formattedTime =
          hours.toString().padStart(2, "0") +
          ":" +
          minutes.toString().padStart(2, "0") +
          ":" +
          seconds.toString().padStart(2, "0");
        return formattedTime;
      });

      var extemperatureData = data.map((item) => item.readings.temperature);


      // Reverse the arrays to display the latest readings on the right side
      timestamps = timestamps.reverse();
      extemperatureData = extemperatureData.reverse();

      // Update the chart with the new data
      myChart8.data.labels = timestamps;
      myChart8.data.datasets[0].data = extemperatureData;
      myChart8.update();
    })
    .catch((error) => console.error(error));
}

function updateMyChart9() {
  fetch("/api/sensors?sensor_id=dht22_2")
    .then((response) => response.json())
    .then((data) => {
      var timestamps = data.map((item) => {
        var date = new Date(item.timestamp);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var formattedTime =
          hours.toString().padStart(2, "0") +
          ":" +
          minutes.toString().padStart(2, "0") +
          ":" +
          seconds.toString().padStart(2, "0");
        return formattedTime;
      });

      var exhumidityData = data.map((item) => item.readings.humidity);


      timestamps = timestamps.reverse();
      exhumidityData = exhumidityData.reverse();

      myChart9.data.labels = timestamps;
      myChart9.data.datasets[0].data = exhumidityData;
      myChart9.update();
    })
    .catch((error) => console.error(error));
}

function updateMyChart10() {
  fetch("/api/sensors?sensor_id=ec_sensor")
    .then((response) => response.json())
    .then((data) => {
      var timestamps = data.map((item) => {
        var date = new Date(item.timestamp);
        // var day = date.getDate();
        // var month = date.getMonth() + 1;
        // var formattedTime =
        //   day.toString().padStart(2, "0") +
        //   "/" +
        //   month.toString().padStart(2, "0");
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var formattedTime =
          hours.toString().padStart(2, "0") +
          ":" +
          minutes.toString().padStart(2, "0") +
          ":" +
          seconds.toString().padStart(2, "0");
        return formattedTime;
      });

      var ecValue = data.map((item) => item.ec);


      timestamps = timestamps.reverse();
      ecValue = ecValue.reverse();

      //debugging purpose only
      console.log(timestamps);
      console.log(ecValue);

      myChart10.data.labels = timestamps;
      myChart10.data.datasets[0].data = ecValue;
      myChart10.update();
    })
    .catch((error) => console.error(error));
}

//Chart 11-15 average temp and humidity charts function
function updateMyChart11() {
  fetch("/api/sensors?sensor_id=ph_sensor")
    .then((response) => response.json())
    .then((data) => {
      var timestamps = data.map((item) => {
        var date = new Date(item.timestamp);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var formattedTime =
          hours.toString().padStart(2, "0") +
          ":" +
          minutes.toString().padStart(2, "0") +
          ":" +
          seconds.toString().padStart(2, "0");
        return formattedTime;
      });

      var phValue = data.map((item) => item.ph);


      timestamps = timestamps.reverse();
      phValue = phValue.reverse();

      //debugging purpose only
      console.log(timestamps);
      console.log(phValue);

      myChart11.data.labels = timestamps;
      myChart11.data.datasets[0].data = phValue;
      myChart11.update();
    })
    .catch((error) => console.error(error));
}



// Periodically update all charts
setInterval(updateMyChart1, 60000);
setInterval(updateMyChart2, 60000);
setInterval(updateMyChart3, 60000);
// setInterval(updateMyChart4, 60000);
// setInterval(updateMyChart5, 60000);
setInterval(updateMyChart6, 60000);
setInterval(updateMyChart7, 60000);
setInterval(updateMyChart8, 60000);
setInterval(updateMyChart9, 60000);
setInterval(updateMyChart10, 60000);
setInterval(updateMyChart11, 60000);


// Initial data fetch and chart update
updateMyChart1();
updateMyChart2();
updateMyChart3();
// updateMyChart4();
// updateMyChart5();
updateMyChart6();
updateMyChart7();
updateMyChart8();
updateMyChart9();
updateMyChart10();
updateMyChart11();
