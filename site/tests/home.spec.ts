import { expect, test } from '@playwright/test'
import fs from 'fs'

test.describe('Home', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    // デフォルトではスナップショットのファイル名にplatform名（例：darwin, linux）が追加されてしまう
    // このテストはplatform関係なく同じsnapshotのファイルを参照したいのでsuffixを無効にする
    // FYI: https://github.com/microsoft/playwright/issues/7575
    testInfo.snapshotSuffix = ''

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

    test(`${fileBasename}がダウンロードできること`, async ({ page }) => {
      // ロゴのタイプ
      await page
        .getByLabel(logoType === 'logo' ? 'ロゴテキスト' : 'ロゴアイコン')
        .click()
      // 背景色
      await page.getByText(color === 'light' ? '明るい' : '暗い').click()
      // 大きさ
      await page.getByLabel('ロゴ画像の高さ').clear()
      await page.getByLabel('ロゴ画像の高さ').fill(height.toString())
      await page.getByLabel('ロゴ画像の幅').clear()
      await page.getByLabel('ロゴ画像の幅').fill(width.toString())

      for (const filetype of ['png', 'svg']) {
        const downloadPromise = page.waitForEvent('download', { timeout: 1000 })
        await page
          .getByLabel(`${filetype.toUpperCase()}形式でダウンロード`)
          .click()
        const download = await downloadPromise

        const path = await download.path()
        if (!path) throw new Error('Download failed')

        expect(download.suggestedFilename()).toBe(`${fileBasename}.${filetype}`)
        expect(fs.readFileSync(path)).toMatchSnapshot([
          fileBasename,
          `download.${filetype}`,
        ])
      }
    })
  }
})
