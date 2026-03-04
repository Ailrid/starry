export const USER_AGENT_MAP = {
  weapi: {
    pc: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0'
  },
  api: {
    pc: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36 Chrome/91.0.4472.164 NeteaseMusicDesktop/3.0.18.203152',
    android:
      'NeteaseMusic/9.1.65.240927161425(9001065);Dalvik/2.1.0 (Linux; U; Android 14; 23013RK75C Build/UKQ1.230804.001)',
    iphone: 'NeteaseMusic 9.0.90/5038 (iPhone; iOS 16.2; zh_CN)'
  }
}

export const APP_CONF = {
  apiDomain: 'https://interface.music.163.com',
  domain: 'https://music.163.com',
  encrypt: true,
  encryptResponse: false
}

export const OS_CONFIG: Record<string, any> = {
  pc: {
    os: 'pc',
    appver: '3.0.18.203152',
    osver: 'Microsoft-Windows-10-Professional-build-22631-64bit'
  },
  android: {
    os: 'android',
    appver: '9.1.71',
    osver: '14',
    brand: 'Redmi'
  },
  iphone: {
    os: 'iOS',
    appver: '9.0.90',
    osver: '16.2'
  }
}

export const NETEASE_CRYPT = {
  iv: '0102030405060708',
  presetKey: '0CoJUm6Qyw8W8jud',
  base62: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  publicKey: `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDgtQn2JZ34ZC28NWYpAUd98iZ37BUrX/aKzmFbt7clFSs6sXqHauqKWqdtLkF2KexO40H1YTX8z2lSgBBOAxLsvaklV8k4cBFK9snQXE9/DDaFt6Rr7iVZMldczhC0JNgTz+SHXT6CBHuX3e9SdB1Ua44oncaTWz7OBGLbCiK45wIDAQAB
-----END PUBLIC KEY-----`,
  eapiKey: 'e82ckenh8dichen8'
}
