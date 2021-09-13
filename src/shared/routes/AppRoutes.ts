import { Routes } from 'nest-router';
import UsersModule from '@modules/users/UsersModule';
import AddressesModule from '@modules/addresses/AddressesModule';
import PhonesModule from '../../modules/phones/PhonesModule';

const AppRoutes: Routes = [
  {
    path: '/users',
    module: UsersModule,
    children: [
      {
        path: '/addresses',
        module: AddressesModule,
      },
      {
        path: '/phones',
        module: PhonesModule,
      },
    ],
  },
];

export default AppRoutes;
