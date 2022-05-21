import {Users} from '../data/users';

export function useUser(username: string) {
  const User = Users.find(u => u.username === username) ?? Users[0];
  return User;
}
