import { formRadio } from '@twind/forms'
import { customElement, html, LitElement, property } from 'lit-element'
import { create, cssomSheet } from 'twind'

const sheet = cssomSheet({ target: new CSSStyleSheet() })
const { tw } = create({ sheet })

@customElement('form-radio')
export class FormRadio extends LitElement {
  static styles = [sheet.target]
  @property({ type: String }) name = ''
  @property({ type: String }) value = ''
  @property({ type: Boolean }) checked = false

  handleChange(e: Event) {
    if ((e.currentTarget as HTMLInputElement)?.checked) {
      const event = new CustomEvent('change', e)
      this.dispatchEvent(event)
    }
  }

  render() {
    return html`
      <label class="${tw`flex items-center`}"
        ><input
          type="radio"
          name="${this.name}"
          value="${this.value}"
          class="${tw`${formRadio}`}"
          .checked="${this.checked ? 'checked' : undefined}"
          @change="${this.handleChange}" /><span class="${tw`ml-2`}"
          ><slot></slot></span
      ></label>
    `
  }
}
