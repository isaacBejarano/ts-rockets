"use strict";
/* VALIDATIONS */
// 2. "Rocket" - validate CSS
function validateRocketCSS(thisRef) {
    // prettier-ignore
    thisRef.value.length === 8
        ? (thisRef.classList.add("is-valid"),
            thisRef.classList.remove("is-invalid"))
        : (thisRef.classList.add("is-invalid"),
            (feedbackRocket.textContent = '"Rocket Code" must have exactly 8 digits'));
}
// 2. "Rocket" - validate value
function validateToCreateRocket(e, thisRef, inputRef, thatRef) {
    if (inputRef.value.length === 8) {
        // 2.1 new instance saved in Rocket.list
        var rocket = new Rocket(inputRef.value);
        // 2.2 clear <form> input + CSS
        thisRef.reset();
        inputRef.classList.remove("is-valid");
        // 2.3 reset previous render + re-render + add speed event
        resetList();
        renderList();
        addSpeedEvent();
        // 2.4 Disable Rocket <form> till Thruster <form> is submited
        inputRocket.value = rocket.getId;
        disableFormRocket(true);
        // 2.5 show <form2>
        thatRef.classList.toggle("is-none");
        // NOTE 1: variable "rocket" destroyed after Fn {} scope
        // NOTE 2: rockets saved in class Rocket, not in Global!
    }
    else {
        inputRef.classList.add("is-invalid");
        feedbackRocket.textContent = '"Rocket Code" must have exactly 8 digits';
        e.preventDefault();
        e.stopPropagation();
    }
}
// 3. "Provisional List of Thrusters" - validate CSS
function validateMaxThrustCSS(thisRef) {
    // prettier-ignore
    isInt(+thisRef.value) &&
        +thisRef.value >= Thruster.getMinThrust &&
        +thisRef.value % Rocket.getPowerIncrement === 0
        ? thisRef.classList.remove("is-invalid")
        : (thisRef.classList.add("is-invalid"),
            (feedbackThrusterMax.textContent = "\n\t\t\t\"Max.Thrust\" must be 0 or positive multiple of " + Rocket.getPowerIncrement));
}
// 3. "Provisional List of Thrusters" - validate values
function validateToProvisionalTrusterList(
// prettier-ignore
inputRef1, inputRef2) {
    var model = inputRef1.value;
    var maxThrust = Thruster.getMinThrust; // default 0
    var lastRocket = Rocket.getList[Rocket.getListLength() - 1];
    // "Max.Thrust" must be 0 or positive multiple of "Thruster.getMinThrust"
    if (isInt(+inputRef2.value) &&
        +inputRef2.value >= Thruster.getMinThrust &&
        +inputRef2.value % Rocket.getPowerIncrement === 0) {
        maxThrust = +inputRef2.value; // parsed int
        inputRef2.classList.remove("is-invalid"); // CSS
        // push to last Rocket's "Provisional List of Thrusters"
        lastRocket.addToProvisionalThrustersList(new Thruster(model, maxThrust));
        // show "Provisional List of Thrusters"
        renderProvisionalThrustersList(lastRocket);
        // clear input for next "Provisional Thruster"
        inputRef1.value = "";
        inputRef2.value = "";
    }
}
