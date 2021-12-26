// hooks
import useAuth from '../hooks/useAuth';
//
import { MAvatar } from './@material-extend';
import createAvatar from '../utils/createAvatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();

  return (
    // <MAvatar
    //   src={user.photoURL}
    //   alt={user.last_name}
    //   color={user.photoURL ? 'default' : createAvatar(user.displayName).color}
    //   {...other}
    // >
    //   {createAvatar(user.displayName).name}
    // </MAvatar>
    <div>{user.last_name}</div>
  );
}
