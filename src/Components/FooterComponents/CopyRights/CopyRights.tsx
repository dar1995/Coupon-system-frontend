import { Link } from "react-router-dom";
import "./CopyRights.css";

function CopyRights(): JSX.Element {
  const year = new Date().getFullYear();
  console.log(year);
  return (
    <div className="CopyRights">
      <p>&copy; {year} COUPLA</p>
      <Link to={"/About"}>About us</Link>
    </div>
  );
}

export default CopyRights;
