import React from 'react';
import { Device } from 'twilio-client';
import './BrowserCall.css'; 
import { connect } from 'react-redux';
import Answerer from './Answerer'; 
import { API_BASE_URL } from '../../config'; 

export class DialerApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRinging: 'false', 
      token: '',
      deviceState: '',
      deviceErrorCode: '',
      deviceErrorMessage: '', 
      connection: {}
    };
  }

  handleAppStateChange = state => {

    Device.on(state, obj => {
      this.setState({deviceState: state});
      console.log('state', state);

      if (state === 'error'){ 
        this.setState({
          deviceErrorCode: obj.code,
          deviceErrorMessage: obj.message
        }); 
      }
      else if (state === 'incoming'){ 
        this.setState({isRinging: true, connection: obj}); 
        const callerNumber = obj.parameters.From; 

        // console.log('CALLER ID', obj.paramaters.From); 
        // console.log('obj', obj)

        //CALL ACTION HERE
        // const authToken = getState().auth.authToken;
        // // console.log(`${API_BASE_URL}/client/contacts/phone/${callerNumber.slice(2)}`);
        // fetch(`${API_BASE_URL}/client/contacts/phone/${callerNumber.slice(2)}`, 
        // { 
        //   method: 'GET',
        //   headers: {
        //     // Provide our auth token as credentials
        //     Authorization: `Bearer ${authToken}`
        //   }
        // })
        //   .then(res => { 
        //     console.log('res', res); 
        //   })
        //   .catch(err => { 
        //     console.log('err', err); 
        //   }); 
      }
      else if (state === 'cancel') { 
        this.setState({isRinging: false}); 
      }
      else if (state === 'connect' || state === 'disconnect'){ 
        this.setState({isRinging: false});  
      }
    });
  }; 

  /**
   * Callback from Answerer components answer button
   */
  answerCall = () => { 
    this.state.connection.accept(); 
  }

  /**
   * Callback from Answerer components hangup button
   */
  hangupCall = () => { 
    this.setState({isRinging: false}); 
    this.state.connection.reject(); 
  }
  
  componentDidMount(){
    const twilioDeviceStates = ['cancel', 'connect', 'disconnect', 'ringing', 'error', 'incoming', 'offline', 'ready']; 
    twilioDeviceStates.forEach(twilioDeviceState => { 
      this.handleAppStateChange(twilioDeviceState);  
    }); 

    this.setUpDevice(this.props.capabilityToken); 
  }

  setUpDevice = (capabilityToken) => { 
    this.setState({ token: capabilityToken });
    
    Device.setup(capabilityToken, {
      debug: true, 
      enableRingingState: true, 
      allowIncomingWhileBusy: true
    });  
  }

  //TODO: hook this up to notify user's of errors
  handleNotifcationDismiss = () => {
    this.setState({
      deviceErrorCode: '',
      deviceErrorMessage: ''
    });
  };

  render() {
    if (this.state.isRinging === true) { 
      return (
        <div>
          <Answerer onAnswer={() => this.answerCall()} onHangup={() => this.hangupCall()}/> 
        </div>
      );
    } 
    return (
     <div></div>
    ); 
  }
}

const mapStateToProps = state => {
	console.log('dashboard state', state)
	// const { currentUser } = state.auth;
	return {
		//username: state.auth.currentUser.username,
		//name: `${currentUser.firstName} ${currentUser.lastName}`,
		// protectedData: state.protectedData.data
	};
};

export default connect(mapStateToProps)(DialerApp);