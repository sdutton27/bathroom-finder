import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import { NavContext } from '../../context/NavContext'
import { ThemeContext } from '../../context/ThemeContext'
import { useTheme } from '@emotion/react'

import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';

import './profilepage.css'

export default function ProfilePage() {
  const {user, setUser, logMeOut} = useContext(UserContext)
  const {setCurrentPage} = useContext(NavContext)
  const {currentTheme} = useContext(ThemeContext)
  const theme = useTheme()
  const navigate = useNavigate();
  if(Object.keys(user).length === 0) {
    navigate('/')
  }
  useEffect(()=>{
    setCurrentPage('profile');
    // console.log(user.profile_pic)
  },[])

  return (
    <>
    {(Object.keys(user).length === 0) ? <></> : 
    <Box className="page-container" sx={{backgroundColor: 'background.default', display: 'flex', flexDirection:'row', justifyContent:'center'}}>
      <Paper elevation={3} sx={{width: '90%', height: '50%', borderRadius:'15px', marginTop: '20px', textAlign:'center'}}>
        {/* <Typography variant="h3" sx={{color:'text.primary'}}>My Profile</Typography> */}
        <Grid container spacing={2}>
          <Grid item xs={12} m={6} alignSelf="center" justify="center" align="center">
            <Avatar alt="profile picture" referrerPolicy="no-referrer" src={user.profile_pic} sx={{height: '250px', width: '250px'}} />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {"Name: " + user.first_name + " " + user.last_name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Pronouns: {user.pronouns}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {user.email}
                </Typography>
              </Grid>
              <Grid item>
                {/* <Button onClick={logMeOut}>Logout</Button> */}
                <BasicModal />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Button onClick={logMeOut}>Logout</Button>
      </Paper>
    </Box>
  }
  </>
  )
}

// For the MODAL
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  color: "text.secondary",
  p: 4,
};

const BasicModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Edit Profile</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit Profile
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            This will be the form to edit the profile.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}