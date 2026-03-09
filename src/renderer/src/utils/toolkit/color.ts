/**
 * 提取主色调并根据背景亮度自动调整，确保作为强调色（文字/按钮）时的对比度
 */
export async function getAccentRGB(imageUrl: string): Promise<{
  accentColor: Array<number>
  avgColor: Array<number>
}> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 1
      canvas.height = 1
      const ctx = canvas.getContext('2d')
      if (!ctx) return reject(new Error('Canvas error'))

      ctx.drawImage(img, 0, 0, 1, 1)
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data

      // 计算感知亮度
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
      const avgColor = [r, g, b]
      let accentR: number, accentG: number, accentB: number
      if (luminance > 0.5) {
        // 背景整体偏亮 -> 强调色需要变深才能看清
        accentR = Math.max(0, r * 0.4)
        accentG = Math.max(0, g * 0.4)
        accentB = Math.max(0, b * 0.4)
      } else {
        // 背景整体偏暗 -> 强调色需要拉高亮度
        const boost = 0.6 // 提高 60% 的亮度差
        accentR = Math.min(255, r + (255 - r) * boost)
        accentG = Math.min(255, g + (255 - g) * boost)
        accentB = Math.min(255, b + (255 - b) * boost)
      }
      //饱和度补偿
      const max = Math.max(accentR, accentG, accentB)
      if (max < 150 && luminance < 0.5) {
        // 如果是暗背景下的强调色太暗了，强制拉一把最亮通道
        if (accentR === max) accentR = 200
        else if (accentG === max) accentG = 200
        else accentB = 200
      }

      resolve({
        accentColor: [Math.round(accentR), Math.round(accentG), Math.round(accentB)],
        avgColor
      })
    }

    img.onerror = () => reject(new Error('Load error'))
    img.src = imageUrl
  })
}
