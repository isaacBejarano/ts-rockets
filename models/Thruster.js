"use strict";
var Thruster = /** @class */ (function () {
    function Thruster(model, // default
    maxThrust) {
        if (model === void 0) { model = ""; }
        if (maxThrust === void 0) { maxThrust = Thruster.minThrust; }
        this.model = model;
        this.maxThrust = maxThrust;
        // prettier-ignore
        this.model =
            !model || model.trim() === ""
                ? "not specified"
                : model.trim();
        // prettier-ignore
        this.maxThrust =
            maxThrust < Thruster.minThrust
                ? Thruster.minThrust
                : maxThrust;
    }
    Object.defineProperty(Thruster.prototype, "getMaxThrust", {
        // getter
        // get getModel() {
        // 	return this.model;
        // }
        get: function () {
            return this.maxThrust;
        },
        enumerable: false,
        configurable: true
    });
    Thruster.minThrust = 0; // default
    return Thruster;
}());
