/**
 * 将秒数转换为 00:00 或 00:00:00 格式
 * @param seconds 秒数
 */
export const formatTime = (seconds: number): string => {
  if (!seconds || isNaN(seconds)) return '00:00'

  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  const mm = m.toString().padStart(2, '0')
  const ss = s.toString().padStart(2, '0')
  return h > 0 ? `${h.toString().padStart(2, '0')}:${mm}:${ss}` : `${mm}:${ss}`
}
