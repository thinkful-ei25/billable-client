import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
// import { Link } from 'react-router-dom';
// import { login, registerUser } from '../../actions/index.actions';
import { Input } from '../_utils/index._utils';
import {
  required,
  nonEmpty,
  matches,
  length,
  isTrimmed,
  emailCheck
} from '../../_utils/index.utils';
const passwordLength = length({ min: 10, max: 72 });
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
  componentDidMount() {
    console.log('the component did mount'); 
  }
  onSubmit(values) {

    // const { organizationName, password, email } = values;
    // const user = { organizationName, password, email };
    // return this.props
    //   .dispatch(registerUser(user))
    //   .then(() => this.props.dispatch(login(organizationName, password)));
  }

  render() {
    return (
      <form
        className="form validate"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        <span className="form-title pad-bottom-50">
          My Settings
        </span>
        <Field
          component={Input}
					label="Change Organization Name"
          type="text"
          name="organizationName"
          validate={[required, nonEmpty, isTrimmed]}
          placeholder="new work place"
        />
        <Field
          component={Input}
					label="Change Email Address"
          type="text"
          name="email"
          validate={[required, nonEmpty, isTrimmed, emailCheck]}
          placeholder="new number"
        />
        <Field
					component={Input}
					label="Change Password"
          type="password"
					name="password"
					id="password"
          validate={[required, passwordLength, isTrimmed]}
          placeholder="************"
        />
        <Field
					component={Input}
					label="Confirm New Password"
          type="password"
          name="passwordConfirm"
          placeholder="************"
          validate={[required, nonEmpty, matchesPassword]}
        />
				<div className="form-button-container">
					<div className="form-button-wrapper">
          <button
							className="form-button"
            	type="submit"
            	disabled={this.props.pristine || this.props.submitting}
          >
            Submit Changes
          </button>
        </div>
				</div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);