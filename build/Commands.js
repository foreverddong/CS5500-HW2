export class CommandBase {
    static ParseCommand(input) {
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
                res.mode = segs[1];
                return res;
            }
        }
    }
}
export class TemperatureAccess extends CommandBase {
}
export class TemperatureSet extends CommandBase {
}
export class ModeAccess extends CommandBase {
}
export class ModeSet extends CommandBase {
}
//# sourceMappingURL=Commands.js.map