import "./Page404.css";
import errorImage from "../../../assets/imageas/404 page.png";
function Page404(): JSX.Element {
  return (
    <div className="Page404">
      <img src={errorImage} alt="Error Image" />
      <h1>EVERYBODY STAY CALM! </h1>
      <h3>This is not the page you are looking for </h3>
    </div>
  );
}

export default Page404;
