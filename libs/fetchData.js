import axios from 'axios'

import { parseCookies, setCookie } from './cookies';

export const fetchData = async (ctx, url, options) => {
  if(!ctx) ctx = ''
  let cookies = parseCookies(ctx),
      lang = cookies['culture'],
      api

  if(ctx && ctx.isServer) {
    api = ctx.req.get('host').includes('demo') ||  ctx.req.get('host').includes('localhost') ? 'http://test.kazakhstan.travel/api/services/app' : 'http://admin.kazakhstan.travel/api/services/app'
  } else {
    api = window.location.host.includes('demo') || window.location.host.includes('localhost') ? 'http://test.kazakhstan.travel/api/services/app' : 'http://admin.kazakhstan.travel/api/services/app'
  }

  if(ctx && ctx.query.lang) {
    setCookie(ctx, 'culture', ctx.query.lang, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
    lang = ctx.query.lang
  }

  if(!lang) {
    setCookie(ctx, 'culture', 'en', {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
    lang = 'en'
  }
  if(!options) options = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'X-Language': lang
    }
  }

  return await axios(`${api}${url}`, options)
    .then(res => res.data)
    .catch(err => {
      console.log(err.message)
      return {
        result: []
      }
    })
}
