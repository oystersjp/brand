import OystersLogoLight from '~/svg/oysters-logo-space.svg?raw'
import OystersLogoDark from '~/svg/oysters-logo-space-white.svg?raw'
import OystersIconLight from '~/svg/oysters-icon-space.svg?raw'
import OystersIconDark from '~/svg/oysters-icon-space-white.svg?raw'

type Options = {
  type: 'logo' | 'icon'
  color: 'light' | 'dark'
}

export const getLogoImages = ({ type, color }: Options) => {
  const imageMap = {
    logo: {
      dark: OystersLogoDark,
      light: OystersLogoLight,
    },
    icon: {
      dark: OystersIconDark,
      light: OystersIconLight,
    },
  }

  return imageMap[type][color]
}
