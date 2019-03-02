import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import next from 'next';

import { Routes } from '../settings';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();


app
  .prepare()
  .then(() => {
    const server = express();

    server.use(favicon(path.join(__dirname, '../', 'favicon.ico')));

    server.use(express.static('public'));

    //======== Publications =========
    server.get(Routes.publications + '/:lang/:slug/:title/', (req, res) => {
      app.render(req, res, Routes.publications, {
        lang: req.params.lang,
        slug: req.params.slug,
        title: req.params.title,
      })
    });
    // ===================

    //========= Events ============
    server.get(Routes.events + '/:slug/:title', (req, res) => {
      app.render(req, res, Routes.events, {
        slug: req.params.slug,
        title: req.params.title,
        region: req.query.region,
      })
    });
    //=====================

    //========== Tourist Spot ===========
    server.get(Routes.spot + '/category', (req, res) => {
      app.render(req, res, Routes.spot, {
        spot: req.query.id,
        filter: req.query.filter
      })
    });

    server.get(Routes.spot + '/:slug/:title', (req, res) => {
      app.render(req, res, Routes.spot, {
        spot: req.params.spot,
        slug: req.params.slug,
        title: req.params.title
      })
    });


    // ======================

    //========== WhereToGo ==============
    server.get(Routes.whereToGo.url + '/:type/:slug/:title', (req, res) => {
      app.render(req, res, Routes.whereToGo.url, {
        type: req.params.type,
        slug: req.params.slug,
        title: req.params.title
      })
    });
    //======================

    //========== Tour Agencies ==============
    server.get(Routes.agencies + '/:slug/:title', (req, res) => {
      app.render(req, res, Routes.agencies, {
        slug: req.params.slug
      })
    });

    server.get(Routes.themes + '/:slug/:title', (req, res) => {
      app.render(req, res, Routes.themes, {
        slug: req.params.slug,
        title: req.params.title
      })
    })

    // //========== Tour Agency Page ==============
    // server.get(Routes.agencies + '/:region/:name', (req, res) => {
    //   app.render(req, res, Routes.agencyPage, {
    //     region: req.params.region,
    //     name: req.params.name
    //   })
    // });

    //========== Tours Page ==============
    server.get(Routes.tours + '/:slug/:title', (req, res) => {
      app.render(req, res, Routes.tours, {
        slug: req.params.slug
      })
    });
    //=====================================

    //========== Guides Page ==============
    server.get(Routes.guides + '/:slug/:title', (req, res) => {
      app.render(req, res, Routes.guides, {
        slug: req.params.slug,
        title: req.params.title
      })
    });
    //====================================

    //========== Shops Page ==============
    server.get(Routes.shops + '/:slug/:title', (req, res) => {
      app.render(req, res, Routes.shops, {
        slug: req.params.slug
      })
    });
    //====================================

    //========== Themes Page ==============
    server.get(Routes.themes + '/:slug', (req, res) => {
      app.render(req, res, Routes.themes, {
        slug: req.params.slug
      })
    });
    //====================================

    //========== Cabinet =================
    server.get(Routes.cabinet.url + '/:type?', (req, res) => {
      app.render(req, res, Routes.cabinet.url, {
        type: req.params.type
      });
    });
    //====================================

    //========== Auth ====================
    server.get(Routes.auth.url + '/:type?/:userId?/:resetCode?', (req, res) => {
      app.render(req, res, Routes.auth.url, {
        type: req.params.type,
        user: req.query.user,
        userId: req.query.userId,
        resetCode: req.query.resetCode
      });
    })
    //====================================

    //========== Contacts Page ===========
    server.get(Routes.contacts, (req, res) => {
      app.render(req, res, Routes.contacts, {})
    });
    //=====================================

    //========== FeedBack Page ============
    server.get(Routes.feedback, (req, res) => {
      app.render(req, res, Routes.feedback, {})
    });
    //=====================================

    //========== Search Page ==============
    server.get(Routes.search, (req, res) => {
      app.render(req, res, Routes.search, {
        request: req.query.request
      });

    });
    //=====================================

    //========== For Business =============
    server.get(Routes.business, (req, res) => {
      app.render(req, res, Routes.business, {});
    });
    //=====================================

    //========== Tourist Help =============
    server.get(Routes.help.url + '/:type', (req, res) => {
      app.render(req, res, Routes.help.url, {
        type: req.params.type
      })
    })
    //=====================================

    //========== Partners =================
    server.get(Routes.partners, (req, res) => {
      app.render(req, res, Routes.partners, {});
    });
    //=====================================

    //========== Privacy ==================
    server.get(Routes.privacy, (req, res) => {
      app.render(req, res, Routes.privacy, {});
    });
    //=====================================

    //========== About ====================
    server.get(Routes.about, (req, res) => {
      app.render(req, res, Routes.about, {});
    });
    //=====================================


    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000')
    });
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })

module.exports = app;
