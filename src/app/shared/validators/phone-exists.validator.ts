import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PrimaryMemberService } from 'src/app/pages/primary-member/services/primary-member.service';

export function phoneExistsValidator(
  primaryMemberService: PrimaryMemberService
) {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const phone = control.value;
    const filter = `filters[Phone1][$eq]=${phone}`;

    return primaryMemberService.getFilteredPrimaryMembers(filter).pipe(
      map((res: any) => {
        const result = res.data;
        if (result.length > 0) {
          return { phoneExists: true };
        } else {
          return null;
        }
      }),
      catchError(() => of(null))
    );
  };
}
