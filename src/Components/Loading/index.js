import classNames from 'classnames/bind';
import styles from './loading.module.scss';

const cx = classNames.bind(styles);

function Loading({ position }) {
   return (
      <div style={{ position: position }} className={cx('loading')}>
         <div className={cx('spinner')}></div>
      </div>
   );
}

export default Loading;
