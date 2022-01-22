import '@/components/common/form-radio'

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
import { getSize, resize, svg2png } from '@/utils/svg'
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

  private async download(e: Event) {
    e.preventDefault()
    if (!this.svgEl) return

    const { width, height, type, color } = this.input

    // Create PNG image URL
    const url = await svg2png(this.svgEl, { width, height })

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
      <div class="${tw`container m-auto`}">
        <h1 class="${tw`py-4 text-xl font-bold`}">Get Oysters Logos</h1>
        <div class="${tw`grid grid-cols-2 gap-4`}">
          <div
            id="canvas"
            class="${tw`flex items-center justify-center shadow-inner ${styles.canvas}`}"
            style="--svg-width: ${this.input.width}px;--svg-height: ${this.input
              .height}px;"
          >
            ${svg`${unsafeSVG(this.rawSVG)}`}
          </div>
          <form class="${tw`space-y-6`}">
            <fieldset>
              <legend class="${tw`text-xl py-4`}">ロゴの種類</legend>
              <form-radio
                name="type"
                value="logo"
                ?checked="${this.input.type === 'logo'}"
                @change="${this.handleChange}"
                >ロゴ</form-radio
              >
              <form-radio
                name="type"
                value="icon"
                ?checked="${this.input.type === 'icon'}"
                @change="${this.handleChange}"
                >アイコン</form-radio
              >
            </fieldset>
            <fieldset>
              <legend class="${tw`text-xl py-4`}">色</legend>
              <form-radio
                name="color"
                value="dark"
                ?checked="${this.input.color === 'dark'}"
                @change="${this.handleChange}"
                >白背景用</form-radio
              >
              <form-radio
                name="color"
                value="light"
                ?checked="${this.input.color === 'light'}"
                @change="${this.handleChange}"
                >黒背景用</form-radio
              >
            </fieldset>
            <fieldset>
              <legend class="${tw`text-xl py-4`}">大きさ</legend>
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
          <div class="${tw`col-span-2`}">
            <button
              class="${tw(styles.button)}"
              @click="${(e: Event) => this.download(e)}"
            >
              Copy SVG
            </button>
            <button
              class="${tw(styles.button)}"
              @click="${(e: Event) => this.download(e)}"
            >
              Download PNG
            </button>
            <button
              class="${tw(styles.button)}"
              @click="${(e: Event) => this.download(e)}"
            >
              Download SVG
            </button>
          </div>
        </div>
      </div>
    `
  }
}
