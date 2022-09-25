import { SessionManager } from "./SessionManager.js";
import * as readline from "readline-sync";
import { DeviceManager } from "./DeviceManager.js";
import { CommandBase } from "./Commands.js";
console.log("Nest Thermostat Controller");
let secretPath = process.argv[2];
let s = (new SessionManager());
await s.LoadSecret(secretPath);
console.log(`Auth URL: ${s.AuthURL} \n`);
let auth = readline.question("Authorize with google account and paste redirected URL here...\n");
if (auth != "") {
    let authcode = auth.match(new RegExp("(.*)(code=)(.*)(&scope=)(.*)"))[3];
    await s.ObtainToken(authcode);
}
else {
    await s.Refresh();
}
console.log("Found Auth code, getting tokens...");
console.log(`Access Token: ${s.AccessToken}\nRefresh Token: ${s.RefreshToken}`);
let manager = new DeviceManager(s);
console.log(await manager.ThermostatName());
while (true) {
    console.log("Enter a Command, or HELP:");
    let cmd = readline.question();
    if (cmd == "EXIT") {
        break;
    }
    let command = CommandBase.ParseCommand(cmd);
    console.log(await manager.Execute(command));
}
//# sourceMappingURL=Program.js.map