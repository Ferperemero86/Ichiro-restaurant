import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';


const AdminFormErrorMessages = ({ emailExists, nameError,  emailError, passwordError  }) => {
    return (
        <div>
        { emailExists === 'true' && 
        <p className="admin-profile-error-message">The email already exists!</p> }
        { nameError === 'true' && 
        <p className="admin-profile-error-message">Please enter a valid name</p> }
        { emailError === 'true' && 
        <p className="admin-profile-error-message">Please enter a valid email</p> } 
        { passwordError === 'true' && 
        <p className="admin-profile-error-message">Please enter a minimum 8 to 12 letters and/or numbers password</p> }
        </div>
    )
}

const UpdateMessage = ({ update }) => { 
    return (
        <div>
            { update === 'false' && <p className="element-not-updated">Sorry Couldn't update!</p> }
            { update === 'true' && <p className="element-updated">Element updated!</p> }
        </div>
    )
}

const AdminFormNameInput = ({ changeDetails, cancelDetailsChanges, updateDetailsChanges, details }) => {
    return (
        <div id="name-input" className="admin-profile-element">
            <div> 
                <label className="admin-profile-label">Name:</label>
                <span className="admin-profile-field">{ details[0].user }</span>
                <input className="admin-name form-input hidden" 
                       id="admin-name-value" 
                       type="text"/>
            </div>
            <button onClick={ (e)=>changeDetails(e,'admin-name') } 
                    className="admin-profile-button">Edit</button>
            <button onClick={ (e)=>cancelDetailsChanges(e,'admin-name') } 
                    className="admin-profile-button">Cancel</button>
            <button 
                className="admin-name hidden" 
                onClick={ (e)=>updateDetailsChanges(e,'admin-name-value',"user") } 
                className="admin-profile-button">Save</button>
        </div>
    )
}

const AdminFormEmailInput = ({ changeDetails, cancelDetailsChanges, updateDetailsChanges, details }) => {
    return (
        <div id="email-input" 
             className="admin-profile-element"> 
        <div>
            <label className="admin-profile-label">Email:</label>
            <span className="admin-profile-span">{ details[0].email }</span>
            <input className="admin-email form-input hidden" 
                   id="admin-email-value" 
                   type="text"/>
        </div>
        <button onClick={ (e)=>changeDetails(e,'admin-email') } 
                className="admin-profile-button">Edit</button>
        <button onClick={ (e)=>cancelDetailsChanges(e,'admin-email') } 
                className="admin-profile-button">Cancel</button>
        <button 
            className="admin-email hidden" 
            onClick={ (e)=>updateDetailsChanges(e,'admin-email-value',"email") } 
            className="admin-profile-button">Save</button>
    </div>
    )
}

const AdminFormPasswordInput = ({ changeDetails, cancelDetailsChanges, updateDetailsChanges }) => {
    return (
        <div id="pass-input" className="admin-profile-element">
                <div>
                    <label className="admin-profile-label">Password:</label>
                    <span  className="admin-profile-span">******</span>
                    <input className="admin-password form-input hidden" 
                           id="admin-password-value" 
                           type="password"/>
                </div>
                <button onClick={ (e)=>changeDetails(e,'admin-password') } 
                        className="admin-profile-button">Edit</button>
                <button onClick={ (e)=>cancelDetailsChanges(e,'admin-password') } 
                        className="admin-profile-button">Cancel</button>
                <button 
                    className="admin-password hidden" 
                    onClick={ (e)=>updateDetailsChanges(e,'admin-password-value',"password") } 
                    className="admin-profile-button">Sav</button>
        </div>    
    )
}

const AdminForm = ({ changeDetails, cancelDetailsChanges, updateDetailsChanges, details }) => {
    return (
        <div className="admin-profile-form">
            <AdminFormNameInput 
                changeDetails={ changeDetails } 
                cancelDetailsChanges={ cancelDetailsChanges } 
                updateDetailsChanges={ updateDetailsChanges } 
                details={ details }
            />
             <AdminFormEmailInput 
                changeDetails={ changeDetails } 
                cancelDetailsChanges={ cancelDetailsChanges } 
                updateDetailsChanges={ updateDetailsChanges } 
                details={ details }
            />
             <AdminFormPasswordInput 
                changeDetails={ changeDetails } 
                cancelDetailsChanges={ cancelDetailsChanges } 
                updateDetailsChanges={ updateDetailsChanges } 
            />
        </div>  
    )
}

//Returns admin details and form to edit the conent
const AdminDetails = ({ logout, details, changeDetails, cancelDetailsChanges, updateDetailsChanges, emailExists, nameError, emailError, passwordError, update }) => {  
    if (details !== '') {
        return (
            <div className="admin-profile-details">
                <button className="logout-button" onClick={ logout }>Logout</button>
                <UpdateMessage update={ update } />
                <AdminFormErrorMessages 
                    emailExists={ emailExists }
                    nameError={ nameError }
                    emailError={ emailError }
                    passwordError={ passwordError }
                />
                <AdminForm
                    changeDetails={ changeDetails } 
                    cancelDetailsChanges={ cancelDetailsChanges } 
                    updateDetailsChanges={ updateDetailsChanges } 
                    details={ details }
                />
            </div>
        )   
    } else {
        return null;
    }
}

const LogOutRedirection = ({ redirect }) => {
    return redirect === 'true' && <Redirect to='/' /> 
}

class AdminProfile extends Component {
    constructor() {
        super();
        this.state = {
            details: '',
            update: '',
            redirect: 'false',
            nameError: 'false',
            emailError: 'false',
            passwordError: 'false',
            emailExists: ''
        }

        this.logout = this.logout.bind(this);
        this. updateDetailsChanges = this.updateDetailsChanges.bind(this);    
    }

    //Fetches Admin data
    componentDidMount() {
        fetch(`/adminprofile`, {
            method: 'post',
            headers: {
                'Content-type' : 'application/json'
            }
        })
        .then( response => {
            return response.json();
        })
        .then( result => {
            this.setState({ details: result })
        })
    }
    
    //Shows input form to edit
    changeDetails(e,detailClassName) {
        e.preventDefault();
        const nameElements = document.getElementsByClassName(detailClassName);
        for (let i = 0;  i < nameElements.length; i++) {
            nameElements[i].classList.remove('hidden');
        }
    }
    
    //Hides the input form 
    cancelDetailsChanges(e,detailClassName) {
        e.preventDefault();
        const nameElements = document.getElementsByClassName(detailClassName);
        for (let i = 0;  i < nameElements.length; i++) {
            if(!nameElements[i].classList.contains('hidden')) {
                nameElements[i].classList.add('hidden');
            }
        }
    }
    
    //Hides the input form once is updated
    elementUpdated() {
        const nameElements = document.getElementsByClassName('form-input');
        for (let i = 0;  i < nameElements.length; i++) {
            if(!nameElements[i].classList.contains('hidden')) {
                nameElements[i].classList.add('hidden');
            }
        }
    }
    
    //Validates input data and updates info
    updateDetailsChanges(e,detailValue,field) {
        e.preventDefault();
        const nameRegExp = /^([ ]{1,5})?\w{2,10}([ ]{1,5})?$/;
        const emailRegExp =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const passRegExp = /^\w{8,12}$/;
        
        //Validates data
        let validation = 'false'

        if (detailValue === 'admin-name-value') {
            const name = document.querySelector('#admin-name-value').value;
            if (nameRegExp.test(name)) {
                validation = 'ok';
            } else {
                this.setState({ nameError: 'true'})
            }
        }

        if (detailValue === 'admin-email-value') {
            const email = document.querySelector('#admin-email-value').value;
            if (emailRegExp.test(email)) {
                validation = 'ok';
            } else {
                this.setState({ emailError: 'true'})
            }
        }

        if (detailValue === 'admin-password-value') {
            const password = document.querySelector('#admin-password-value').value;
            if (passRegExp.test(password)) {
                validation = 'ok';
            } else {
                this.setState({ passwordError: 'true'})
            }
        }

        //If data ok send to server
        if (validation === 'ok') {
            const element = document.getElementById(detailValue);
            const elementValue = element.value;
            const detail = {
                userDetail: elementValue,
                userField: field
            }
    
            fetch(`/adminprofile`, {
                method: 'post',
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify(detail)        
            })
            .then( response => {
                return response.json();
            })
            .then( result => {
                //Handle messages and returns updated admin info
                this.setState({ update: result.elementUpdated })
                if (result.elementUpdated === 'userUpdated') {
                    this.setState({update: 'true', details: result.details, nameError: 'false', emailError: 'false', passwordError: 'false'})
                    this.elementUpdated();
                    setTimeout(()=> { this.setState({update: ''})},3000)
                }
                if (result.elementUpdated === 'userNotUpdated') {
                    this.setState({update: 'false'})
                }
                if (result.elementUpdated === 'emailUpdated') {
                    this.setState({update: 'true', details: result.details, nameError: 'false', emailError: 'false', passwordError: 'false'})
                    this.elementUpdated();
                    setTimeout(()=> { this.setState({update: ''})},3000)
                }
                if (result.elementUpdated === 'emailNotUpdated') {
                    this.setState({update: 'false'})
                }
                if (result.elementUpdated === 'passwordUpdated') {
                    this.setState({update: 'true', details: result.details, nameError: 'false', emailError: 'false', passwordError: 'false'})
                    this.elementUpdated();
                    setTimeout(()=> { this.setState({update: ''})},3000)
                }
                if (result.elementUpdated === 'passwordNotUpdated') {
                    this.setState({update: 'false'})
                }

                if (result.emailExists == 'true') {
                    this.setState({ emailExists: 'true'});
                    setTimeout(()=> { this.setState({update: ''})},3000)
                }

                //User inputs server Validation
                if (result.userError === 'true') {
                    this.setState({ nameError: 'true' })
                }
                if (result.emailError === 'true') {
                    this.setState({ emailError: 'true' })
                }
                if (result.passwordError === 'true') {
                    this.setState({ passwordError: 'true' })
                }
    
            })
        }
    }

    //Destroys admin session and redirects to Home page
    logout(e) {
        e.preventDefault();
        const status = {
            logout: 'true'
        }

        fetch(`/logout`, {
            method: 'post',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(status)        
        })
        .then( response => {
            return response.json();
        })
        .then( result => {
            this.setState({ redirect: result })
        })
    }
    
    render() {
        return (
            <div id="admin-profile-main">
                <h1 className="admin-profile-first-heading">Admin Profile</h1>
                <LogOutRedirection redirect={ this.state.redirect } />
                <AdminDetails 
                    details ={ this.state.details }
                    changeDetails ={ this.changeDetails }
                    updateDetailsChanges ={ this.updateDetailsChanges }
                    cancelDetailsChanges ={ this.cancelDetailsChanges }
                    logout ={ this.logout }
                    nameError ={ this.state.nameError }
                    emailError ={ this.state.emailError }
                    passwordError ={ this.state.passwordError }
                    emailExists ={ this.state.emailExists }
                    update={ this.state.update }
                />       
            </div>
        )
    }     
}


export default AdminProfile;