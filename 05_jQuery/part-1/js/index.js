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

        if(jbulbNode.css("color") == "rgb(255, 0, 0)"){
            jbulbNode.css("color") == "rgb(0, 0, 0)";
        }
        else{
            jbulbNode.css("color") == "rgb(255, 0, 0)";
        }
    };

    const tempToggle = $('#temp-toggle'); //-> jQuery -> vai buscar todos os identificadores com temp-toogle, mas como é um id so deve de haver um assim
    tempToggle.on('click',toggleButton); // vai buscar o envento e diz qual é o evento, neste caso 'click'
    tempToggle.click(changeTemperature);

    const lightToggle = $('#light-toggle');
    lightToggle.click('click',toggleButton);
    lightToggle.click(changeLightBulb);

});