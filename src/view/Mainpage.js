import Sidebar from "../component/sidebar";
import Navbar from "../component/navbar";
// import TextSelection from "../component/TextSelection";
import ChoiceData from "../data/coursedata";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function findLectures(major, selectedCourse) {
    let courses;
    if (major === "Computer Science") courses = Object.values(ChoiceData)[0];
    if (major === "Economics") courses = Object.values(ChoiceData)[1];
    if (major === "Law") courses = Object.values(ChoiceData)[2];
    if (major === "Mathematics") courses = Object.values(ChoiceData)[3];
  
    let foundLectures = [];
  
    courses.forEach(({ name, lecture }) => {
      if (selectedCourse === name) {
        foundLectures = lecture;
      }
    });
  
    return foundLectures;
  }

function LecturesList({selectedCourse, major}){
    const lectures = findLectures(major, selectedCourse);
     
    return(
        <div>
        <h1>{selectedCourse}</h1>
        <ul>
            {lectures.map((lecture, index)=>
            <li key={index}>{lecture}</li>
            )}
        </ul>
        </div>
    );
}

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

    const [selectedCourse, setSelectedCourse] = useState(null);

    const location = useLocation();
    const newUser = location.state;
    const currentuser=Object.values(Object.values(newUser)[0])[0];
    // const id = Object.values(currentuser)[0];
    const name = Object.values(currentuser)[1];
    const major = Object.values(currentuser)[3];
    
    return(
        <div style={container}>
        <Navbar isLoggedIn="true" name={name}/>
        <div style={sideTitle}>
            <Sidebar newUser={newUser} onCourseClick={setSelectedCourse}/>
            <div style={titleContent}>
                <div style={titleStyle}>
                    <span style={spanStyle}>Modules selection</span>
                </div>
                {/* <div className="content">
                    this is a main content
                </div> */}
                {/* <TextSelection id={id}/> */}
                <LecturesList selectedCourse={selectedCourse} major={major}/>
            </div>
        </div>
        </div>
    );
}

export default Mainpage;