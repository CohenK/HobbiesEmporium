export class Item{
    constructor(
        public name: string, 
        public grade: string, 
        public size: string, 
        public release: string, 
        public premium: boolean = false,
        public price: number, 
        public thumbnail: string, 
        public model: string[]=[]
    ){}
}