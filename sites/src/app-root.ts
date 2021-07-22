import {
  customElement,
  property,
  LitElement,
  html,
  svg,
  query,
} from 'lit-element';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';
import OystersLogo from '~/svg/oysters-logo-space.svg';
import OystersIcon from '~/svg/oysters-icon-space.svg';
import { apply, create, cssomSheet } from 'twind';
import { svg2png } from './utils/svg2png';
import { download } from './utils/download';

const sheet = cssomSheet({ target: new CSSStyleSheet() });
const { tw } = create({ sheet });

const styles = {
  button: apply`bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded`,
};

@customElement('app-root')
export class AppRoot extends LitElement {
  @property() brand = {
    logo: OystersLogo,
    icon: OystersIcon,
  };

  @property() type = 'logo' as 'logo' | 'icon';
  @query('#canvas svg') svgEl!: SVGSVGElement;

  static get styles() {
    return [sheet.target];
  }

  private async download(e: Event) {
    e.preventDefault();
    const url = await svg2png(this.svgEl);
    const filename = `oysters-${this.type}-space`;

    download({ url, filename });
  }

  render() {
    return html`
      <div class="${tw`flex`}" id="canvas">
        ${svg`${unsafeSVG(this.brand[this.type])}`}
      </div>
      <button
        class="${tw(styles.button)}"
        @click="${(e: Event) => this.download(e, 'png')}"
      >
        Download PNG
      </button>
    `;
  }
}
