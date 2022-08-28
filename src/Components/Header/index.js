import classNames from 'classnames/bind';
import { Buffer } from 'buffer';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from './header.module.scss';
import images from '../../assets/images';
import Loading from '../Loading';
import Notification from '../Notification';

const cx = classNames.bind(styles);

function Header({ photos, setPhotos }) {
   const [photoFile, setPhotoFile] = useState();
   const [isLoading, setIsLoading] = useState(false);
   const notiList = useRef([]);
   const handleSubmit = () => {
      const data = new FormData();
      data.append('photo', photoFile);
      setIsLoading(true);
      axios.post('http://localhost:3001/upload', data).then((res) => {
         res.data.data = new Buffer(res.data.data).toString('base64');
         setPhotos([res.data, ...photos]);
         setIsLoading(false);
         notiList.current.push({
            type: 'success',
            message: 'Upload successfully!',
            id: uuidv4(),
         });
      });
   };
   useEffect(() => {
      if (photoFile) {
         handleSubmit();
      }
   }, [photoFile]);
   return (
      <>
         {isLoading && <Loading position="fixed" />}
         {notiList.current.map((notify) => {
            return (
               <Notification
                  id={notify.id}
                  notiList={notiList}
                  key={notify.id}
                  type={notify.type}
                  message={notify.message}
               />
            );
         })}
         <div className={cx('header')}>
            <h1 className={cx('title')}>YOUR PICTURES</h1>
            <p className={cx('sub')}>
               Choose your picture to save it on the cloud the most security
            </p>
            <label className={cx('add-btn')} htmlFor={'choose-file'}>
               <form encType="multipart/form-data">
                  <input
                     name="photo"
                     type={'file'}
                     id={'choose-file'}
                     value={''}
                     onChange={(e) => {
                        setPhotoFile(e.target.files[0]);
                     }}
                  />
               </form>
               <img src={images.Plus} alt="plus icon" />
            </label>
         </div>
      </>
   );
}

export default Header;
