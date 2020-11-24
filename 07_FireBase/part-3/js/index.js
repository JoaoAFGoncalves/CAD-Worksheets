$(function () {
  'use strict';

  let sensors = {
    kitchen:{
      temp: {
        status: false,
        time: null
      },
      light: {
        status: false,
        time: null
      },
      north_window:{
        open: true,
        time: null
      },
      west_window:{
        open: false,
        time: null
      }
    },
    room:{
      temp: {
        status: false,
        time: null
      },
      light: {
        status: false,
        time: null
      }
    }
  };

  const kitchemTempToggle = $("#kitchen_temp-toggle");
  const kitchenTempTime = $("#kitchen_temp_time");
  const kitchenLightToggle = $("#kitchen_light-toggle"); //recebe um objeto
  const kitchenLightTime = $("#kiechen_light_time");

  /**
   * 
   * @param {*} area name of the area
   * @param {*} name of the sensor
   * @param {*} sensor JSON
   */

  function toggleAndSaveStatus(area,name, sensor){
    if(sensor.status != undefined){
      sensor.status = !sensor.status;
      localStorage.setItem(area + '_' + sensor + "_status", sensor.status);
    }
    if(sensor.open != undefined) {
      sensor.open = !sensor.open;
      localStorage.setItem(area + '_' + sensor + "_open", sensor.open);
    }
    sensor.time = new Date();
    localStorage.setItem(area + '_' + sensor + "_time", sensor.time.toISOString());
    let obj ={};
    obj[area][name] = sensor;
    sendToCloud(obj);
  }

  function loadStatus(area,name){
    let sensor = sensors[area][name];
    sensor.status = localStorage.getItem(area + '_' + sensor + "_status")
    sensor.status = localStorage.getItem(area + '_' + sensor + "_open")
    sensor.time = localStorage.getItem(area + '_' + sensor + "_time")
    if(time)

  }


  let temperature = null; 

  function toggleButton(e) {
    if (this == tempToggle.get(0)) {
      // kitchen.temp.status = !kitchen.temp.status
      // kitchen.temp.time = new Date();
      tempTime.text('just now');
      toggleAndSaveStatus("kitchen_temp", kitchen.temp)
      // localStorage.setItem("kitchen_temp_status", kitchen.temp.status);
      // localStorage.setItem("kitchen_temp_time", kitchen.temp.time.toISOString());
    }
    else if (this == lightToggle.get(0)) {
      // kitchen.light.status = !kitchen.light.status;
      // kitchen.light.time = new Date();
      lightTime.text('just now');
      toggleAndSaveStatus("kitchen_light", kitchen.light)
      // localStorage.setItem("light_temp_status", kitchen.light.status);
      // localStorage.setItem("light_temp_time", kitchen.light.time.toISOString());
    }
    const j = $(this).find("i");
    j.toggleClass("fa-toggle-off");
    j.toggleClass("fa-toggle-on");

    sendToCloud({"kitchen": kitchen});
    e.preventDefault();
  };

  function changeTemperature () {
    temperature = Math.random()*40;
    const jtempNode = $("#temp-indicator");
    jtempNode.text (Number(temperature).toFixed(1));
  }

  function changeLightBulb () {
    const bulbNode = $("#bulb i");
    bulbNode.toggleClass("far");
    bulbNode.toggleClass("fas");
    if (bulbNode.css("color") == "rgb(255, 0, 0)" ) {
      bulbNode.css("color", "rgb(0, 0, 0)");
    }
    else {
      bulbNode.css("color", "rgb(255, 0, 0)");
    }
  }




  changeTemperature ();

  function updateKitchenTime(time, textNode) {
    let now = Date.now();
    if (!time) {
      return;
    }
    let sec = (now - time.getTime())/1000;
    if (sec < 60) {
      textNode.text(sec.toFixed(0) + " secs ago");
    }
    else {
      let min = sec / 60;
      if (min < 60) {
        textNode.text(min.toFixed(0) + " min ago");
      }
      else {
        let hours = min / 60;
        textNode.text(hours.toFixed(0) + " hours");
      }
    }
  }

  var kitchenTimer = setInterval (function() {
    updateKitchenTime(kitchen.temp.time, $('kitchen_temp_time_indicator'));
    updateKitchenTime(kitchen.light.time, $('kitchen_light_time_indicator'));  
  }, 1000);


  function loadInitialValues() {
    loadStatus("kitchen", "temp");
    loadStatus("kitchen", "light");
    loadStatus("kitchen", "north_window");
    loadStatus("kitchen", "west_window");

    kitchen.temp.status = localStorage.getItem("kitchen_temp_status") === 'true';
    const tempI = tempToggle.find("i");
    if (kitchen.temp.status != tempI.hasClass("fa-toggle-on")){
      tempI.toggleClass("fa-toggle-on");
      tempI.toggleClass("fa-toggle-off");
    }
    let storedTime = localStorage.getItem("kitchen_temp_time");
    if (storedTime) {
      kitchen.temp.time = new Date (storedTime);
    }
  
    kitchen.light.status = localStorage.getItem("kitchen_light_status") === 'true';
    const lightI = lightToggle.find("i");
    if (kitchen.light.status != lightI.hasClass("fa-toggle-on")){
      lightI.toggleClass("fa-toggle-on");
      lightI.toggleClass("fa-toggle-off");
    }

    storedTime = localStorage.getItem("kitchen_light_time");
    if (storedTime) {
      kitchen.light.time = new Date(storedTime);
    }
    updateKitchenTime(kitchen.temp.time, tempTime);
    updateKitchenTime(kitchen.light.time, lightTime);
  }

  const firebaseURL = "https://ipleiria-churras.firebaseio.com/​2192604.json"

  function sendToCloud(dataToSend) {
    $.ajax({
      url: firebaseURL,
      type: 'PATCH',// quando faço post ele inventa me ASCII no identificador
      data: JSON.stringify(dataToSend),
      contentType: 'application/json',
    }).done(function (data) {
      console.log("enviado");
    }
    )
  }

  function loadFromCloud() {
    $.ajax({
      url: firebaseURL,
      type: 'GET',
      contentType: 'application/json',
    }).done(function (data) {
      kitchen = data.kitchen;
      kitchen.temp.time = new Date(kitchen.temp.time);
      kitchen.light.time = new Date(kitchen.light.time);

      const tempI = tempToggle.find("i");
      if (kitchen.temp.status != tempI.hasClass("fa-toggle-on")){
        tempI.toggleClass("fa-toggle-on");
        tempI.toggleClass("fa-toggle-off");
      }
      let storedTime = localStorage.getItem("kitchen_temp_time");
      if (storedTime) {
        kitchen.temp.time = new Date (storedTime);
      }
    
      const lightI = lightToggle.find("i");
      if (kitchen.light.status != lightI.hasClass("fa-toggle-on")){
        lightI.toggleClass("fa-toggle-on");
        lightI.toggleClass("fa-toggle-off");
      }

      storedTime = localStorage.getItem("kitchen_light_time");
      if (storedTime) {
        kitchen.light.time = new Date(storedTime);
      }
      updateKitchenTime(kitchen.temp.time, tempTime);
      updateKitchenTime(kitchen.light.time, lightTime);
      }
    )
  }


  const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=leiria&appid=45560d6d409b8b4b31f5ff22a8f451aa";

  var timeOfUpdate = null;
  var intervalID = null;

  function fetchWeather() {
    $.getJSON(weatherUrl, function (data) {
      timeOfUpdate = Date.now();
      updateFetchedTime();
      
      $("#weather-temp").text(data.main.temp);
      $("#weather-max-temp").text(data.main.temp_max);
      $("#weather-min-temp").text(data.main.temp_min);
      $('#weather-humidity').text(data.main.humidity);
      $('#weather-sunrise').text(new Date(data.sys.sunrise*1000).toLocaleTimeString());
      $('#weather-sunset').text(new Date(data.sys.sunset*1000).toLocaleTimeString());
      // update time in "updated at"

      if (intervalID) {
        intervalID.clearInterval();
      }
      intervalID = setInterval(updateFetchedTime, 1000);
    });
  };

  function updateFetchedTime () {
    let now = Date.now();
    let secondsDiff = (now - timeOfUpdate)/1000;
    if (secondsDiff < 60) {
      $('#weather-updated').text(secondsDiff.toFixed(0) + " sec.");
    }
    else {
      let minutesDiff = secondsDiff / 60;
      if (minutesDiff < 60) {
        $('#weather-updated').text(minutesDiff.toFixed(0) + " min.");
      }
      else {
        let hoursDiff = minutesDiff / 24;
        $('#weather-updated').text(hoursDiff.toFixed(0) + " h");
      }
    }
  }

  fetchWeather();
  loadInitialValues();
  loadFromCloud();

  for (const area in sensors) {
    for (const sensor in sensors[area]) {
      $('#' + area + '_' + sensor + '_toggle').click(function(event){
        toggleButton(event, area, sensor)
      }
    }
  }


});
