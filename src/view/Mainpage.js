import "../layouts/Mainpage.css"
import Sidebar from "../component/sidebar";
import Navbar from "../component/navbar";
import TextSelection from "../component/TextSelection";
import ReleaseText from "../component/TutorRelease";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';

function LecturesList({currentUser, selectedCourse, showTextArea, setShowTextArea}){
    const [selectedLecture, setSelectedLecture] = useState(null);
    const [lectures, setLectures] = useState([]);
    const [content, setContent] = useState([]);
    //用后端响应来找lectures
    useEffect(() => {
        const fetchLectures = async () => {
          try {
            const response = await axios.post(
              `http://35.178.198.96:3000/api/users/lecture?course_name=${selectedCourse}`
            );
            setLectures(response.data.lectures);
          } catch (error) {
            console.error('Error:', error);
          }
        };
        fetchLectures();
      }, [selectedCourse]);

    const onLectureClick = async (e, lecture) => {
        e.preventDefault();
        setShowTextArea(false);
        setSelectedLecture(lecture);
        const response = await axios.post(`http://35.178.198.96:3000/api/users/content?lecture_id=${lecture.id}`)
        const contentresult = response.data.contents.reduce((acc, item) => {
            acc[item.id] = item.content_detail;
            return acc;
          }, {});
        setContent(contentresult);
    };
    const titleStyle = {
        width: "100%",
        height: "4rem",
        fontWeight: "bolder",
        fontSize: "larger",
        backgroundColor: "whitesmoke",
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
                <button className="lecture-link" onClick={(e) => onLectureClick(e, lecture, showTextArea, setShowTextArea)}> 
                {lecture.title}
                </button>
                {lecture.summary}
            </li>
            )}
        </ul>
        {selectedLecture && (
        <div>
          <TextSelection currentUser={currentUser} title={selectedLecture.title} content={content} summary={selectedLecture.summary}/>
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
    const [showTextArea, setShowTextArea] = useState(false);
    // const [newUser, setNewUser] = useState({});

    const location = useLocation();
    const newUser = location.state;
    // console.log(newUser);
    const name = newUser.userName;
    const major = newUser.major;
    const courses = newUser.course_name;

    return(
        <div style={container}>
        <Navbar isLoggedIn="true" name={name}/>
        <div style={sideTitle}>
            <Sidebar newUser={newUser} onCourseClick={setSelectedCourse} showTextArea={showTextArea} setShowTextArea={setShowTextArea}/>
            <div style={titleContent}>
                {!showTextArea && <LecturesList currentUser={newUser} selectedCourse={selectedCourse} major={major} showTextArea={showTextArea} setShowTextArea={setShowTextArea}/>}
                {showTextArea && (<ReleaseText courses={courses} onCourseClick={setSelectedCourse}/>)}
            </div>
            {/* {!showTextArea &&
            <div style={titleContent}>
                <LecturesList currentUser={currentuser[0]} selectedCourse={selectedCourse} major={major}/>
            </div>} */}
        </div>
        </div>
    );
}

export default Mainpage;