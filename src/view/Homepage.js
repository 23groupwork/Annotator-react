import Navbar from "../component/navbar.js"
import Start from "../component/start.js"

function Home(){
    return(
        <div>
            <Navbar/>
            <Start className="learn-more" name="Quick Start" url="/choosemajor"/>
        </div>
    );
}
export default Home