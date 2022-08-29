import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faCheckCircle,
   faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import styles from './notification.module.scss';

const cx = classNames.bind(styles);

function Notification({ type, message, notiList, id }) {
   let cssConfig = {};
   let icon;
   switch (type) {
      case 'success':
         cssConfig = {
            border: '1px solid #69D84F',
            color: '#69D84F',
            boxShadow: '0 0 10px currentColor',
         };
         icon = faCheckCircle;
         break;
      case 'failed':
         cssConfig = {
            border: '1px solid #FF9494',
            color: '#FF9494',
            boxShadow: '0 0 10px currentColor',
         };
         icon = faTimesCircle;
   }
   const timerIdRef = useRef(0);
   const notiRef = useRef();
   const closeNotify = (id) => {
      notiList.current = notiList.current.filter((noti) => {
         return noti.id !== id;
      });
   };
   const handleClose = () => {
      notiRef.current.style.transform = 'translateY(calc(-100% - 15px))';
      clearTimeout(timerIdRef.current);
      setTimeout(() => {
         closeNotify(id);
      }, 500);
   };
   useEffect(() => {
      setTimeout(() => {
         notiRef.current.style.transform = 'translateY(0)';
      }, 0);
      timerIdRef.current = setTimeout(() => {
         handleClose();
      }, 5000);
   }, []);
   return (
      <div className={cx('notification')} ref={notiRef} style={cssConfig}>
         <FontAwesomeIcon className={cx('icon')} icon={icon} />
         <div className={cx('message')}>{message}</div>
         <span className={cx('close')} onClick={handleClose}>
            &times;
         </span>
      </div>
   );
}

export default Notification;
