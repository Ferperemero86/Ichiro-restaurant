import React, { Component } from 'react';

import { Redirect, Link }  from 'react-router-dom';


const PasswordSucced = () => {
    return(
        <div id="password-succeed-main">
            <div className="password-succeed-content">
                <h1 className="passwrod-succeed-header">Password succesfully updated!</h1>
                <Link to='/admin'
                      title="Go to Admin/Login page"> Go to Login</Link>
            </div>
        </div>
    )
}

const PasswordFailed = () => {
    return(
        <div id="password-failed-main">
            <div className="password-failed-content">
                <h1 className="password-failed-header">Password  update Error!</h1>
                <Link to='/admin'
                      title="Go to Admin/Login page"> Go to Login</Link>
            </div>
        </div>
    )
}

//Returns Admin recovery form
const AdminPassForm = ({ adminUserName, validateNewEmail, signatureError, passNotValid }) => {
    if (signatureError !== 'false') {
        return (
            <div className="admin-resset-password-form">
                <h1 className="admin-resset-password-form-heading">Resset Password</h1>
                <TokenSignatureError signatureError={ signatureError } />
                <PassNotValid passNotValid={ passNotValid } />
                { adminUserName !== '' && <p>Username:{ adminUserName }</p> }
                <div classname="admin-resset-password-form-element">
                    <label className="admin-resset-password-form-label">Password:</label>
                    <input className="admin-resset-password-form-input" 
                           id="user-password" 
                           type="password" 
                           name="userPassword"/>
                </div>
                <button onClick={ validateNewEmail }
                        className="admin-resset-password-form-button">send</button>
            </div>
        )
    } else {
        return null;
    }
}

const PasswordUpdateStatus = ({ passUpdated, validateNewEmail, adminUserName, signatureError, passNotValid }) => {
    if (passUpdated === 'true') {
        return <PasswordSucced />
    }
    if (passUpdated === 'false') {
        return <PasswordFailed />
    } else {
        return (
            <AdminPassForm  
                passUpdated={ passUpdated }
                validateNewEmail={ validateNewEmail } 
                adminUserName={ adminUserName }
                signatureError={ signatureError }
                passNotValid={ passNotValid }
            />
        )
    }
}

const PassNotValid = ({ passNotValid }) => {
    return (
         passNotValid === 'true' && <p className="error-message">Password Not valid!</p> 
    )
}

const TokenSignatureError = ({ signatureError }) => {
    return (
        signatureError === 'true' && <p><Redirect to='/tokenexpired' /></p>
    )
}

class AdminRessetPass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailNotValid: '',
            passNotValid: '',
            signatureError: '',
            passUpdated: '',
            adminUserName: ''
        }

        this.validateNewEmail = this.validateNewEmail.bind(this);
    }
    
    //Validates email format. If valid sends to server
    validateNewEmail(e) {
        e.preventDefault();
        const passRegExp = /^\w{8,12}$/;
        const passValue = document.querySelector('#user-password').value;
        
        if(passRegExp.test(passValue)) {
            //sends token info to the server
            const userDetails = {
                secret: this.props.match.params.secret,
                token: this.props.match.params.token,
                userPassword: passValue
            }

            fetch('/ressetpassword', {
                method: 'post',
                headers: {
                   'Content-Type': 'application/json'
                },
                body: JSON.stringify(userDetails)
            })    
            .then((response) => { 
                return response.json();
            })
            .then((result) => {
                if(result.passUpdated) {
                    this.setState({passUpdated : result.passUpdated})       
                }  
                if(result.signatureError) {
                    this.setState({signatureError: result.signatureError})       
                }    
                if(result.emailNotValid) {
                    this.setState({emailNotValid: result.emailNotValid})
                }
                if(result.passNotValid) {
                    this.setState({passNotValid: result.passNotValid})
                }
            })
        } else {
            this.setState({passNotValid: 'true'});
        }
    }

    //Sends token data to server and fetches result
    //If data is not valid redirects to login page
    componentDidMount() {
        const checkLink = {
            secret: this.props.match.params.secret,
            token: this.props.match.params.token,
        }

        fetch('/ressetpassword', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(checkLink)
        })    
        .then((response) => { 
            return response.json();
        })
        .then(result => {
            if (result.signatureError === 'true') {
                this.setState({ signatureError: 'true' })
            } else {
                this.setState({  adminUserName: result.adminUserName })
            }
        })
    }
   
    render() {
        return (
            <div id="admin-resset-password-main">
                <PasswordUpdateStatus 
                    passUpdated={ this.state.passUpdated }
                    validateNewEmail={ this.validateNewEmail } 
                    adminUserName={ this.state.adminUserName }
                    signatureError={ this.state.signatureError }
                    passNotValid={ this.state.passNotValid }
                />
            </div>
        )
    }
}


export default AdminRessetPass;