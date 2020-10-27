$(function() {
    "use strict";

    window.alert("Hello World!")
    
    function toggleButton(e){
        const j = $(this).find("i")
        j.toggleClass("fa-toggle-off");
        j.toggleClass("fa-toggle-on");
    };

    function changeTemperature(){
        const jtempNode = $("#temp-indicator");
        jtempNode.text(Number(Math.round((Math.random() *40)*100)/100));
        
        /*
        if(jtempNode.text>=25){
            termometro.style.color = 'Red';
            console.log("red");
        }
        if(jtempNode.text>=18 && jtempNode.text<25){
            termometro.style.color = 'DarkOrange';
            console.log("orange");
        }
        if(jtempNode.text>=10 && jtempNode.text<18){
            termometro.style.color = 'Gold';
            console.log("gold");
        }
        if(jtempNode.text<10){
            termometro.style.color = 'Blue';
            console.log(classValue);
        }
        */
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

    const tempToggle = $('#temp-toggle'); //-> jQuery -> vai buscar todos os identificadores com temp-toogle, mas como é um id so deve de haver um assim
    tempToggle.on('click',toggleButton); // vai buscar o envento e diz qual é o evento, neste caso 'click'
    tempToggle.click(changeTemperature);

    const lightToggle = $('#light-toggle');
    lightToggle.click('click',toggleButton);
    lightToggle.click(changeLightBulb);

   /* const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=​leiria​&appid=7c27cea2600fb5ebca43e487303b18f9​"​;

    

    var timeOfUpdate = null;

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
            $("#weather-update").text(new Date());
            
            console.log(data);
        })
    }

    function updateFetchedTime(){
        let now = new Date();
        let secondsDiff = (now - timeOfUpdate)/1000;
        if (secondsDiff < 60){
            $("#weather-timeupdateat").text(secondsDiff + "sec.");
        }else{
            let minutesDiff = secondsDif/60;
            if (minutesDiff < 60){
                $("#weather-timeupdateat").text(minutesDiff + "min.");
            }else{
                let hoursDiff = minutesDiff/60
                    $("#weather-timeupdateat").text(hoursDiff + "h");
            }   
        }
    }

    fetchwaether();*/
});