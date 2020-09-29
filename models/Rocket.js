"use strict";
var Rocket = /** @class */ (function () {
    function Rocket(id) {
        this.thrusters = [];
        this.id =
            !id || id.trim().length === 0
                ? "not specified"
                : id.trim().length !== 8
                    ? "wrong code format"
                    : id.trim().toUpperCase();
        Rocket.list.push(this); // save instances in class
    }
    Object.defineProperty(Rocket.prototype, "setThrusters", {
        // setter
        set: function (thrusters) {
            this.thrusters = thrusters;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rocket.prototype, "getThrusters", {
        // getters
        get: function () {
            return this.thrusters;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rocket.prototype, "getId", {
        get: function () {
            return this.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rocket, "getRocketList", {
        get: function () {
            return Rocket.list;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rocket, "getMinThrustersLength", {
        get: function () {
            return Rocket.minThrustersLength;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rocket, "getPowerIncrement", {
        get: function () {
            return Rocket.powerIncrement;
        },
        enumerable: false,
        configurable: true
    });
    // methods
    Rocket.getListLength = function () {
        return Rocket.list.length;
    };
    Rocket.prototype.thrustersLength = function () {
        return this.thrusters.length;
    };
    Rocket.prototype.totalMaxThrust = function () {
        var maxPowerList = "";
        if (this.thrusters.length >= Rocket.minThrustersLength) {
            for (var _i = 0, _a = this.thrusters; _i < _a.length; _i++) {
                var thruster = _a[_i];
                maxPowerList += thruster.getMaxThrust + ", ";
            }
            // remove last ", "
            maxPowerList = maxPowerList.substr(0, maxPowerList.length - 2);
        }
        else if (this.thrusters.length > 0) {
            maxPowerList = "insuficient thrusters";
        }
        else
            maxPowerList = "no thrusters specified";
        return maxPowerList;
    };
    Rocket.prototype.currentThrust = function () {
        var thurstersPowerList = "";
        if (this.thrusters.length >= Rocket.minThrustersLength) {
            for (var _i = 0, _a = this.thrusters; _i < _a.length; _i++) {
                var thruster = _a[_i];
                thurstersPowerList += thruster.getCurrentThrust + ", ";
            }
            // remove last ", "
            thurstersPowerList = thurstersPowerList.substr(0, thurstersPowerList.length - 2);
        }
        else if (this.thrusters.length > 0) {
            thurstersPowerList = "insuficient thrusters";
        }
        else
            thurstersPowerList = "no thrusters specified";
        return thurstersPowerList;
    };
    Rocket.prototype.totalPower = function () {
        var sum = 0;
        for (var _i = 0, _a = this.thrusters; _i < _a.length; _i++) {
            var thruster = _a[_i];
            sum += thruster.getCurrentThrust;
        }
        return sum;
    };
    Rocket.prototype.speedUp = function () {
        for (var _i = 0, _a = this.thrusters; _i < _a.length; _i++) {
            var thruster = _a[_i];
            // max power is 120
            if (this.totalPower() < 120) {
                // limit each thruster
                if (thruster.getCurrentThrust + 10 <= thruster.getMaxThrust)
                    thruster.setCurrentThrust = thruster.getCurrentThrust + 10;
            }
        }
    };
    Rocket.prototype.speedDown = function () {
        for (var _i = 0, _a = this.thrusters; _i < _a.length; _i++) {
            var thruster = _a[_i];
            // disable negative currentThrust
            thruster.setCurrentThrust = thruster.getCurrentThrust > 0 ? thruster.getCurrentThrust - 10 : 0;
        }
    };
    // static props
    Rocket.list = [];
    Rocket.minThrustersLength = 2;
    Rocket.powerIncrement = 10;
    return Rocket;
}());
