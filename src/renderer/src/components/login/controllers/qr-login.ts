import { Controller, MessageWriter } from '@virid/core'
import { match } from 'ts-pattern'
import { OnHook, Responsive } from '@virid/vue'
import { loginQrKey, loginQrCreate, loginQrCheck } from '@/utils/server'
import { FetchUserAccountMessage } from '@/ccs/user'
@Controller()
export class QrLoginController {
  @Responsive()
  public qrSvg: string = ''
  public unikey: string = ''
  @Responsive()
  public currentStatus:
    | '等待扫码'
    | '请在手机上确认登陆'
    | '登陆成功'
    | '登陆频繁，请使用网页登陆'
    | '' = ''
  /**
   * * 获取二维码的SVG
   */
  @OnHook('onSetup')
  public async getQrSvg() {
    this.removeInterval()
    const key = await loginQrKey()
    match(key)
      .with({ ok: true }, async ({ val }) => {
        this.unikey = val.unikey
        const svg = await loginQrCreate({
          unikey: val.unikey
        })
        match(svg)
          .with({ ok: true }, ({ val }) => {
            this.currentStatus = '等待扫码'
            this.qrSvg = val.qrsvg
            this.startInterval()
          })
          .with({ ok: false }, ({ val }) => {
            MessageWriter.error(new Error(val), '[QrLoginController] Create Qr Svg Failed')
          })
          .exhaustive()
      })
      .with({ ok: false }, ({ val }) => {
        MessageWriter.error(new Error(val), '[QrLoginController] Get Qr Key Failed')
      })
      .exhaustive()
  }
  /**
   * * 定时器逻辑
   */
  public intervalId: number = -1
  public startInterval() {
    if (this.intervalId !== -1) return
    this.intervalId = setInterval(() => {
      this.checkQr()
    }, 2000)
  }
  @OnHook('onUnmounted')
  public removeInterval() {
    if (this.intervalId == -1) return
    clearInterval(this.intervalId)
    this.intervalId = -1
  }
  /**
   * * 检查二维码是否已经登陆
   */
  public async checkQr() {
    const result = await loginQrCheck({ unikey: this.unikey })

    match(result)
      .with({ ok: true }, ({ val }) => {
        // 直接针对 val.code 进行匹配
        match(val)
          .with({ code: 800 }, () => {
            //超时重新获取
            this.getQrSvg()
          })
          .with({ code: 801 }, () => {
            this.currentStatus = '等待扫码'
          })
          .with({ code: 802 }, () => {
            this.currentStatus = '请在手机上确认登陆'
          })
          .with({ code: 803 }, () => {
            this.currentStatus = '登陆成功'
            this.removeInterval()
            FetchUserAccountMessage.send()
          })
          .with({ code: -462 }, () => {
            this.currentStatus = '登陆频繁，请使用网页登陆'
            this.removeInterval()
          })
          .exhaustive()
      })
      .with({ ok: false }, ({ val }) => {
        MessageWriter.error(new Error(val), '[QrLoginController] Check Qr Failed')
      })
      .exhaustive()
  }
}
