import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import anime from 'animejs';
import '../styles/IndividualContact.css';
import { fetchOneClient, fetchClientCalls, FETCH_CLIENT_CALLS_SUCCESS } from '../actions/index.actions'
import { DeleteContact, EditContact, RecentCalls, IndividualContactBody } from '../components/contacts/index.contacts'
import { Redirect } from 'react-router-dom';
import { saveClientId, loadClientId, clearClientId } from '../_utils/_localStorage.js'


// const { twilio } = window;
export class ContactPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      action: "view",
      body: "all"
    }
  }



  componentDidMount() {
    console.log('clientid in componentdidmount', this.props.clientId)
    if (!this.props.clientId) {
      this.props.dispatch(fetchOneClient(loadClientId()))
      this.props.dispatch(fetchClientCalls(loadClientId()))
    }
    else {
      this.props.dispatch(fetchOneClient(this.props.clientId))
      this.props.dispatch(fetchClientCalls(this.props.clientId))
      saveClientId(this.props.clientId)
    }
  }


  onClickExample(e) {
    const element = document.getElementsByClassName('fixedPokePhone')[0];
    element.style.visibility = "visible";
    anime({
      targets: '.fixedPokePhone',
      opacity: 1,
      duration: 4500,
    });
  }

  onExitExample(e) {
    const element = document.getElementsByClassName('fixedPokePhone')[0];
    anime({
      targets: '.fixedPokePhone',
      opacity: 0,
      duration: 1000,
      complete: function () {
        element.style.visibility = 'hidden'
      }
    });
  }

  setAction(e) {
    this.setState({
      action: e.target.value
    })
  }



  render() {



    let invoicesHTML
    const client = this.props.client
    if (client.invoice) {
      if (client.invoice.length) {
        invoicesHTML = client.invoice.map((invoice, index) => {
          return (<div key={index} className="individualInvoice">
            <h4 className="invoiceStatus stackedElements">Status (coming)</h4>
            <h2 className="stackedElements">{invoice.month + ' ' + invoice.year} Invoice ${invoice.amount}</h2>
            <p className="stackedElements">Sent {invoice.sentDate + ' - ' + (invoice.paid ? 'Paid ' + invoice.paidDate : 'Unpaid')}</p>
          </div>)
        })
      }
    }


    if (this.props.loading) {
      return <div>loading...</div>
    }

    else if (this.state.action === "view") {


      return (
        <div className="contactPage">
          <div className="contactPageContainer">
            <div className="contactTopHeader">
              <div className="contactPageHeader">
                <div className="contactHeaderLeft">
                  <h3>{client.firstName + ' ' + client.lastName}</h3>
                </div>
                <div className="contactHeaderRight">
                  <h3 className="contactTitle">{client.category}</h3>
                  <select value={this.state.action} onChange={e => this.setAction(e)} className="contactActionButton">

                    <option value="view">Actions</option>
                    <option value="redirecting">All Contacts</option>
                    <option value="editing">Edit</option>
                    <option value="deleting">Delete</option>
                  </select>
                </div>
              </div>
            </div>
            <p className="bestFriend">{client.company}</p>
            <div className="contactSections">
              <p onClick={() => this.setState({body: "all"})} className="contactLinks">Details</p>
              <p onClick={() => this.setState({body: "calls"})}className="contactLinks">Calls</p>
              <p onClick={() => this.setState({body: "invoices"})} className="contactLinks">Invoices</p>
              <p className="contactLinks">Notes</p>
            </div>
          </div>
          {this.state.body === 'all' ?
            <IndividualContactBody client={this.props.client} calls={this.props.calls} invoicesHTML={invoicesHTML}
              setBody={(body) => this.setState({body: body})} />
            :
            (this.state.body === 'calls' 
            ? 
            <RecentCalls calls={this.props.calls} />
            :
            <div>Invoices</div>)}
          
        </div>
      );

    } else if (this.state.action === "editing") {
      return (
        <div className="topFormContainer noLine">
          <EditContact
            initialValues={this.props.client}
            toggle={() => this.setState({ action: "view" })}
          />
        </div>
      );


    } else if (this.state.action === "deleting") {
      return (
        <div className="deleteClientContainer">
          <DeleteContact
            id={this.props.clientId}
            name={this.props.client.firstName + ' ' + this.props.client.lastName}
            dispatch={this.props.dispatch}
            redirect={() => this.setState({ action: "redirecting" })}
            toggle={() => this.setState({ action: "view" })} />
        </div>
      )
    }

    else if (this.state.action === "redirecting") {
      return (
        <Redirect to="/app/contacts" />
      )
    }

    else {
      return null;
    }

  }

}

const mapStateToProps = state => {
  return ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null,
    client: state.client.data,
    clientId: state.client.clientId,
    loading: state.client.loading,
    calls: state.client.calls
  });
}


export default withRouter(connect(mapStateToProps)(ContactPage));
