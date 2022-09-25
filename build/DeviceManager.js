import fetch from 'node-fetch';
import { TemperatureAccess, TemperatureSet } from "./Commands.js";
export class DeviceManager {
    constructor(s) {
        this.baseUrl = "https://smartdevicemanagement.googleapis.com/v1/";
        this.session = s;
    }
    get headers() {
        return {
            "Content-Type": "application/json",
            "Authorization": this.session.AccessToken
        };
    }
    async ThermostatName() {
        let response = await fetch(`${this.baseUrl}enterprises/${this.session.ProjectID}/devices`, {
            headers: this.headers
        });
        let responseJson = (await response.json());
        let deviceName = responseJson["devices"][0]["name"];
        return deviceName;
    }
    async CurrentTemperature() {
        let response = await fetch(`${this.baseUrl}${await this.ThermostatName()}`, {
            headers: this.headers
        });
        let responseJson = (await response.json());
        let temp = responseJson["traits"]["sdm.devices.traits.Temperature"]["ambientTemperatureCelsius"];
        return temp;
    }
    async SetTemperature(temp) {
        let response = await fetch(`${this.baseUrl}${await this.ThermostatName()}:executeCommand`, {
            headers: this.headers,
            body: JSON.stringify({
                "command": "sdm.devices.commands.ThermostatTemperatureSetpoint.SetCool",
                "params": {
                    "coolCelsius": temp
                }
            }),
            method: "POST"
        });
        let responsetext = await response.text();
    }
    async Execute(cmd) {
        if (cmd instanceof TemperatureAccess) {
            return (await this.CurrentTemperature()).toString();
        }
        else if (cmd instanceof TemperatureSet) {
            await this.SetTemperature(cmd.targetTemp);
        }
    }
}
//# sourceMappingURL=DeviceManager.js.map