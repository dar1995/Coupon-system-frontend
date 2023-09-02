import { useSelector } from "react-redux";
import "./Register.css";
import { RootState } from "../../../Redux/Store";
import CustomerRegister from "../CustomerRegister/CustomerRegister";
import { useState } from "react";
import CompanyRegister from "../CompanyRegister/CompanyRegister";

function Register(): JSX.Element {
  const theme = useSelector((state: RootState) => state.themeReducer.theme);
  const [isCustomer, setIsCustomer] = useState(true);
  const handleClick = () => {
    setIsCustomer(!isCustomer);
  };
  return (
    <div className="Register">
      {isCustomer ? (
        <>
          <p className="isCustomerLink" onClick={handleClick}>
            Looking for company's registration?
          </p>
          <CustomerRegister theme={theme} />
        </>
      ) : (
        <>
          <p className="isCustomerLink" onClick={handleClick}>
            Looking for customer's registration?
          </p>
          <CompanyRegister theme={theme} />
        </>
      )}
    </div>
  );
}

export default Register;
