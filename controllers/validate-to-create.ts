inputRocketCode?.addEventListener("input", function () {
	validateCreateRocketCSS(this);
});

formCreateRocket?.addEventListener("submit", function (e) {
	validateBeforeCreateRocket(e, this, inputRocketCode);
});

/* LIB */

// 1. validate "Rocket Code" CSS
function validateCreateRocketCSS(thisRef: HTMLInputElement): void {
	thisRef.value.length === 8
		? (thisRef.classList.add("is-valid"), thisRef.classList.remove("is-invalid"))
		: (thisRef.classList.add("is-invalid"),
		  (feedbacRocketCode.textContent = '"Rocket Code" must have exactly 8 digits'));
}

// 2. validate "Rocket Code" value
function validateBeforeCreateRocket(e: Event, thisRef: HTMLFormElement, ref: HTMLInputElement): void {
	let x;

	if (ref.value.length === 8) {
		// update Rocket.list
		new Rocket(ref.value);

		// clear form input + CSS
		thisRef.reset();
		ref.classList.remove("is-valid");

		// remove previous render
		renderListReset();

		renderList(); // create updated list
	} else {
		ref.classList.add("is-invalid");
		feedbacRocketCode.textContent = '"Rocket Code" must have exactly 8 digits';
		e.preventDefault();
		e.stopPropagation();
	}
}