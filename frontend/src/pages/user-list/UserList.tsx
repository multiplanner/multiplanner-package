import './UserList.css';
import { useState, useEffect } from 'react';
import TopSection from '../../components/list-top-section/ListTopSection';
import TableRow from '../../components/tablerow/TableRow';
import UserDTO from '../../dto/UserDTO';
import UserService from '../../services/user/UserService';

function UserList() {
  const [users, setUsers] = useState([] as UserDTO[]);
  const [userService, setUserService] = useState({} as UserService);

  useEffect(() => {
    const userService = new UserService();
    setUserService(userService)
    userService.loadAll()
    .then(val => {
      setUsers(val);
    })
  }, [])

  const deleteUser = (userId: number) => {

  }

  const search = () => {
    console.log("search")
  }

  return (
    <div>
      <TopSection pageTitle={'Gebruikers'} buttonTitle={'Toevoegen'} navigationLink={'/users/edit/0'} onClick={search}/>
        {users.map(user => {
          return (
            <div key={user.id}>
              <TableRow title={user.username} subtitle={user.role.name} onEditLink={"edit/" + user.id} onDeleteClick={() => deleteUser(user.id)} navigationLink={ "/users/" + user.id }/>
            </div>
          )
        })}
    </div>
  );
}

export default UserList;
