import './todo-item.js';

const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
    display: block;
    font-family: sans-serif;
    text-align: center;
    }

    button {
            display: -webkit-inline-box;
            display: inline-flex;
            height: 40px;
            width: 150px;
            border: 2px solid #BFC0C0;
            margin: 20px 20px 20px 20px;
            color: #BFC0C0;
            text-transform: uppercase;
            text-decoration: none;
            font-size: .8em;
            letter-spacing: 1.5px;
            -webkit-box-align: center;
            align-items: center;
            -webkit-box-pack: center;
            justify-content: center;
            overflow: hidden;
    cursor: pointer;
    }

    ul {
    list-style: none;
    padding: 0;
    }
    .m-b-30 {
        margin-bottom: 30px;
    }
</style>
<h1>To do App</h1>

<input type="text" placeholder="Add a new to do"></input>
<button>✅ Add To Do</button>

<div id="todos" class="m-b-30"></div>

<video  id="ad" width="440" height="320" controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
  Your browser does not support the video tag.
</video>

<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
AAA
<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
BBB
<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
CCC
<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
DDD
`;

class TodoApp extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$todoList = this._shadowRoot.querySelector('div');
        this.$input = this._shadowRoot.querySelector('input');
        this.$submitButton = this._shadowRoot.querySelector('button');
        this.$todoListValues = [];
        this.$submitButton.addEventListener('click', this.addToDo.bind(this));

    }

    connectedCallback() {
        this._observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                console.log(mutation);
            });
        });

        this._observer.observe(this._shadowRoot, {
            attributes: true,
            characterData: true,
            childList: true,
            subtree: true,
            attributeOldValue: true,
            characterDataOldValue: true
        });

        const observer = new IntersectionObserver(function (entries, observer) {
            // console.log(entries);
            for (let entry of entries) {
                // console.log(entry);
                console.log("Is Visible: " + entry.isIntersecting);

                // statusText.textContent = entry.isIntersecting;

                // if (entry.isIntersecting) {
                //     statusBox.className = "yes";
                // } else {
                //     statusBox.className = "no";
                // }
            }
        },{
            root: document.querySelector('#ad'),
            rootMargin: '0px',
            threshold: 1.0
          });

        // Require that the entire iframe be visible.
        observer.observe(this._shadowRoot.querySelector('#ad'));

        this.todos = [
            { text: "Make a to-do list 1", checked: false },
            { text: "Finish blog post 1", checked: false }
        ];
    }

    addToDo(input) {
        if (this.$input.value.length > 0) {
            this.todos.push({ text: this.$input.value, checked: false })
            this.render();
            this.$input.value = '';
        }
    }

    removeToDo(input) {

    }

    set todos(values) {
        this.$todoListValues = values;
        this.render();
    }

    get todos() {
        return this.$todoListValues;
    }

    render() {
        this.$todoList.innerHTML = '';

        this.$todoListValues.forEach((todo, index) => {
            let $todoItem = document.createElement('div');
            $todoItem.innerHTML = todo.text;
            // let $todoItem = document.createElement('todo-item');
            // $todoItem.newtext = todo.text;
            // $todoItem.setAttribute("newtext", todo.text);
            this.$todoList.appendChild($todoItem);
        });
    }
}

window.customElements.define('to-do-app', TodoApp);
