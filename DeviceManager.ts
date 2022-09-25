import { SessionManager } from "./SessionManager.js"
import fetch from 'node-fetch'
import { CommandBase, TemperatureAccess, TemperatureSet } from "./Commands.js";

export class DeviceManager {
    private session : SessionManager
    private baseUrl = "https://smartdevicemanagement.googleapis.com/v1/"
    private get headers() {
        return {
            "Content-Type" : "application/json",
            "Authorization" : this.session.AccessToken
        };
    }

    public constructor(s : SessionManager) {
        this.session = s;
    }

    public async ThermostatName() : Promise<string> {
        //BREAKS PRINCIPLE 3 - REPEATING
        let response = await fetch(`${this.baseUrl}enterprises/${this.session.ProjectID}/devices`,
        {
            headers : this.headers
        });
        let responseJson = (await response.json()) as any;
        let deviceName : string = responseJson["devices"][0]["name"];
        return deviceName;
    }

    public async CurrentTemperature() : Promise<number> {
        //BREAKS PRINCIPLE 3 - REPEATING
        let response = await fetch (`${this.baseUrl}${await this.ThermostatName()}`,
        {
            headers : this.headers
        });
        let responseJson = (await response.json()) as any;
        let temp : number  = responseJson["traits"]["sdm.devices.traits.Temperature"]["ambientTemperatureCelsius"];
        return temp;
    }

    public async SetTemperature(temp : number) {
        //BREAKS PRINCIPLE 3 - REPEATING
        let response = await fetch (`${this.baseUrl}${await this.ThermostatName()}:executeCommand`, 
        {
            headers: this.headers,
            body: JSON.stringify({
                "command" : "sdm.devices.commands.ThermostatTemperatureSetpoint.SetCool",
                "params" : {
                    "coolCelsius" : temp
                }
            }),
            method : "POST"
        });
        let responsetext = await response.text();
    }

    public async Execute(cmd : CommandBase) : Promise<string> {
        // BREAKS OOP PRINCIPLE 4 - USE DYNAMIC DISPATCH
        if (cmd instanceof TemperatureAccess)
        {
            return (await this.CurrentTemperature()).toString();
        } else if (cmd instanceof TemperatureSet)
        {
            await this.SetTemperature(cmd.targetTemp);
        }
    }
}