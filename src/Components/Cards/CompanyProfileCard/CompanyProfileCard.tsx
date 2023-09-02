import { CompanyModel } from "../../../Models/CompanyModel";
import "./CompanyProfileCard.css";
import photo from "../../../assets/imageas/office.jpg";
interface CompanyProfileCardProps {
  company: CompanyModel;
}
function CompanyProfileCard({ company }: CompanyProfileCardProps): JSX.Element {
  return (
    <div className="CompanyProfileCard">
      <div className="companyImg">
        <img src={photo} alt="" />
      </div>
      <div className="companyDetails">
        <h1>{company.name}</h1>
        <p>Company's id: {company.id}</p>
        <p>email: {company.email}</p>
        <p>password: {company.password}</p>
      </div>
    </div>
  );
}

export default CompanyProfileCard;
