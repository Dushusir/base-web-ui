import {isElement} from '../../utils/util'
/**
 * Basic component class
 */
 interface IProps {
    element?: HTMLElement | null;
}
export class Component {
    private _element:HTMLElement
    constructor(props?:IProps = {}) {

      // Store the HTML element to attach the render to if set
      if (props.hasOwnProperty('element') && isElement(props.element)) {
        this._element = props.element;
      }
      else{
        this._element = this.render();
      }

        // Return the rendered DOM
        return this._element;
    }
    // Render the component's HTML
    abstract render(): HTMLElement;
    append(target: HTMLElement): HTMLElement {
        this._element?.appendChild(target);
        return this._element!;
      }
    
      appendTo(target: HTMLElement) {
        target.appendChild(this._element!);
        return target;
      }
    
      html() {
    
      }
    
      find(query: string): NodeListOf<Element> | undefined {
        return this._element?.querySelectorAll(query);
      }
    
      parent(): (Node & ParentNode) | null | undefined {
        return this._element?.parentNode;
      }
    
      height() {
    
      }
    
      width() {
    
      }
    
      attr() {
    
      }
    
      remove() {
    
      }
}
