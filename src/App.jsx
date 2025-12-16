import { useEffect, useState } from "react";

const backendUrl = "http://localhost:5555/user";

const getUsers = async (setUsers) => {
  const response = await fetch(backendUrl, { method: "GET" });
  const data = await response.json();
  setUsers(data.users);
};

const createUser = async (data, setUsers) => {
  const response = await fetch(backendUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const userData = await response.json();
  getUsers(setUsers);
  return userData.user;
};

const updateUser = async (data, setUsers) => {
  const response = await fetch(backendUrl, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const userData = await response.json();
  getUsers(setUsers);
  return userData.user;
};

const deleteUser = async (data, setUsers) => {
  const response = await fetch(backendUrl, {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const userData = await response.json();
  getUsers(setUsers);
  return userData.user;
};

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers(setUsers);
  }, []);

  return (
    <div>
      <button
        onClick={() =>
          createUser(
            {
              name: "Rushikesh Mungse",
              age: 35,
            },
            setUsers
          )
        }
      >
        Add User
      </button>
      {users.map((user) => (
        <div key={user.id}>
          <span>
            {user.name} ({user.age})
          </span>
          <button
            onClick={() => {
              updateUser(
                { id: user.id, user: { name: "Update user", age: 34 } },
                setUsers
              );
            }}
          >
            Update
          </button>
          <button
            onClick={() => {
              deleteUser({ id: user.id }, setUsers);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default App;
