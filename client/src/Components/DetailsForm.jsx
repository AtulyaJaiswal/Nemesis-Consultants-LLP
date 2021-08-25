import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar';

const DetailsForm = () => {

    const history = useHistory();

    const [username , setUsername] = useState('');
    const [mobile , setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');


    const submit = async (e) => {
        e.preventDefault();

        const res = await fetch('/userDetails', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username, mobile, email, address
            })
        });
        const data = res.json();

        if (res.status === 401 || !data) {
            window.alert("Fill the fields properly")
        }
        else if(res.status === 402){
            window.alert("Session Expired");
            history.push('/');
        }
        else {
            window.alert("Details Submitted Successfully");
            history.push('/home');
        }
    }

    return (
        <>
            <NavBar/>
            <h1 className="heading">Enter Details</h1>
            <div className="form">
                <Form>
                    <Form.Group className="mb-3" >
                        <Form.Label>Username</Form.Label>
                        <Form.Control autoComplete="off" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Your Username" />
                        <Form.Text className="text-muted">
                            Use only alphabets and number
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control autoComplete="off" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Enter Your Mobile Number" />
                        <Form.Text className="text-muted">
                            Enter Your 10 digit Mobile Number
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your E-mail" />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Address</Form.Label>
                        <Form.Control autoComplete="off" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Your Address" />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={submit}>
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default DetailsForm;