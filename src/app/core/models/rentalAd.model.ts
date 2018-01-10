export class RentalAdModel {
    constructor(
        public title: string,
        public type: string,
        public numberOfRooms: number,
        public address: string,
        public area: string,
        public price: string,
        public lat: number,
        public lng: number,
        public details?: string
    ) { }
}