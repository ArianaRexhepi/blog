import React, { useState, useEffect } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/account/GetAllUsers");
      setUsers(res.data);
      console.log(res.data);
    };
    fetch();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "5px" }}>Users List</h1>
      <div className="card shadow mb-4">
        <table
          className="table table-bordered"
          id="dataTable"
          width="100%"
          cellSpacing="0"
        >
          <thead>
            <tr>
              <th>Id</th>
              <th>Email</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserList;
