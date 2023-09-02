import { useDispatch, useSelector } from "react-redux";
import "./CustomerProfile.css";
import { useEffect, useState } from "react";
import { CustomerModel } from "../../../Models/CustomerModel";
import { RootState } from "../../../Redux/Store";
import webApiService from "../../../Services/WebApiService";
import { addedCustomerAction } from "../../../Redux/CustomerAppState";
import CustomerProfileCard from "../../Cards/CustomerProfileCard/CustomerProfileCard";
import EmptyView from "../../Pages/EmptyView/EmptyView";

function CustomerProfile(): JSX.Element {
  const dispatch = useDispatch();
  const [customer, setCustomer] = useState<CustomerModel | undefined>(
    useSelector((state: RootState) => state.customersReducer.customers[0])
  );
  useEffect(() => {
    if (customer !== undefined) {
      return;
    }
    webApiService
      .customerDetails()
      .then((res) => {
        setCustomer(res.data);
        dispatch(addedCustomerAction(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div className="CustomerProfile">
      {customer !== undefined ? (
        <CustomerProfileCard customer={customer} />
      ) : (
        <EmptyView title="something went wrong.. please try again " />
      )}
    </div>
  );
}

export default CustomerProfile;
