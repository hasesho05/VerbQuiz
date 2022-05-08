import React, { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close' // eslint-disable-line no-unused-vars
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore'
import { db, Today } from '../../config/firebase'
import Userinfo from '../UserInfo/Userinfo' // eslint-disable-line no-unused-vars
import Styles from './Ranking.module.scss'
import AddchartIcon from '@mui/icons-material/Addchart' // eslint-disable-line no-unused-vars
import { Modal } from '@mui/material' // eslint-disable-line no-unused-vars
import { Box } from '@mui/system' // eslint-disable-line no-unused-vars
import FlipMove from 'react-flip-move' // eslint-disable-line no-unused-vars

const style = {
  margin: 0,
  padding: 0,
  position: 'absolute',
  top: '55%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxHeight: 600,
  bgcolor: '#1a1a1a;',
  border: '1px solid #3a3a3c',
  boxShadow: 24,
  p: 2,
}

const style2 = {
  margin: 0,
  padding: 0,
  width: '100%',
  maxHeight: '500px',
  bgcolor: '#1a1a1a;',
  p: 4,
  overflow:'scroll',
}

export default function Ranking() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [users, setUsers] = useState([])
  const [todayUsers, setTodayUsers] = useState([])
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    const todayData = collection(db, Today())
    const userData = collection(db, 'users')
    const t = query(todayData, orderBy('score', 'desc'))
    const u = query(userData, orderBy('score', 'desc'))

    onSnapshot(u, (querySnapshot) => {
    setUsers(querySnapshot.docs.map((doc) => doc.data()))
  })
    onSnapshot(t, (querySnapshot) => {
    setTodayUsers(querySnapshot.docs.map((doc) => doc.data()))
  })
  }, [open])


  return (
    <div className={Styles.ranking}>
      <AddchartIcon onClick={handleOpen} style={{cursor:'pointer', color:'white'}}/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Box className={Styles.title}>
            <h1>ユーザーランキング</h1>
            <CloseIcon onClick={handleClose} className={Styles.icon}/>
          </Box>
    
      <div className={Styles.blocTabs}>
        <button
          className={`${Styles.tabs} ${toggleState === 1 ? Styles.activeTabs : ''}`}
          // className={toggleState === 1 ? Styles.tabs & Styles.active-tabs : Styles.tabs}
          onClick={() => toggleTab(1)}
        >
          デイリー
        </button>
        <button
          className={`${Styles.tabs} ${toggleState === 2 ? Styles.activeTabs : ''}`}
          onClick={() => toggleTab(2)}
        >
          総合
        </button>
      </div>

      <div className={Styles.contentTabs}>
        <div
          className={`${Styles.content} ${toggleState === 1 ? Styles.activeContent : ''}`}
        >
          <FlipMove>
            {todayUsers.map((user, index) => (
              <Userinfo
                key={user.displayName}
                displayName={user.displayName}
                score={user.score}
                avatar={user.photoURL}
                index={index+1}
              />
            ))}
          </FlipMove>
        </div>

        <div
          className={`${Styles.content} ${toggleState === 2 ? Styles.activeContent : ''}`}
        >
          <FlipMove>
            {users.map((user, index) => (
              <Userinfo
                key={user.displayName}
                displayName={user.displayName}
                score={user.score}
                avatar={user.photoURL}
                index={index+1}
              />
            ))}
          </FlipMove>
        </div>
      </div>
        </Box>
      </Modal>
    </div>
  )
}

