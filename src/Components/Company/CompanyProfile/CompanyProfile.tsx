import { useEffect, useState } from "react";
import { CompanyModel } from "../../../Models/CompanyModel";
import "./CompanyProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import webApiService from "../../../Services/WebApiService";
import { addedCompanyAction } from "../../../Redux/CompanyAppState";
import EmptyView from "../../Pages/EmptyView/EmptyView";
import CompanyProfileCard from "../../Cards/CompanyProfileCard/CompanyProfileCard";
function CompanyProfile(): JSX.Element {
  const dispatch = useDispatch();
  const [company, setCompany] = useState<CompanyModel | undefined>(
    useSelector((state: RootState) => state.companiesReducer.companies[0])
  );
  useEffect(() => {
    if (company !== undefined) {
      return;
    }
    webApiService
      .companyDetails()
      .then((res) => {
        setCompany(res.data);
        dispatch(addedCompanyAction(res.data));
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div className="CompanyProfile">
      {company !== undefined ? (
        <CompanyProfileCard company={company} />
      ) : (
        <EmptyView title="something went wrong.. please try again " />
      )}
    </div>
  );
}

export default CompanyProfile;
