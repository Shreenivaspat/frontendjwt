import React from "react";
import Register from "./pages/Register";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
// import Cards from "./pages/Cards";
// import "react-toastify/dist/ReactToastify.css";
import UserCard from "./components/UserCard";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<UserCard />} />
        {/* <Route exact path="/" element={<Cards />} /> */}
      </Routes>
    </BrowserRouter>
  );
}



// // App.js
// import "./App.css";
// import UserCard from "./components/UserCard";

// const App = () => {
//   return (
//     <div>
//       <UserCard />
//     </div>
//   );
// };

// export default App;