import React, { useRef, useContext } from 'react';
import emailjs from '@emailjs/browser';

import { UserContext } from '../../context/UserContext';

export const FeedbackForm = () => {
    const form = useRef();
    const {user} = useContext(UserContext);

    const sendEmail = async (e) => {
        e.preventDefault();
        const result = await emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, form.current, process.env.REACT_APP_EMAILJS_PUBLIC_KEY)

        // emailjs.sendForm('service_i16vo8u', 'bathroom_finder_form', form.current, 'lB5l3bk97syXrXgB-')
        //   .then((result) => {
        console.log(result.text);
        //   }, (error) => {
        //       console.log(error.text);
        //   });
        // form.trigger('reset')
        form.current.reset()
    };

    return (
        <form ref={form} onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" name="user_name"/>
            <input type="email" value={user.email} name="user_email" style={{ height: 0, width: 0, visibility: "hidden" }} />
            <label>Message</label>
            <textarea name="message" />
            <input type="submit" value="Send" />
        </form>
    );
};