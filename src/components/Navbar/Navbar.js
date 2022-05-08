import { auth } from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import OpenModal from '../OpenModal/OpenModal'  // eslint-disable-line no-unused-vars
import Styles from './Navbar.module.scss'
import ProfileModal from '../Profile/Profile' // eslint-disable-line no-unused-vars
import Ranking from '../Ranking/Ranking' // eslint-disable-line no-unused-vars
import DrawerSettings from '../Drawer/Drawer' // eslint-disable-line no-unused-vars
import { Avatar } from '@mui/material' // eslint-disable-line no-unused-vars


function Navbar() {
  const [user] = useAuthState(auth)

  return (
    <header className={Styles.header}>
      <div className={Styles.menuLeft}>
        <OpenModal />
        <Ranking />
      </div>
      <h1 className={Styles.title}>Doughnut</h1>
      <div>
          {user ? (
            <div className={Styles.menuRight}>
              <ProfileModal auth={auth} />
              <DrawerSettings />
            </div>
          ) : (
            <div className={Styles.menuRight}>
              <Avatar sx={{ color: 'white',height: '25px', width: '25px' , marginRight: '5px' }}/>
              <DrawerSettings />
            </div>
          )}
      </div>
    </header>
  )
}


export default Navbar


