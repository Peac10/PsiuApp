import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {

    canDeactivate(component: MemberEditComponent) {
       if (component.editForm.dirty) {
           return confirm('Você tem certeza que deseja continuar? Alterações não salvas, serão perdidas');
       }
       return true;
   }
}
