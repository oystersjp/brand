import { css } from '../../../../_snowpack/pkg/twind/css.js';
export const styles = {
  formRadioInput: css`
    --color-primary: var(--oysters-colors-blue-100);

    display: flex;
    max-width: 100%;
    width: 100%;

    label {
      position: relative;
      display: flex;
      align-items: center;
      justify-contents: center;
      height: 48px;
      width: 100%;
      max-width: 100%;
      border: 1px solid #fff;
      border-radius: 4px;
      margin: 10px 10px 0 0;
      padding: 8px;
      box-sizing: border-box;
      overflow: visible;
    }
    label:after {
      --width: 18px;

      content: '';
      width: var(--width);
      height: var(--width);
      background-image: url('./icon_check.svg');
      background-size: cover;
      position: absolute;
      top: calc(var(--width) * 0.5 * -1);
      right: calc(var(--width) * 0.5 * -1);
      visibility: hidden;
    }
    ::slotted(svg) {
      max-width: 100%;
      max-height: 100%;
    }

    input:checked + label {
      border-color: var(--color-primary);
    }

    input:checked + label::after {
      visibility: visible;
    }

    input {
      width: 0;
      height: 0;
      opacity: 0;
      pointer-events: none;
    }
  `
};