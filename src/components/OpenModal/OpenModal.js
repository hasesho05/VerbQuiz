import * as React from 'react'
import Box from '@mui/material/Box' // eslint-disable-line no-unused-vars
import CloseIcon from '@mui/icons-material/Close' // eslint-disable-line no-unused-vars
import Modal from '@mui/material/Modal' // eslint-disable-line no-unused-vars
import HelpIcon from '@mui/icons-material/Help' // eslint-disable-line no-unused-vars
import Styles from './OpenModal.module.scss'
import { Button } from '@mui/material' // eslint-disable-line no-unused-vars
import Twitter from '@mui/icons-material/Twitter' // eslint-disable-line no-unused-vars

const style = {
  margin: 0,
  padding: 0,
  position: 'absolute',
  top: '80%',
  left: '50%',
  transform: 'translate(-50%, -80%)',
  width: '80%',
  maxWidth: 600,
  bgcolor: '#1a1a1a;',
  border: '1px solid #3a3a3c',
  boxShadow: 24,
  p: 2,
}

export default function BasicModal() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <HelpIcon onClick={handleOpen} style={{color: 'white', cursor:'pointer', marginRight:'2px'}}/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Box className={Styles.title}>
            <h1>使い方</h1>
            <CloseIcon onClick={handleClose} className={Styles.icon}/>
          </Box>
          <Box className={Styles.content}>
            <div className={Styles.modaltitle}>
              <p>英単語の4択クイズにチャレンジしてみましょう！</p>
              <p>ログインすればユーザーランキングに登録できます。</p>
            </div>
            <div className={Styles.modalexample}>
              <p>まずはトップページからログインしてみましょう！</p>
              <p>シェアができるのでTwitterがおすすめ！</p>
              <Button color="primary" variant="contained" startIcon={<Twitter />} >
                Twitterでログイン
              </Button>
            </div>
            <div className={Styles.modalexample}>
              <p>クイズが終わったら、ランキングに登録できます！</p>
              <Button style={{borderColor:'white', color:'white'}} variant="outlined" >
                ランキングに登録！
              </Button> 
            </div>
            <div className={Styles.modalexample}>
              <p>クイズは１日１回更新予定です！</p>
              <p>復習して順位を上げていきましょう！</p>
              
            </div>
          </Box>
          
  
        </Box>
      </Modal>
    </div>
  )
}
