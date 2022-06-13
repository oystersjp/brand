export const resize = (
  svgEl: SVGSVGElement,
  { width, height }: { width: number; height: number }
) => {
  svgEl?.setAttribute('width', String(width))
  svgEl?.setAttribute('height', String(height))
}

export const getSize = (
  svgEl: SVGSVGElement
): { width: number; height: number } => ({
  width: svgEl.width.baseVal.value,
  height: svgEl.height.baseVal.value,
})

export const svg2png = (
  svgEl: SVGSVGElement,
  options = {
    width: svgEl.width.baseVal.value,
    height: svgEl.height.baseVal.value,
  }
): Promise<string> =>
  new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    canvas.width = options.width
    canvas.height = options.height
    const ctx = canvas.getContext('2d')

    const image = new Image()
    image.onload = () => {
      ctx?.drawImage(image, 0, 0, image.width, image.height)
      resolve(canvas.toDataURL())
    }

    image.onerror = reject

    const svgStr = new XMLSerializer().serializeToString(svgEl)
    image.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(svgStr)
  })

export const svg2svg = (svgEl: SVGSVGElement): Promise<string> =>
  new Promise((resolve) => {
    const serializer = new XMLSerializer()
    const source = serializer.serializeToString(svgEl)

    resolve('data:image/svg+xml,' + encodeURIComponent(source))
  })
