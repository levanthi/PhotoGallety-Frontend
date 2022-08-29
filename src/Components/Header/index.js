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
      setIsLoading(true);
      let path = '';
      if (photoFile.length === 1) {
         path = '/upload';
         data.append('photo', photoFile[0]);
      } else {
         path = '/uploads';
         photoFile.forEach((file) => {
            data.append('photo', file);
         });
      }
      axios
         .post(`https://photogallerybackend.herokuapp.com/upload${path}`, data)
         .then((res) => {
            if (Array.isArray(res.data)) {
               const newPhoto = res.data;
               newPhoto.forEach((photo) => {
                  photo.data = new Buffer(photo.data).toString('base64');
               });
               setPhotos([...newPhoto, ...photos]);
            } else {
               res.data.data = new Buffer(res.data.data).toString('base64');
               setPhotos([res.data, ...photos]);
            }
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
                     multiple
                     onChange={(e) => {
                        setPhotoFile([...e.target.files]);
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
