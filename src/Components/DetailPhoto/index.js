import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';
import styles from './detailPhoto.module.scss';

const cx = classNames.bind(styles);

function DetailPhoto({ src }) {
   const handleDownload = () => {
      const a = document.createElement('a');
      const downloadName = src.slice(4, 20);
      a.download = downloadName;
      a.href = 'data:image/png;base64,' + src;
      a.click();
   };
   return (
      <div className={cx('detail-photo-wrap')}>
         <FontAwesomeIcon
            className={cx('download-icon')}
            title="download"
            icon={faArrowCircleDown}
            onClick={handleDownload}
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
