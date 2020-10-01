class Thruster {
	// static props
	private static readonly minThrust: number = 0; // default
	// instance props
	private currentThrust: number = 0; // default

	constructor(
		private readonly model: string = "", // default
		private readonly maxThrust: number = Thruster.minThrust
	) {
		// prettier-ignore
		this.model = 
			(!model || model.trim() === "")
				? "not specified"
				: model.trim();

		// prettier-ignore
		this.maxThrust = 
			maxThrust < Thruster.minThrust
				? Thruster.minThrust
				: maxThrust;
	}

	// setters
	set setCurrentThrust(x: number) {
		this.currentThrust = x;
	}

	// getters
	get getCurrentThrust(): number {
		return this.currentThrust;
	}

	get getModel() {
		return this.model;
	}

	get getMaxThrust(): number {
		return this.maxThrust;
	}

	static get getMinThrust() {
		return Thruster.minThrust;
	}
}
