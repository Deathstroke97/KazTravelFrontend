import '@babel/polyfill';
export const Routes = {
  publications: '/publications',
  events: '/events',
  spot: '/tourist-spot',
  whereToGo: {
    url: '/where-to-go',
    region: 'region',
    trip: 'trip-idea'
  },
  agencies: '/agencies',
  agencyPage: '/agency-page',
  tours: '/tours',
  guides: '/guides',
  shops: '/shops',
  cabinet: {
    url: '/cabinet',
    guide: 'guide',
    touroperator: 'tour-operator',
    shop: 'shop'
  },
  auth: {
    url: '/auth',
    login: 'login',
    reg: 'registration',
    regMe: 'regMe',
    reset: 'reset-password'
  },
  contacts: '/contacts',
  feedback: '/feedback',
  search: '/search',
  business: '/business',
  themes: '/themes',
  help: {
    url: '/tourist-help',
    about_kazakhstan: 'about_kazakhstan',
    documents: 'documents',
    customs: 'customs',
    money_exchange: 'money_exchange',
    time_zones: 'time_zones',
    language: 'language',
    weather: 'weather',
    communications: 'communications',
    transport: 'transport',
    phones: 'phones',
    units: 'units',
    electrical_connector: 'electrical_connector',
    resources: 'resources',
  },
  partners: '/partners',
  privacy: '/privacy',
  about: '/about',

}

export const trendsSeasons = [
  { value: 'summer', label: 'summer', icon: 'icon-summer.svg' },
  { value: 'autumn', label: 'autumn', icon: 'icon-autumn.svg' },
  { value: 'winter', label: 'winter', icon: 'icon-winter.svg' },
  { value: 'spring', label: 'spring', icon: 'icon-spring.svg' }
];

export const filterTypes = {
  category: 'category',
  date: 'date',
  events: 'events',
  spots: 'spots',
  region: 'region',
  guide: 'guide',
  tours: 'tours'
};

export const popupTypes = {
  datepicker: 'datepicker',
  gallery: 'gallery'
};

export const langList = {
  en: 'En',
  kk: 'Kz',
  ru: 'Ru',
  'zh-CN': 'Cn',
  de: 'De',
  fr: 'Fr'
};

export const userTypes = {
  tour: {
    title: 'Tour Operator',
    slug: Routes.cabinet.touroperator
  },
  guide: {
    title: 'Guide',
    slug: Routes.cabinet.guide
  },
  shop: {
    title: 'Souvenir shop',
    slug: Routes.cabinet.shop
  }
};

export const routeTransportOptions = [
  { id: 1, name: 'icon-walk.svg' },
  { id: 2, name: 'icon-car.svg' },
  { id: 3, name: 'icon-bus.svg' }
];
