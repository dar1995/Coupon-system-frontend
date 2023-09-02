import { Navigate, Route, Routes } from "react-router-dom";
import "./AdminRouting.css";
import Companies from "../../Company/Companies/Companies";
import Customers from "../../Customer/Customers/Customers";
import AddCompany from "../../Company/AddCompany/AddCompany";
import AddCustomer from "../../Customer/AddCustomer/AddCustomer";
import UpdateCompany from "../../Company/UpdateCompany/UpdateCompany";
import UpdateCustomer from "../../Customer/UpdateCustomer/UpdateCustomer";

function AdminRouting(): JSX.Element {
  return (
    <div className="AdminRouting">
      <Routes>
        <Route path="/" element={<Navigate to="customers" />}></Route>
        <Route path="/companies" element={<Companies />}></Route>
        <Route path="/customers" element={<Customers />}></Route>
        <Route path="/add-company" element={<AddCompany />}></Route>
        <Route path="/add-customer" element={<AddCustomer />}></Route>
        <Route path="/update-company/:id" element={<UpdateCompany />}></Route>
        <Route path="/update-customer/:id" element={<UpdateCustomer />}></Route>
      </Routes>
    </div>
  );
}

export default AdminRouting;
