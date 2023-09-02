import { useSelector } from "react-redux";
import { CompanyModel } from "../../../Models/CompanyModel";
import DeleteDialog from "../../MyStyles/DeleteDialog/DeleteDialog";
import "./DeleteCompany.css";
import webApiService from "../../../Services/WebApiService";
import { deletedCompanyAction } from "../../../Redux/CompanyAppState";
import { RootState } from "../../../Redux/Store";
interface DeleteCompanyProps {
  isConfirmationOpen: boolean;
  handleConfirmationClose: () => void;
  updateCompanies: (newCompanies: CompanyModel[]) => void;
}
function DeleteCompany({
  isConfirmationOpen,
  handleConfirmationClose,
  updateCompanies,
}: DeleteCompanyProps): JSX.Element {
  const newCompanies = useSelector(
    (state: RootState) => state.companiesReducer.companies
  );
  const deleteApi = webApiService.deleteCompany;
  const dispatchAction = deletedCompanyAction;

  return (
    <div className="DeleteCompany">
      <DeleteDialog
        isConfirmationOpen={isConfirmationOpen}
        handleConfirmationClose={handleConfirmationClose}
        updateArray={updateCompanies}
        newArray={newCompanies}
        deleteApi={deleteApi}
        dispatchAction={dispatchAction}
        title="Company"
        content="Company deleted successfully"
      />
    </div>
  );
}

export default DeleteCompany;
