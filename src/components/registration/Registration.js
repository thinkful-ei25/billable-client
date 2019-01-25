import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Registration.css';

import RegistrationForm from './RegistrationForm';

export function Registration(props) {
	// If we are logged in (which happens automatically when registration
	// is successful) redirect to the user's dashboard
	if (props.loggedIn) {
		return <Redirect to="/dashboard" />;
	}
	return (
		<div>
			<div className="vhHeader">

			</div>
			<div className="fullPage">
				<div className="registrationPageContainer shadow">
					<div className="topFormContainer">
						<div className="registrationDescription">
							<h1 className="title" >Billable</h1>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.</p>
						</div>
					</div>
					<div className="topFormContainer noLine">
						<RegistrationForm />
					</div>
				</div>
			</div>
			<div className="vhFooter">
			</div>
		</div>

	);
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Registration);