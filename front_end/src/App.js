import React from 'react';

import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./redux/store";
import { history } from './jwt/_helpers';
import { PrivateRoute } from './routes/PrivateRoutes';
import Login from './pages/Login'
import AppMain from './AppMain';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }


    render() {
      const  Main = ()=>{
        return (<AppMain history={history}/>);
      } ;

        return (

            <Provider store={configureStore()}>
                <Router basename="/" history={history}>
                    <Switch>

                        <PrivateRoute path="/" exact component={Main} />
                        <Route path="/authentication/login" exact component={Login} />

                    </Switch>
                </Router>
            </Provider>
        )
    }
}

export default App;
