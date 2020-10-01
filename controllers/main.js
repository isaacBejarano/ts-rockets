"use strict";
/* TEST
const testRocket2 = new Rocket("test0001"); // no thrusters specified
const testRocket4 = new Rocket("test000222222"); // wrong code format
const testRocket5 = new Rocket("t005"); // wrong code format
const testRocket6 = new Rocket("     "); // not specified
const testRocket7 = new Rocket(""); // not specified
const testRocket8 = new Rocket(); // not specified
const testRocket9 = new Rocket("   test0009   "); // OK / .trim()
testRocket9.setThrusters = [new Thruster("    Merlin-10      ", 10)]; // {"Merlin", 0} // OK / .trim()
testRocket9.setThrusters = [new Thruster(" Merlin  ", -8)]; // {"Merlin", 0}
testRocket9.setThrusters = [new Thruster()]; // {"not specified", 0}
testRoket9.setThrusters = [new Thruster()]; // {"not specified", 0}
*/
// Hardcoded Private Static Instances
(function () {
    var rocket = new Rocket("32wessds"); // instance 1
    // add thrusters to instance 1
    rocket.setThrusters = [new Thruster("Merlin-10", 10), new Thruster("Merlin-30", 30), new Thruster("Methalox-80", 80)];
    // re-assign instance
    rocket = new Rocket("ldsfja32"); // instance 2
    // add thrusters to instance 2
    rocket.setThrusters = [
        new Thruster("Merlin-30", 30),
        new Thruster("Merlin-40", 40),
        new Thruster("Merlin-50", 50),
        new Thruster("Raptor-50", 50),
        new Thruster("Raptor-30", 30),
        new Thruster("Raptor-10", 10),
    ];
    // NOTE 1: variable "rocket" destroyed after Fn{} scope
    // NOTE 2: rockets saved in class Rocket, not in Global!
})();
/* REFS */
// List of Rockets
var outletList = document.getElementById("list-all-rockets");
var outletP = document.getElementById("counter-rockets");
var outletSpan = document.querySelector("#counter-rockets .outlet");
var btnList = document.getElementById("btn-show-all-rockets");
// Rocket <form>
var btnNew = document.getElementById("btn-create-rocket");
var formRocket = document.getElementById("form-create-rocket");
var inputRocket = document.getElementById("input-rocket-code");
var feedbackRocket = document.querySelector("#" + inputRocket.id + " ~ div.invalid-feedback");
var btnSubmitRocket = document.getElementById("btn-submit-rocket");
// Thrusters <form>
var btnAdd = document.getElementById("btn_add_thruster");
var btnRemove = document.getElementById("btn-remove-last");
var provisionalThrustersList = document.getElementById("provisional-thrusters-list");
var formThrusters = document.getElementById("form-add-thrusters");
var inputThrusterModel = document.getElementById("input-thruster-model");
var inputMaxThrust = document.getElementById("input-max-thrust");
var feedbackThrusterMax = document.querySelector("#" + inputMaxThrust.id + " ~ div.invalid-feedback");
/* EVENTS */
// 1. List of Rockets
btnList.addEventListener("click", function () {
    renderListReset(); //reset previous render
    renderList(); // new render
    addSpeedEvent(); // add speed event
    // show list
    outletP.classList.toggle("is-hidden");
    outletList.classList.toggle("is-hidden");
});
// 2. <form> -> Rocket / show
btnNew.addEventListener("click", function () {
    formRocket.classList.toggle("is-none");
});
// 2. <form> -> Rocket / create
inputRocket.addEventListener("input", function () {
    validateRocketCSS(this);
});
formRocket.addEventListener("submit", function (e) {
    validateToCreateRocket(e, this, inputRocket, formThrusters);
});
// 3. <form> -> Thrusters / Add to "Provisional List of Thrusters"
inputMaxThrust.addEventListener("input", function () {
    validateMaxThrustCSS(this);
});
btnAdd.addEventListener("click", function () {
    validateToProvisionalTrusterList(inputThrusterModel, inputMaxThrust);
});
// 4. <form> -> Thrusters / Remove from "Provisional List of Thrusters"
btnRemove.addEventListener("click", function () {
    var lastRocket = Rocket.getList[Rocket.getListLength() - 1];
    // pop to last Rocket's Provisional List of Thrusters
    lastRocket.removeFromProvisionalThrustersList();
    // show updated provisional List
    renderProvisionalThrustersList(lastRocket);
});
// 5. <form> -> Thrusters / Accept "List of Thrusters"
formThrusters.addEventListener("submit", function () {
    var lastRocket = Rocket.getList[Rocket.getListLength() - 1];
    // save final accepted Thrusters List
    lastRocket.setThrusters = lastRocket.getProvisionalThrustersList;
    // destroy provisional Thrusters List + clean outlet
    lastRocket.setProvisionalThrustersList = [];
    renderProvisionalThrustersList(lastRocket);
    // enable Rocket <form> for next instances
    disableFormRocket(false);
    inputRocket.value = "";
    // 3. reset previous List + re-render to update List
    renderListReset();
    renderList();
    addSpeedEvent();
    // close all <form>
    alert("Rocket " + lastRocket.getId + " successfully created");
    formRocket.classList.toggle("is-none");
    formThrusters.classList.toggle("is-none");
});
