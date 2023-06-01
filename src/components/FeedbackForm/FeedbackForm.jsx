import React, { useRef, useContext } from 'react';
import emailjs from '@emailjs/browser';

import { UserContext } from '../../context/UserContext';

import { Card, Grid } from '@mui/material';


export const FeedbackForm = () => {
    const form = useRef();
    const {user} = useContext(UserContext);

    const sendEmail = async (e) => {
        e.preventDefault();
        const result = await emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, form.current, process.env.REACT_APP_EMAILJS_PUBLIC_KEY)

        // emailjs.sendForm('service_i16vo8u', 'bathroom_finder_form', form.current, 'lB5l3bk97syXrXgB-')
        //   .then((result) => {
        // console.log(result.text);
        //   }, (error) => {
        //       console.log(error.text);
        //   });
        // form.trigger('reset')
        form.current.reset()
    };

    return (
        <div className="bottom-slide">
        <Card sx={{padding: "20px", margin:"20px", borderRadius:"10px",width: "300px"}}>
        {/* <Card className="slideanim float-panel" sx={{padding: "20px", width: "300px"}}> */}
        <Grid container direction="column">
        <form ref={form} onSubmit={sendEmail}>
            <Grid item>
            <label>Name</label>
            </Grid>
            <Grid item>
            <input type="text" style={{borderRadius: "5px"}} name="user_name"/>
            </Grid>
            {/* <Grid item> */}
            <input type="email" defaultValue={user.email} name="user_email" style={{ height: 0, width: 0, visibility: "hidden" }} />
            {/* </Grid> */}
            <Grid item>
            <label>Message</label>
            </Grid>
            <Grid item>
            <textarea style={{borderRadius: "5px"}} name="message" />
            </Grid>
            <Grid item align="center">
            <input  style={{marginTop: "7px", borderRadius: "5px", padding: "5px"}} type="submit" value="Send" />
            </Grid>
        </form>
        </Grid>
        </Card>
        </div>
    );
};