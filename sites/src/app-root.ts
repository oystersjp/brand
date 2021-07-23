import '@/components/oysters-brand-editor'

import { customElement, html, LitElement } from 'lit-element'
import { setup } from 'twind'

setup({ preflight: true })

@customElement('app-root')
export class AppRoot extends LitElement {
  render() {
    return html`<oysters-brand-editor></oysters-brand-editor>`
  }
}
