const template = document.createElement('template');
template.innerHTML = `
  <style>    
    button {
      display: block;
      overflow: hidden;
      position: relative;
      padding: 0 16px;
      font-size: 16px;
      font-weight: bold;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      outline: none;
      width: 100%;
      height: 40px;
      box-sizing: border-box;
      border: 1px solid #a1a1a1;
      background: green;
      box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
      color: #363636;
      cursor: pointer;
    }
  </style>
  <button></button>
`;

class PleaseWaitButton extends HTMLButtonElement {

	constructor() {
		super();
		// this._shadowRoot = this.attachShadow({ mode: 'open' });
		// this._shadowRoot.appendChild(template.content.cloneNode(true));

    // this.$button = this._shadowRoot.querySelector('button');
	}

	static get observedAttributes() {
		//console.log("Label is " + ['label']);
		return ['label'];
	}

	attributeChangedCallback(name, oldVal, newVal) {
		console.log("name is " + name);
		console.log("oldVal is " + oldVal);
		console.log("newVal is " + newVal);
		this[name] = newVal;
		this.render();
	}
	
  render() {
    this.$button.innerHTML = this.label;
  }

}
window.customElements.define('please-wait-button', PleaseWaitButton, {extends: 'button'});