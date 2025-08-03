import { SwuFetch } from "./swu_fetch.ts";

export class SwuDom {


    /**
     * Selects an Element from the DOM as HTMLInputElement
     */
    static querySelectorAsInput(selector: string): HTMLInputElement {
        return document.querySelector(selector) as HTMLInputElement;
    }
    static querySelector(selector: string): HTMLElement {
        return document.querySelector(selector) as HTMLElement;
    }
    static querySelectorAll(selector: string) {
        return document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
    }

    static addEventListener(target: HTMLElement | string, eventType: string, callback: Function) {
        //@ts-expect-error
        $(target).on(eventType, callback);
    }

    static removeEventListener(target: HTMLElement | string, eventType?: string) {
        //@ts-expect-error
        $(target).off(eventType);
    }

    static slideUp = (target: HTMLElement | string, duration = 500) => {
        let elem = (typeof (target) == "string") ? SwuDom.querySelector(target) : target;

        elem.style.transitionProperty = 'height, margin, padding';
        elem.style.transitionDuration = duration + 'ms';
        elem.style.boxSizing = 'border-box';
        elem.style.height = elem.offsetHeight + 'px';
        elem.offsetHeight;
        elem.style.overflow = 'hidden';
        elem.style.height = "0";
        elem.style.paddingTop = "0";
        elem.style.paddingBottom = "0";
        elem.style.marginTop = "0";
        elem.style.marginBottom = "0";
        window.setTimeout(() => {
            elem.style.display = 'none';
            elem.style.removeProperty('height');
            elem.style.removeProperty('padding-top');
            elem.style.removeProperty('padding-bottom');
            elem.style.removeProperty('margin-top');
            elem.style.removeProperty('margin-bottom');
            elem.style.removeProperty('overflow');
            elem.style.removeProperty('transition-duration');
            elem.style.removeProperty('transition-property');
            //alert("!");
        }, duration);
    }

    static slideDown = (target: HTMLElement | string, duration = 500) => {
        let elem = (typeof (target) == "string") ? SwuDom.querySelector(target) : target;

        elem.style.removeProperty('display');
        let display = window.getComputedStyle(elem).display;
        if (display === 'none') display = 'block';
        elem.style.display = display;
        let height = elem.offsetHeight;
        elem.style.overflow = 'hidden';
        elem.style.height = "0";
        elem.style.paddingTop = "0";
        elem.style.paddingBottom = "0";
        elem.style.marginTop = "0";
        elem.style.marginBottom = "0";
        elem.offsetHeight;
        elem.style.boxSizing = 'border-box';
        elem.style.transitionProperty = "height, margin, padding";
        elem.style.transitionDuration = duration + 'ms';
        elem.style.height = height + 'px';
        elem.style.removeProperty('padding-top');
        elem.style.removeProperty('padding-bottom');
        elem.style.removeProperty('margin-top');
        elem.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            elem.style.removeProperty('height');
            elem.style.removeProperty('overflow');
            elem.style.removeProperty('transition-duration');
            elem.style.removeProperty('transition-property');
        }, duration);
    }

    static slideToState = (target: HTMLElement | string, state: boolean, duration = 500) => {
        return state ? SwuDom.slideDown(target, duration) : SwuDom.slideUp(target, duration)
    }

    static slideToggle = (target: HTMLElement | string, duration = 500) => {
        let elem = (typeof (target) == "string") ? SwuDom.querySelector(target) : target;

        if (window.getComputedStyle(elem).display === 'none') {
            return SwuDom.slideDown(elem, duration);
        } else {
            return SwuDom.slideUp(elem, duration);
        }
    }

    static show(selector: string) {
        SwuDom.querySelector(selector).style.removeProperty("display");
    }

    static hide(selector: string) {
        SwuDom.querySelector(selector).style.display = "none";
    }

    static setVisibility(selector: string, state: boolean) {
        state ? SwuDom.show(selector) : SwuDom.hide(selector);
    }

    /**
     * Load remote HTML and append to module's DOM element
     * @param path Path to HTML file relative to BASE_URL/${path}
     * @param selector Selector of the element to append the loaded html, @default "body"
     */
    static async loadHtml(path, selector = "body") {
        let html = await SwuFetch.getText(path);
        SwuDom.querySelector(selector).insertAdjacentHTML("beforeend", html);
    }

    /**
     * Load remote CSS and append to current document
     * @param path Path to HTML file relative to BASE_URL/${path}
     */
    static async loadCss(path) {
        return new Promise(function (resolve, reject) {
            let cssElem = document.createElement("link");
            cssElem.href = `${process.env.BASE_URL}/${path}`;
            cssElem.rel = "stylesheet";
            cssElem.addEventListener('load', resolve);
            document.head.appendChild(cssElem);
        });
    }


}