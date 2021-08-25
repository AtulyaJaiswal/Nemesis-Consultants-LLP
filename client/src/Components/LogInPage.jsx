import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar';

const LogInPage = () => {

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async (e) => {
        e.preventDefault();

        const res = await fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });
        const data = res.json();

        if (res.status === 400 || !data) {
            window.alert("Fill the fields properly")
        }
        else if (res.status === 401) {
            window.alert("invalid Credentials")
        }
        else if (data) {
            window.alert("User Logged In Successfully");
            history.push('/DetailsForm');
        }
    }

    return (
        <>
            <NavBar/>
            <h1 className="heading">Log In  </h1>
            <div className="form">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={login}>
                        Log In
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default LogInPage;