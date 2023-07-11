export class Card {
    constructor(
        public id: number,
        public name: string,
        public imageUrl: string,
        public price: number,
        public onSale: boolean,
        public quantity: number) {}
}
