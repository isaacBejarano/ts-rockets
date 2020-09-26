class Thruster {
	static minThrust: number = 0; // default

	constructor(
		private readonly model: string = "", // default
		private readonly maxThrust: number = Thruster.minThrust
	) {
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

	// getter
	// get getModel() {
	// 	return this.model;
	// }

	get getMaxThrust() {
		return this.maxThrust;
	}
}
