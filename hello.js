import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Greet() {
    const [email_id, setemail_id] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [hasUppercase, setHasUppercase] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const navigate = useNavigate(); 


    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;


    const toggleShow = () => {
        setShow(true);
        // Automatically hide the toast after a few seconds (optional)
        setTimeout(() => setShow(false), 3000);
    };

    const handleemail_idChange = (e) => {
        setemail_id(e.target.value);
        setError('');
    };

    const handlePasswordChange = (e) => {
        const newPassword=e.target.value;
        setPassword(newPassword);
        setIsValid(specialCharacterRegex.test(newPassword));
        setHasUppercase(uppercaseRegex.test(newPassword));
        setHasNumber(numberRegex.test(newPassword));
        setError('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let errorMessage = '';

        if (!email_id.trim() && !password.trim()) {
            errorMessage = 'email_id and Password are required';
        } else if (!email_id.trim()) {
            errorMessage = 'email_id required';
        } else if (!password.trim()) {
            errorMessage = 'Password required';
        } else if (password.length < 8) {
            errorMessage = "password length should be atleast 8";
        } else if (!isValid) {
            errorMessage = "passsword does not contain special character";
        } else if (!hasUppercase) {
            errorMessage = "passsword does not contain Uppercase";
        } else if (!hasNumber) {
            errorMessage = "passsword does not contain number";
        }
        if (errorMessage) {
            setError(errorMessage);
            toggleShow();
        } else {
            alert(`Thank you for signing in ${email_id}`);
            setemail_id('');
            setPassword('');
            setError('');
            navigate('/newpage', { state: { email_id: email_id } });
        }
    };

    return (
        <div id= "main"><h1>Hello, Welcome to Tarento!</h1>
            <p>Great place to work</p>
        <div id="myDiv">
            <form onSubmit={handleSubmit}>
                <label>email_id : </label>
                <input type="text" name="email_id" className={error && !email_id.trim() ? 'error' : 'name'} placeholder="Enter your name" onChange={handleemail_idChange}></input>
                <br />
                <br />
                <label>Password :  </label>
                <input type="password" name="password" className={error && !password.trim() ? 'error' : 'name'} placeholder="Enter your password" onChange={handlePasswordChange} ></input>
                <br />
                <br />
                <button id="button" type="submit" onClick={toggleShow}>Submit</button>
                <div aria-live="polite" aria-atomic="true" style={{ position: 'relative', minHeight: '200px' }}>
                    <div className="toast-container position-absolute top-0 end-0 p-3">
                        <div className={`toast ${show ? 'show' : 'hide'}`} role="alert" aria-live="assertive" aria-atomic="true">
                            <div className="toast-header">
                                <strong className="me-auto">Error</strong>
                                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => setShow(false)}></button>
                            </div>
                            <div className="toast-body">
                                <h4 id="error">{error}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    )
}
export default Greet

/*
() => setShow(false)*/
