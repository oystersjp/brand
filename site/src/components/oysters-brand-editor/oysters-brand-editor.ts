import '@/components/common/form-radio-button'

import {
  customElement,
  html,
  LitElement,
  property,
  query,
  state,
  svg,
} from 'lit-element'
import { unsafeSVG } from 'lit-html/directives/unsafe-svg'
import { create, cssomSheet } from 'twind'

import { download } from '@/utils/download'
import { getSize, resize, svg2png, svg2svg } from '@/utils/svg'
import OystersIconDark from '~/svg/oysters-icon-space.svg'
import OystersIconLight from '~/svg/oysters-icon-space-white.svg'
import OystersLogoDark from '~/svg/oysters-logo-space.svg'
import OystersLogoLight from '~/svg/oysters-logo-space-white.svg'

import { styles } from './styles'

const sheet = cssomSheet({ target: new CSSStyleSheet() })
const { tw } = create({ sheet })

@customElement('oysters-brand-editor')
export class OystersBrandEditor extends LitElement {
  static styles = [sheet.target]

  @query('#canvas svg') svgEl: null | SVGSVGElement = null

  @state()
  private DEFAULT_WIDTH = 300

  @state()
  private forceUpdateSize = false

  @property({ reflect: true, type: Object })
  private input = {
    type: 'logo' as 'logo' | 'icon',
    color: 'dark' as 'dark' | 'light',
    width: 100,
    height: 100,
    space: true,
  }

  @state()
  private get rawSVG() {
    const svg = {
      logo: {
        dark: OystersLogoDark,
        light: OystersLogoLight,
      },
      icon: {
        dark: OystersIconDark,
        light: OystersIconLight,
      },
    }

    return svg[this.input.type][this.input.color]
  }

  resize({
    direction,
    value,
  }: {
    direction: 'width' | 'height'
    value: number
  }) {
    if (!this.svgEl) return

    const actualSize = this.getSvgSize()
    const ratio = value / actualSize[direction]

    const opposite = direction === 'width' ? 'height' : 'width'
    const newSize = {
      [direction]: value,
      [opposite]: Math.round(actualSize[opposite] * ratio),
    } as { width: number; height: number }

    resize(this.svgEl, newSize)
    this.input = { ...this.input, ...newSize }
  }

  firstUpdated() {
    this.resize({ direction: 'width', value: this.DEFAULT_WIDTH })
  }

  private getSvgSize(): { width: number; height: number } {
    const size = this.svgEl ? getSize(this.svgEl) : null
    return {
      width: size?.width || 1,
      height: size?.height || 1,
    }
  }

  private async download(e: Event, fileType: 'svg' | 'png') {
    e.preventDefault()
    if (!this.svgEl) return

    const { width, height, type, color } = this.input

    // Create PNG image URL
    const url =
      fileType === 'svg'
        ? await svg2svg(this.svgEl)
        : await svg2png(this.svgEl, { width, height })

    // Create filename
    const space = this.input.space ? 'space' : undefined
    const filename = ['oysters', type, space, color, `${width}x${height}`].join(
      '-'
    )

    download({ url, filename })
  }

  private handleChange(e: Event) {
    const target = e.currentTarget as HTMLInputElement

    if (target.name === 'width' || target.name === 'height') {
      return this.resize({
        direction: target.name,
        value: Number(target.value),
      })
    }

    if (target.name === 'type') {
      this.forceUpdateSize = true
    }

    this.input = { ...this.input, [target.name]: target.value } as any
  }

  updated() {
    if (this.forceUpdateSize) {
      this.resize({ direction: 'width', value: this.DEFAULT_WIDTH })
      this.forceUpdateSize = false
    }
  }

  render() {
    return html`
      <div class="${tw`m-auto max-w-[860px]`}">
        <div
          class="${tw`grid md:grid-cols-2 gap-4 p-7`}"
          style="background: var(--oysters-colors-gray-200)"
        >
          <div
            class="${tw`relative flex items-center justify-center shadow-inner ${styles.canvas}`}"
          >
            <div
              id="canvas"
              style="--svg-width: ${this.input.width}px;--svg-height: ${this
                .input.height}px;"
            >
              ${svg`${unsafeSVG(this.rawSVG)}`}
            </div>
            <div
              class="${tw`absolute bottom-0 right-0 flex flex-end space-x-2 p-2`}"
            >
              <button
                class="${tw(styles.button)}"
                @click="${(e: Event) => this.download(e, 'png')}"
              >
                PNG
              </button>
              <button
                class="${tw(styles.button)}"
                @click="${(e: Event) => this.download(e, 'svg')}"
              >
                SVG
              </button>
            </div>
          </div>
          <form class="${tw`space-y-2`}">
            <fieldset>
              <legend class="${tw`text-l font-semibold`}">ロゴのタイプ</legend>
              <div class="${tw`grid grid-cols-2 gap-2 py-3`}">
                <form-radio-button
                  name="type"
                  id="logo-text"
                  value="logo"
                  ?checked="${this.input.type === 'logo'}"
                  @change="${this.handleChange}"
                  aria-label="ロゴテキスト"
                  >${svg`${unsafeSVG(OystersLogoLight)}`}</form-radio-button
                >
                <form-radio-button
                  name="type"
                  id="logo-icon"
                  value="icon"
                  ?checked="${this.input.type === 'icon'}"
                  @change="${this.handleChange}"
                  aria-label="ロゴアイコン"
                  >${svg`${unsafeSVG(OystersIconLight)}`}</form-radio-button
                >
              </div>
            </fieldset>
            <fieldset>
              <legend class="${tw`text-l font-semibold`}">色</legend>
              <div class="${tw`grid grid-cols-2 gap-2 py-3`}">
                <form-radio-button
                  name="color"
                  id="color-dark"
                  value="dark"
                  ?checked="${this.input.color === 'dark'}"
                  @change="${this.handleChange}"
                  ><i
                    class="${tw(styles.icon.lightColor)}"
                    aria-hidden="true"
                  ></i
                  ><span class="${tw`ml-2`}">明るい</span></form-radio-button
                >
                <form-radio-button
                  name="color"
                  id="color-light"
                  value="light"
                  ?checked="${this.input.color === 'light'}"
                  @change="${this.handleChange}"
                  ><i
                    class="${tw(styles.icon.darkColor)}"
                    aria-hidden="true"
                  ></i
                  ><span class="${tw`ml-2`}">暗い</span></form-radio-button
                >
              </div>
            </fieldset>
            <fieldset>
              <legend class="${tw`text-l font-semibold pb-4`}">大きさ</legend>
              <label class="${tw`inline-flex items-center`}"
                ><span class="${tw`mr-2`}">W</span
                ><input
                  type="number"
                  name="width"
                  value="${this.input.width}"
                  class="${tw(styles.input)}"
                  @change="${this.handleChange}" /></label
              ><label class="${tw`inline-flex items-center`}"
                ><span class="${tw`mx-2`}">H</span
                ><input
                  type="number"
                  name="height"
                  class="${tw(styles.input)}"
                  value="${this.input.height}"
                  @change="${this.handleChange}"
              /></label>
            </fieldset>
          </form>
        </div>
      </div>
    `
  }
}
