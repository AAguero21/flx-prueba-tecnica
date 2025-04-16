import React from "react";
import UserList from "./pages/UserList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <Navbar />
      <div style={{ padding: 24 }}>
        <UserList />
      </div>
    </div>
  );
}

export default App;
