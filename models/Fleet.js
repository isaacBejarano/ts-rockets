"use strict";
var Fleet = /** @class */ (function () {
    function Fleet() {
        this.fleet = [];
    }
    Object.defineProperty(Fleet.prototype, "getFleet", {
        // getters
        get: function () {
            return this.fleet;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Fleet.prototype, "setFleet", {
        // setters
        set: function (fleet) {
            this.fleet =
                fleet.length >= 2
                    ? fleet
                    : [
                        // prettier-ignore
                        new Rocket('Add 2 or more "Rockets" to the "Fleet"'),
                        new Rocket('Add 2 or more "Rockets" to the "Fleet"'),
                    ];
        },
        enumerable: false,
        configurable: true
    });
    // toString
    Fleet.prototype.toString = function () {
        console.log(this.fleet);
    };
    return Fleet;
}());
