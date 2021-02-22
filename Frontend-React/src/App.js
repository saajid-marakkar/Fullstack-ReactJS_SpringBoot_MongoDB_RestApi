import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from './Nav'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Home'
import Students from './Students'
import Footer from './Footer'

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/students" exact component={Students} />
        </Switch>
        <Footer />
    </div>
    </Router>
  );
}

export default App;
