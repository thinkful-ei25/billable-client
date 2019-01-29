import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { registerUser, getPhoneNumbers } from '../../actions/users';
import { login } from '../../actions/auth';
import Input from './input';
import { required, nonEmpty, isTrimmed, phoneCheck } from '../../validators';
import './SetupPhone.css';


export class SetupPhone extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			numbers: [],
			numberSearch: '',
			disabled: true,
			phoneNumber: '',
			lastButton: null
		}
	}

	componentDidMount() {
		//this.setupNumberArray();
	}

	setupNumberArray() {
		let array = [];
		for (let i = 0; i < 200; i++) {
			let string = '';
			for (let j = 0; j < 10; j++) {
				string += String(Math.floor(Math.random() * 10));
				if (j === 2 || j === 5) {
					string += '-';
				}
			}
			array.push(string);
		}
		this.setState({
			numbers: array
		})
	}

	onSubmit(values) {
		const { username, password, firstName, lastName } = values;
		const user = { username, password, firstName, lastName };
		return this.props
			.dispatch(registerUser(user))
			.then(() => this.props.dispatch(login(username, password)));
	}

	handleNumberSearchChange(e) {
		if (e.target.value.length === 3) {
			console.log('in handle number change');
			this.props.dispatch(getPhoneNumbers(e.target.value))
				.then(res => {
					if (res)
						this.setState({ numbers: res })
				})
				.catch(err => {
					console.log(err);
				})
		}
	}

	handleNumberClick(e) {
		this.setState({
			disabled: false,
			phoneNumber: e.target.value,
			lastButton: e.target,
		})
		if (this.state.lastButton){
			let tempObj = this.state.lastButton;
			tempObj.style = e.target.style;
			this.setState({
				lastButton : tempObj
			})
		}
		e.target.style.border = "1px solid blue"
	}

	render() {
		console.log(this.state.numberSearch);
		return (
			<div className="background">
				<div className="navBar">
					<div className="navBarLeft">
						<img className="logo" alt='logo' src='data:image/png;base64,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'></img>
					</div>
					<div className="navBarMiddle">
					</div>
					<div className="navBarRight"></div>
				</div>
				<div className="setupFormContainer shadow">
					<div style={{ border: "none" }} className="topFormContainer">
						<div className="registrationDescription">
							<h3 className="title">Billable</h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Nullam tortor nulla, rhoncus at laoreet quis, pretium at
							elit. Nunc posuere vel metus a feugiat. Etiam dignissim erat
									ut neque accumsan, mattis vestibulum ex auctor. Nam accumsan
									sollicitudin odio id mollis. Nunc mi diam, convallis a nisi et,
                            molestie ultricies urna. Etiam sodales ut est ut</p>
						</div>
						<form
							className="loginForm"
							onSubmit={this.props.handleSubmit(values =>
								this.onSubmit(values)
							)}>
							<label htmlFor="phone">What's your phone number?</label>
							<Field
								component={Input}
								type="text"
								name="phone"
								validate={[required, nonEmpty, isTrimmed, phoneCheck]}
							/>
							<div className="lineBreak"></div>
							<label htmlFor="firstName">Name of Billable Number</label>
							<Field
								component={Input}
								type="text"
								name="companyName"
								validate={[required, nonEmpty, isTrimmed]}
							/>
						</form>
						<div className="lineBreak"></div>
						<h3>Select your Billable Phone Number</h3>
						<p>Area Code</p>
						<input onChange={e => this.handleNumberSearchChange(e)} className="digitInput" placeholder="Search by Digits (Optional)"></input>
						<p>Select an available phone number: </p>
						<div className="buttonContainer">
							{
								this.state.numbers.map((number, index) => {
									return (
										<button className="numberButton" id={index} value={number.response} onClick={e => this.handleNumberClick(e)}>{number.display}</button>
									)
								})
							}
						</div>
						<div className="submitButton">
							<button className="phoneSubmitButton" disabled={this.props.invalid || this.state.disabled}>Submit</button>
						</div>
					</div>
				</div>
				<div className="footer">
				</div>
			</div >
		);
	}
}

export default reduxForm({
	form: 'registration',
	onSubmitFail: (errors, dispatch) =>
		dispatch(focus('registration', Object.keys(errors)[0]))
})(SetupPhone);
