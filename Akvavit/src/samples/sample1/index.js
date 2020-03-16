import './components/say-something.js';
import './components/pleasewait-button.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      font-family: sans-serif;
    }
  </style>

  <div>
    <h1>Web Components with Webpack Starter Kit</h1>

    Text: <input type="text" />

    <say-something></say-something>
    <say-something color="red"></say-something>
    <br />
    <br />
    <please-wait-button label="Click me"></please-wait-button>
   
    <!--<button is="please-wait-button" disabled>Fancy button!</button>-->
  </div>
    <script>
  const element = document.querySelector('please-wait-button');
  alert(element);
  element.label = 'Click Me From Property';
</script>

`;

class App extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$input = this._shadowRoot.querySelector('input');
    this.$input.addEventListener('input', this._handleChange.bind(this));

    this.$allSaySomething = this._shadowRoot.querySelectorAll('say-something');
    this.$button = this._shadowRoot.querySelector('please-wait-button');

    this.$button.addEventListener('click', () => {
      // do something
      alert('a');
    });
  }

  _handleChange() {
    this.$allSaySomething.forEach(element => {
      element.setAttribute('text', this.$input.value)
    });
    // this.$elementPlsWait.setAttribute('label', "Ok yaar");
  }
}

window.customElements.define('my-app', App);
