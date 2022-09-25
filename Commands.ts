export type Command = TemperatureAccess | TemperatureSet | TemperatureAccess | TemperatureSet;
export type TemperatureAccess = {};
export type TemperatureSet = {
    targetTemp : number
};
export type ModeAccess = {};
export type ACModes = "HEAT" | "COOL";
export type ModeSet = {
    mode : ACModes
};

export function parseCommand(input : string) : Command {
    const segs = input.split(" ");
    switch (segs[0]) {
        case "TEMP": {
            return <TemperatureAccess>{};
        }
        case "SETTEMP": {
            return {
                targetTemp : parseInt(segs[1])
            };
        }
        case "MODE": {
            return <ModeAccess>{};
        }
        case "MODESET": {
            return {
                mode : segs[1]
            };
        }   
    }
}
