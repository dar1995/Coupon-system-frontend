import { useSelector } from "react-redux";
import { CustomerModel } from "../../../Models/CustomerModel";
import "./DeleteCustomer.css";
import { RootState } from "../../../Redux/Store";
import webApiService from "../../../Services/WebApiService";
import { deletedCustomerAction } from "../../../Redux/CustomerAppState";
import DeleteDialog from "../../MyStyles/DeleteDialog/DeleteDialog";
interface DeleteCustomerProps {
  isConfirmationOpen: boolean;
  handleConfirmationClose: () => void;
  updateCustomers: (newCustomers: CustomerModel[]) => void;
}
function DeleteCustomer({
  isConfirmationOpen,
  handleConfirmationClose,
  updateCustomers,
}: DeleteCustomerProps): JSX.Element {
  const newCustomers = useSelector(
    (state: RootState) => state.customersReducer.customers
  );
  const deleteApi = webApiService.deleteCustomer;
  const dispatchAction = deletedCustomerAction;
  return (
    <div className="DeleteCustomer">
      <DeleteDialog
        isConfirmationOpen={isConfirmationOpen}
        handleConfirmationClose={handleConfirmationClose}
        updateArray={updateCustomers}
        newArray={newCustomers}
        deleteApi={deleteApi}
        dispatchAction={dispatchAction}
        title="Customer"
        content="Customer deleted successfully"
      />
    </div>
  );
}

export default DeleteCustomer;
