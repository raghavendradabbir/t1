const template = document.createElement('template');
template.innerHTML = `
<style>
    .videocss {
        display: block;
        width: 100%;
        height: auto;
    }
</style>

<div style="padding: 0 !important; margin: 0 !important">
    <video id="videocontrol" class="videocss" width="400" height="300" controls autoplay muted="false" style="padding: 0 !important; margin: 0 auto;">
        <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4">
        <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.ogg" type="video/ogg">
        Your browser does not support the video tag.
    </video>
</div>

`;

class MyVideoComponent extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this._vidControl = this._shadowRoot.getElementById('videocontrol');
        this._vidControl.muted = true;

        this.pauseEvent = new CustomEvent("pause", {
            bubbles: true,
            cancelable: false,
            composed: true
          });
          this.playEvent = new CustomEvent("play", {
            bubbles: true,
            cancelable: false,
            composed: true
          });
    }

    playVideo() {
        if (this._vidControl.paused) {
            this._vidControl.play();
            this.dispatchEvent(this.playEvent);
        }
    }

    pauseVideo() {
        this._vidControl.pause();
        this.dispatchEvent(this.pauseEvent);
    }

    connectedCallback() {
        let intersectionOptions = {
            root: document.querySelector("#videocontrol"),
            rootMargin: '0px',
            threshold: 1.0
        };
        const intersectionObserver = new IntersectionObserver(this.onIntersection.bind(this), intersectionOptions);
        intersectionObserver.observe(this._vidControl);
    }

    onIntersection(entries, observer) {
        // console.log(entries);
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

window.customElements.define('my-video', MyVideoComponent);
