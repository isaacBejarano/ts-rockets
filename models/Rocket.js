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
        // count + list instances
        Rocket.count++;
        Rocket.list.push(this);
    }
    Object.defineProperty(Rocket.prototype, "setThrusters", {
        // setter
        set: function (thrusters) {
            this.thrusters = thrusters;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rocket.prototype, "getId", {
        // getters
        get: function () {
            return this.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rocket.prototype, "getThrusters", {
        get: function () {
            return this.thrusters;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rocket, "getRocketList", {
        get: function () {
            return this.list;
        },
        enumerable: false,
        configurable: true
    });
    // methods
    Rocket.prototype.totalThrusters = function () {
        return this.thrusters.length;
    };
    Rocket.prototype.totalMaxThrust = function () {
        var maxPowerList = "";
        if (this.totalThrusters() >= Rocket.minThrusters) {
            for (var _i = 0, _a = this.thrusters; _i < _a.length; _i++) {
                var thruster = _a[_i];
                maxPowerList += thruster.getMaxThrust + ", ";
            }
            // remove last ", "
            maxPowerList = maxPowerList.substr(0, maxPowerList.length - 2);
        }
        else if (this.totalThrusters() > 0) {
            maxPowerList = "insuficient thrusters";
        }
        else
            maxPowerList = "no thrusters specified";
        return maxPowerList;
    };
    Rocket.prototype.currentThrust = function () {
        var currentThrustList = "";
        if (this.totalThrusters() >= Rocket.minThrusters) {
            for (var _i = 0, _a = this.thrusters; _i < _a.length; _i++) {
                var thruster = _a[_i];
                currentThrustList += thruster.getCurrentPower + ", ";
            }
            // remove last ", "
            currentThrustList = currentThrustList.substr(0, currentThrustList.length - 2);
        }
        else if (this.totalThrusters() > 0) {
            currentThrustList = "insuficient thrusters";
        }
        else
            currentThrustList = "no thrusters specified";
        return currentThrustList;
    };
    Rocket.prototype.currentPower = function () {
        var sum = 0;
        this.thrusters.forEach(function (thruster) {
            sum += thruster.getCurrentPower;
        });
        return sum;
    };
    Rocket.prototype.speedUp = function () {
        for (var i = 0; i < this.totalThrusters(); i++) {
            // prettier-ignore
            this.thrusters[i].setCurrentPower =
                this.thrusters[i].getCurrentPower + Rocket.powerIncrement;
        }
    };
    // toString
    Rocket.prototype.totalThrustersToString = function () {
        return this.totalThrusters().toString();
    };
    Rocket.countToString = function () {
        return this.count.toString();
    };
    Object.defineProperty(Rocket, "getMinThrusters", {
        get: function () {
            return this.minThrusters;
        },
        enumerable: false,
        configurable: true
    });
    Rocket.list = [];
    Rocket.minThrusters = 2;
    Rocket.powerIncrement = 10;
    Rocket.count = 0;
    return Rocket;
}());
