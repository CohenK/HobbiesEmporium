import { AbstractControl, ValidationErrors } from "@angular/forms";

export function invalidCardNumber(control: AbstractControl) : ValidationErrors | null {
    const chars: string = control.value;

    if(chars.length === 16 || chars.length === 0){
        return null;
    }else{
        return { invalidCardNumber : true };
    }
}

export function invalidCVC(control: AbstractControl) : ValidationErrors | null {
    const chars: string = control.value;

    if(chars.length === 3 || chars.length === 0){
        return null;
    }else{
        return { invalidCVC : true };
    }
}

export function invalidZipCode(control: AbstractControl) : ValidationErrors | null {
    const chars: string = control.value;

    if(!isNaN(Number(chars))){
        return null;
    }else{
        return { invalidZipCode : true };
    }
}

export function invalidAddress(control: AbstractControl) : ValidationErrors | null {
    const chars: string = control.value;
    const regex = /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\]/;
    if (!regex.test(chars)){
        return null;
    }else{
        return { invalidAddress : true };
    }
}