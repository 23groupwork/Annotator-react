import Navigation from "../component/navbar";
import "../layouts/Contact.css";
export default function Contact() {
    return(
        <>
        <Navigation/>
        <div className="contactcard">
        <h1>Annatator: A new way to engage with course content</h1>
        <h2>Team number: 37</h2>
        <h4>Presentation url: <a href="https://stream.liv.ac.uk/47annhb9">Click here</a></h4>
        </div>
        </>
    );
}