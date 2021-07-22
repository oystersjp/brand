import { customElement, property, LitElement, html, css, svg } from 'lit-element';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';
import OystersLogo from '~/svg/oysters-logo-space.svg';
import OystersIcon from '~/svg/oysters-icon-space.svg';
import { create, cssomSheet } from 'twind';

const sheet = cssomSheet({ target: new CSSStyleSheet() });
const { tw } = create({ sheet });

@customElement('app-root')
export class AppRoot extends LitElement {
  @property() brand = {
    logo: OystersLogo,
    icon: OystersIcon,
  };

  static get styles() {
    return [sheet.target];
  }

  render() {
    return html`
      <div class="${tw`flex`}" id="canvas">
        ${svg`${unsafeSVG(this.brand[this.type])}`}
      </div>
    `;
  }
}
