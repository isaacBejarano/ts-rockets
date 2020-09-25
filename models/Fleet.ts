class Fleet {
	private fleet: Rocket[] = [];

	// getters
	get getFleet(): Rocket[] {
		return this.fleet;
	}

	// setters
	set setFleet(fleet: Rocket[]) {
		this.fleet =
			fleet.length >= 2
				? fleet
				: [
						// prettier-ignore
						new Rocket('Add 2 or more "Rockets" to the "Fleet"'),
						new Rocket('Add 2 or more "Rockets" to the "Fleet"'),
				  ];
	}

	// toString
	toString(): void {
		console.log(this.fleet);
	}
}
