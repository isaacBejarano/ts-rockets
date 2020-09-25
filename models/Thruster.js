"use strict";
var Thruster = /** @class */ (function () {
    function Thruster(
    // prettier-ignore
    name, maxThrust // min
    ) {
        if (maxThrust === void 0) { maxThrust = 0; }
        this.name = name;
        this.maxThrust = maxThrust;
        this.name = name !== "" ? name : "not specified";
    }
    Object.defineProperty(Thruster.prototype, "getMaxThrust", {
        // getter
        get: function () {
            return this.maxThrust;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Thruster.prototype, "getName", {
        get: function () {
            return this.name;
        },
        enumerable: false,
        configurable: true
    });
    return Thruster;
}());
