import { SessionManager } from "./SessionManager.js" 
import * as readline from "readline-sync"
import { DeviceManager } from "./DeviceManager.js";

console.log("Nest Thermostat Controller");

let secretPath = process.argv[2];

let s  = (new SessionManager());
await s.LoadSecret(secretPath);
console.log(`Auth URL: ${s.AuthURL} \n`);
let auth = readline.question("Authorize with google account and paste redirected URL here...\n");
//Example redirected URL:
//auth = "https://www.google.com/?code=4/0ARtbsJqknUXn0693wvuU-DKfsNwQqO2DVOl93w1oAWPsxR_ytDrMpPLAE6fX-RA1Ri-X6Q&scope=https://www.googleapis.com/auth/sdm.service";

let authcode = auth.match(new RegExp("(.*)(code=)(.*)(&scope=)(.*)"))[3];
await s.ObtainToken(authcode);
console.log("Found Auth code, getting tokens...");
console.log(`Access Token: ${s.AccessToken}\nRefresh Token: ${s.RefreshToken}`);

let manager = new DeviceManager(s);
console.log(await manager.ThermostatName());

while (true) {
    console.log("Enter a Command, or HELP:");
    let cmd = readline.question();
    switch (cmd) {
        case "HELP":
    }
}
