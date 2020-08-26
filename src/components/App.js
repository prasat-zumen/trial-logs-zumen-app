import React, {Component} from 'react';
import { ThemeProvider } from '@material-ui/styles';
import {Route, Switch, withRouter, Redirect, BrowserRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../store/actions/index';
import theme from './ui/theme';
import Header from './ui/Header';
import PrimaryUserLogPage from '../containers/PrimaryUserLogPage';
import TrialUserLogPage from '../containers/TrialUserLogPage';
import Auth from '../containers/Auth/Auth';
import Logout from '../containers/Auth/Logout/Logout';

class App extends Component {

  state = {
    value : 0
  }

  onSetValue = (newVal) =>{
    this.setState({value:newVal});
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render(){
    let routes = (
      <Switch>
        <Route path="/loghistory/signin" component={Auth} />        
        <Redirect to='/loghistory/signin'/>
      </Switch>
    );

    if(this.props.isAuthenticated){
      routes = (
        <Switch>            
            {/* <Route path="/logout" component={UserLogout} /> */}
            <Route path="/loghistory/signin" component={Auth} />
            <Route path="/loghistory/logout" component={Logout} />               
            <Route path="/loghistory/trialusers" component={TrialUserLogPage} />
            <Route path="/loghistory/" component={PrimaryUserLogPage} />
            <Redirect to="/loghistory/" />
        </Switch>
      );
    }

    return (
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Header value={this.state.value} setValue={this.onSetValue} />
              {routes}
            </BrowserRouter>
          </ThemeProvider> 
  );
  }
}

const mapStateToProps = state =>{
  return {
    isAuthenticated: state.auth.accessToken!==null
  }
} 

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
