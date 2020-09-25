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

	// toString
	toString(): string {
		return `Rocket ${this.id} has ${this.thrusters.length} thrusters.`;
	}

	// static toString
	static CountToString() {
		return this.count;
	}

	static ListToString() {
		return this.list;
	}
}
