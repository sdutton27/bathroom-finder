import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(23px)',
        '& .MuiSwitch-thumb:before': {
            backgroundRepeat: 'no-repeat',
            background: 'contain',
        // backgroundPosition: 'center',
        // looks more centered like this 
            backgroundPosition: '45% 60%',
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="22" width="25" viewBox="0 0 22 25"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M19 15.18V7c0-2.21-1.79-4-4-4s-4 1.79-4 4v10c0 1.1-.9 2-2 2s-2-.9-2-2V8.82C8.16 8.4 9 7.3 9 6c0-1.66-1.34-3-3-3S3 4.34 3 6c0 1.3.84 2.4 2 2.82V17c0 2.21 1.79 4 4 4s4-1.79 4-4V7c0-1.1.9-2 2-2s2 .9 2 2v8.18c-1.16.41-2 1.51-2 2.82 0 1.66 1.34 3 3 3s3-1.34 3-3c0-1.3-.84-2.4-2-2.82z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          border: theme.palette.mode === 'dark' ? '1px solid #2D3843' : '1px solid #CDD2D7',
          backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#F3F6F9',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      //backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      backgroundColor: theme.palette.primary.main,
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        // backgroundPosition: 'center',
        // looks more centered like this 
        backgroundPosition: '50% 40%',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 25 20"><path fill="${encodeURIComponent(
          '#fff',
        // svg for the Place mui icon
        )}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>')`,
        // backgroundImage: `url(${location})`,
        },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      border: theme.palette.mode === 'dark' ? '1px solid #2D3843' : '1px solid #CDD2D7',
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#F3F6F9',
      borderRadius: 20 / 2,
    },
  }));

const SearchSwitch = () => {

    const handleChange = (e) => {
        
    }

    return (
        <FormControlLabel
                                                    // if they check it then they want dark mode 
            control={<MaterialUISwitch sx={{ m:1 }} checked={false} onChange={(e)=>{handleChange(e)}}/>}
            label=""
        />
    )
}

  export default SearchSwitch;