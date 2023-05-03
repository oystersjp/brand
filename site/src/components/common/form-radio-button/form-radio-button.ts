import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { create, cssomSheet } from 'twind'

import { styles } from './styles'

const sheet = cssomSheet({ target: new CSSStyleSheet() })
const { tw } = create({ sheet })

@customElement('form-radio-button')
export class FormRadioButton extends LitElement {
  static styles = [sheet.target]
  @property({ type: String }) name = ''
  @property({ type: String }) value = ''
  @property({ type: String }) id = ''
  @property({ type: String }) ariaLabel = ''
  @property({ type: Boolean }) checked = false

  handleChange(e: Event) {
    if ((e.currentTarget as HTMLInputElement)?.checked) {
      const event = new CustomEvent('change', e)
      this.dispatchEvent(event)
    }
  }

  render() {
    return html`
      <div class="${tw(styles.formRadioInput)}">
        <input
          type="radio"
          name="${this.name}"
          id="${this.id}"
          value="${this.value}"
          .checked="${this.checked ? 'checked' : undefined}"
          @change="${this.handleChange}"
        />
        <label
          for="${this.id}"
          aria-label="${this.ariaLabel ? this.ariaLabel : undefined}"
          ><slot></slot
        ></label>
      </div>
    `
  }
}
