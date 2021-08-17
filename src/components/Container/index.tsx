import style from './index.module.less';
import { $$ } from '../../utils/util';

interface IContainerData {
    children?: HTMLElement | string;
    styles?: object;
}

export const Container = (props: IContainerData) => {
    const { children, styles } = props;

    return (
        <div style={styles} className={style.containerWrapper}>
            {children}
        </div>
    );
};
