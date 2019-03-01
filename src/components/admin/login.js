import React, { Component } from "react";

import Header from './../main/header';
import Admin from './admin';


const RecoveryForm = ({ sendRecoveryMail, passwordResset }) => {
    if (passwordResset === 'true') {
        return(
            <div className="recovery-email">
                <h1 className="recovery-email-heading">Please introduce your email for recovery</h1>
                <div>
                    <label className="recovery-email-label">Email:</label>
                    <input 
                        className="recovery-email-input" 
                        type="email" 
                        id="recovery-email" 
                        name="recoveryMail" />
                    <button 
                        className="recovery-form-button" 
                        onClick={ sendRecoveryMail }>
                        Send
                    </button>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

const LoginFormMessages = ({ loginWrong, emailExists, emailSent, validEmail }) => {
    return (
        <div className="admin-login-messages">
            { loginWrong === 'true' &&  <p>User and Password do not match!</p> }
            { emailExists === 'false' &&  <p>The email does not exist!</p> } 
            { emailSent === 'false'  && <p>Error sending email!</p> } 
            { emailSent === 'true'  && <p className="admin-login-messages-email-sent">Email sent!</p> } 
            { validEmail === 'false' && <p>Please insert your email</p> } 
        </div>
    )
}

const LoginForm = ({ sendFormContent, showRecoveryForm, loginWrong, emailExists, emailSent, validEmail }) => {
    return (
        <div className="admin-login-form-wrapp">
            <LoginFormMessages
                loginWrong={ loginWrong } 
                emailExists={ emailExists }
                emailSent={ emailSent }
                validEmail={ validEmail }
            />
            <div className="admin-login-form">
                <div className="admin-login-form-element">
                    <label className="admin-login-form-label">User</label>
                    <input 
                        type="text" 
                        name="user" 
                        className="admin-login-form-input" 
                        id="user"/>
                </div>
                <div className="admin-login-form-element">
                    <label className="admin-login-form-label">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        className="admin-login-form-input" 
                        id="password"/>
                </div>
                <button 
                    className="admin-login-form-send-button" 
                    onClick={ sendFormContent }>Send</button>
            </div>
            <a href=""className="admin-login-form-recovery-link"
               title="Go to recovery email" 
               onClick={ showRecoveryForm }>Forgot details?</a>
        </div>
    )
}

const LoginMain = ({ 
                     login, loginWrong,  emailExists,  emailSent, showRecoveryForm,
                     validEmail, passwordResset, match,  sendFormContent,sendRecoveryMail 
                  }) => {

    //If login is false display login form and recovery password link/form
    if (login === 'false') {
        return (
            <div id="admin-login-main">
                <Header />
                <h1 className="admin-login-heading">Login Page</h1>
                <LoginForm 
                    sendFormContent={ sendFormContent } 
                    showRecoveryForm={ showRecoveryForm }  
                    loginWrong={ loginWrong } 
                    emailExists={ emailExists }
                    emailSent={ emailSent }
                    validEmail={ validEmail }
                />
                <RecoveryForm 
                    sendRecoveryMail={ sendRecoveryMail }
                    passwordResset={ passwordResset }
                />  
            </div>
        )
    //If login status is not false display Admin component
    } else if (login === 'true') {
        return ( <Admin match = { match }/> )
    }   
}

//HOC Component wrappes Login Component and uses Admin component as an argument
export default (Admin) => {

    class Login extends Component {
        constructor(props) {
            super(props);
            this.state = {
                login : 'false',
                loginWrong : 'false',
                passwordResset: 'false',
                emailExists: '',
                emailSent: '',
                validEmail: ''
            }
        this.sendFormContent = this.sendFormContent.bind(this);
        this.showRecoveryForm = this.showRecoveryForm.bind(this);
        this.sendRecoveryMail = this.sendRecoveryMail.bind(this);
    }
    
        //Sends login status and fetches the login status 
        componentDidMount() {
            const login = {
                login: this.state.login
            }
           
            fetch('/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)
            })
            .then((response) => { 
                return response.json();
            })
            .then((result) => {
                this.setState({ login: result })            
            })
        }
    
        showRecoveryForm(e) {
            e.preventDefault();
            this.setState({ passwordResset: 'true' })
        }
        
        sendFormContent(e) {
           e.preventDefault();
           const user = document.querySelector('#user').value;
           const password = document.querySelector('#password').value;
          
           const form = {
               user,
               password
           }
    
           fetch('/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })
    
            .then((response) => { 
                return response.json();
            })
            .then((result) => {
                if (result === 'false') {
                    this.setState({ loginWrong: 'true' })
                } else if ( result === 'true') {
                    this.setState({ login: result }); 
                }
            })   
        }
    
        //Sends the email value to server
        sendRecoveryMail(e) {
            e.preventDefault();
            const emailVal = document.querySelector('#recovery-email').value;
            const email = {
                recoveryMail: emailVal
            }
    
            fetch('/passwordresset', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(email)
            })
    
            .then((response) => { 
                return response.json();
            })
            .then((result) => {
                if (result.emailExists === 'false') {
                    this.setState({ emailExists: 'false', emailSent: '', validEmail: '' })
                }

                if (result.emailSent === 'true') {
                    this.setState({ emailSent: 'true', emailExists: '', validEmail: '' })

                } else if (result.emailSent === 'false') {
                    this.setState({ emailSent: 'false', emailExists: '', validEmail: '' });
                }
                
                if (result.validEmail === 'false') {
                    this.setState({ validEmail: 'false',  emailSent: '', emailExists: '' });
                }
            })   
        }

        render() {
            return (
                <LoginMain 
                    login ={ this.state.login }
                    loginWrong={ this.state.loginWrong }
                    emailExists={ this.state.emailExists }
                    emailSent={ this.state.emailSent }
                    validEmail={ this.state.validEmail }
                    passwordResset={ this.state.passwordResset }
                    match={ this.props.match }
                    sendFormContent={ this.sendFormContent }
                    showRecoveryForm={ this.showRecoveryForm }
                    sendRecoveryMail={ this.sendRecoveryMail }
                />
            )
        }

    }

    return Login

}//END HOC
  
    


