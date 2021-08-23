import { Routes } from 'nest-router';
import UsersModule from '@modules/users/UsersModule';
import AddressesModule from '@modules/addresses/AddressesModule';

const AppRoutes: Routes = [
  {
    path: '/users',
    module: UsersModule,
    children: [
      {
        path: '/addresses',
        module: AddressesModule,
      },
    ],
  },
];

export default AppRoutes;
