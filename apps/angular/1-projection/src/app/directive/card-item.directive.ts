import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appCardItem]',
})
export class CardItemDirective {
  templateRef = inject(TemplateRef);
}
