import "./SearchCompany.css";
import { useState } from "react";
import { CompanyModel } from "../../../Models/CompanyModel";
import CompanyCard from "../../Cards/CompanyCard/CompanyCard";
import SearchById from "../../Searches/SearchById/SearchById";
import EmptyView from "../../Pages/EmptyView/EmptyView";

interface SearchCompanyProps {
  companies: CompanyModel[];
  handelConfirmationOpen: () => void;
}
function SearchCompany({
  companies,
  handelConfirmationOpen,
}: SearchCompanyProps): JSX.Element {
  const idArray: number[] = companies.map((c) => c.id);
  const [value, setValue] = useState<number | null>(null);
  const filteredCompanies = companies.filter((c) => c.id === value);
  return (
    <div className="SearchCompany">
      <SearchById value={value} setValue={setValue} idArray={idArray} />
      <div className="companiesDisplay">
        {companies.length === 0 ? (
          <EmptyView title={"No companies found"} />
        ) : value === null ? (
          companies.map((c, idx) => (
            <CompanyCard
              key={`company-card-${idx}`}
              company={c}
              openConfirmation={handelConfirmationOpen}
            />
          ))
        ) : filteredCompanies.length === 0 ? (
          <EmptyView title={"No companies found"} />
        ) : (
          filteredCompanies.map((c, idx) => (
            <CompanyCard
              key={`company-card-${idx}`}
              company={c}
              openConfirmation={handelConfirmationOpen}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default SearchCompany;
