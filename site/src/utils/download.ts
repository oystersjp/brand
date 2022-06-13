export const download = ({
  url,
  filename,
}: {
  url: string
  filename: string
}) => {
  const anchorEl = document.createElement('a')

  anchorEl.download = filename
  anchorEl.href = url
  anchorEl.target = '_blank'

  anchorEl.click()
}
