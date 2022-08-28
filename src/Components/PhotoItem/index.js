import classNames from 'classnames/bind';
import styles from './photoItem.module.scss';
import images from '../../assets/images';

const cx = classNames.bind(styles);

function PhotoItems({ src }) {
   return (
      <div className={cx('photo', 'l-3', 'm-4', 'c-6')}>
         <img
            src={src ? `data:image/png;base64,${src}` : images.NotAvailable}
            alt="item"
         />
      </div>
   );
}

export default PhotoItems;
