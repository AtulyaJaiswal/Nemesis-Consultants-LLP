import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';

const Home = () => {

    const history = useHistory();

    const [userData, setUserData] = useState(null);

    const data = async () => {
        try {
            const res = await fetch('/data', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            setUserData(data);

            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }
            else if(res.status === 402){
                window.alert("Session Expired");
                history.push('/')
            }

        } catch (error) {
            console.log(error);
        }
    }

    const deleteDetailUsername = async () =>{
        const username = userData.username;

        try {
            const res = await fetch('/dataDelUsername', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username
                })
            });

            const data = await res.json();
            if(res.status === 401) {
                window.alert("Session Expired");
                history.push('/');
            }
            else if (!data) {
                const error = new Error(res.error);
                throw error;
            }
            else if (res.status === 200){
                window.alert("Deleted Successfully");
            }
            

        } catch (error) {
            console.log(error);
        }
    }
    const deleteDetailMobile = async () =>{
        const mobile = userData.mobile;

        try {
            const res = await fetch('/dataDelMobile', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    mobile
                })
            });

            const data = await res.json();
            if (!data) {
                const error = new Error(res.error);
                throw error;
            }
            else if (res.status === 200){
                window.alert("Deleted Successfully");
            }
            else if(res.status === 401){
                window.alert("Session Expired");
                history.push('/');
            }

        } catch (error) {
            console.log(error);
        }
    }
    const deleteDetailEmail = async () =>{
        const email = userData.email;

        try {
            const res = await fetch('/dataDelEmail', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email
                })
            });

            const data = await res.json();
            if (!data) {
                const error = new Error(res.error);
                throw error;
            }
            else if (res.status === 200){
                window.alert("Deleted Successfully");
            }
            else if(res.status === 401){
                window.alert("Session Expired");
                history.push('/');
            }

        } catch (error) {
            console.log(error);
        }
    }
    const deleteDetailAddress = async () =>{
        const address = userData.address;

        try {
            const res = await fetch('/dataDelAddress', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    address
                })
            });

            const data = await res.json();
            if (!data) {
                const error = new Error(res.error);
                throw error;
            }
            else if (res.status === 200){
                window.alert("Deleted Successfully");
            }
            else if(res.status === 401){
                window.alert("Session Expired");
                history.push('/');
            }

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        data();
    }, [deleteDetailUsername, deleteDetailMobile, deleteDetailEmail, deleteDetailAddress]);

    if (userData === null) {
        return null;
    }

    return (
        <>
            <NavBar />
            <h1 className="heading">Details of the User</h1>
            
            <div className='data'>
                <h3 style={{padding:"0.5rem"}}><span style={{color:"red"}}>Username : </span> {userData.username} <span><DeleteIcon cursor="pointer" onClick={deleteDetailUsername}/></span></h3>
                <h3 style={{padding:"0.5rem"}}><span style={{color:"red"}}>Mobile Number : </span> {userData.mobile} <span><DeleteIcon cursor="pointer" onClick={deleteDetailMobile}/></span></h3>
                <h3 style={{padding:"0.5rem"}}><span style={{color:"red"}}>Email : </span>{userData.email} <span><DeleteIcon cursor="pointer" onClick={deleteDetailEmail}/></span></h3>
                <h3 style={{padding:"0.5rem"}}><span style={{color:"red"}}>Address : </span> {userData.address} <span><DeleteIcon cursor="pointer" onClick={deleteDetailAddress}/></span></h3>
            </div>
        </>
    );
}

export default Home;