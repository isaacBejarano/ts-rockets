class Rocket {
	private readonly id: string;
	private thrusters: Thruster[] = [];
	private static list: Rocket[] = [];
	static readonly minThrusters: number = 2;
	static readonly powerIncrement: number = 10;
	private static count: number = 0;

	constructor(id?: string) {
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

	// setter
	set setThrusters(thrusters: Thruster[]) {
		this.thrusters = thrusters;
	}

	// getters
	get getId(): string {
		return this.id;
	}

	get getThrusters(): Thruster[] {
		return this.thrusters;
	}

	static get getRocketList(): Rocket[] {
		return this.list;
	}

	// methods
	totalThrusters(): number {
		return this.thrusters.length;
	}

	totalMaxThrust(): string {
		let maxPowerList: string = "";

		if (this.totalThrusters() >= Rocket.minThrusters) {
			for (let thruster of this.thrusters) {
				maxPowerList += thruster.getMaxThrust + ", ";
			}
			// remove last ", "
			maxPowerList = maxPowerList.substr(0, maxPowerList.length - 2);
		} else if (this.totalThrusters() > 0) {
			maxPowerList = "insuficient thrusters";
		} else maxPowerList = "no thrusters specified";

		return maxPowerList;
	}

	currentThrust(): string {
		let currentThrustList: string = "";

		if (this.totalThrusters() >= Rocket.minThrusters) {
			for (let thruster of this.thrusters) {
				currentThrustList += thruster.getCurrentPower + ", ";
			}
			// remove last ", "
			currentThrustList = currentThrustList.substr(0, currentThrustList.length - 2);
		} else if (this.totalThrusters() > 0) {
			currentThrustList = "insuficient thrusters";
		} else currentThrustList = "no thrusters specified";

		return currentThrustList;
	}

	currentPower(): number {
		let sum: number = 0;

		this.thrusters.forEach(thruster => {
			sum += thruster.getCurrentPower;
		});

		return sum;
	}

	speedUp() {
		for (let i = 0; i < this.totalThrusters(); i++) {
			// prettier-ignore
			this.thrusters[i].setCurrentPower =
				this.thrusters[i].getCurrentPower + Rocket.powerIncrement;
		}
	}

	// toString
	totalThrustersToString(): string {
		return this.totalThrusters().toString();
	}

	static countToString(): string {
		return this.count.toString();
	}

	static get getMinThrusters(): number {
		return this.minThrusters;
	}
}
