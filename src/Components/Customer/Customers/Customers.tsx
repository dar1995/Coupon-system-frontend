import { useDispatch, useSelector } from "react-redux";
import "./Customers.css";
import store, { RootState } from "../../../Redux/Store";
import { CustomerModel } from "../../../Models/CustomerModel";
import { useEffect, useMemo, useRef, useState } from "react";
import { clearId } from "../../../Redux/DeleteIdAppState";
import webApiService from "../../../Services/WebApiService";
import { gotAllCustomersAction } from "../../../Redux/CustomerAppState";
import SearchCustomer from "../SearchCustomer/SearchCustomer";
import DeleteCustomer from "../DeleteCustomer/DeleteCustomer";
import { Link } from "react-router-dom";
import { Popper } from "@mui/material";
import { IoIosAddCircleOutline } from "react-icons/io";

function Customers(): JSX.Element {
  const theme = useSelector((state: RootState) => state.themeReducer.theme);
  const [customers, setCustomers] = useState<CustomerModel[]>(
    store.getState().customersReducer.customers
  );
  const dispatch = useDispatch();
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const handleConfirmationOpen = () => setConfirmationOpen(true);
  const handleConfirmationClose = () => {
    dispatch(clearId());
    setConfirmationOpen(false);
  };
  const updateCustomers = (newCustomers: CustomerModel[]) => {
    setCustomers(newCustomers);
  };
  const [iconPopper, setIconPopper] = useState(false);
  const handleIconPopperOpen = () => {
    setIconPopper(true);
  };
  const handleIconPopperClose = () => {
    setIconPopper(false);
  };
  const ref = useRef(null);

  useEffect(() => {
    if (customers.length > 0) {
      return;
    }
    webApiService
      .getAllCustomers()
      .then((res) => {
        setCustomers(res.data);
        dispatch(gotAllCustomersAction(res.data));
      })
      .catch((err) => console.log(err));
  }, []);

  const memoizedSearchCustomer = useMemo(
    () => (
      <SearchCustomer
        customers={customers}
        handelConfirmationOpen={handleConfirmationOpen}
      />
    ),
    [customers]
  );
  return (
    <div className="Customers">
      {memoizedSearchCustomer}
      <DeleteCustomer
        isConfirmationOpen={isConfirmationOpen}
        handleConfirmationClose={handleConfirmationClose}
        updateCustomers={updateCustomers}
      />
      <div className="addIcon" ref={ref}>
        <Link
          to="/admin/add-customer"
          onMouseEnter={handleIconPopperOpen}
          onMouseLeave={handleIconPopperClose}
        >
          <IoIosAddCircleOutline size={84} />
        </Link>
      </div>
      <Popper
        open={iconPopper}
        anchorEl={ref.current}
        placement="top-start"
        className={`addIconPopper ${theme}`}
      >
        <p>Add company</p>
      </Popper>
    </div>
  );
}

export default Customers;
