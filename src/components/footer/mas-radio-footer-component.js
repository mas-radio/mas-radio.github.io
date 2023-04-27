
export default class MasRadioFooterComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({mode: 'open'});
    const stylesheet = document.createElement("link");

    stylesheet.setAttribute("rel", "stylesheet");
    stylesheet.setAttribute("href", "components/footer/mas-radio-footer-component.css");

    const MasRadioFooterComponentTemplate = document.createElement("template");
    MasRadioFooterComponentTemplate.innerHTML = `
    <footer>
        <img src="/recursos/logo_mas_radio.svg" alt="Logotipo M&aacute;s Radio">
        <span class="footer-legend">
          <nav class="social-media">
            <a id="facebook_href" target="_blank" href="https://www.facebook.com/somosmasradio.net/"></a>
            <a id="instagram_href" target="_balnk" href="https://www.instagram.com/masradionet/" ></a>
            <a id="x_href" target="_blank" href="https://twitter.com/masradionet" ></a>
          </nav>
          <p>2023 Todos los derechos reservados. M&aacute;s Radio </p>
          <!--nav>
            <span> Contacto:<a href="tel:#">747 ######</a></span>
            <a href="#">Aviso de privacidad</a>
            <a href="#">Condiciones de uso</a>
          </nav-->
          <p>&copy; M&aacute;s Radio</p>
        </span></li>
        <img src="/recursos/difusion_radial.svg" alt="Radio difusi&oacute;n">
    </footer>`

    shadowRoot.appendChild(MasRadioFooterComponentTemplate.content.cloneNode(true));
    shadowRoot.appendChild(stylesheet);
  }
  static get is() {
    return 'mas-radio-footer-component';
  }
}

customElements.define(MasRadioFooterComponent.is, MasRadioFooterComponent);
