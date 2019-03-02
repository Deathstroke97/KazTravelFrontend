/* global document */
import cookie from 'cookie';

export function parseCookies(_ctx, _options) {
  var ctx = _ctx || {};
  var options = _options || {};
  if (ctx.req && ctx.req.headers.cookie) {
    return cookie.parse(ctx.req.headers.cookie, options)
  }

  if (process.browser) {
    return cookie.parse(document.cookie, options)
  }

  return {}
}

export function setCookie(_ctx, name, value, _options) {
  var ctx = _ctx || {};
  var options = _options || {};
  if (ctx && ctx.res) {
    ctx.res.setHeader('Set-Cookie', cookie.serialize(name, value, options))
  }

  if (process.browser) {
    document.cookie = cookie.serialize(name, value, options)
  }

  return {}
}

export function destroyCookie(_ctx, name) {
  var ctx = _ctx || {};
  if (ctx && ctx.res) {
    ctx.res.setHeader(
      'Set-Cookie',
      cookie.serialize(name, '', {
        maxAge: -1,
      }),
    )
  }

  if (process.browser) {
    document.cookie = cookie.serialize(name, '', {
      maxAge: -1,
    })
  }

  return {}
}
export default {
  set: (ctx, name, value, _options) => {
    var options = _options || {};
    setCookie(ctx, name, value, options)
  },
  get: (ctx, options) => parseCookies(ctx, options),
  destroy: (ctx, name) => destroyCookie(ctx, name),
}

