import Homepage from "./view/Homepage.js"
import Login from "./view/Login.js"
import Register from "./view/Register.js"
import ChooseMajor from './view/ChooseMajor.js'
import ChooseCourse from './view/ChooseCourse.js'
import Mainpage from './view/Mainpage.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';

function App() {
  // const location = useLocation();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/choosemajor" element={<ChooseMajor/>}/>
        <Route path="/choosecourse" element={<ChooseCourse/>}/>
        <Route path="/mainpage" element={<Mainpage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
