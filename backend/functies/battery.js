const fs = require('fs')
const { exec, execSync } = require('child_process')

let sent = false
setInterval(() => {
    let percentage = fs.readFileSync("/sys/class/power_supply/BAT0/capacity").toString() 
    let charging = ~execSync("acpi -a").indexOf("on-line")
    if(percentage <= 15 && !charging && !sent){
        sent = true
        exec('echo "low battery" | dmenu')
    }else if (charging) sent = false
}, 60000)
