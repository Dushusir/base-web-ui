/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * check element
 * @param element
 * @returns
 */
export function isElement(element) {
    return element instanceof Element || element instanceof HTMLDocument;
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}

/**
 * DOM selector
 * @param {String}  selector css selector
 * @param {String}  context  parent DOM
 */
export function $$(selector: string, context?: HTMLElement | Document) {
    context = context || document;
    let elements = context.querySelectorAll(selector);

    return elements.length == 1
        ? Array.prototype.slice.call(elements)[0]
        : Array.prototype.slice.call(elements);
}

/**
 * add classname
 * @param className
 * @param selector
 * @param context
 */
export function addClass(
    className: string,
    selector: HTMLElement | string,
    context?: HTMLElement | Document
) {
    if (isElement(selector)) {
        selector.classList.add(className);
        return;
    }

    context = context || document;
    let elements = Array.prototype.slice.call(
        context.querySelectorAll(selector)
    );

    elements.forEach((ele) => {
        ele.classList.add(className);
    });
}
/**
 * remove classname
 * @param className
 * @param selector
 * @param context
 */
export function removeClass(
    className: string,
    selector: HTMLElement | string,
    context?: HTMLElement | Document
) {
    if (isElement(selector)) {
        selector.classList.remove(className);
        return;
    }

    context = context || document;
    let elements = Array.prototype.slice.call(
        context.querySelectorAll(selector)
    );

    elements.forEach((ele) => {
        ele.classList.remove(className);
    });
}

/**
 * deep copy
 * @param obj
 */
export function deepClone(obj) {
    if (obj === null) return null; //null ?????????
    if (obj instanceof RegExp) return new RegExp(obj); //????????????????????????
    if (obj instanceof Date) return new Date(obj); //?????????????????????
    // if (typeof obj == 'Function') return new Function(obj){}; //???????????????
    if (typeof obj != 'object') {
        //???????????????,???????????? ???????????????????????????
        return obj;
    }
    //[].__proto__.constructor=Array()
    //{}.__proto__.constructor=Object()
    //??????????????????????????????,??????????????????????????????new?????????
    var newObj = new obj.__proto__.constructor();
    for (var key in obj) {
        newObj[key] = deepClone(obj[key]);
    }
    return newObj;
}

/**
 *  generate random id
 */
export function randomId(prefix) {
    prefix = prefix ? prefix + '-' : '';
    return (
        prefix +
        Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, '')
            .substr(2, 10)
    );
}

/**
 * ????????????????????????
 * @param obj
 * @returns
 */
export function getFirstChildren(obj: HTMLElement) {
    var objChild = [];
    var objs = obj.getElementsByTagName('*');
    for (var i = 0, j = objs.length; i < j; ++i) {
        if (objs[i].nodeType != 1) {
            // alert(objs[i].nodeType);
            continue;
        }
        var temp = objs[i].parentNode;
        if (temp.nodeType == 1) {
            if (temp == obj) {
                objChild[objChild.length] = objs[i];
            }
        } else if (temp.parentNode == obj) {
            objChild[objChild.length] = objs[i];
        }
    }
    return objChild;
}
/**
 * join className
 */
export function joinClassNames(...args) {
    if (!args.length) return;
    let result = '';
    args.forEach((item) => {
        if (item instanceof Object) {
            for (let k in item) {
                if (item[k]) {
                    result += ' ' + k;
                }
            }
        } else {
            result += ' ' + item;
        }
    });
    return result;
}
