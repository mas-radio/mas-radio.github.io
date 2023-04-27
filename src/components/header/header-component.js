const headerTemplate = document.createElement('template');
const linkStylesheet = document.createElement("link");

linkStylesheet.setAttribute("rel", "stylesheet");
linkStylesheet.setAttribute("href", "components/header/header-component-stylesheet.css");

headerTemplate.innerHTML = `
  <header>
    <nav class="header_menu">
      <ul id="left_header_menu_items">
        <li><img class="logo" src="/recursos/logo_mas_radio.svg"/></li>
        <li id="home_entry"><a id="href_home" href="/">Inicio</a></li>
      </ul>
      <ul id="right_header_menu_items">
        <li id="stream_status"></li>
      </ul>
    </nav>
 </header>`;

export default class Header extends HTMLElement {
  shadowRoot;

  constructor() {
    super();
  }

  setOnlineStatus(isOnline = true) {
    if (isOnline) {
      this.shadowRoot.querySelector('#stream_status').className = "online";
    } else {
      this.shadowRoot.querySelector('#stream_status').className = "offline";
    }
  }

  connectedCallback() {
    this.shadowRoot = this.attachShadow({mode: 'closed'});
    this.shadowRoot.appendChild(headerTemplate.content);
    this.shadowRoot.appendChild(linkStylesheet);
  }
}

customElements.define('header-component', Header);
