import { CustomerModel } from "../../../Models/CustomerModel";
import "./CustomerProfileCard.css";
import photo from "../../../assets/imageas/user-dwight-schrute.jpg";

interface CustomerProfileCardProps {
  customer: CustomerModel;
}
function CustomerProfileCard({
  customer,
}: CustomerProfileCardProps): JSX.Element {
  return (
    <div className="CustomerProfileCard">
      <div className="customerImg">
        <img src={photo} alt="" />
      </div>
      <div className="customerDetails">
        <h1>
          {customer.firstName} {customer.lastName}
        </h1>
        <p>Customer's id: {customer.id}</p>
        <p>email: {customer.email}</p>
        <p>password: {customer.password}</p>
      </div>
    </div>
  );
}

export default CustomerProfileCard;
