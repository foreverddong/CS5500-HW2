import fetch from 'node-fetch';
export class DeviceManager {
    constructor(s) {
        this.baseUrl = "https://smartdevicemanagement.googleapis.com/v1/enterprises/";
        this.session = s;
    }
    get headers() {
        return {
            "Content-Type": "application/json",
            "Authorization": this.session.AccessToken
        };
    }
    async ThermostatName() {
        let response = await fetch(`${this.baseUrl}${this.session.ProjectID}/devices`, {
            headers: this.headers
        });
        let responseJson = (await response.json());
        let deviceName = responseJson["devices"][0]["name"];
        return deviceName;
    }
}
//# sourceMappingURL=DeviceManager.js.map