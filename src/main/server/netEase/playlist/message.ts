import { HttpRoute, HttpRequestMessage } from "@virid/express";
@HttpRoute({
  path: "/netease/playlists/create",
  method: "post",
})
export class PlaylistCreateRequestMessage extends HttpRequestMessage {}

@HttpRoute({
  path: "/netease/playlists/delete",
  method: "post",
})
export class PlaylistDeleteRequestMessage extends HttpRequestMessage {}

@HttpRoute({
  path: "/netease/playlists/detail",
  method: "post",
})
export class PlaylistDetailRequestMessage extends HttpRequestMessage {}

@HttpRoute({
  path: "/netease/playlists/songs/update",
  method: "post",
})
export class PlaylistSongUpdateRequestMessage extends HttpRequestMessage {}

@HttpRoute({
  path: "/netease/playlists/order/update",
  method: "post",
})
export class PlaylistOrderUpdateRequestMessage extends HttpRequestMessage {}
@HttpRoute({
  path: "/netease/playlists/update",
  method: "post",
})
export class PlaylistUpdateRequestMessage extends HttpRequestMessage {}
