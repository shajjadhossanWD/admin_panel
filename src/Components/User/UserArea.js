import React from 'react';

const UserArea = ({ user }) => {
  return (
    <div className="user-area-wrap ptb-100 container">
      <h4 className="user-header">User Profile</h4>

      <div className="user-info">
        <table className="table m-0">
          <tbody>
            <tr>
              <th scope="row">Username:</th>
              <td>{user.username}</td>
            </tr>
            <tr>
              <th scope="row">Email:</th>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th scope="row">Phone:</th>
              <td>{user.phone}</td>
            </tr>
            <tr>
              <th scope="row">Role:</th>
              <td>{user.role}</td>
            </tr>
          </tbody>
        </table>

        {user.role === "user" &&
          (user.orders.length <= 0 ? (
            <p><span className="user-border">No orders </span></p>
          ) : (
            user.orders.map((order) => {
              return <li key={order}>{order}</li>;
            })
          ))}
      </div>
    </div>
  );
};

export default UserArea;

