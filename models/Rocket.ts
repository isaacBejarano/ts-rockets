class Rocket {
	private id: string;
	private thrusters: Thruster[] = [];
	private static count: number = 0;
	private static list: Rocket[] = [];

	constructor(id?: string) {
		this.id = !id || id.length < 8 ? "not specified" : id.toUpperCase();
		Rocket.count++; //count instances
		Rocket.list.push(this); //list instances
	}

	// setter
	set setThrusters(thrusters: Thruster[]) {
		this.thrusters = thrusters;
	}

	totalMaxThrust(): string {
		let listOfPower: string = "";

		for (let thruster of this.thrusters) {
			listOfPower += thruster.getMaxThrust + ", ";
		}

		// get rid of last ", "
		listOfPower = listOfPower.substr(0, listOfPower.length - 2);

		return listOfPower;
	}

	// toString
	toString(): string {
		return `\
		Rocket "${this.id}"
		Thrusters: ${this.thrusters.length}
		Max.Power per Thruster: ${this.totalMaxThrust()}`;
	}

	// static toString
	static CountToString() {
		return this.count;
	}

	static ListToString() {
		return this.list;
	}
}
