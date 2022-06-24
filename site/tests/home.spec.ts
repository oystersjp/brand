import { expect, test } from '@playwright/test'
import fs from 'fs'

test.describe('Home', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080')
  })

  const logoOptionList: [
    'icon' | 'logo',
    'space',
    'dark' | 'light',
    // width
    number,
    // height
    number
  ][] = [
    ['icon', 'space', 'dark', 100, 100],
    ['icon', 'space', 'light', 300, 300],
    ['logo', 'space', 'dark', 150, 48],
    ['logo', 'space', 'light', 300, 96],
  ]
  for (const logoOption of logoOptionList) {
    const [logoType, marginType, color, width, height] = logoOption
    const fileBasename = [
      'oysters',
      logoType,
      marginType,
      color,
      `${width}x${height}`,
    ].join('-')

    test(`Should download ${fileBasename}`, async ({ page }) => {
      const saveDir = fileBasename

      const wrapper = page.locator(`oysters-brand-editor`)
      await wrapper
        .locator(`form-radio-button[data-testid=logo-type-${logoType}]`)
        .click()
      await wrapper.locator(`form-radio-button[id=color-${color}]`).click()

      await wrapper.locator(`input[id=width]`).click()
      await wrapper.locator(`input[id=width]`).fill(width.toString())

      await wrapper.locator(`input[id=height]`).click()
      await wrapper.locator(`input[id=height]`).fill(height.toString())

      for (const filetype of ['png', 'svg']) {
        const [download] = await Promise.all([
          page.waitForEvent('download'),
          page
            .locator(`[aria-label=${filetype.toUpperCase()}形式でダウンロード]`)
            .click(),
        ])

        const path = await download.path()

        if (!path) throw new Error('Download failed')

        expect(download.suggestedFilename()).toBe(`${fileBasename}.${filetype}`)
        expect(fs.readFileSync(path)).toMatchSnapshot([
          saveDir,
          `download.${filetype}`,
        ])
      }

      expect(await page.screenshot({ fullPage: true })).toMatchSnapshot([
        saveDir,
        'full.png',
      ])
    })
  }
})
