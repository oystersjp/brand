import '@/components/oysters-brand-editor'

import { forms } from '@twind/forms'
import { customElement, html, LitElement } from 'lit-element'
import { apply, create, cssomSheet, setup } from 'twind'
import { css } from 'twind/css'

const sheet = cssomSheet({ target: new CSSStyleSheet() })
const { tw } = create({ sheet })

setup({
  mode: 'strict',
  theme: {
    extend: {
      colors: (colors) => ({
        ...colors,
        oysters: {
          white: '#fff',
          gray: {
            100: '#363B42',
            200: '#292F36',
          },
          blue: {
            100: '#57cbcc',
          },
        },
      }),
      fontFamily: (families) => ({
        ...families,
        sans: ['sans-serif'],
      }),
    },
  },
  plugins: { forms },
  preflight: (preflight, { theme }) => ({
    ...preflight,
    ':root': css`
      & {
        --oysters-colors-white: ${theme('colors.oysters.white')};
        // theme()でextendしたカラーコードが取得できないので、CSS Variableとしてセット
        // NOTE: https://github.com/tw-in-js/twind/issues/185
        --oysters-colors-gray-100: ${theme('colors.oysters.gray.100')};
        --oysters-colors-gray-200: ${theme('colors.oysters.gray.200')};
        --oysters-colors-blue-100: ${theme('colors.oysters.blue.100')};
      }
    `,
    html: css`
      & {
        ${apply`font-sans bg-oysters-gray-100 text-oysters-white`}
      }
    `,
  }),
})

@customElement('app-root')
export class AppRoot extends LitElement {
  static styles = [sheet.target]
  year = new Date().getFullYear()

  render() {
    return html`
      <h1 class="${tw`py-8 text-3xl font-bold text-center`}">
        Oysters Logo Generator
      </h1>
      <oysters-brand-editor></oysters-brand-editor>
      <div>
        <p class="${tw`py-8 text-center`}">
          &copy; ${this.year} <a href="https://oystersjp.github.io">Oysters</a>
        </p>
      </div>
    `
  }
}
