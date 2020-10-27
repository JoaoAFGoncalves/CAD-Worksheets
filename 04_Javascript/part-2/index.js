(function() {
    "use strict";

    window.alert("Hello World!")
    
    function toggleButton(e){
        let classValue = e.target.getAttribute("class");
        if(classValue.includes("-off")){
            classValue = classValue.replace("-off", "-on");
        }
        else {
            classValue = classValue.replace("-on", "-off");
        }
        e.target.setAttribute('class', classValue);
        console.log(classValue);
    };

    function changeTemperature(){
        const tempNode = document.getElementById("temp-indicator");
        tempNode.textContent =  Number(Math.round((Math.random() *40)*100)/100);

        if(tempNode.textContent>=30){
            termometro.style.color = 'Red';
        }
        if(tempNode.textContent>=22 && tempNode.textContent<30){
            termometro.style.color = 'DarkOrange';
            console.log("entrou")
        }
        if(tempNode.textContent>=5 && tempNode.textContent<22){
            termometro.style.color = 'Gold';
            console.log("entrou")
        }
        if(tempNode.textContent<5){
            termometro.style.color = 'Blue';
        }
    };

    function changeLightBulb(){
        const bulbNode = document.getElementById("bulb").querySelector("i");
        let classValue = bulbNode.getAttribute("class");
        if(classValue.includes("far ")){
            classValue = classValue.replace("far ", "fas ");
            bulb.style.color = '#f8da4c';
            
        }
        else {
            classValue = classValue.replace("fas ", "far ");
            bulb.style.color = '#000000';
        }
        bulbNode.setAttribute('class', classValue);
        console.log(classValue);
    };

    const tempToggle = document.getElementById('temp-toggle');
    tempToggle.addEventListener('click',toggleButton);
    tempToggle.addEventListener('click',changeTemperature);

    const lightToggle = document.getElementById('light-toggle');
    lightToggle.addEventListener('click',toggleButton);
    lightToggle.addEventListener('click',changeLightBulb);

})();