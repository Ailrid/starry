import { RawSongDetailResponse, SongDetail } from './interface'
export function convertSongDetail(rawData: RawSongDetailResponse): SongDetail[] {
  const privilegeMap = new Map(rawData.privileges.map((p) => [p.id, p]))
  return rawData.songs.map((song) => {
    const privilege = privilegeMap.get(song.id)
    return {
      id: song.id,
      platformId: String(song.id),
      source: 'netease',
      name: song.name,
      artists: (song.ar || []).map((a) => ({
        id: a.id,
        name: a.name
      })),
      album: {
        id: song.al?.id || 0,
        name: song.al?.name || '未知专辑',
        cover: song.al?.picUrl || ''
      },
      duration: song.dt / 1000 || 0,
      isAvailable: privilege ? privilege.fee !== 4 : true
    } as const
  })
}
