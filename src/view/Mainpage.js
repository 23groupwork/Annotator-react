import Sidebar from "../component/sidebar";
import Navbar from "../component/navbar";
import TextSelection from "../component/TextSelection";
import { useLocation } from "react-router-dom";

function Mainpage(){
    const container = {
        height: "100%",
        width: "100%",
    }
    const sideTitle = {
        display: "flex",
        flexDirection: "row",
        height: "100%",
    }
    const titleContent = {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
    }
    const titleStyle = {
        width: "100%",
        height: "4rem",
        fontWeight: "bolder",
        fontSize: "larger",
        backgroundColor: "pink",
    };
    const spanStyle = {
        position: "relative",
        top: "2rem",
        left: "3rem",
    };

    const location = useLocation();
    const newUser = location.state;
    // console.log(newUser);
    const id=Object.values(newUser)[0]
    console.log(id)
    
    return(
        <div style={container}>
        <Navbar/>
        <div style={sideTitle}>
            <Sidebar newUser={newUser}/>
            <div style={titleContent}>
                <div style={titleStyle}>
                    <span style={spanStyle}>Modules selection</span>
                </div>
                {/* <div className="content">
                    this is a main content
                </div> */}
                <TextSelection id={id}/>
            </div>
        </div>
        </div>
    );
}

export default Mainpage;