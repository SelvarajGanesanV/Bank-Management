import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import Banking from './components/Banking';
import './App.scss';


const App = () => {


    return (

        <>

            <Router>

                <Switch>

                    <Route exact path="/"><Login /></Route>

                    <Route exact path="/Banking"><Banking /></Route>

                </Switch>

            </Router>

        </>

    );

}
export default App;