// // src/app/guards/admin.guard.ts
// import { inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/authService/auth.service';

// export const adminGuard = () => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   const token = authService.getToken();
//   const decoded = token ? authService.decodeToken(token) : null;

//   if (decoded?.roles[0]?.includes('Admin')) {
//     return true;
//   } else {
//     return router.createUrlTree(['/home']);
//   }
// };
