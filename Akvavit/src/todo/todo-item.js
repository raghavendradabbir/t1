const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
    display: block;
    font-family: sans-serif;
    }

    .completed {
    text-decoration: line-through;
    }

    button {
    border: none;
    cursor: pointer;
    }
</style>
<input type="checkbox">
<span></span>
<button>Delete</button>
`;

class TodoItem extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$spanObject = this._shadowRoot.querySelector('span');
        this.$submitButton = this._shadowRoot.querySelector('button');
        this.$submitButton.addEventListener('click', this.removeToDo.bind(this));
    }

    connectedCallback() {

    }

    removeToDo(input) {

    }

    static get observedAttributes() {
        return ['newtext'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.render();
    }

    get newtext() {
        return this.getAttribute('newtext');
    }

    set newtext(value) {
        this.setAttribute('newtext', value);
    }

    render() {
        this.$spanObject.innerHTML = this.newtext;
    }
}

window.customElements.define('todo-item', TodoItem);
