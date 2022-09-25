import { SessionManager } from "SessionManager"
import fetch from 'node-fetch'

export class DeviceManager {
    private session : SessionManager
    private baseUrl = "https://smartdevicemanagement.googleapis.com/v1/enterprises/"
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
        let response = await fetch(`${this.baseUrl}${this.session.ProjectID}/devices`,
        {
            headers : this.headers
        });
        let responseJson = (await response.json()) as any;
        let deviceName : string = responseJson["devices"][0]["name"];
        return deviceName;
    }

    // public async CurrentTemperature() : Promise<number> {
        
    // }
}