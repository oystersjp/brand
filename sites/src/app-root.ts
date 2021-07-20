import { customElement, property, LitElement, html, css, svg } from 'lit-element';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg'
import OystersLogo from '~/svg/oysters-logo.svg'
import OystersIcon from '~/svg/oysters-icon-space.svg'

@customElement('app-root')
export class AppRoot extends LitElement {
  @property() brand = {
    logo: OystersLogo,
    icon: OystersIcon
  }

  @property() type = 'logo' as 'logo' | 'icon'

  static get styles() {
    return css`
    `;
  }

  render() {
    return html`
      <div class="wrapper">
        ${svg`${unsafeSVG(this.brand[this.type])}`}
      </div>
    `;
  }
}
