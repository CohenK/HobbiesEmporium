export class Item{
    constructor(
        public name: string ="", 
        public grade: string = "", 
        public size: string = "", 
        public release: string = "", 
        public pbandai: boolean = false,
        public price: number = 0, 
        public thumbnail: string = "", 
        public model: string[]=[]
    ){}
}