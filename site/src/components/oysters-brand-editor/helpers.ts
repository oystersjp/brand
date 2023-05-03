import OystersLogoLight from '~/svg/oysters-logo-transparent-light.svg?raw'
import OystersLogoDark from '~/svg/oysters-logo-transparent-dark.svg?raw'
import OystersIconLight from '~/svg/oysters-icon-transparent-light.svg?raw'
import OystersIconDark from '~/svg/oysters-icon-transparent-dark.svg?raw'

export type Query =
  | {
      type: 'logo'
      color: 'light' | 'dark'
      style: 'no-margin' | 'transparent'
    }
  | {
      type: 'icon'
      color: 'light' | 'dark'
      style: 'no-margin' | 'bgcolor' | 'rounded' | 'transparent'
    }

export const logoImageList = [
  { type: 'logo', color: 'dark', style: 'transparent', raw: OystersLogoDark },
  { type: 'logo', color: 'light', style: 'transparent', raw: OystersLogoLight },
  { type: 'icon', color: 'dark', style: 'transparent', raw: OystersIconDark },
  { type: 'icon', color: 'light', style: 'transparent', raw: OystersIconLight },
] as const

export const getLogoImages = ({ type, color }: Query) => {
  return logoImageList.find(
    (image) => image.type === type && image.color === color
  )
}
