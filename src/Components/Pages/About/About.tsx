import "./About.css";

function About(): JSX.Element {
  return (
    <div className="About">
      <h1>Our philosophy</h1>
      <h3>in 50 secondes..</h3>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/VP5HoBilUIs"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default About;
