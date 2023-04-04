import "../layouts/Mainpage.css"
import Sidebar from "../component/sidebar";
import Navbar from "../component/navbar";
import TextSelection from "../component/TextSelection";
import ChoiceData from "../data/coursedata";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function findLectures(major, selectedCourse) {
    let courses;
    if (major === "Computer Science") courses = Object.values(ChoiceData)[0];
    if (major === "Economics") courses = Object.values(ChoiceData)[1];
    if (major === "Law") courses = Object.values(ChoiceData)[2];
    if (major === "Mathematic") courses = Object.values(ChoiceData)[3];
  
    let foundLectures = [];
    courses.forEach(({ name, lecture }) => {
      if (selectedCourse === name) {
        foundLectures = lecture;
      }
    });
  
    return foundLectures;
  }

function LecturesList({currentUser, selectedCourse, major}){
    const [selectedLecture, setSelectedLecture] = useState(null);
    const lectures = findLectures(major, selectedCourse);
    console.log(selectedLecture)
    const onLectureClick = (e, lecture) => {
        e.preventDefault();
        setSelectedLecture(lecture);
      };
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
    return(
        <div>
        <div style={titleStyle}>
            <span style={spanStyle}>Modules selection</span>
        </div>
        <h1 style={{textAlign: 'center'}}>{selectedCourse}</h1>
        <ul>
            {lectures.map((lecture, index)=>
            <li key={index} style={{listStyle:'none', backgroundColor: 'whitesmoke', margin: '1em', height: '3em'}}>
                <button className="lecture-link" onClick={(e) => onLectureClick(e, lecture)}> 
                {lecture.title}
                </button>
            </li>
            )}
        </ul>
        {selectedLecture && (
        <div>
          <TextSelection currentUser={currentUser} title={selectedLecture.title} content={selectedLecture.content}/>
        </div>)}
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

    const [selectedCourse, setSelectedCourse] = useState(null);

    const location = useLocation();
    const newUser = location.state;
    const currentuser=Object.values(newUser);
    // const id = Object.values(currentuser)[0];
    const name = currentuser[0].userName;
    const major = currentuser[0].major;
    
    return(
        <div style={container}>
        <Navbar isLoggedIn="true" name={name}/>
        <div style={sideTitle}>
            <Sidebar newUser={currentuser[0]} onCourseClick={setSelectedCourse}/>
            <div style={titleContent}>
                <LecturesList currentUser={currentuser[0]} selectedCourse={selectedCourse} major={major}/>
            </div>
        </div>
        </div>
    );
}

export default Mainpage;