import style from './index.module.less';
import { $$, addClass } from '../../utils/util';

interface ILayoutData {
    children?: HTMLElement | string;
    styles?: object;
}

const Layout = (props: ILayoutData) => {
    const { children, styles } = props;

    const setClass = (node: HTMLDivElement) => {
        if (children) {
            const childrens = children instanceof Array ? children : [children];
            childrens.some((ele: HTMLElement) => {
                if (ele.tagName === 'ASIDE') {
                    // The configuration of the observer (what changes need to be observed)
                    const config = {
                        attributes: true,
                    };

                    // Callback function executed when a change is observed
                    const callback = function (mutationsList, observer) {
                        // Use traditional 'for loops' for IE 11
                        for (let mutation of mutationsList) {
                            if (mutation.type === 'attributes') {
                                addClass(style.layoutWrapperHasSider, node);
                                // After that, you can stop observing
                                observer.disconnect();
                            }
                        }
                    };

                    // Create an observer instance and pass in the callback function
                    const observer = new MutationObserver(callback);

                    // Start observing the target node with the above configuration
                    observer.observe(node, config);

                    return true;
                }
            });
        }
    };

    return (
        <section ref={setClass} style={styles} className={style.layoutWrapper}>
            {children}
        </section>
    );
};

const Header = (props: ILayoutData) => {
    const { children, styles } = props;

    return (
        <header style={styles} className={style.headerWrapper}>
            {children}
        </header>
    );
};
const Footer = (props: ILayoutData) => {
    const { children, styles } = props;

    return (
        <footer style={styles} className={style.footerWrapper}>
            {children}
        </footer>
    );
};
const Content = (props: ILayoutData) => {
    const { children, styles } = props;

    return (
        <main style={styles} className={style.contentWrapper}>
            {children}
        </main>
    );
};
const Sider = (props: ILayoutData) => {
    const { children, styles } = props;

    return (
        <aside style={styles} className={style.siderWrapper}>
            {children}
        </aside>
    );
};

export { Layout, Header, Footer, Content, Sider };
