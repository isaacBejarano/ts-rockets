"use strict";
var Thruster = /** @class */ (function () {
    function Thruster(model, // default
    maxThrust) {
        if (model === void 0) { model = ""; }
        if (maxThrust === void 0) { maxThrust = Thruster.minThrust; }
        this.model = model;
        this.maxThrust = maxThrust;
        // instance props
        this.currentPower = 0; // default
        // prettier-ignore
        this.model =
            (!model || model.trim() === "")
                ? "not specified"
                : model.trim();
        // prettier-ignore
        this.maxThrust =
            maxThrust < Thruster.minThrust
                ? Thruster.minThrust
                : maxThrust;
    }
    Object.defineProperty(Thruster.prototype, "setCurrentPower", {
        // setters
        set: function (x) {
            this.currentPower += x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Thruster.prototype, "getMaxThrust", {
        // getters
        get: function () {
            return this.maxThrust;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Thruster.prototype, "getCurrentPower", {
        get: function () {
            return this.currentPower;
        },
        enumerable: false,
        configurable: true
    });
    // static props
    Thruster.minThrust = 0; // default
    return Thruster;
}());
