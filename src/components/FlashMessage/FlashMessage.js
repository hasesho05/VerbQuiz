import React from 'react'
import Snackbar from '@mui/material/Snackbar' // eslint-disable-line no-unused-vars
import MuiAlert from '@mui/material/Alert' // eslint-disable-line no-unused-vars

const Alert = React.forwardRef(function Alert(props, ref) {  // eslint-disable-line no-unused-vars
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

function FlashMessage({ message }) {
  const [open, setOpen] = React.useState(true)


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }


  return (
    <div>
      <Snackbar open={open} autoHideDuration={4500} onClose={handleClose}>
          <Alert onClose={handleClose} severity='success' sx={{ width: '100%' ,backgroundColor:'white'}} variant='outlined'>
            {message}
          </Alert>
      </Snackbar>
    </div>
  )
}

export default FlashMessage