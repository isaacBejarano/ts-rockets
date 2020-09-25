class Rocket {
	private id: string;
	private thrusters: Thruster[] = [];
	private static list: Rocket[] = [];
	private static count: number = 0;

	constructor(id?: string) {
		this.id = !id || id.length !== 8 ? "not specified" : id.toUpperCase();
		Rocket.count++; //count instances
		Rocket.list.push(this); //list instances
	}

	// setter
	set setThrusters(thrusters: Thruster[]) {
		this.thrusters = thrusters;
	}

	// getters
	get getId(): string {
		return this.id;
	}

	static get rocketList(): Rocket[] {
		return this.list;
	}

	// methods
	totalMaxThrust(): string {
		let listOfPower: string = "";

		for (let thruster of this.thrusters) {
			listOfPower += thruster.getMaxThrust + ", ";
		}

		// get rid of last ", "
		listOfPower = listOfPower.substr(0, listOfPower.length - 2);

		return listOfPower;
	}

	totalThrusters(): number {
		return this.thrusters.length;
	}

	// toString
	thrustersToString(): string {
		return this.totalThrusters().toString();
	}

	// static toString
	static CountToString(): string {
		return this.count.toString();
	}
}
