class Thruster {
	constructor(
		// prettier-ignore
		private name: string,
		private maxThrust: number = 0 // min
	) {
		this.name = name !== "" ? name : "not specified";
	}

	// getter
	get getMaxThrust() {
		return this.maxThrust;
	}
	get getName() {
		return this.name;
	}
}
