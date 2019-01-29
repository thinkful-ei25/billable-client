import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';
import '../../styles/Forms.css';
import { login, register, phone, account, contacts } from '../../images/forms/index.forms'
import { LoginForm, RegisterForm, PhoneSetup } from '../forms/index.forms';

export function FormContainer(props) {
  console.log('logged in', props.loggedIn); 
  if (props.loggedIn) {
    return <Redirect to="/app" />;
  }

  const images = {
    '/setup/account': account,
    '/setup/phone': phone,
    '/setup/contacts': contacts,
    '/login': login,
    '/register': register
  };

  let imgStyle = {
    backgroundImage: 'url(' + images[props.location.pathname] + ')'
  };

  return (
    <div>
      <div className="form-container">
        <div className="img" style={imgStyle} />
        <div className="form-wrapper pad-50">
          <Route exact path="/login" render={() => <LoginForm />} />
          <Route exact path="/register" render={() => <RegisterForm/>} />
          {/* <Route exact path="/setup/account" render={() => <AccountInfoForm />} />  */}
          <Route exact path="/setup/phone" render={() => <PhoneSetup/>} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  // console.log('STATE ',state);

  return ({
    loggedIn: state.auth.currentUser !== null
  })
};

export default withRouter(connect(mapStateToProps)(FormContainer));
