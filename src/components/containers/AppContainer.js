import React from 'react'; 
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom'; 
import { refreshAuthToken, clearAuth } from '../../actions/index.actions';
import { RequiresLogin} from '../_utils/index._utils'; 
import { clearAuthToken } from '../../_utils/index.utils'; 
import { AppHeader, Menu } from '../navigation/index.navigation';
import { Home, Contacts, Invoices, IndividualContact, Calls } from '../../pages/index.pages';  
import { DialerApp} from '../../components/browserPhone/index.browserPhone';
import { API_BASE_URL } from '../../config'; 
import SetupContainer from './SetupContainer'
import { Redirect } from 'react-router-dom';
import '../../styles/Contacts.css'; 

export class AppContainer extends React.Component{ 

  componentDidMount(){
    console.log('in app container componnent did mount', this.props.isTutorialCompleted);
    if(!this.props.isTutorialCompleted){
      console.log('is redirecting');
      return <Redirect to="/app/setup" />; 
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      console.log('hitting route');
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      console.log('hitting other route');
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    // console.log('unmounting'); 
    return fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      headers: {
        // Provide our auth token as credentials
        Authorization: `Bearer ${this.props.authToken}`
      }
    })
    .then(() => { 
      console.log('user has been switched to phone mode'); 
      this.stopPeriodicRefresh();
    })
    .catch(err => { 
      console.log('err', err); 
    }); 
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One hour
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) return;
    clearInterval(this.refreshInterval);
  }

  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render(){ 
    return (
      <div>
        <AppHeader name={this.props.organizationName} />
              <Route exact path='/app' component={Home} />
              <Route exact path='/app/contacts' component={ Contacts } />
              {/* <Route exact path='/app/settings' component={ Settings } /> */}
              <Route exact path="/app/calls" component={ Calls } />
              <Route exact path="/app/invoices" component={Invoices} />
              <Route exact path="/app/clients" component={ Contacts } />
              <Route exact path="/app/contacts/:clientId" component={IndividualContact} />
              <Route exact path="/app/setup" component={SetupContainer} />
              {/* <Route exact path="/app/invoices" component={Invoices} /> */}
              {/* <Route exact path="/app/clients/:clientId" component={ContactPage} /> */}
              <button onClick={() => this.logOut()}>LOG OUT</button>
              {(this.props.capabilityToken) ? <DialerApp capabilityToken={this.props.capabilityToken} />  : ''}
              <Menu />
      </div>
    ); 
  }
}

const mapStateToProps = (state, props) => { 
  // console.log('app container', state);
  console.log('state.auth.isTutorialcompleted = ', state.auth.isTutorialCompleted);
   
  return ({
    authToken: state.auth.authToken, 
    isTutorialCompleted: state.auth.isTutorialCompleted,
    capabilityToken : state.auth.capabilityToken, 
    organizationName : state.auth.currentUser.organizationName,
    loading : state.auth.loading, 
    loggedIn: state.auth.currentUser !== null
  }); 
}

export default RequiresLogin()(withRouter(connect(mapStateToProps)(AppContainer)));