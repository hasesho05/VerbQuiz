import { getAuth } from '@firebase/auth'
import { VerifiedUser } from '@mui/icons-material' // eslint-disable-line no-unused-vars
import { Avatar } from '@mui/material' // eslint-disable-line no-unused-vars
import  { forwardRef } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebase'
import Styles from './UserInfo.module.scss'



const UserInfo = forwardRef(
  ({ displayName, score, avatar, index }, ref) => {
    const [user] = useAuthState(auth)
    const authUser = getAuth()
    return (
      <div>
      {user ? (
        <div className={`${Styles.user} ${authUser.currentUser.displayName === displayName ? Styles.active : ''}`} ref={ref}>
          <div className={Styles.userAvatar}>
            <Avatar src={avatar}/>
          </div>
          <div className={Styles.userBody}>
            <div className={Styles.userHeader}>
              <div className={Styles.userHeaderText}>
                <h3>{displayName}
                 {avatar ? 
                 <span className={Styles.userHeaderSpecial}>
                  <VerifiedUser className={Styles.userBadge} />
                 </span> : <></>}
                </h3>
              </div>
              <div className={Styles.userHeaderDescription}>
                <p>Score：{score} </p>
                <b>{index}位</b>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={Styles.user} ref={ref}>
          <div className={Styles.userAvatar}>
            <Avatar src={avatar}/>
          </div>
          <div className={Styles.userBody}>
            <div className={Styles.userHeader}>
              <div className={Styles.userHeaderText}>
              <h3>{displayName}
                 {avatar ? 
                 <span className={Styles.userHeaderSpecial}>
                  <VerifiedUser className={Styles.userBadge} />
                 </span> : <></>}
                </h3>
              </div>
              <div className={Styles.userHeaderDescription}>
                <p>Score：{score} </p>
                <b>{index}位</b>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    )
  })


export default UserInfo