
import './App.css';
import { Link, withRouter} from "react-router-dom";
function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
             <img src="https://cms.technopark.org/zcmspg/zupload/5363/cmp_detail/1436810242420_Mozanta_letterhead-Logo-small_Transperent-background.png" width="100" height="30" alt=""></img>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav" style={{color:"red"}}>
                    <Link className="nav-item nav-link active" to="/">
                        Home
                    </Link>
                    <Link className="nav-item nav-link active" to="/students">
                        Students
                    </Link>
                </div>
            </div>
        </nav>
    );
  }
  
  export default Nav;