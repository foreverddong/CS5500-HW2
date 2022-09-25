
export abstract class CommandBase {
    static ParseCommand(input : string) : CommandBase {
        const segs = input.split(" ");
        switch (segs[0]) {
            case "TEMP": {
                return new TemperatureAccess();
            }
            case "SETTEMP": {
                let res = new TemperatureSet();
                res.targetTemp = parseInt(segs[1]);
                return res;
            }
            case "MODE": {
                return new ModeAccess();
            }
            case "MODESET": {
                let res = new ModeSet();
                res.mode = <ACModes>segs[1];
                return res;
            }   
        }
    }
}

export class TemperatureAccess extends CommandBase
{

}

export class TemperatureSet extends CommandBase
{
    public targetTemp : number
}
export class ModeAccess extends CommandBase
{
    
}

type ACModes = "HEAT" | "COOL";
export class ModeSet extends CommandBase
{
    public mode : ACModes
}