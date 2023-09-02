import { useEffect, useMemo, useRef, useState } from "react";
import { CompanyModel } from "../../../Models/CompanyModel";
import store, { RootState } from "../../../Redux/Store";
import "./Companies.css";
import { useDispatch, useSelector } from "react-redux";
import webApiService from "../../../Services/WebApiService";
import { gotAllCompaniesAction } from "../../../Redux/CompanyAppState";
import { Popper } from "@mui/material";
import { clearId } from "../../../Redux/DeleteIdAppState";
import DeleteCompany from "../DeleteCompany/DeleteCompany";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import SearchCompany from "../SearchCompany/SearchCompany";

function Companies(): JSX.Element {
  const theme = useSelector((state: RootState) => state.themeReducer.theme);
  const [companies, setCompanies] = useState<CompanyModel[]>(
    store.getState().companiesReducer.companies
  );
  const dispatch = useDispatch();
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const handleConfirmationOpen = () => setConfirmationOpen(true);
  const handleConfirmationClose = () => {
    dispatch(clearId());
    setConfirmationOpen(false);
  };
  const updateCompanies = (newCompanies: CompanyModel[]) => {
    setCompanies(newCompanies);
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
    if (companies.length > 0) {
      return;
    }
    webApiService
      .getAllCompanies()
      .then((res) => {
        setCompanies(res.data);
        dispatch(gotAllCompaniesAction(res.data));
      })
      .catch((err) => console.log(err));
  }, []);
  const memoizedSearchCompany = useMemo(
    () => (
      <SearchCompany
        companies={companies}
        handelConfirmationOpen={handleConfirmationOpen}
      />
    ),
    [companies]
  );

  return (
    <div className="Companies">
      {memoizedSearchCompany}
      <DeleteCompany
        isConfirmationOpen={isConfirmationOpen}
        handleConfirmationClose={handleConfirmationClose}
        updateCompanies={updateCompanies}
      />
      <div className="addIcon" ref={ref}>
        <Link
          to="/admin/add-company"
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

export default Companies;
