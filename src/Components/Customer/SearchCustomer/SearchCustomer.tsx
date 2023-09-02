import { useState } from "react";
import { CustomerModel } from "../../../Models/CustomerModel";
import "./SearchCustomer.css";
import SearchById from "../../Searches/SearchById/SearchById";
import CustomerCard from "../../Cards/CustomerCard/CustomerCard";
import EmptyView from "../../Pages/EmptyView/EmptyView";
interface SearchCustomerProps {
  customers: CustomerModel[];
  handelConfirmationOpen: () => void;
}
function SearchCustomer({
  customers,
  handelConfirmationOpen,
}: SearchCustomerProps): JSX.Element {
  const idArray: number[] = customers.map((c) => c.id);
  const [value, setValue] = useState<number | null>(null);
  const filteredCustomers = customers.filter((c) => c.id === value);

  return (
    <div className="SearchCustomer">
      <SearchById value={value} setValue={setValue} idArray={idArray} />
      <div className="customersDisplay">
        {customers.length === 0 ? (
          <EmptyView title={"No customers found"} />
        ) : value === null ? (
          customers.map((c, idx) => (
            <CustomerCard
              key={`company-card-${idx}`}
              customer={c}
              openConfirmation={handelConfirmationOpen}
            />
          ))
        ) : filteredCustomers.length === 0 ? (
          <EmptyView title={"No customers found"} />
        ) : (
          filteredCustomers.map((c, idx) => (
            <CustomerCard
              key={`company-card-${idx}`}
              customer={c}
              openConfirmation={handelConfirmationOpen}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default SearchCustomer;
