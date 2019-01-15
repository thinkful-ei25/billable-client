import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from '../registration/input';
import {login} from '../../actions/auth';
import {required, nonEmpty} from '../../validators';
import {Link} from 'react-router-dom';
import './Login.css'

export class LoginForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.username, values.password));
    }

    render() {
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }
        return (
            <form
                className="loginForm"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                {error}
                <label htmlFor="email">Email Address</label>
                <Field
                    component={Input}
                    type="text"
                    name="email"
                    validate={[required, nonEmpty]}
                />
            
                <label htmlFor="password">Password</label>
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    id="password"
                    validate={[required, nonEmpty]}
                />
                <button className="signUpButton" disabled={this.props.pristine || this.props.submitting}>
                    Log in
                </button>
                <Link class="login-link" to="/register">Sign Up</Link>
            </form>
        );
    }
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
