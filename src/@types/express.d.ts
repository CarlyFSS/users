import { User } from '@fireheet/entities';

declare namespace express {
  export interface Request {
    user?: User;
  }
}
