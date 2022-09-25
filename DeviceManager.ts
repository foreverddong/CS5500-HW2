import { SessionManager } from "SessionManager";

export class DeviceManager {
    private session : SessionManager

    public constructor(s : SessionManager) {
        this.session = s;
    }

    public async CurrentTemperature() : Promise<number> {
        
    }
}