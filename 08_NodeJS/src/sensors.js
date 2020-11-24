const fs = require('fs');
const path = require('path');

const SENSORS_DIR = path.join('../sensors/')

const sensors = {

};

function readSensor(sensorName) {
    const filename = path.join(SENSORS_DIR, sensorName)
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) throw err;
        // console.log(data);
        sensors[sensorName].value = Number(data);
        sensors[sensorName].dateTime = Date.now;
      });
}

function getSensorFunction (sensorName) {
    return sensors[sensorName]
}


module.exports = {
    addSensor: function (sensorName){
        sensors[sensorName] = {
            value: undefined,
            dateTime: Date.now()
        }
        
        const filename = path.join(SENSORS_DIR, sensorName)
        if (!fs.existsSync(filename)){
            fs.writeFileSync(filename, '0')
        }
        fs.watchFile(filename, (curr, prev) => {
            console.log("the current mtime is: ${curr.mtime}");
            console.log("the previous mtime was: ${prev.mtime}");
        });

    },

    

    getSensor: getSensorFunction // o getSensor é a chave e o getsensorFunction é a função de get
    // tanto se pode fazer da maneira como se fez o get sensor, como da do add sensor, sendo que as key são as que estão antes dos :
}



