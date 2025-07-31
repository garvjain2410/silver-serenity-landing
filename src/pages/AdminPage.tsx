
import React from "react";

const AdminPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      <div style={{ marginTop: "20px" }}>
        <h2>Welcome, Admin!</h2>
        <p>Here are some quick actions you can perform:</p>
        <ul>
          <li><button onClick={() => alert("Manage Users")}>Manage Users</button></li>
          <li><button onClick={() => alert("View Orders")}>View Orders</button></li>
          <li><button onClick={() => alert("Manage Products")}>Manage Products</button></li>
          <li><button onClick={() => alert("View Reports")}>View Reports</button></li>
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;