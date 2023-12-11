const limitValueInput = document.getElementById("limitValue");
const relayLimitSpan = document.getElementById("relayLimit");

// Function to update the limit value span
function updateLimitValue(newLimit) {
  relayLimitSpan.textContent = newLimit;
}

function retrieveLatestTriggerLimit() {
  const sensorId = "relay_limit";

  // Create an object to represent the data to update
  fetch(`/api/sensors/${sensorId}/limit`)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.limit) {
        const latestLimit = data.limit;
        limitValueInput.value = latestLimit;
        updateLimitValue(latestLimit);
      }
    })
    .catch((error) => {
      console.error("Error fetching latest limit:", error);
    });
}

retrieveLatestTriggerLimit();

// Update the limit value span with the initial value
relayLimitSpan.textContent = limitValueInput.value;

// Listen to the 'input' event on the slider for real-time updates
limitValueInput.addEventListener("input", function () {
  const newLimit = limitValueInput.value;
  relayLimitSpan.textContent = newLimit;
});

// Listen to the 'change' event on the slider to send data to the server
limitValueInput.addEventListener("change", function () {
  const newLimit = limitValueInput.value;
  if (parseFloat(newLimit) >= parseFloat(u_limitValueInput.value)) {
    // Display a warning to the user
    alert("Lower limit cannot be same as or higher than the upper limit.");
    // Reset the lower limit to the previous value
    retrieveLatestTriggerLimit();
  } else {
    // PUT the updated limit value to the server here
    updateLimitOnServer(newLimit);
  }
});

