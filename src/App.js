import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Inventory from "./Pages/Tour";
import Orders from "./Pages/Booking";
import Customers from "./Pages/Account";
import AddTour from "./Pages/AddTour";
import Layout from "./components/Share/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/admin" element={<Layout />}>
        <Route path="" element={<Dashboard />}></Route>
        <Route path="tours" element={<Inventory />}></Route>
        <Route path="booking" element={<Orders />}></Route>
        <Route path="account" element={<Customers />}></Route>
        <Route path="tours/add" element={<AddTour />}></Route>
        <Route path="tours/edit/:id" element={<AddTour />}></Route>
      </Route>
    </Routes>
  );
}
export default App;
