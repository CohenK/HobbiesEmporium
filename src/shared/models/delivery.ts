export class Delivery{
    constructor(
        private _fname: string ="", 
        private _lname: string = "", 
        private _email: string = "", 
        private _phone: string = "", 
        private _address: string = "",
        private _city: string = "", 
        private _zipcode: string = "", 
    ){}

    public get fname(){return this._fname;}
    public set fname(value: string){this._fname = value;}
    public get lname(){return this._lname;}
    public set lname(value: string){this._lname = value;}
    public get email(){return this._email;}
    public set email(value: string){this._email = value;}
    public get phone(){return this._phone;}
    public set phone(value: string){this._phone = value;}
    public get address(){return this._address;}
    public set address(value: string){this._address = value;}
    public get city(){return this._city;}
    public set city(value: string){this._city = value;}
    public get zipcode(){return this._zipcode;}
    public set zipcode(value: string){this._zipcode = value;}

}