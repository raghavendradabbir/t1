import './todo-item.js';

const template = document.createElement('template');
template.innerHTML = `
<style>
    :host {
        font-family: sans-serif;
    }
    .align-center {
        text-align: center;
    }

    .flex-container{
        width: 100%;
        margin: 0;
        display: -webkit-flex; /* Safari */     
        display: flex; /* Standard syntax */
        height: 100vh;
    }
    .flex-container .column-left {
        float: left;
        width: 50%;
        max-height:100%;
        overflow-y: scroll;
        
        padding: 10px;
        background: whitesmoke;
        -webkit-flex: 1; /* Safari */
        -ms-flex: 1; /* IE 10 */
        flex: 1; /* Standard syntax */
    }
    .flex-container .column-right{
        float: left;
        width: 50%;
        overflow: scroll;
        max-height:100%;
        margin: 0;
        padding: 0;
          background: #b4bac0;
    }

    .container {
        background:white;
        width: 100%;
        height: 100vh;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
    
    .videocss {
        display: block;
        width: 100%;
        height: auto;
    }
    .centered-div{
        text-align: center;
        width: 60%;
    }

    .table-border {
        border: solid 1px dimgray;
        background:whitesmoke;
    }

    .table-heading {
        font-weight: bold;
        text-align: left;
        padding: 10px;
        border-bottom: solid 1px dimgray
    }
    .table-content {
        padding: 10px;
        margin: 0;
        display: -webkit-flex; /* Safari */     
        display: flex; /* Standard syntax */
    }
    .table-content .left-column{
        float: left;
        width: 50%;        
        text-align: left;
        -webkit-flex: 1; /* Safari */
        -ms-flex: 1; /* IE 10 */
        flex: 1; /* Standard syntax */
    }
    .table-content .right-column{
        float: left;
        width: 50%;
        text-align: left;
    }

    button {
        width: 100%;
        padding: 10px;
        font-weight: bold;
        font-size: 14px;
    }
    .m-l-5 {
        margin-left: 5px;
    }
    .m-r-5 {
        margin-right: 5px;
    }
    /* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
    @media screen and (max-width: 800px) {
        .column-left, .column-right {
            width: 100%;
        }
    }
</style>

<div class="flex-container">
    <div class="column-left align-center" id="left-container">
        <h1>Welcome to Video Playing App</h1>
        <br /><br />
        <div style="padding: 0 !important; margin: 0 !important">
        <video id="videocontrol" class="videocss" width="400" height="300" controls autoplay muted="false" style="padding: 0 !important; margin: 0 auto;">
            <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4">
            <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.ogg" type="video/ogg">
            Your browser does not support the video tag.
        </video>
        </div>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
    <div class="column-right">
        <div class="container">
            <div class="centered-div">
                <div class="table-border">
                    <div class="table-heading">                
                        Video Information
                    </div>                
                    <div class="table-content">                
                        <div class="left-column">Top: <span id="spnTop"></span></div>
                        <div class="right-column">Left: <span id="spnLeft"></span></div>
                    </div>  
                    <div class="table-content">                
                        <div class="left-column">Height: <span id="spnHeight"></span></div>
                        <div class="right-column">Width: <span id="spnWidth"></span></div>
                    </div> 
                    <div class="table-content">                
                        <div class="left-column m-r-5"><button id="playbutton">Play</button></div>
                        <div class="right-column m-l-5"><button id="pauseButton">Pause</button></div>
                    </div>                
                </div>                
            </div>
        </div>           
    </div>
</div>
`;

class VideoDisplayApp extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this._vidControl = this._shadowRoot.getElementById('videocontrol');
        this._vidControl.muted = false;

        this._playButton = this._shadowRoot.getElementById('playbutton');
        this._playButton.addEventListener('click', this.playVideo.bind(this));
        this._playButton.disabled = false;

        this._pauseButton = this._shadowRoot.getElementById('pauseButton');
        this._pauseButton.addEventListener('click', this.pauseVideo.bind(this));
        this._pauseButton.disabled = true;

        this._leftContainer = this._shadowRoot.getElementById('left-container');
        this._leftContainer.addEventListener('scroll', this.scrollEvent.bind(this));

        this.spnTop = this._shadowRoot.getElementById('spnTop');
        this.spnLeft = this._shadowRoot.getElementById('spnLeft');
        this.spnWidth = this._shadowRoot.getElementById('spnWidth');
        this.spnHeight = this._shadowRoot.getElementById('spnHeight');

        this.scrollEvent({});
    }

    scrollEvent(e) {
        var position = {
            height: String(this._vidControl.clientHeight),
            width: String(this._vidControl.clientWidth),
            left: String(this._leftContainer.scrollLeft),
            top: String(this._leftContainer.scrollTop)
        };
        console.log(position);
        this.spnTop.innerHTML = position.top;
        this.spnLeft.innerHTML = position.left;
        this.spnWidth.innerHTML = position.width;
        this.spnHeight.innerHTML = position.height;
        return position;
    }

    playVideo() {
        if (this._vidControl.paused) {
            this._vidControl.play();
            this._playButton.disabled = true;
            this._pauseButton.disabled = false;
        }
    }

    pauseVideo() {
        this._playButton.disabled = false;
        this._pauseButton.disabled = true;
        this._vidControl.pause();
    }

    connectedCallback() {
        this.mutationObserver = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                console.log("Mutation: " + mutation);
                console.log(mutation);
            });
        });

        this.mutationObserver.observe(this._shadowRoot, {
            attributes: true,
            characterData: true,
            childList: true,
            subtree: true,
            attributeOldValue: true,
            characterDataOldValue: true
        });

        let intersectionOptions = {
            root: document.querySelector("#videocontrol"),
            rootMargin: '0px',
            threshold: 1.0
        };
        const intersectionObserver = new IntersectionObserver(this.onIntersection.bind(this), intersectionOptions);
        intersectionObserver.observe(this._vidControl);
    }

    onIntersection(entries, observer) {
        //console.log(entries);
        // console.log(observer);
        for (let entry of entries) {
            console.log("Is Visible: " + entry.isIntersecting);

            if (entry.isIntersecting === true) {
                this.playVideo();
            } else {
                this.pauseVideo();
            }
        }
    }

    render() {
    }
}

window.customElements.define('my-video', VideoDisplayApp);
