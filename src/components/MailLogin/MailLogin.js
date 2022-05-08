import * as React from 'react';
import  { useState } from 'react'
import Styles from './MailLogin.module.scss'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile} from '@firebase/auth'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Modal from '@mui/material/Modal'
import FlashMessage from '../FlashMessage/FlashMessage';
import EmailIcon from '@mui/icons-material/Email';


export default function SignUp() {
  const style = {
    margin: 0,
    padding: 0,
    position: 'absolute',
    top: '80%',
    left: '50%',
    transform: 'translate(-50%, -80%)',
    width: '80%',
    maxWidth: 600,
    bgcolor: 'white',
    border: '1px solid #3a3a3c',
    boxShadow: 24,
    p: 2,
  }
  const theme = createTheme();
 
  const [open, setOpen] = useState(false)
  const [isRegisterd, setIsRegistered] = useState(true)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [success, setSuccess] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleNameChange = (event) => {
    setName(event.currentTarget.value);
  }
  const handleChangeEmail = (event) => {
    setEmail(event.currentTarget.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.currentTarget.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const auth = getAuth()
    console.log(email)
    console.log(password)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      const user = userCredential.user
        const editProfile = (event) => {
          event.preventDefault()
          updateProfile(auth.currentUser, {
            displayName: name
          }).then(() => {
            setOpen(false)
          }).catch((error) => {  // eslint-disable-line 
            // An error occurred
            // ...
          })
        }
        editProfile(event)
        setOpen(false)
        setSuccess(true)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert(error.message)
      }); 
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const auth = getAuth()
    console.log(email)
    console.log(password)
    signInWithEmailAndPassword(auth, email, password)
      .then(()=> {
        setOpen(false)
        setSuccess(true)
      })
      .catch((error)=> {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert(error.message)
      })
  }


  
  return (
    <div className={Styles.login}>
      <Button 
      variant="outlined" 
      onClick={handleOpen} 
      startIcon={<EmailIcon />}
      style={{color: 'white', cursor:'pointer'}}
      >
      メールアドレスで認証
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
          <Box sx={style}>
            <Box
              sx={{
                marginTop: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight:"400px"
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              {isRegisterd ? 
              <div>
                <h1 style={{display:"block",
                      textAlign:"center",
                      fontSize:"20px"}}>ユーザー登録</h1>
                <Box sx={{ mt: 3 }} >
                  <TextField
                    autoComplete="given-name"
                    name="displayName"
                    required
                    fullWidth
                    id="firstName"
                    label="Profile name"
                    autoFocus
                    onChange={(event) => handleNameChange(event)}
                  />
                  <TextField
                    sx={{ mt: 3}}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(event) => handleChangeEmail(event)}
                  />
                  <TextField
                    sx={{ mt: 3}}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(event) => handleChangePassword(event)}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit}
                  >
                    登録する
                  </Button>
                  <div 
                    style={{
                      display:"block",
                      textAlign:"right",
                      cursor:"pointer",
                      fontSize:"14px"
                      }}
                    onClick={()=>setIsRegistered(false)}
                    >
                        登録済みの方はこちら
                  </div>
                </Box>
              </div>
              : 
              <div>
                <h1 style={{display:"block",
                      textAlign:"center",
                      fontSize:"20px"}}>ログイン</h1>
                <Box sx={{ mt: 3 }} >
                  <TextField
                    sx={{ mt: 3}}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(event) => handleChangeEmail(event)}
                  />
                  <TextField
                    sx={{ mt: 3}}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(event) => handleChangePassword(event)}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleLogin}
                  >
                    ログインする
                  </Button>
                  <div 
                    style={{
                      display:"block",
                      textAlign:"right",
                      cursor:"pointer",
                      fontSize:"14px"
                      }}
                    onClick={()=>setIsRegistered(!isRegisterd)}
                    >
                        ユーザー登録はこちら
                  </div>
                </Box>
              </div>
              
              }
            </Box>
          </Box>
      </Modal>

      {
        success ? <FlashMessage message={'ログインに成功しました！'}/> : ''
      }
    </div>
  );
}