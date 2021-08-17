import style from './index.module.less';
interface IButtonData {
    children?: HTMLElement | string;
    styles?: object;
}

export const Button = (props: IButtonData) => {
    const { children, styles } = props;

    return (
        <button style={styles} className={`${style.btn} ${style.btnPrimary}`}>
            {children}
        </button>
    );
};
