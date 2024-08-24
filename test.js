const fs = require('fs');

function logMessage(message) {
    fs.appendFile("test.log", message + "\n", (err) => {
        if (err) console.error("Failed to write to log file:", err);
        else console.log("Log updated:", message);
    });
}

let counter = 1;
logMessage(Date.now() + " :" + counter.toString());
counter++;
setInterval(() => {
    logMessage(Date.now() + ": " + counter);
    counter++;
}, 1000);
                                                  
