
export class OnWater{
    public lat : number;
    public lon : number;
    public water : boolean;

    constructor(lat : number, lon : number, water : boolean) {
        this.lat = lat;
        this.lon = lon;
        this.water = water;
    }
}