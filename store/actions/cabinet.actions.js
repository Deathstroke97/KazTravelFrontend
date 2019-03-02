import { createAction } from 'redux-actions';
import id from 'uniqid';
import { parseCookies } from 'nookies';
import axios from 'axios'
import {
  FETCH_ROUTES,
  FETCH_SHOPS,
  DONE,
  SAVE_ROUTE,
  SAVE_SHOP,
  UPDATE_ROUTE,
  UPDATE_SHOP,
  EDIT_ITEM,
  DELETE_ITEM,
  CANCEL_EDIT
} from '../../constants';

import { routes, shops } from '../../app/pages/Cabinet/fixtures';

export const editItemAction = createAction(EDIT_ITEM);
export const cancelEditAction = createAction(CANCEL_EDIT);

//TODO Delete route action must be after ajax DELETE by id on server
const deleteItemAction = createAction(DELETE_ITEM);

const fetchRoutes = createAction(FETCH_ROUTES + DONE);
const fetchShops = createAction(FETCH_SHOPS + DONE);
const saveRoute = createAction(SAVE_ROUTE + DONE);
const saveShop = createAction(SAVE_SHOP + DONE);
const updateShop = createAction(UPDATE_SHOP + DONE)
const updateRoute = createAction(UPDATE_ROUTE + DONE)

export const fetchUserShopsAction = (api, token, user) => dispatch => {
  const cookies = parseCookies(),
        lang = cookies.culture

  axios(`${api}/services/app/souvenirShopPub/GetAllShopItems`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
  }).then(({data: {result}}) => {
    const data = result.map(res => ({...res, name: user.organization.name, description: user.description})) 
    dispatch(fetchShops(data))
  }).catch(e => console.error(e))
}

export const fetchUserRoutesAction = (api, token) => dispatch => {
  const cookies = parseCookies(),
        lang = cookies.culture

  axios(`${api}/services/app/routePub/GetAll`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
  }).then(({data: {result}}) => {
    let arrayOfRoutes = result.map(item => {
      let translatePos = item.translations.map(data => data.language).indexOf(lang)

      return {
        ...item,
        gallery: item.galleries.map(el => ({imagePath: el.imagePath, translations: [{description: el.description, language: lang}]})),
        attractions: item.transports.map(el => ({transportId: el.id})),
        time: {
          type: item.visitTimeType,
          value: item.visitTime
        },
        description: typeof translatePos === 'number' && translatePos !== -1 ? item.translations[translatePos].description : '',
        name: typeof translatePos === 'number' && translatePos !== -1 ? item.translations[translatePos].name : ''
      }
    })

    dispatch(fetchRoutes(arrayOfRoutes))
  }).catch(e => console.error(e))
}

export const saveRouteAction = (data, api, token) => dispatch => {
  const cookies = parseCookies(),
        lang = cookies.culture

  let finalAttractions = data.attractions.map(attraction => {
    let attractionTranslation = {
      description: attraction.description,
      language: lang
    }

    if(attraction.translations.map(data => data.language).indexOf(lang) !== -1){
      let pos = attraction.translations.map(data => data.language).indexOf(lang)
      attraction.translations[pos] = attractionTranslation
    } else {
      attraction.translations = [...attraction.translations, attractionTranslation]
    }

    delete attraction.description

    return attraction
  })

  let translation = {
    name: data.name,
    description: data.description,
    language: lang
  }

  if(data.translations.map(data => data.language).indexOf(lang) !== -1){
    let pos = data.translations.map(data => data.language).indexOf(lang)
    data.translations[pos] = translation
  } else {
    data.translations = [...data.translations, translation]
  }

  const finalData = {
    ...data,
    visitTime: data.time.value,
    visitTimeType: data.time.type,
  }

  delete finalData.name
  delete finalData.description
  delete finalData.time
  delete finalData.gallery

  return new Promise((resolve, reject) => {
    axios.post(`${api}/services/app/routePub/CreateOrUpdateRoute`, finalData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
    }).then(res => {
      if(finalData.id) {
        dispatch(updateRoute(data))
      } else {
        const route = {
          ...data,
          id: res.data.result
        }
        dispatch(saveRoute(route))
      }

      resolve(res.data.result)
    }).catch(reject)
  })
}

export const saveShopAction = (data, api, token, gallery) => async dispatch => {
  const cookies = parseCookies(),
        lang = cookies.culture

  for ( let item of data) {
    await new Promise((resolve, reject) => {
      const finalData = {
        cityId: item.regionId,
        address: item.address.label,
        longtitude: item.map.place[1],
        latitude: item.map.place[0],
        zoom: item.map.zoom,
        phones: item.phone
      }
       if (item.id) finalData.id = item.id
      axios.post(`${api}/services/app/souvenirShopPub/CreateOrUpdateShopItem`, finalData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
      }).then(res => {
        const shop = {
          ...item,
          address: item.address.label
        }

        if(gallery.length) {
          let newGallery = gallery.map(data => {
            let pos = data.translations.map(data => data.language).indexOf(lang)
            return {
              imagePath: data.imagePath,
              description: data.translations[pos].description
            }
          })

          shop.gallery = newGallery
        }

        if(finalData.id) {
          dispatch(updateShop(shop))
        } else {
          shop.id = res.data.result
          dispatch(saveShop(shop))
        }
        resolve()
      }).catch(reject)
    });
  }
}

export const updateRouteAction = data => dispatch => {
  asyncSample_PATCH_Route(data)
    .then(route => dispatch(updateRoute(route)))
    .catch(e => console.error(e))
}

export const deleteRouteAction = (id, api, token) => dispatch => {
  axios.post(`${api}/services/app/routePub/Delete?id=${id}`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
  }).then(() => dispatch(deleteItemAction(id))).catch(e => console.error(e.response))
}

export const deleteShopAction = (id, api, token) => dispatch => {
  axios.post(`${api}/services/app/souvenirShopPub/DeleteShopItem?id=${id}`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
  }).then(() => dispatch(deleteItemAction(id))).catch(e => console.error(e.response))
}

function asyncSample_POST_Route(data) {
  return new Promise(resolve => (
    setTimeout(() => {
      if (Array.isArray(data)) {
        data.map(el => {
          el.id = id();
          return el;
        })
      } else {
        data.id = id();
      }

      resolve(data);
    }, 1000)
  ))
}

function asyncSample_PATCH_Route(data) {
  return new Promise(resolve => (
    setTimeout(() => {
      resolve(data);
    }, 1000)
  ))
}

function asyncSample_GET_UserRoutesById(id) {
  return new Promise(resolve => (
    setTimeout(() => resolve([]), 500)
  ))
}

function asyncSample_GET_UserShopsById(id) {
  return new Promise(resolve => (
    setTimeout(() => resolve(shops), 500)
  ))
}
