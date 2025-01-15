export class Item{
    constructor(
        public id: number,
        public name: string, 
        public grade: string, 
        public size: string, 
        public release: string, 
        public pbandai: boolean = false,
        public price: number, 
        public thumbnail: string, 
        public model: string[]=[]
    ){}
}