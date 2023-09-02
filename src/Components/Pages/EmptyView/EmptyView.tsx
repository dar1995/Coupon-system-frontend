import "./EmptyView.css";
import photo from "../../../assets/imageas/emptyView.webp";
interface EmptyViewProps {
  title: string;
}
function EmptyView({ title }: EmptyViewProps): JSX.Element {
  return (
    <div className="EmptyView">
      <h1>{title}</h1>
      <img src={photo} alt="empty view photo" />
    </div>
  );
}

export default EmptyView;
