import { formInput } from '@twind/forms'
import { apply } from 'twind'
import { css } from 'twind/css'

export const styles = {
  button: css`
    & {
      ${apply`py-1 px-2 transition`}
      background: rgba(255, 255, 255, 0.8);
      color: var(--oysters-colors-blue-100);
      display: flex;
      align-items: center;
    }
    &::before {
      ${apply`mr-1`}
      content: '';
      display: inline-block;
      background-image: url('./icon_download.svg');
      width: 24px;
      height: 24px;
    }
    &:hover {
      background-color: rgba(255, 255, 255, 1);
    }
  `,
  input: css`
    & {
      ${formInput}
      ${apply`inline-block box-content`}
      font-size: inherit;
      position: relative;
      width: 3.5em;
      background: transparent;
      color: var(--oysters-colors-white);
      border: 0;
      border-bottom: 1px solid var(--oysters-colors-white);
      padding: 0.15em 0.5em;
    }
    &:focus {
      border-color: var(--oysters-colors-blue-100);
    }
  `,
  canvas: css`
    & {
      --color-square1: rgba(255, 255, 255, 1);
      --color-square2: rgba(255, 255, 255, 0.43);
      --square-size: 14px;
      background-image: linear-gradient(
          45deg,
          var(--color-square1) 25%,
          var(--color-square2) 25%
        ),
        linear-gradient(
          -45deg,
          var(--color-square1) 25%,
          var(--color-square2) 25%
        ),
        linear-gradient(
          45deg,
          var(--color-square2) 75%,
          var(--color-square1) 75%
        ),
        linear-gradient(
          -45deg,
          var(--color-square2) 75%,
          var(--color-square1) 75%
        );
      background-size: var(--square-size) var(--square-size);
      background-position: 0 0, 0 calc(0.5 * var(--square-size)),
        calc(0.5 * var(--square-size)) calc(-1 * 0.5 * var(--square-size)),
        calc(-1 * 0.5 * var(--square-size)) 0px;
    }

    svg {
      box-shadow: rgba(0, 0, 0, 0.3) 0 0 5px 5px;
      width: var(--svg-width) !important;
      height: var(--svg-height) !important;
      max-width: 100%;
    }
  `,
  icon: {
    lightColor: css`
      display: inline-block;
      width: 32px;
      height: 32px;
      border: 1px solid #ffffff;
      border-radius: 50%;
      background-image: linear-gradient(149.93deg, #fbfcdb 10%, #e9defa 83.03%);
    `,
    darkColor: css`
      display: inline-block;
      width: 32px;
      height: 32px;
      border: 1px solid #ffffff;
      border-radius: 50%;
      background-image: linear-gradient(
        148.89deg,
        #091628 18.39%,
        #0d3a5e 93.16%
      );
    `,
  },
}
