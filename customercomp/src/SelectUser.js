import React from "react";
import { Button, Container } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function SelectUser() {
    const navigate = useNavigate();
    const showAdmin = () => {
    //Navigate to admin page
    navigate('/admin');
    };
    const showUser = () => {
        //Navigate to admin page
        navigate('/user');
        };

  return (  
<Container maxWidth="md" style={{height: '25vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', marginTop: '30vh' }}>

   <h1>Please select your account type</h1>
   <Button variant="contained" onClick={showAdmin}>Admin</Button>
   <Button variant="contained" onClick={showUser}>Customer</Button>
    </Container>
  );
}

export default SelectUser;