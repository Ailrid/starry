/// <reference types="vite/client" />
export {}
declare global {
  interface Window {
    __VIRID_BRIDGE__: {
      post: (packet: any) => void

      subscribe: (callback: (packet: any) => void) => () => void
    }
  }
}
