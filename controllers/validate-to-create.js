"use strict";
// <form> 1 -> Rocket
inputRocket === null || inputRocket === void 0 ? void 0 : inputRocket.addEventListener("input", function () {
    validateRocketCSS(this);
});
formRocket === null || formRocket === void 0 ? void 0 : formRocket.addEventListener("submit", function (e) {
    validateToCreateRocket(e, this, inputRocket, formThrusters);
});
// <form> 2 -> Thrusters
// inputRocketCode?.addEventListener("input", function () {
// 	validateThrustersCSS(this);
// });
// formCreateRocket?.addEventListener("submit", function (e) {
// 	validateToAddThrusters(e, this, inputRocketCode);
// });
/* LIB */
// 1. validate "Rocket" CSS
function validateRocketCSS(thisRef) {
    thisRef.value.length === 8
        ? (thisRef.classList.add("is-valid"), thisRef.classList.remove("is-invalid"))
        : (thisRef.classList.add("is-invalid"), (feedbacRocket.textContent = '"Rocket Code" must have exactly 8 digits'));
}
// 1. validate "Thrusters" CSS
function validateThrustersCSS() { }
// 2. validate "Rocket" value
function validateToCreateRocket(e, thisRef, validateRef, thatRef1) {
    if (validateRef.value.length === 8) {
        // 1. new instance saved in Rocket.list
        var rocket = new Rocket(validateRef.value);
        // alert(`Rocket ${rocket.getId} successfully created`);
        // 2. clear <form> input + CSS
        thisRef.reset();
        validateRef.classList.remove("is-valid");
        // 3. reset previous List + re-render to update List
        renderListReset();
        renderList();
        addSpeedEvent();
        // 3. Disable Rocket <form> till Thruster <form> is submited
        inputRocket.disabled = true;
        inputRocket.classList.toggle("is-not-allowed");
        btnSubmitRocket.disabled = true;
        btnSubmitRocket.classList.toggle("is-not-allowed");
        // 4. show <form2>
        thatRef1.classList.toggle("is-none");
        // NOTE 1: variable "rocket" destroyed after Fn {} scope
        // NOTE 2: rockets saved in class Rocket, not in Global!
    }
    else {
        validateRef.classList.add("is-invalid");
        feedbacRocket.textContent = '"Rocket Code" must have exactly 8 digits';
        e.preventDefault();
        e.stopPropagation();
    }
}
