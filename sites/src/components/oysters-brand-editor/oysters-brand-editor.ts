import {
  customElement,
  html,
  LitElement,
  property,
  query,
  svg,
} from 'lit-element'
import { unsafeSVG } from 'lit-html/directives/unsafe-svg'
import { create, cssomSheet } from 'twind'

import { download } from '@/utils/download'
import { svg2png } from '@/utils/svg2png'
import OystersIcon from '~/svg/oysters-icon-space.svg'
import OystersLogo from '~/svg/oysters-logo-space.svg'

import { styles } from './styles'

const sheet = cssomSheet({ target: new CSSStyleSheet() })
const { tw } = create({ sheet })

@customElement('oysters-brand-editor')
export class OystersBrandEditor extends LitElement {
  @property() brand = {
    logo: OystersLogo,
    icon: OystersIcon,
  }

  @property() type = 'logo' as 'logo' | 'icon'
  @query('#canvas svg') svgEl!: SVGSVGElement

  static get styles() {
    return [sheet.target]
  }

  private async download(e: Event) {
    e.preventDefault()
    const url = await svg2png(this.svgEl)
    const filename = `oysters-${this.type}-space`

    download({ url, filename })
  }

  render() {
    return html`
      <div class="${tw`flex`}" id="canvas">
        ${svg`${unsafeSVG(this.brand[this.type])}`}
      </div>
      <button
        class="${tw(styles.button)}"
        @click="${(e: Event) => this.download(e)}"
      >
        Download PNG
      </button>
    `
  }
}
