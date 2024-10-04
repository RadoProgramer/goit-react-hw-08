// import Contacts from "./Contacts/Contacts";

// function App() {
//   return (
//     <div>
//       <Contacts />
//     </div>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import Contacts from "./Contacts/Contacts";
import Register from "./Register/Register";
import Login from "./Login/Login";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contacts" element={<PrivateRoute component={Contacts} />} />
    </Routes>
  );
}

export default App;
