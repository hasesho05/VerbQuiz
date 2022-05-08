import * as React from 'react'
import Button from '@mui/material/Button' // eslint-disable-line no-unused-vars
import Dialog from '@mui/material/Dialog'  // eslint-disable-line no-unused-vars
import Popover from '@mui/material/Popover' // eslint-disable-line no-unused-vars
import Typography from '@mui/material/Typography' // eslint-disable-line no-unused-vars
import DialogActions from '@mui/material/DialogActions' // eslint-disable-line no-unused-vars
import DialogTitle from '@mui/material/DialogTitle' // eslint-disable-line no-unused-vars
import { Avatar, DialogContent, DialogContentText, TextField } from '@mui/material' // eslint-disable-line no-unused-vars
import FlashMessage from '../FlashMessage/FlashMessage' // eslint-disable-line no-unused-vars
import { getAuth, updateProfile } from '@firebase/auth'
import Styles from './Profile.module.scss'

export default function ProfileModal({auth}) {
  const [name, setName] = React.useState('')
  const [editSuccess, setEditSuccess] = React.useState(false)
  const authUser = getAuth()
  const [open, setOpen] = React.useState(false)
  const [editOpen, setEditOpen] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const handleClickOpen = () => {
    setAnchorEl(null)
    setOpen(true)
  }
  const handleClose = () => {

    setOpen(false)
  }
  const handleSignout = () => {
    setSuccess(true)
    setOpen(false)
    auth.signOut()
  }

  const onEditOpen = () => {
    setAnchorEl(null)
    setEditOpen(true)
  }

  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopClose = () => {
    setAnchorEl(null)
  }

  const handleBoxClose = () => {
    setEditOpen(false)
  }

  const handleNameChange = (e) => {
    setName(() => e.target.value)
  }

  const editProfile = (e) => {
    e.preventDefault()
    updateProfile(authUser.currentUser, {
      displayName: name
    }).then(() => {
      setEditSuccess(true)
      setEditOpen(false)
    }).catch((error) => {  // eslint-disable-line 
      // An error occurred
      // ...
    })
  }

  const popopen = Boolean(anchorEl)
  const id = popopen ? 'simple-popover' : undefined

  return (
    <div>
      <Avatar src={auth.currentUser.photoURL} onClick={handleClick} style={{cursor:'pointer',marginRight:'5px'}} sx={{ height: '25px', width: '25px' }}/>
      <Popover
        id={id}
        open={popopen}
        anchorEl={anchorEl}
        onClose={handlePopClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Typography className={Styles.popover} onClick={onEditOpen} sx={{ p: 2, cursor: 'pointer' }}>
          プロフィールの変更
        </Typography>
        <Typography className={Styles.popover} onClick={handleClickOpen} sx={{ p: 2, cursor: 'pointer' }}>
          ログアウト
        </Typography>
      </Popover>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'ログアウトしますか?'}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={handleSignout} autoFocus>
            ログアウトする
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editOpen} onClose={handleBoxClose}>
        <DialogTitle>プロフィールの変更</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ユーザーネーム：{authUser.currentUser.displayName}
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='New name'
            fullWidth
            variant='standard'
            onChange={handleNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setEditOpen(false)}>キャンセル</Button>
          <Button onClick={editProfile} >変更</Button>
        </DialogActions>
      </Dialog>
      {
        success ? <FlashMessage message={'ログアウトしました'}/> : ''
      }
      {
        editSuccess ? <FlashMessage message={'ユーザーネームを変更しました'}/> : ''
      }
    </div>
  )
}
