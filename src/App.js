import Homepage from "./view/Homepage.js";
import Login from "./view/Login.js";
import Register from "./view/Register.js";
import ChooseMajor from './view/ChooseMajor.js';
import ChooseCourse from './view/ChooseCourse.js';
import Mainpage from './view/Mainpage.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Editor from './view/Editor.js';
import choiceMajorData from "./data/majordata.js"

function App() {
  const majorData = choiceMajorData;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/choosemajor" element={<ChooseMajor majorData={majorData} />}/>
        <Route path="/choosecourse" element={<ChooseCourse />}/>
        <Route path="/mainpage" element={<Mainpage/>}/>
        <Route path="/editor" element={<Editor/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
