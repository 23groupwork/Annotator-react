import Navbar from "../component/navbar.js"
// import Start from "../component/start.js"
import Login from "./Login.js"
// import { useNavigate } from "react-router-dom"

function Home(){
    return(
        <div>
            <Navbar/>
            <Login/>
        </div>
    );
}
export default Home