function updateLimitOnServer(newLimit) {
  const sensorId = "relay_limit";

  // Create an object to represent the data to update
  const data = {
    limit: newLimit,
  };

  fetch(`/update/${sensorId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        alert("Humidifier trigger limit updated successfully");
        console.log(data);
      } else {
        alert("Failed to update sensor");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//Ideal humidity upper limit
const u_limitValueInput = document.getElementById("u_limitValue");
const u_relayLimitSpan = document.getElementById("u_relayLimit");

// Function to update the limit value span
function u_updateLimitValue(newLimit) {
  u_relayLimitSpan.textContent = newLimit;
}

function u_retrieveLatestTriggerLimit() {
  const sensorId = "relay_limit";

  // Create an object to represent the data to update
  fetch(`/api/sensors/${sensorId}/limit`)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.limit) {
        const latestLimit = data.u_limit;
        u_limitValueInput.value = latestLimit;
        u_updateLimitValue(latestLimit);
      }
    })
    .catch((error) => {
      console.error("Error fetching latest limit:", error);
    });
}

u_retrieveLatestTriggerLimit();

// Update the limit value span with the initial value
u_relayLimitSpan.textContent = u_limitValueInput.value;

// Listen to the 'input' event on the slider for real-time updates
u_limitValueInput.addEventListener("input", function () {
  const new_u_Limit = u_limitValueInput.value;
  u_relayLimitSpan.textContent = new_u_Limit;
});

// Listen to the 'change' event on the slider to send data to the server
u_limitValueInput.addEventListener("change", function () {
  const new_u_Limit = u_limitValueInput.value;
  if (parseFloat(new_u_Limit) <= parseFloat(limitValueInput.value)) {
    // Display a warning to the user
    alert("Upper limit cannot be same as or lower than the lower limit.");
    // Reset the upper limit to the previous value
    u_retrieveLatestTriggerLimit();
  } else {
    // PUT the updated limit value to the server here
    updateUpperHumidityLimitOnServer(new_u_Limit);
  }
});

function updateUpperHumidityLimitOnServer(newLimit) {
  const sensorId = "relay_limit";

  // Create an object to represent the data to update
  const data = {
    u_limit: newLimit,
  };

  fetch(`/update/upperhumidity/${sensorId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        alert("Ideal humidity upper limit updated successfully");
        console.log(data);
      } else {
        alert("Failed to update sensor");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//Humidifier operating interval
const intervalValueInput = document.getElementById("humidifierIntervalValue");
const intervalSpan = document.getElementById("humidifierInterval");

// Function to update the limit value span
function updateIntervalValue(newInterval) {
  intervalSpan.textContent = newInterval;
}

function retrieveLatestOperatingInterval() {
  const sensorId = "humidifier_interval";

  // Create an object to represent the data to update
  fetch(`/api/sensors/interval/${sensorId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.interval) {
        const latestInterval = data.interval;
        intervalValueInput.value = latestInterval;
        updateIntervalValue(latestInterval);
      }
    })
    .catch((error) => {
      console.error("Error fetching latest limit:", error);
    });
}

retrieveLatestOperatingInterval();

// Update the limit value span with the initial value
intervalSpan.textContent = intervalValueInput.value;

// Listen to the 'input' event on the slider for real-time updates
intervalValueInput.addEventListener("input", function () {
  const newInterval = intervalValueInput.value;
  intervalSpan.textContent = newInterval;
});

// Listen to the 'change' event on the slider to send data to the server
intervalValueInput.addEventListener("change", function () {
  const newInterval = intervalValueInput.value;

  // PUT the updated limit value to the server here
  updateIntervalOnServer(newInterval);
});

function updateIntervalOnServer(newInterval) {
  const sensorId = "humidifier_interval";

  // Create an object to represent the data to update
  const data = {
    interval: newInterval,
  };

  fetch(`/update/interval/${sensorId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        alert("Humidifier operating interval update succesfully");
        console.log(data);
      } else {
        alert("Failed to update sensor");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//Updating upper and lower limit of ideal temperature
const lowerLimitValue = document.getElementById("lowerLimitValue");
const lowerLimitSpan = document.getElementById("lowerLimit");

// Function to update the limit value span
function updateLowerLimitValue(newLowerLimit) {
  lowerLimitSpan.textContent = newLowerLimit;
}

function retrieveLatestIdealTempLowerLimit() {
  const sensorId = "ideal_temp";

  // Create an object to represent the data to update
  fetch(`/update/ideal/${sensorId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.lower_limit_value) {
        const latestIdealTempLowerLimit = data.lower_limit_value;
        lowerLimitValue.value = latestIdealTempLowerLimit;
        updateLowerLimitValue(latestIdealTempLowerLimit);
      }
    })
    .catch((error) => {
      console.error("Error fetching latest ideal temp lower limit:", error);
    });
}

retrieveLatestIdealTempLowerLimit();

// Update the limit value span with the initial value
lowerLimitSpan.textContent = lowerLimitValue.value;

// Listen to the 'input' event on the slider for real-time updates
lowerLimitValue.addEventListener("input", function () {
  const newTempLowerLimit = lowerLimitValue.value;
  lowerLimitSpan.textContent = newTempLowerLimit;
});

// Listen to the 'change' event on the slider to send data to the server
lowerLimitValue.addEventListener("change", function () {
  const newTempLowerLimit = lowerLimitValue.value;
  if (parseFloat(newTempLowerLimit) >= parseFloat(upperLimitValue.value)) {
    alert("Lower limit cannot be same as or higher than the upper limit.");
    retrieveLatestIdealTempLowerLimit();
  } else {
    // PUT the updated limit value to the server here
    updateIdealTempLowerLimitOnServer(newTempLowerLimit);
  }
});

function updateIdealTempLowerLimitOnServer(newLimit) {
  const sensorId = "ideal_temp";

  // Create an object to represent the data to update
  const data = {
    lower_limit_value: newLimit,
  };

  fetch(`/update/ideal/${sensorId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        alert("Ideal temp lower limit updated successfully");
        console.log(data);
      } else {
        alert("Failed to update sensor");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const upperLimitValue = document.getElementById("upperLimitValue");
const upperLimitSpan = document.getElementById("upperLimit");

// Function to update the limit value span
function updateUpperLimitValue(newLowerLimit) {
  upperLimitSpan.textContent = newLowerLimit;
}

function retrieveLatestIdealTempUpperLimit() {
  const sensorId = "ideal_temp";

  // Create an object to represent the data to update
  fetch(`/update/ideal/${sensorId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.upper_limit_value) {
        const latestIdealTempUpperLimit = data.upper_limit_value;
        upperLimitValue.value = latestIdealTempUpperLimit;
        updateUpperLimitValue(latestIdealTempUpperLimit);
      }
    })
    .catch((error) => {
      console.error("Error fetching latest ideal temp upper limit:", error);
    });
}

retrieveLatestIdealTempUpperLimit();

// Update the limit value span with the initial value
upperLimitSpan.textContent = upperLimitValue.value;

// Listen to the 'input' event on the slider for real-time updates
upperLimitValue.addEventListener("input", function () {
  const newTempUpperLimit = upperLimitValue.value;
  upperLimitSpan.textContent = newTempUpperLimit;
});

// Listen to the 'change' event on the slider to send data to the server
upperLimitValue.addEventListener("change", function () {
  const newTempUpperLimit = upperLimitValue.value;
  if (parseFloat(newTempUpperLimit) <= parseFloat(lowerLimitValue.value)) {
    alert("Upper limit cannot be same as or lower than the lower limit.");
    retrieveLatestIdealTempUpperLimit();
  } else {
    // PUT the updated limit value to the server here
    updateIdealTempUpperLimitOnServer(newTempUpperLimit);
  }
});

function updateIdealTempUpperLimitOnServer(newLimit) {
  const sensorId = "ideal_temp";

  // Create an object to represent the data to update
  const data = {
    upper_limit_value: newLimit,
  };

  fetch(`/update/ideal/upper/${sensorId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        alert("Ideal temp upper limit updated successfully");
        console.log(data);
      } else {
        alert("Failed to update sensor");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//pH
const pHValueInput = document.getElementById("pHlimitValue");
const pHLimitSpan = document.getElementById("pHLimit");

// Function to update the limit value span
function updatepHLimitValue(newLimit) {
  pHLimitSpan.textContent = newLimit;
}

function retrieveLatestpHLimit() {
  const sensorId = "pH_sensor_limit";

  // Create an object to represent the data to update
  fetch(`/api/sensors/${sensorId}/ph`)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.pHlimit) {
        const latestpHLimit = data.pHlimit;
        pHValueInput.value = latestpHLimit;
        updatepHLimitValue(latestpHLimit);
      }
    })
    .catch((error) => {
      console.error("Error fetching latest limit:", error);
    });
}

retrieveLatestpHLimit();

// Update the limit value span with the initial value
pHLimitSpan.textContent = pHValueInput.value;

// Listen to the 'input' event on the slider for real-time updates
pHValueInput.addEventListener("input", function () {
  const newpHLimit = pHValueInput.value;
  pHLimitSpan.textContent = newpHLimit;
});

// Listen to the 'change' event on the slider to send data to the server
pHValueInput.addEventListener("change", function () {
  const newpHLimit = pHValueInput.value;
  if (parseFloat(newpHLimit) >= parseFloat(u_pHValueInput.value)) {
    alert("Lower limit cannot be same as or higher than the upper limit.");
    retrieveLatestpHLimit();
  } else {
    // PUT the updated limit value to the server here
    updatepHLimitOnServer(newpHLimit);
  }
});

function updatepHLimitOnServer(newLimit) {
  const sensorId = "ph_sensor_limit";

  // Create an object to represent the data to update
  const data = {
    pHlimit: newLimit,
  };

  fetch(`/update/idealpH/${sensorId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        alert("pH lower limit updated successfully");
        console.log(data);
      } else {
        alert("Failed to update sensor");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//Ideal pH upper limit
const u_pHValueInput = document.getElementById("u_pHlimitValue");
const u_pHLimitSpan = document.getElementById("u_pHLimit");

// Function to update the limit value span
function update_u_pHLimitValue(newLimit) {
  u_pHLimitSpan.textContent = newLimit;
}

function retrieveLatest_u_pHLimit() {
  const sensorId = "pH_sensor_limit";

  // Create an object to represent the data to update
  fetch(`/api/sensors/${sensorId}/ph`)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.pHlimit) {
        const latest_u_pHLimit = data.u_pHlimit;
        u_pHValueInput.value = latest_u_pHLimit;
        update_u_pHLimitValue(latest_u_pHLimit);
      }
    })
    .catch((error) => {
      console.error("Error fetching latest limit:", error);
    });
}

retrieveLatest_u_pHLimit();

// Update the limit value span with the initial value
u_pHLimitSpan.textContent = u_pHValueInput.value;

// Listen to the 'input' event on the slider for real-time updates
u_pHValueInput.addEventListener("input", function () {
  const new_u_pHLimit = u_pHValueInput.value;
  u_pHLimitSpan.textContent = new_u_pHLimit;
});

// Listen to the 'change' event on the slider to send data to the server
u_pHValueInput.addEventListener("change", function () {
  const new_u_pHLimit = u_pHValueInput.value;
  if (parseFloat(new_u_pHLimit) <= parseFloat(pHValueInput.value)) {
    alert("Upper limit cannot be same as or lower than the lower limit.");
    retrieveLatest_u_pHLimit();
  } else {
    // PUT the updated limit value to the server here
    update_u_pHLimitOnServer(new_u_pHLimit);
  }
});

function update_u_pHLimitOnServer(newLimit) {
  const sensorId = "ph_sensor_limit";

  // Create an object to represent the data to update
  const data = {
    u_pHlimit: newLimit,
  };

  fetch(`/update/idealpH/upper/${sensorId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        alert("pH upper limit updated successfully");
        console.log(data);
      } else {
        alert("Failed to update sensor");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//EC
const ECValueInput = document.getElementById("EClimitValue");
const ECLimitSpan = document.getElementById("ECLimit");

// Function to update the limit value span
function updateECLimitValue(newLimit) {
  ECLimitSpan.textContent = newLimit;
}

function retrieveLatestECLimit() {
  const sensorId = "ec_sensor_limit";

  // Create an object to represent the data to update
  fetch(`/api/sensors/${sensorId}/ec`)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.EClimit) {
        const latestECLimit = data.EClimit;
        ECValueInput.value = latestECLimit;
        updateECLimitValue(latestECLimit);
      }
    })
    .catch((error) => {
      console.error("Error fetching latest limit:", error);
    });
}

retrieveLatestECLimit();

// Update the limit value span with the initial value
ECLimitSpan.textContent = ECValueInput.value;

// Listen to the 'input' event on the slider for real-time updates
ECValueInput.addEventListener("input", function () {
  const newECLimit = ECValueInput.value;
  ECLimitSpan.textContent = newECLimit;
});

// Listen to the 'change' event on the slider to send data to the server
ECValueInput.addEventListener("change", function () {
  const newECLimit = ECValueInput.value;
  if (parseFloat(newECLimit) >= parseFloat(u_ECValueInput.value)) {
    alert("Lower limit cannot be same as or higher than the upper limit.");
    retrieveLatestECLimit();
  } else {
    // PUT the updated limit value to the server here
    updateECLimitOnServer(newECLimit);
  }
});

function updateECLimitOnServer(newLimit) {
  const sensorId = "ec_sensor_limit";

  // Create an object to represent the data to update
  const data = {
    EClimit: newLimit,
  };

  fetch(`/update/idealEC/${sensorId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        alert("EC lower limit updated successfully");
        console.log(data);
      } else {
        alert("Failed to update sensor");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//Ideal EC upper limit
const u_ECValueInput = document.getElementById("u_EClimitValue");
const u_ECLimitSpan = document.getElementById("u_ECLimit");

// Function to update the limit value span
function update_u_ECLimitValue(newLimit) {
  u_ECLimitSpan.textContent = newLimit;
}

function retrieveLatest_u_ECLimit() {
  const sensorId = "EC_sensor_limit";

  // Create an object to represent the data to update
  fetch(`/api/sensors/${sensorId}/ec`)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.EClimit) {
        const latest_u_ECLimit = data.u_EClimit;
        u_ECValueInput.value = latest_u_ECLimit;
        update_u_ECLimitValue(latest_u_ECLimit);
      }
    })
    .catch((error) => {
      console.error("Error fetching latest limit:", error);
    });
}

retrieveLatest_u_ECLimit();

// Update the limit value span with the initial value
u_ECLimitSpan.textContent = u_ECValueInput.value;

// Listen to the 'input' event on the slider for real-time updates
u_ECValueInput.addEventListener("input", function () {
  const new_u_ECLimit = u_ECValueInput.value;
  u_ECLimitSpan.textContent = new_u_ECLimit;
});

// Listen to the 'change' event on the slider to send data to the server
u_ECValueInput.addEventListener("change", function () {
  const new_u_ECLimit = u_ECValueInput.value;
  if (parseFloat(new_u_ECLimit) <= parseFloat(ECValueInput.value)) {
    alert("Upper limit cannot be same as or lower than the lower limit.");
    retrieveLatest_u_ECLimit();
  } else {
    // PUT the updated limit value to the server here
    update_u_ECLimitOnServer(new_u_ECLimit);
  }
});

function update_u_ECLimitOnServer(newLimit) {
  const sensorId = "ec_sensor_limit";

  // Create an object to represent the data to update
  const data = {
    u_EClimit: newLimit,
  };

  fetch(`/update/idealEC/upper/${sensorId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        alert("EC upper limit updated successfully");
        console.log(data);
      } else {
        alert("Failed to update sensor");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//Toggle switch
// Function to get the latest burst mode reading from the server
// function getLatestBurstMode() {
//   const apiEndpoint = "/edit/humidifiermode/65265247f0a1502b117af0b4";

//   fetch(apiEndpoint, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       const burstMode = data["burst_mode"];
//       // Update the toggle switch based on the retrieved burst mode value
//       document.getElementById("burstModeToggle").checked = burstMode === "on";
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

// // Call the getLatestBurstMode function to set the initial state of the toggle switch
// getLatestBurstMode();

// // Function to handle the toggle switch change event
// document
//   .getElementById("burstModeToggle")
//   .addEventListener("change", function () {
//     // Determine if the toggle switch is checked (ON) or unchecked (OFF)
//     const burstMode = this.checked ? "on" : "off";

//     // Send a PUT request to update the burst mode in the database
//     updateBurstMode(burstMode);
//   });

// // Function to send a PUT request to update the burst mode in the database
// function updateBurstMode(burstMode) {
//   // You may want to replace 'YOUR_API_ENDPOINT' with the actual endpoint
//   const apiEndpoint = "/edit/humidifiermode/65265247f0a1502b117af0b4";

//   fetch(apiEndpoint, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ burst_mode: burstMode }),
//   })
//     .then((response) => {
//       if (response.status === 200) {
//         console.log("Burst mode updated successfully.");
//       } else {
//         console.error("Failed to update burst mode.");
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

// //Fan speed bar
// const intakeSpeedBar = document.getElementById("i_lv1");
// const intakeSpeedValue = document.getElementById("i_lv1_speed");

// const intakeSpeedBar2 = document.getElementById("i_lv2");
// const intakeSpeedValue2= document.getElementById("i_lv2_speed");

// const intakeSpeedBar3 = document.getElementById("i_lv3");
// const intakeSpeedValue3 = document.getElementById("i_lv3_speed");

// const intakeSpeedBar4 = document.getElementById("i_lv4");
// const intakeSpeedValue4 = document.getElementById("i_lv4_speed");

// const intakeSpeedBar5 = document.getElementById("i_lv5");
// const intakeSpeedValue5 = document.getElementById("i_lv5_speed");

// // Function to update the limit value span
// function updateSpeedValue(newS) {
//   intakeSpeedValue.textContent = newS;
// }

// function updateSpeedValue2(newS) {
//   intakeSpeedValue2.textContent = newS;
// }

// function updateSpeedValue3(newS) {
//   intakeSpeedValue3.textContent = newS;
// }

// function updateSpeedValue4(newS) {
//   intakeSpeedValue4.textContent = newS;
// }

// function updateSpeedValue5(newS) {
//   intakeSpeedValue5.textContent = newS;
// }

// function retrieveLatestIntakeFanSpeed() {
//   const sensorId = "652a50eba4f9b4835c036c66";

//   // Create an object to represent the data to update
//   fetch(`/update/fanspeed/${sensorId}`)
//     .then((response) => response.json())
//     .then((data) => {
//       if (data && data.lv_one && data.lv_two && data.lv_three && data.lv_four && data.lv_five) {
//         const latestSpeed = data.lv_one;
//         const latestSpeed2 = data.lv_two;
//         const latestSpeed3 = data.lv_three;
//         const latestSpeed4 = data.lv_four;
//         const latestSpeed5 = data.lv_five;

//         intakeSpeedBar.value = latestSpeed;
//         intakeSpeedBar2.value = latestSpeed2;
//         intakeSpeedBar3.value = latestSpeed3;
//         intakeSpeedBar4.value = latestSpeed4;
//         intakeSpeedBar5.value = latestSpeed5;

//         updateSpeedValue(latestSpeed);
//         updateSpeedValue2(latestSpeed2);
//         updateSpeedValue3(latestSpeed3);
//         updateSpeedValue4(latestSpeed4);
//         updateSpeedValue5(latestSpeed5);

//       }
//     })
//     .catch((error) => {
//       console.error("Error fetching latest limit:", error);
//     });
// }

// console.log(retrieveLatestIntakeFanSpeed())

// // Update the limit value span with the initial value
// intakeSpeedValue.textContent = intakeSpeedBar.value;
// intakeSpeedValue2.textContent = intakeSpeedBar2.value;
// intakeSpeedValue3.textContent = intakeSpeedBar3.value;
// intakeSpeedValue4.textContent = intakeSpeedBar4.value;
// intakeSpeedValue5.textContent = intakeSpeedBar5.value;

// // Listen to the 'input' event on the slider for real-time updates
// intakeSpeedBar.addEventListener("input", function () {
//   const newSpeed = intakeSpeedBar.value;
//   console.log(newSpeed);
//   intakeSpeedValue.textContent = newSpeed;
// });

// intakeSpeedBar2.addEventListener("input", function () {
//   const newSpeed2 = intakeSpeedBar2.value;
//   console.log(newSpeed2);
//   intakeSpeedValue2.textContent = newSpeed2;
// });

// intakeSpeedBar3.addEventListener("input", function () {
//   const newSpeed3 = intakeSpeedBar3.value;
//   console.log(newSpeed3);
//   intakeSpeedValue3.textContent = newSpeed3;
// });

// intakeSpeedBar4.addEventListener("input", function () {
//   const newSpeed4 = intakeSpeedBar4.value;
//   console.log(newSpeed4);
//   intakeSpeedValue4.textContent = newSpeed4;
// });

// intakeSpeedBar5.addEventListener("input", function () {
//   const newSpeed5 = intakeSpeedBar5.value;
//   console.log(newSpeed5);
//   intakeSpeedValue5.textContent = newSpeed5;
// });

// // Listen to the 'change' event on the slider to send data to the server
// intakeSpeedBar.addEventListener("change", function () {
//   const newSpeedB = intakeSpeedBar.value;
//   console.log(newSpeedB);
//   // PUT the updated limit value to the server here
//   updateSpeedOnServer(newSpeedB);
// });

// intakeSpeedBar2.addEventListener("change", function () {
//   const newSpeedB2 = intakeSpeedBar2.value;
//   console.log(newSpeedB2);
//   // PUT the updated limit value to the server here
//   updateSpeedOnServer2(newSpeedB2);
// });

// intakeSpeedBar3.addEventListener("change", function () {
//   const newSpeedB3 = intakeSpeedBar3.value;
//   console.log(newSpeedB3);
//   // PUT the updated limit value to the server here
//   updateSpeedOnServer3(newSpeedB3);
// });

// intakeSpeedBar4.addEventListener("change", function () {
//   const newSpeedB4 = intakeSpeedBar4.value;
//   console.log(newSpeedB4);
//   // PUT the updated limit value to the server here
//   updateSpeedOnServer4(newSpeedB4);
// });

// intakeSpeedBar5.addEventListener("change", function () {
//   const newSpeedB5 = intakeSpeedBar5.value;
//   console.log(newSpeedB5);
//   // PUT the updated limit value to the server here
//   updateSpeedOnServer5(newSpeedB5);
// });

// function updateSpeedOnServer(newSpeed) {
//   const sensorId = "652a50eba4f9b4835c036c66";

//   // Create an object to represent the data to update
//   const data = {
//     lv_one: newSpeed,
//   };

//   fetch(`/update/fanspeed/${sensorId}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) => {
//       if (response.ok) {
//         alert("Sensor updated successfully");
//         console.log(data);
//       } else {
//         alert("Failed to update sensor");
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

// function updateSpeedOnServer2(newSpeed) {
//   const sensorId = "652a50eba4f9b4835c036c66";

//   // Create an object to represent the data to update
//   const data = {
//     lv_two: newSpeed,
//   };

//   fetch(`/update/fanspeed2/${sensorId}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) => {
//       if (response.ok) {
//         alert("Sensor updated successfully");
//         console.log(data);
//       } else {
//         alert("Failed to update sensor");
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

// function updateSpeedOnServer3(newSpeed) {
//   const sensorId = "652a50eba4f9b4835c036c66";

//   // Create an object to represent the data to update
//   const data = {
//     lv_three: newSpeed,
//   };

//   fetch(`/update/fanspeed3/${sensorId}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) => {
//       if (response.ok) {
//         alert("Sensor updated successfully");
//         console.log(data);
//       } else {
//         alert("Failed to update sensor");
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

// function updateSpeedOnServer4(newSpeed) {
//   const sensorId = "652a50eba4f9b4835c036c66";

//   // Create an object to represent the data to update
//   const data = {
//     lv_four: newSpeed,
//   };

//   fetch(`/update/fanspeed4/${sensorId}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) => {
//       if (response.ok) {
//         alert("Sensor updated successfully");
//         console.log(data);
//       } else {
//         alert("Failed to update sensor");
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

// function updateSpeedOnServer5(newSpeed) {
//   const sensorId = "652a50eba4f9b4835c036c66";

//   // Create an object to represent the data to update
//   const data = {
//     lv_five: newSpeed,
//   };

//   fetch(`/update/fanspeed5/${sensorId}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) => {
//       if (response.ok) {
//         alert("Sensor updated successfully");
//         console.log(data);
//       } else {
//         alert("Failed to update sensor");
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

// //Exhaust fan speed bar
// const exhaustSpeedBar = document.getElementById("e_lv1");
// const exhaustSpeedValue = document.getElementById("e_lv1_speed");

// const exhaustSpeedBar2 = document.getElementById("e_lv2");
// const exhaustSpeedValue2= document.getElementById("e_lv2_speed");

// const exhaustSpeedBar3 = document.getElementById("e_lv3");
// const exhaustSpeedValue3 = document.getElementById("e_lv3_speed");

// const exhaustSpeedBar4 = document.getElementById("e_lv4");
// const exhaustSpeedValue4 = document.getElementById("e_lv4_speed");

// const exhaustSpeedBar5 = document.getElementById("e_lv5");
// const exhaustSpeedValue5 = document.getElementById("e_lv5_speed");

// // Function to update the limit value span
// function updateExSpeedValue(newS) {
//   exhaustSpeedValue.textContent = newS;
// }

// function updateExSpeedValue2(newS) {
//   exhaustSpeedValue2.textContent = newS;
// }

// function updateExSpeedValue3(newS) {
//   exhaustSpeedValue3.textContent = newS;
// }

// function updateExSpeedValue4(newS) {
//   exhaustSpeedValue4.textContent = newS;
// }

// function updateExSpeedValue5(newS) {
//   exhaustSpeedValue5.textContent = newS;
// }

// function retrieveLatestExhaustFanSpeed() {
//   const sensorId = "652ab235a4f9b4835c72fa8b";

//   // Create an object to represent the data to update
//   fetch(`/update/exfanspeed/${sensorId}`)
//     .then((response) => response.json())
//     .then((data) => {
//       if (data && data.lv_one && data.lv_two && data.lv_three && data.lv_four && data.lv_five) {
//         const latestExSpeed = data.lv_one;
//         const latestExSpeed2 = data.lv_two;
//         const latestExSpeed3 = data.lv_three;
//         const latestExSpeed4 = data.lv_four;
//         const latestExSpeed5 = data.lv_five;

//         exhaustSpeedBar.value = latestExSpeed;
//         exhaustSpeedBar2.value = latestExSpeed2;
//         exhaustSpeedBar3.value = latestExSpeed3;
//         exhaustSpeedBar4.value = latestExSpeed4;
//         exhaustSpeedBar5.value = latestExSpeed5;

//         updateExSpeedValue(latestExSpeed);
//         updateExSpeedValue2(latestExSpeed2);
//         updateExSpeedValue3(latestExSpeed3);
//         updateExSpeedValue4(latestExSpeed4);
//         updateExSpeedValue5(latestExSpeed5);

//       }
//     })
//     .catch((error) => {
//       console.error("Error fetching latest limit:", error);
//     });
// }

// console.log(retrieveLatestExhaustFanSpeed())

// // Update the limit value span with the initial value
// exhaustSpeedValue.textContent = exhaustSpeedBar.value;
// exhaustSpeedValue2.textContent = exhaustSpeedBar2.value;
// exhaustSpeedValue3.textContent = exhaustSpeedBar3.value;
// exhaustSpeedValue4.textContent = exhaustSpeedBar4.value;
// exhaustSpeedValue5.textContent = exhaustSpeedBar5.value;

// // Listen to the 'input' event on the slider for real-time updates
// exhaustSpeedBar.addEventListener("input", function () {
//   const newExSpeed = exhaustSpeedBar.value;
//   console.log(newExSpeed);
//   exhaustSpeedValue.textContent = newExSpeed;
// });

// exhaustSpeedBar2.addEventListener("input", function () {
//   const newExSpeed2 = exhaustSpeedBar2.value;
//   console.log(newExSpeed2);
//   exhaustSpeedValue2.textContent = newExSpeed2;
// });

// exhaustSpeedBar3.addEventListener("input", function () {
//   const newExSpeed3 = exhaustSpeedBar3.value;
//   console.log(newExSpeed3);
//   exhaustSpeedValue3.textContent = newExSpeed3;
// });

// exhaustSpeedBar4.addEventListener("input", function () {
//   const newExSpeed4 = exhaustSpeedBar4.value;
//   console.log(newExSpeed4);
//   exhaustSpeedValue4.textContent = newExSpeed4;
// });

// exhaustSpeedBar5.addEventListener("input", function () {
//   const newExSpeed5 = exhaustSpeedBar5.value;
//   console.log(newExSpeed5);
//   exhaustSpeedValue5.textContent = newExSpeed5;
// });

// // Listen to the 'change' event on the slider to send data to the server
// exhaustSpeedBar.addEventListener("change", function () {
//   const newExSpeedB = exhaustSpeedBar.value;
//   console.log(newExSpeedB);
//   // PUT the updated limit value to the server here
//   updateExSpeedOnServer(newExSpeedB);
// });

// exhaustSpeedBar2.addEventListener("change", function () {
//   const newExSpeedB2 = exhaustSpeedBar2.value;
//   console.log(newExSpeedB2);
//   // PUT the updated limit value to the server here
//   updateExSpeedOnServer2(newExSpeedB2);
// });

// exhaustSpeedBar3.addEventListener("change", function () {
//   const newExSpeedB3 = exhaustSpeedBar3.value;
//   console.log(newExSpeedB3);
//   // PUT the updated limit value to the server here
//   updateExSpeedOnServer3(newExSpeedB3);
// });

// exhaustSpeedBar4.addEventListener("change", function () {
//   const newExSpeedB4 = exhaustSpeedBar4.value;
//   console.log(newExSpeedB4);
//   // PUT the updated limit value to the server here
//   updateExSpeedOnServer4(newExSpeedB4);
// });

// exhaustSpeedBar5.addEventListener("change", function () {
//   const newExSpeedB5 = exhaustSpeedBar5.value;
//   console.log(newExSpeedB5);
//   // PUT the updated limit value to the server here
//   updateExSpeedOnServer5(newExSpeedB5);
// });

// function updateExSpeedOnServer(newSpeed) {
//   const sensorId = "652ab235a4f9b4835c72fa8b";

//   // Create an object to represent the data to update
//   const data = {
//     lv_one: newSpeed,
//   };

//   fetch(`/update/exfanspeed/${sensorId}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) => {
//       if (response.ok) {
//         alert("Sensor updated successfully");
//         console.log(data);
//       } else {
//         alert("Failed to update sensor");
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

// function updateExSpeedOnServer2(newSpeed) {
//   const sensorId = "652ab235a4f9b4835c72fa8b";

//   // Create an object to represent the data to update
//   const data = {
//     lv_two: newSpeed,
//   };

//   fetch(`/update/exfanspeed2/${sensorId}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) => {
//       if (response.ok) {
//         alert("Sensor updated successfully");
//         console.log(data);
//       } else {
//         alert("Failed to update sensor");
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

// function updateExSpeedOnServer3(newSpeed) {
//   const sensorId = "652ab235a4f9b4835c72fa8b";

//   // Create an object to represent the data to update
//   const data = {
//     lv_three: newSpeed,
//   };

//   fetch(`/update/exfanspeed3/${sensorId}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) => {
//       if (response.ok) {
//         alert("Sensor updated successfully");
//         console.log(data);
//       } else {
//         alert("Failed to update sensor");
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

// function updateExSpeedOnServer4(newSpeed) {
//   const sensorId = "652ab235a4f9b4835c72fa8b";

//   // Create an object to represent the data to update
//   const data = {
//     lv_four: newSpeed,
//   };

//   fetch(`/update/exfanspeed4/${sensorId}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) => {
//       if (response.ok) {
//         alert("Sensor updated successfully");
//         console.log(data);
//       } else {
//         alert("Failed to update sensor");
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

// function updateExSpeedOnServer5(newSpeed) {
//   const sensorId = "652ab235a4f9b4835c72fa8b";

//   // Create an object to represent the data to update
//   const data = {
//     lv_five: newSpeed,
//   };

//   fetch(`/update/exfanspeed5/${sensorId}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) => {
//       if (response.ok) {
//         alert("Sensor updated successfully");
//         console.log(data);
//       } else {
//         alert("Failed to update sensor");
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }
