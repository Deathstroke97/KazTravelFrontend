import React, { Fragment } from 'react';
import { array, string } from 'prop-types';
import Link from 'next/link';

import Breadcrumbs from '../../common/Breadcrumbs'
import PageShareLink from '../../common/Socials/PageShareLink';
import { LocalizationContext } from '../../../context'

const PrivacyContent = ({data, pathname, list, originalHost, culture, originalURL}) => {
  if (!data) return null;
  
  // page={data.blogCategory}
  return (
    <LocalizationContext.Consumer>
      {({localization}) => (
        <Fragment>
          <PageShareLink info={{url: originalURL, title: localization.aboutTitle, desc: localization.footerAgreement, img: '/static/images/logo-dark.svg'}} />
          <Breadcrumbs page={localization.footerAgreement} />
          <h1 className="content-title content-title--bounded">{data.title}</h1>
          <article className="container container--narrow content-article">
            <div dangerouslySetInnerHTML={{__html: data.content}}/>
            <div className="privacy-list">
              {
                !!list && list.map((el, key) => (
                  <figure key={key} className="privacy-list-item">
                    <img src='/static/images/icons/icon-pdf.svg'/>
                    <figcaption className="privacy-link">
                      <a href={originalHost + el.link[culture]} download target="_blank">{el.title[culture]}</a>
                      <span>{el.size}</span>
                    </figcaption>
                  </figure>
                ))
              }
              {/* <figure className="privacy-list-item">
                <img src='/static/images/icons/icon-pdf.svg'/>
                <figcaption className="privacy-link">
                  <a href={el.link} download target="_blank">{'Правила пользования сайтом kazakhstan.travel для неопределенного круга лиц'}</a>
                  <span>{'229 kb'}</span>
                </figcaption>
              </figure>
              <figure className="privacy-list-item">
                <img src='/static/images/icons/icon-pdf.svg'/>
                <figcaption className="privacy-link">
                  <a href={el.link} download target="_blank">{'Пользовательское соглашение для зарегистрированных пользователей сайта kazakhstan.travel'}</a>
                  <span>{'241 kb'}</span>
                </figcaption>
              </figure>
              <figure className="privacy-list-item">
                <img src='/static/images/icons/icon-pdf.svg'/>
                <figcaption className="privacy-link">
                  <a href={el.link} download target="_blank">{'Соглашение об использовании и обработки персональных данных'}</a>
                  <span>{'208 kb'}</span>
                </figcaption>
              </figure>
              <figure className="privacy-list-item">
                <img src='/static/images/icons/icon-pdf.svg'/>
                <figcaption className="privacy-link">
                  <a href={el.link} download target="_blank">{'Соглашение об использовании данных лиц для услуги обратная свзяь'}</a>
                  <span>{'209 kb'}</span>
                </figcaption>
              </figure> */}
            </div>
          </article>
          <div className="publications-controls">
            <Link href="/">
              <a><img src="/static/images/icons/icon-prev-1.svg"/>BACK</a>
            </Link>
          </div>
        </Fragment>
      )}
    </LocalizationContext.Consumer>
  )
};

// const PrivacyContent = ({pathname, list}) => (
//   <Fragment>
//     <Breadcrumbs page="Privacy" path={pathname} />
//     <h1 className="content-title content-title--bounded">Privacy</h1>
//     <article className="container container--narrow">
//       <div className="content-text">
//         This Policy in the field of processing of personal data and confidentiality of personal information (hereinafter — the Policy) applies to all information that Kazakhturism LLC and its affiliates, including all persons belonging to the same group, may receive about the user during the use of any of the sites, services, programs and products (hereinafter — the Services), as well as during the execution of any agreements and agreements concluded with the user in connection with the use of the Services by its affiliates. The user's consent to the provision of personal data (personal information), given by him in accordance with this Policy within the framework of relations with one of the persons belonging to the group of persons of LLC "K", applies to all persons belonging to this group of persons.
//       </div>
//       <div className="content-text">
//         The use of the Services means the unconditional consent of the user with this Policy and the conditions of processing of his / her personal information specified in it, both without and with the use of automation tools, and confirms that, by giving such consent, he / she acts freely, by his / her will and in his / her interest; in case of disagreement with these conditions, the user must refrain from using the Services.
//       </div>
//       <div className="privacy-list">
//         {
//           !!list && list.map((el, key) => (
//             <figure key={key} className="privacy-list-item">
//               <img src='/static/images/icons/icon-pdf.svg'/>
//               <figcaption className="privacy-link">
//                 <a href={el.link} download target="_blank">{el.title}</a>
//                 <span>{el.size}</span>
//               </figcaption>
//             </figure>
//           ))
//         }
//       </div>
//     </article>
//   </Fragment>
// );

PrivacyContent.propTypes = {
  pathname: string,
  list: array
};

export default PrivacyContent;
