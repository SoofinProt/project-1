import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./project-1-dots.js";
import "./project-1-nav.js";

export class Project1 extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "project-1";
  }

  constructor() {
    super();
    this.foxData = null;
    this.liked = false;
    this.loading = true;
    this.images = [];     // will hold multiple fox images eventually
    this.activeIndex = 0;
    this.t = this.t || {};
    this.t = { ...this.t, title: "Fox of the Day" };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/project-1.ar.json", import.meta.url).href + "/../",
    });
  }

  static get properties() {
    return {
      ...super.properties,
      foxData: { type: Object },
      liked: { type: Boolean },
      loading: { type: Boolean },
      images: { type: Array },
      activeIndex: { type: Number },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          font-family: var(--ddd-font-navigation);
        }

        .card {
          max-width: 380px;
          margin: var(--ddd-spacing-4) auto;
          border: 1px solid var(--ddd-theme-default-limestoneLight);
          border-radius: var(--ddd-radius-lg);
          overflow: hidden;
          background: var(--ddd-theme-default-white);
        }

        .header {
          display: flex;
          align-items: center;
          gap: var(--ddd-spacing-3);
          padding: var(--ddd-spacing-3) var(--ddd-spacing-4);
          border-bottom: 1px solid var(--ddd-theme-default-limestoneLight);
        }

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--ddd-theme-default-beaverBlue);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--ddd-font-size-4xs);
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-white);
          flex-shrink: 0;
        }

        .username {
          font-size: var(--ddd-font-size-s);
          font-weight: var(--ddd-font-weight-bold);
          margin: 0;
          color: var(--ddd-theme-default-nittanyNavy);
        }

        /* image area with arrows overlaid on sides */
        .img-container {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
        }

        .img-wrap {
          width: 100%;
          aspect-ratio: 1;
          background: var(--ddd-theme-default-limestoneMaxLight);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .loading-text {
          font-size: var(--ddd-font-size-4xs);
          color: var(--ddd-theme-default-limestoneGray);
        }

        /* position arrows on top of the image */
        project-1-nav {
          position: absolute;
          z-index: 2;
        }

        project-1-nav[direction="prev"] {
          left: 0;
        }

        project-1-nav[direction="next"] {
          right: 0;
        }

        .actions {
          display: flex;
          align-items: center;
          gap: var(--ddd-spacing-4);
          padding: var(--ddd-spacing-3) var(--ddd-spacing-4) var(--ddd-spacing-2);
        }

        .like-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 24px;
          padding: var(--ddd-spacing-1);
          line-height: 1;
          transition: transform 0.15s ease;
        }

        .like-btn:hover {
          transform: scale(1.15);
        }

        .caption {
          padding: var(--ddd-spacing-1) var(--ddd-spacing-4) var(--ddd-spacing-4);
          font-size: var(--ddd-font-size-4xs);
          color: var(--ddd-theme-default-nittanyNavy);
          line-height: 1.5;
        }

        .caption strong {
          font-weight: var(--ddd-font-weight-bold);
        }

        .src-link {
          color: var(--ddd-theme-default-beaverBlue);
          font-size: var(--ddd-font-size-4xs);
          margin-left: var(--ddd-spacing-2);
        }

        .reload-btn {
          display: block;
          width: calc(100% - var(--ddd-spacing-8));
          margin: 0 var(--ddd-spacing-4) var(--ddd-spacing-4);
          padding: var(--ddd-spacing-2);
          border-radius: var(--ddd-radius-sm);
          border: 1px solid var(--ddd-theme-default-limestoneLight);
          background: none;
          cursor: pointer;
          font-size: var(--ddd-font-size-4xs);
          font-family: var(--ddd-font-navigation);
          color: var(--ddd-theme-default-coalyGray);
          transition: background 0.15s;
        }

        .reload-btn:hover {
          background: var(--ddd-theme-default-limestoneMaxLight);
        }
      `,
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    // load 3 foxes so prev/next actually works for check-in 1
    this._loadFoxes(3);
    this.addEventListener("play-list-nav-clicked", this._handleNav);
    this.addEventListener("play-list-index-changed", this._handleDotClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("play-list-nav-clicked", this._handleNav);
    this.removeEventListener("play-list-index-changed", this._handleDotClick);
  }

  async _loadFoxes(count = 3) {
    this.loading = true;
    this.images = [];
    try {
      // fetch multiple foxes in parallel
      const requests = Array.from({ length: count }, () =>
        fetch("https://randomfox.ca/floof/").then((r) => r.json())
      );
      this.images = await Promise.all(requests);
      this.foxData = this.images[0];
      this.activeIndex = 0;
    } catch (e) {
      console.error("Fetch failed:", e);
    } finally {
      this.loading = false;
    }
  }

  _handleNav(e) {
    const { direction } = e.detail;
    if (direction === "next" && this.activeIndex < this.images.length - 1) {
      this.activeIndex += 1;
    } else if (direction === "prev" && this.activeIndex > 0) {
      this.activeIndex -= 1;
    }
    this.foxData = this.images[this.activeIndex];
  }

  _handleDotClick(e) {
    this.activeIndex = e.detail.index;
    this.foxData = this.images[this.activeIndex];
  }

  _toggleLike() {
    this.liked = !this.liked;
  }

  render() {
    const current = this.images[this.activeIndex] || this.foxData;

    return html`
      <div class="card">

        <div class="header">
          <div class="avatar">RF</div>
          <p class="username">randomfox.ca</p>
        </div>

        <!-- image with prev/next arrows overlaid -->
        <div class="img-container">
          <project-1-nav
            direction="prev"
            ?disabled="${this.activeIndex === 0}"
          ></project-1-nav>

          <div class="img-wrap">
            ${this.loading
              ? html`<span class="loading-text">Loading fox...</span>`
              : html`<img src="${current.image}" alt="A random fox" />`}
          </div>

          <project-1-nav
            direction="next"
            ?disabled="${this.activeIndex === this.images.length - 1}"
          ></project-1-nav>
        </div>

        <!-- dots below the image -->
        <project-1-dots
          count="${this.images.length}"
          index="${this.activeIndex}"
        ></project-1-dots>

        <div class="actions">
          <button class="like-btn" @click="${this._toggleLike}" title="Like">
            ${this.liked ? "❤️" : "🤍"}
          </button>
          ${current
            ? html`<a class="src-link" href="${current.link}" target="_blank">view source</a>`
            : ""}
        </div>

        <div class="caption">
          <strong>randomfox.ca</strong> A random fox, just for you.
        </div>

        <button class="reload-btn" @click="${() => this._loadFoxes(3)}">
          Load new foxes
        </button>

      </div>
    `;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(Project1.tag, Project1);