import React, {Component, Fragment} from 'react';
import classNames from 'classnames';
import AgencyTourItemRoadMap from './AgencyTourItemRoadMap';
import ContentSlider from '../../common/ContentSlider';
import AgencyTourItemTariffs from './AgencyTourItemTariffs'
import { contentGallery } from './fixtures';
import { LocalizationContext } from '../../../context'

export default class AgencyTourItem extends Component {
  state = {
    unfolded: false,
    height: 999
  }
  componentDidMount() {
    this.calculateHeight();
    if (window !== undefined) {
      window.addEventListener('resize', this.calculateHeight);
    }
  }
  componentWillUnmount() {
    if (window !== undefined) {
      window.removeEventListener('resize', this.calculateHeight);
    }
  }
  toggle = () => {
    this.setState({ unfolded: !this.state.unfolded }, () => this.calculateHeight());
  }
  calculateHeight = () => {
    this.setState({ height: this.content.scrollHeight });
  }
  render() {
    const { unfolded, height } = this.state;
    const { data: { name, tourCategory, attraction, gallery, region, description, costs, visitTime, visitTimeType } } = this.props;

    gallery.forEach((item, index, array) => {
      array[index].image = item.imagePath;
      array[index].caption = item.description;
      array[index].thumb = item.imagePath;
    });

    return (
      <LocalizationContext.Consumer>
        {({localization}) => (
          <li className={classNames("agency-tours-item", {
            "agency-tours-item--unfolded": unfolded
          })} >
            <div className="agency-tours-item-tab">
              <div className="agency-tours-item-tab-description">
                <h3 className="agency-tours-item-tab-title">
                  {name}
                </h3>
                <div className="agency-tours-item-tab-details">
                  <span>{visitTime}{['h','d'][visitTimeType-1]}</span>
                  <span>{tourCategory}</span>
                  <span>{region}</span>
                </div>
              </div>
              <span className="agency-tours-item-tab-toggle" onClick={this.toggle}>{localization.guidesAboutTour}</span>
            </div>
            <div
              className="agency-tours-item-content"
              ref={content => this.content = content}
              style={{ maxHeight: unfolded ? height + 100 : 0 }}
            >
              <h3 className="agency-tours-item-content-title">{localization.guidesTourPlan}</h3>
              <AgencyTourItemRoadMap unfolded={unfolded} data={attraction}/>

              {Array.isArray(gallery) && gallery.length > 0 &&
                <Fragment>
                  <h3 className="agency-tours-item-content-title">{localization.guidesPhotoOfTour}</h3>
                  <ContentSlider slides={gallery} className="content-slider--arrows" reinit={unfolded} />
                </Fragment>
              }

              <h3 className="agency-tours-item-content-title">{localization.guidesTourCost}</h3>
              <AgencyTourItemTariffs data={costs} />

              <h3 className="agency-tours-item-content-title">{localization.guidesAboutTour}</h3>
              <p>{description}</p>
            </div>
          </li>
        )}
      </LocalizationContext.Consumer>
    )
  }
}
