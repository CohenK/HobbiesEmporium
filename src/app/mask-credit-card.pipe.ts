import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskCreditCard',
  standalone: true
})
export class MaskCreditCardPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const last4Digits = value.slice(-4);
    const maskedPart = value.slice(0, -4).replace(/\d/g, 'X');

    return maskedPart + last4Digits;
  }
}
