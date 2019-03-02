import React, { Fragment, Component } from 'react';
import { string, func } from 'prop-types';
// import { Field, FormSection } from 'redux-form';
import { Field } from 'formik';
import Input from '../../../common/Forms/InputText';

export default class VideoLinkComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.link || '',
      videoLink: this.youtubeLinkOptimizer(props.link)
    }
  }
  static propTypes = {
    label: string,
    change: func
  }

  state = {
    videoLink: null,
    value: ''
  }

  componentDidMount() {
    this.setState()
  }

  youtubeLinkOptimizer = url => {
    if (!url) return '';
    const exp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(exp);
    return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : '';
  }

  handleChange = e => {
    const { target: { value } } = e;
    const { change } = this.props;
    const videoLink = this.youtubeLinkOptimizer(value);
    this.setState({
      value,
      videoLink,
    }, () => {
      change('video.link', videoLink);
    });

  }

  render(){
    const { label, link, isEdit } = this.props;
    const { videoLink, value } = this.state;
    // const videoLink = link ? youtubeLinkOptimizer(link) : null;
    return (
      <Fragment>
        <div className="form-block">
          <label className="label-control">{label}</label>
          <Field
            type="text"
            component={Input}
            name="video.link"
            // validate={value => youtubeLinkOptimizer(value) ? undefined : 'Wrong youtube link!'}
            className="form-control"
            placeholder="Paste link here"
            disabled={!isEdit}
            value={value}
            onChange={this.handleChange}
          />
          {value && !videoLink && <div className="form-error">Wrong link!</div>}

          {
            videoLink && (
              <div className="cabinet-video">
                <iframe
                  height="330"
                  src={videoLink}
                  frameBorder="0"
                />
                <div className="cabinet-video-caption">
                  <Field
                    name="video.caption"
                    type="text"
                    component="input"
                    placeholder="Edit video description"
                    disabled={!isEdit}
                  />
                </div>
              </div>
            )
          }
        </div>
      </Fragment>
    );
  }

}

