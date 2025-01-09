export class Billing{
    constructor(
        private _fname: string ="", 
        private _lname: string = "", 
        private _email: string = "", 
        private _card: string = "", 
        private _expirationMonth: string = "",
        private _expirationYear: string = "",
        private _cvc: string = "",
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
    public get card(){return this._card;}
    public set card(value: string){this._card = value;}
    public get expirationMonth(){return this._expirationMonth;}
    public set expirationMonth(value: string){this._expirationMonth = value;}
    public get expirationYear(){return this._expirationYear;}
    public set expirationYear(value: string){this._expirationYear = value;}
    public get cvc(){return this._cvc;}
    public set cvc(value: string){this._cvc = value;}
    public get address(){return this._address;}
    public set address(value: string){this._address = value;}
    public get city(){return this._city;}
    public set city(value: string){this._city = value;}
    public get zipcode(){return this._zipcode;}
    public set zipcode(value: string){this._zipcode = value;}

}