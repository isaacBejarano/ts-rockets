class Thruster {
	// static props
	private static readonly minThrust: number = 0; // default
	// instance props
	private currentPower: number = 0; // default
	
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
	set setCurrentPower(x: number) {
		this.currentPower = x;
	}

	// getters
	get getMaxThrust(): number {
		return this.maxThrust;
	}

	get getCurrentPower(): number {
		return this.currentPower;
	}
}
