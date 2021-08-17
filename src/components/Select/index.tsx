import style from './index.module.less';
import { $$ } from '../../utils/util';

interface ISelectData {
    data: {
        value: string | number;
        selected: boolean;
    }[];
    defaultValue?: string | number; // 默认
    multi?: boolean; // 多选
    onClick?: () => void;
}

export const Select = (props: ISelectData) => {
    const { data, defaultValue, multi } = props;

    let title = '请选择'; // 已选
    let ref: HTMLElement; // ref
    let selestedList: any[] = []; // 已选列表
    let showModal: boolean = false; // 弹出层

    const handleClick = () => {
        if (!showModal) {
            document.addEventListener('click', handleOutsideClick, false);
        } else {
            document.removeEventListener('click', handleOutsideClick, false);
        }
        showModal = !showModal;

        if (!showModal) {
            $$(`.${style.selectList} `, ref).style.display = 'none';
        } else {
            $$(`.${style.selectList} `, ref).style.display = 'block';
        }
    };

    const handleOutsideClick = (e) => {
        if (!ref.contains(e.target)) handleClick();
    };

    // 点击打开弹出层
    const printData = (e) => {
        handleClick();
    };

    // 关闭
    const close = () => {
        console.log(111);
    };

    // 选择
    const selectValue = (e, params) => {
        params.selected = !params.selected;
        let flag: boolean = selestedList.some((item: any) => {
            return item.value == params.value;
        });
        if (!flag) {
            selestedList.push(params);
        }

        if (multi) {
            if (params.selected) {
                (e.currentTarget as HTMLElement).classList.add(
                    style.selectIcon
                );
            } else {
                (e.currentTarget as HTMLElement).classList.remove(
                    style.selectIcon
                );
            }

            let str = '';
            selestedList.forEach((item) => {
                if (item.selected) {
                    str += `<span class='${style.selectTag}'><span class='${style.selectText}' >${item.value}</span><span class='${style.selectClose}'>X</span></span>`;
                }
            });

            $$(`.${style.selectHeader} `, ref).innerHTML = str || '请选择';

            setTimeout(() => {
                console.log($$(`.${style.selectClose} `, ref, true));
                $$(`.${style.selectClose} `, ref, true).forEach((element) => {
                    element.addEventListener('click', close);
                });
            }, 0);
        } else {
            title = params.value;
            $$(`.${style.selectHeader} `, ref).innerHTML = params.value;
            handleClick();
        }
    };

    return (
        <div
            ref={(node: HTMLDivElement) => (ref = node)}
            className={style.selectWrapper}
        >
            <div className={style.selectHeader} onClick={(e) => printData(e)}>
                {title}
            </div>

            <ul className={style.selectList}>
                {data.map((item, index) => (
                    <li
                        className={style.selectListItem}
                        onClick={(e) => selectValue(e, item)}
                        key={index}
                    >
                        {item.value}
                    </li>
                ))}
            </ul>
        </div>
    );
};
