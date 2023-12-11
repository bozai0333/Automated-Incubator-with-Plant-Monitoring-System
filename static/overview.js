var storedAvgExternalTemp = {}; // Globally scoped object
var storedAvgExternalHumidity = {}; // Globally scoped object

//Filter NaN values and 0 from array
function removeElementsWithValue(arr, val) {
  var i = arr.length;
  while (i--) {
    if (arr[i] === val || isNaN(arr[i])) {
      arr.splice(i, 1);
    }
  }
  return arr;
}

function updateAverageExternalTempReading() {
  fetch("/api/average_reading?sensor_id=dht22_2")
    .then((response) => response.json())
    .then((data) => {
      //Average Temperature
      var exTemperatureData = data.map((item) =>
        item.readings.temperature.toFixed(2)
      );
      console.log(exTemperatureData);
      exnumbers = exTemperatureData.map(Number);
      filtered_ex_temp_data = removeElementsWithValue(exnumbers, 0);
      console.log(filtered_ex_temp_data);
      const ex_sum = filtered_ex_temp_data.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);
      console.log(ex_sum.toFixed(2));
      console.log(filtered_ex_temp_data.length);
      console.log(ex_sum / filtered_ex_temp_data.length);
      // var averageExTemperature = ex_sum / filtered_ex_temp_data.length;
      storedAvgExternalTemp.averageExTemperature =
        ex_sum / filtered_ex_temp_data.length; // Store the value in storedAvgExternalTemp

      // Update the <span> element with the new average value
      document.getElementById("average-ex-temperature-reading").textContent =
        storedAvgExternalTemp.averageExTemperature.toFixed(2) + "°C";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Define a function to fetch and update the average value
function updateAverageTempReading() {
  fetch("/api/average_reading?sensor_id=dht22_1")
    .then((response) => response.json())
    .then((data) => {
      //Average Temperature
      var temperatureData = data.map((item) =>
        item.readings.temperature.toFixed(2)
      );
      console.log(temperatureData);
      numbers = temperatureData.map(Number);
      filtered_temp_data = removeElementsWithValue(numbers, 0);
      console.log(filtered_temp_data);
      const sum = filtered_temp_data.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);
      console.log(sum.toFixed(2));
      console.log(filtered_temp_data.length);
      console.log(sum / filtered_temp_data.length);
      var averageTemperature = sum / filtered_temp_data.length;
      console.log(storedAvgExternalTemp.averageExTemperature);

      // Update the <span> element with the new average value
      document.getElementById("average-temperature-reading").textContent =
        averageTemperature.toFixed(2) + "°C";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function updateAverageExternalHumidityReading() {
  fetch("/api/average_reading?sensor_id=dht22_2")
    .then((response) => response.json())
    .then((data) => {
      //Average Humidity
      var exHumidityData = data.map((item) =>
        item.readings.humidity.toFixed(2)
      );
      ex_humidity_numbers = exHumidityData.map(Number);
      filtered_ex_humidity_data = removeElementsWithValue(
        ex_humidity_numbers,
        0
      );
      console.log(filtered_ex_humidity_data);
      console.log(filtered_ex_humidity_data.length);

      const exHumiditySum = filtered_ex_humidity_data.reduce(
        (accumulator, value) => {
          return accumulator + value;
        },
        0
      );
      console.log(exHumiditySum.toFixed(2));
      console.log(exHumiditySum / filtered_ex_humidity_data.length);
      // var averageExHumidity = exHumiditySum / filtered_ex_humidity_data.length;
      storedAvgExternalHumidity.averageExHumidity =
        exHumiditySum / filtered_ex_humidity_data.length;
      // Update the <span> element with the new average value
      document.getElementById("average-ex-humidity-reading").textContent =
        storedAvgExternalHumidity.averageExHumidity.toFixed(2) + "%";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function updateAverageHumidityReading() {
  fetch("/api/average_reading?sensor_id=dht22_1")
    .then((response) => response.json())
    .then((data) => {
      //Average Humidity
      var humidityData = data.map((item) => item.readings.humidity.toFixed(2));
      humidity_numbers = humidityData.map(Number);
      filtered_humidity_data = removeElementsWithValue(humidity_numbers, 0);
      console.log(filtered_humidity_data);
      console.log(filtered_humidity_data.length);

      const humiditySum = filtered_humidity_data.reduce(
        (accumulator, value) => {
          return accumulator + value;
        },
        0
      );
      console.log(humiditySum.toFixed(2));
      console.log(humiditySum / filtered_humidity_data.length);
      var averageHumidity = humiditySum / filtered_humidity_data.length;

      // Update the <span> element with the new average value
      document.getElementById("average-humidity-reading").textContent =
        averageHumidity.toFixed(2) + "%";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function updateAveragephReading() {
  fetch("/api/sensors?sensor_id=latest_ph")
    .then((response) => response.json())
    .then((data) => {
      //Average pH
      var phData = data.map((item) => item.value);
      console.log(phData);
      const twodp_ph = phData.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);
      final_twodp_ph = twodp_ph.toFixed(2);
      // Update the <span> element with the new average value
      document.getElementById("average-ph-reading").textContent =
        final_twodp_ph;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function updateAverageecReading() {
  fetch("/api/sensors?sensor_id=latest_ec")
    .then((response) => response.json())
    .then((data) => {
      //Average pH
      var ecData = data.map((item) => item.value);
      console.log(ecData);

      // Update the <span> element with the new average value
      document.getElementById("average-ec-reading").textContent =
        ecData + "ppm";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//Test button
let timeout; // Variable to store the timeout reference
// const qualityTestLimit = 20;

// function readQualityTestUpTime() {
//   let buttonpressedtime; // Declare buttonpressedtime variable

//   // Fetch latest start button pressed time
//   fetch(`/get_start_button_pressed_time/6558cdfb3f9e48b6f5d99c23`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data.button_pressed_time);

//       buttonpressedtime = data.button_pressed_time.toString().substring(0, 10); // Assign button pressed time here


//       console.log("Button pressed time after miliseconds removed from it: ", buttonpressedtime);

//       // Proceed with the rest of the logic once button pressed time is obtained
//       fetch("/api/qualitytestuptime")
//         .then((response) => response.json())
//         .then((data) => {
//           const testUpTime = parseFloat(data.test_up_time);
//           console.log("Retrieved test up time from esp32:", testUpTime);

//           if (testUpTime === 0 || testUpTime - buttonpressedtime <= 0) {
//             console.log("The time limit is not updated yet");
//           } else if (testUpTime - buttonpressedtime >= qualityTestLimit) {
//             console.log("Quality test time limit reached, pump stopped.");
//             stopTest();
//             stopTestUpdate("0");
//             // alert("Quality test maximum duration reached, pump stopped.");
//           } else {
//             console.log("Quality test limit not reached yet.");
//           }

//           const product = testUpTime - buttonpressedtime;
//           console.log("The time retrived from esp32 is: ",testUpTime);
//           console.log("The button pressed time retrieved is: ", buttonpressedtime);
//           console.log("The product after subtracting up time is:", product);
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//         });
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

document.getElementById("testButton").addEventListener("click", toggleTest);

function toggleTest() {
  const button = document.getElementById("testButton");
  //remove white space characters
  const buttonText = button.innerText.trim();
  if (buttonText === "Start Test") {
    // const testStartedTime = Date.now();
    // console.log("The test started at: ",testStartedTime);
    startTest(1);
    console.log(
      "Water quality test is started, button state updated to database, pump is started"
    );
  } else {
    stopTest();
    stopTestUpdate(0); // Restart the test by simulating a new button press
    console.log(
      "Water quality test is stopped, button state updated to database, pump is stopped"
    );
  }
}

function startTest(newState) {
  const testStartedTime = (Date.now()).toString().substring(0, 10);;
  console.log("The test started at (string): ", testStartedTime);
  // const inttestStartedTime = parseFloat(testStartedTime);
  // console.log("The test started at (int): ", inttestStartedTime);
  const buttonId = "start_test_button";
  const data2 = {
    button_id: buttonId,
    button_pressed_time: testStartedTime, 
  };
  fetch(`/api/sensors/656857689a022373bf3cd719`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data2),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Button pressed time is updated");
      } else {
        console.error("Failed to update button pressed time");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  document.getElementById("testButton").innerText = "Stop Test";
  const sensorId = "test_button";
  const data = {
    sensor_id: sensorId,
    button_state: newState.toString(), // Convert to string to match JSON format
  };

  fetch(`/api/sensors/6553769e3f9e48b6f5be442e`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Quality test is started.");
      } else {
        console.error("Failed to start test");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function stopTestUpdate(newState) {
  const sensorId = "test_button";
  const data = {
    sensor_id: sensorId,
    button_state: newState.toString(), // Convert to string to match JSON format
  };

  fetch(`/api/sensors/6553769e3f9e48b6f5be442e`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        console.log("The stop test button works perfectly");
      } else {
        console.error("Stop button failed to work");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function stopTest() {
  document.getElementById("testButton").innerText = "Start Test";
  clearTimeout(timeout); // Clear the timeout when stopping the test
}

function updateTestButtonState() {
  fetch("/api/sensors?sensor_id=test_button")
    .then((response) => response.json())
    .then((data) => {
      var buttonState = data.map((item) => item.button_state);
      //debug
      console.log("Retrieved button state:", buttonState);

      // Update the button text based on the fetched state
      if (buttonState == "1") {
        document.getElementById("testButton").innerText = "Stop Test";
        console.log(
          "Latest button state is retrieved from database. (Stop Test)"
        );
      } else {
        document.getElementById("testButton").innerText = "Start Test";
        console.log(
          "Latest button state is retrieved from database. (Start Test)"
        );
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Call the function immediately to fetch and display the initial average value
updateAverageExternalTempReading();
updateAverageExternalHumidityReading();
updateAverageTempReading();
updateAverageHumidityReading();
updateAveragephReading();
updateAverageecReading();
updateTestButtonState();

// Set a timer to update the average value every 20 minutes (in milliseconds)
setInterval(updateAverageExternalTempReading, 10000);
setInterval(updateAverageExternalHumidityReading, 10000);
setInterval(updateAverageTempReading, 10000);
setInterval(updateAverageHumidityReading, 10000);
setInterval(updateAveragephReading, 2000);
setInterval(updateAverageecReading, 2000);
setInterval(updateTestButtonState, 2000);

// setInterval(readQualityTestUpTime, 1000);
