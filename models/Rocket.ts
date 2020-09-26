class Rocket {
	private readonly id: string;
	private thrusters: Thruster[] = [];
	private static list: Rocket[] = [];
	private static readonly minThrusters: number = 2;
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
		let listOfPower: string = "";

		if (this.totalThrusters() >= Rocket.minThrusters) {
			for (let thruster of this.thrusters) {
				listOfPower += thruster.getMaxThrust + ", ";
			}
			// remove last ", "
			listOfPower = listOfPower.substr(0, listOfPower.length - 2);
		} else if (this.totalThrusters() > 0) {
			listOfPower = "insuficient thrusters";
		} else listOfPower = "no thrusters specified";

		return listOfPower;
	}

	// toString
	totalThrustersToString(): string {
		return this.totalThrusters().toString();
	}

	static countToString(): string {
		return this.count.toString();
	}

	static get getminThrusters() {
		return this.minThrusters;
	}
}
