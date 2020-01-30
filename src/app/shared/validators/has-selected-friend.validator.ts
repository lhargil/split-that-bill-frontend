import { AbstractControl, ValidatorFn } from '@angular/forms';

export function hasSelectedFriendValidator(minimum: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const friends = control.get('participants').value;
    const friendsSelected = friends.filter(item => item.selected);
    if (friendsSelected.length >= minimum) {
      return null;
    }
    return { noFriends: { value: `You must select at least ${minimum} friend.` } };
  };
}
