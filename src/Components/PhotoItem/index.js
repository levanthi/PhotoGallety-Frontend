import { useState } from 'react';
import classNames from 'classnames/bind';

import DetailPhoto from '../DetailPhoto';
import styles from './photoItem.module.scss';
import images from '../../assets/images';
import Overlay from '../Overlay';

const cx = classNames.bind(styles);

function PhotoItems({ src, id }) {
   const [showDetail, setShowDetail] = useState(false);
   const toggleViewDetail = (id) => {
      setShowDetail((pre) => !pre);
   };
   return (
      <>
         {showDetail && (
            <>
               <DetailPhoto src={src} />
               <Overlay closeOverlay={toggleViewDetail} />
            </>
         )}
         <div
            className={cx('photo', 'l-3', 'm-4', 'c-6')}
            onClick={() => {
               toggleViewDetail(id);
            }}
         >
            <img
               src={src ? `data:image/png;base64,${src}` : images.NotAvailable}
               alt="item"
            />
         </div>
      </>
   );
}

export default PhotoItems;
