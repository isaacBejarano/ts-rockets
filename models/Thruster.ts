class Thruster {
	public thruster: string;

	constructor(thruster: string) {
		this.thruster = thruster !== "" ? thruster : "not specified";
	}
}
