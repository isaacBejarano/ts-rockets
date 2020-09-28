class Rocket {
	private id: string;
	private thrusters: Thruster[] = [];
	static list: Rocket[] = [];
	static minThrusters: number = 2;
	static powerIncrement: number = 10;
	static count: number = 0;

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
		this.thrusters.forEach(thruster => {
			thruster.setCurrentPower = 10;
		});
		console.log(this.thrusters);
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
