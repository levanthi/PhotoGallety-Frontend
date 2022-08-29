import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import axios from 'axios';
import { faArrowCircleDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

import styles from './detailPhoto.module.scss';
import { Context } from '../../App';

const cx = classNames.bind(styles);

function DetailPhoto({ src, id, closeDetail }) {
   const { setPhotos, setNotiList } = useContext(Context);
   const handleDownload = () => {
      const a = document.createElement('a');
      const downloadName = src.slice(4, 20);
      a.download = downloadName;
      a.href = 'data:image/png;base64,' + src;
      a.click();
   };
   const handleRemove = () => {
      axios
         // .delete(`http://localhost:3001/${id}`)
         .delete(`https://photogallerybackend.herokuapp.com/${id}`)
         .then((res) => {
            if (res?.data) {
               closeDetail();
               setPhotos((pre) => pre.filter((photo) => photo._id !== id));
               setNotiList((pre) => [
                  ...pre,
                  {
                     type: 'success',
                     message: 'Remove image successfully!',
                     id: uuidv4(),
                  },
               ]);
            }
         });
   };
   return (
      <div className={cx('detail-photo-wrap')}>
         <FontAwesomeIcon
            className={cx('download-icon')}
            title="download"
            icon={faArrowCircleDown}
            onClick={handleDownload}
         />
         <FontAwesomeIcon
            icon={faTrash}
            title="remove from gallery"
            className={cx('remove-icon')}
            onClick={handleRemove}
         />
         <div className={cx('detail-photo')}>
            <img
               src={`data:image/png;base64,${src}`}
               alt="detail"
               className={cx('photo')}
            />
         </div>
      </div>
   );
}

export default DetailPhoto;
