class Rocket {
	// static props
	private static list: Rocket[] = [];
	private static minThrustersLength: number = 2;
	private static powerIncrement: number = 10;
	// instance props
	private id: string;
	private thrusters: Thruster[] = [];
	private provisionalThrustersList: Thruster[] = [];

	constructor(id?: string) {
		this.id =
			!id || id.trim().length === 0
				? "not specified"
				: id.trim().length !== 8
				? "wrong code format"
				: id.trim().toUpperCase();

		Rocket.list.push(this); // instances saved in class!
	}

	// setter
	set setThrusters(thrusters: Thruster[]) {
		this.thrusters = thrusters;
	}

	set setProvisionalThrustersList(x: Thruster[]) {
		this.provisionalThrustersList = x;
	}

	// getters
	get getProvisionalThrustersList() {
		return this.provisionalThrustersList;
	}

	get getId(): string {
		return this.id;
	}

	static get getList(): Rocket[] {
		return Rocket.list;
	}

	static get getMinThrustersLength(): number {
		return Rocket.minThrustersLength;
	}

	static get getPowerIncrement() {
		return Rocket.powerIncrement;
	}

	// methods
	static getListLength(): number {
		return Rocket.list.length;
	}

	thrustersLength(): number {
		return this.thrusters.length;
	}

	totalMaxThrust(): string {
		let maxPowerList: string = "";

		if (this.thrusters.length >= Rocket.minThrustersLength) {
			for (let thruster of this.thrusters) {
				maxPowerList += thruster.getMaxThrust + ", ";
			}
			// remove last ", "
			maxPowerList = maxPowerList.substr(0, maxPowerList.length - 2);
		} else if (this.thrusters.length > 0) {
			maxPowerList = "insuficient thrusters";
		} else maxPowerList = "no thrusters specified";

		return maxPowerList;
	}

	currentThrust(): string {
		let thurstersPowerList: string = "";

		if (this.thrusters.length >= Rocket.minThrustersLength) {
			for (let thruster of this.thrusters) {
				thurstersPowerList += thruster.getCurrentThrust + ", ";
			}
			// remove last ", "
			thurstersPowerList = thurstersPowerList.substr(0, thurstersPowerList.length - 2);
		} else if (this.thrusters.length > 0) {
			thurstersPowerList = "insuficient thrusters";
		} else thurstersPowerList = "no thrusters specified";

		return thurstersPowerList;
	}

	totalPower(): number {
		let sum: number = 0;

		for (let thruster of this.thrusters) {
			sum += thruster.getCurrentThrust;
		}

		return sum;
	}

	speedUp() {
		for (let thruster of this.thrusters) {
			if (thruster.getCurrentThrust + 10 <= thruster.getMaxThrust)
				thruster.setCurrentThrust = thruster.getCurrentThrust + Rocket.powerIncrement;
		}
	}

	speedDown() {
		for (let thruster of this.thrusters) {
			if (thruster.getCurrentThrust > 0) thruster.setCurrentThrust = thruster.getCurrentThrust - Rocket.powerIncrement; // stes down === step up
		}
	}

	addToProvisionalThrustersList(x: Thruster) {
		this.provisionalThrustersList.push(x);
	}

	removeFromProvisionalThrustersList() {
		this.provisionalThrustersList.pop();
	}
}
