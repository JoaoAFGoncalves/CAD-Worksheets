$(function() {
    "use strict";

    window.alert("Hello World!")

    let kitchen ={
        temp:{
            status: false,
            time: null
        },
        light:{
            status: false,
            time: null
        }
    }

    const tempToggle = $("#temp-toggle");  //-> jQuery -> vai buscar todos os identificadores com temp-toogle, mas como é um id so deve de haver um assim
    const tempTime = $("#temp-time");

    const lightToggle = $("#light-toggle");
    const lightTime = $("#light-time");


    function toggleButton(e){
        if(this == tempToggle.get(0)){
            kitchen.temp.status = !kitchen.temp.status;
            kitchen.temp.time = new Date();
            tempTime.text('just now');
            //sessionStorage.set("kitchen_temp_status",kitchen.temp.status);
            //sessionStorage.set("kitchen_temp_time",kitchen.temp.time.toISOString());
            console.log(kitchen.temp);
        }

        if(this == lightToggle.get(0)){
            kitchen.light.status = !kitchen.light.status;
            kitchen.light.time = new Date();
            lightTime.text('just now');
            //sessionStorage.set("kitchen_light_status",kitchen.light.status);
            //sessionStorage.set("kitchen_light_time",kitchen.light.time.toISOString());
            console.log(kitchen.light);
        }

        const j = $(this).find("i")
        j.toggleClass("fa-toggle-off");
        j.toggleClass("fa-toggle-on");
        e.preventDefault();
    };

    function changeTemperature(){
        const jtempNode = $("#temp-indicator");
        jtempNode.text(Number(Math.round((Math.random() *40)*100)/100));
    };

    function changeLightBulb(){
        const jbulbNode = $("#bulb i");
        jbulbNode.toggleClass("far ");
        jbulbNode.toggleClass("fas ");
        console.log(jbulbNode.css("color"));
        if(jbulbNode.css("color") == "rgb(255, 0, 0)"){
            jbulbNode.css("color", "rgb(0, 0, 0)");
        }
        else{
            jbulbNode.css("color", "rgb(255, 0, 0)");
        }
    };

    tempToggle.on('click',toggleButton); // vai buscar o envento e diz qual é o evento, neste caso 'click'
    tempToggle.click(changeTemperature);

    lightToggle.click(toggleButton);
    lightToggle.click(changeLightBulb);


    function updateKitchenTime(time,textNode){
        let now = Date.now(); //response in miliseconds
        if(!time){
            return;
        }
        let sec = (now - time.getTime())/1000;
        if(sec < 60){
            textNode.text(sec.toFixed(0) + "sec ago");
        }else {
            let min = sec/60;
            if(min < 60){
                textNode.text(min.toFixed(0) + "min ago");
            }else{
                let hour = min/60;
                textNode.text(hour.toFixed(0) + "hour ago");
            }
        }
    }

    var kitchenTimer = setInterval(function() {
        updateKitchenTime(kitchen.light.time,lightTime);
        updateKitchenTime(kitchen.temp.time,tempTime);
    }, 1000);

   function loadInitialValue(){
        kitchen.temp.status = Boolean(sessionStorage.getItem("kitchen_temp_status"));
        let storedTime = sessionStorage.getItem("kitchen_temp_time");
        if(storedTime){
            kitchen.temp.time = new DataCue(storedTime);
        }

        kitchen.light.status = Boolean(sessionStorage.getItem("kitchen_light_status"));
        storedTime = sessionStorage.getItem("kitchen_light_time");
        if(storedTime){
            kitchen.light.time = new DataCue(storedTime);
        }
        updateKitchenTime(kitchen.temp.time, tempTime);
        updateKitchenTime(kitchen.light.time, tempTime);

    }

    loadInitialValue();
    

   const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=leiria&appid=99e8816c532767f0cae8ae72bee738bb";

    var timeOfUpdate = null;
    var intervalID = null;
    function fetchwaether(){
        $.getJSON(weatherUrl, function (data){
            timeOfUpdate = Date.now(); //tempo deste 1970
            updateFetchedTime();

            $("#weather-temp").text(data.main.temp);
            $("#weather-max-temp").text(data.main.temp_max);
            $("#weather-min-temp").text(data.main.temp_min);
            $("#weather-humidity").text(data.main.humidity);
            $("#weather-sunrise").text(new Date(data.sys.sunrise*1000).toLocaleDateString());
            $("#weather-sunset").text(new Date(data.sys.sunset*1000).toLocaleDateString());
            // update time in "updated at"
            $("#weather-update").text(new Date().getDate());

            if(intervalID){
                intervalID.clearInterval();
            }else{
                intervalID = setInterval(updateFetchedTime,1000);
            }

            console.log(data);
        });
    }

    function updateFetchedTime(){
        let now = new Date();
        let secondsDiff = (now - timeOfUpdate)/1000;
        if (secondsDiff < 60){
            $("#weather-timeupdateat").text(secondsDiff.toFixed(0) + "sec.");
        }else{
            let minutesDiff = secondsDiff/60;
            if (minutesDiff < 60){
                $("#weather-timeupdateat").text(minutesDiff.toFixed(0) + "min.");
            }else{
                let hoursDiff = minutesDiff/60
                    $("#weather-timeupdateat").text(hoursDiff.toFixed(0) + "h");
            }   
        }
    }

    fetchwaether();


});