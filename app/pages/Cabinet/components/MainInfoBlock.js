import React, { Component } from 'react';
import { string, bool, func } from 'prop-types';

export default class MainInfoBlock extends Component {
  static propTypes = {
    title: string,
    text: string,
    isEdit: bool,
    upload: func
  }

  state = {
    file: '',
    imagePreview: '',
    error: false,
    errorMessage: ''
  }

  componentDidMount() {
    if (this.props.photo) {
      this.setState({
        imagePreview: this.props.photo
      })
    }
  }



  handleUpload = e => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        this.setState({
          error: true,
          errorMessage: 'File must be less than 5 MB'
        })
        return null;
      } else if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        this.setState({
          error: true,
          errorMessage: 'File is not image'
        })
        return null;
      } else {
        this.setState({
          error: false,
          imagePreview: URL.createObjectURL(file)
        }, () => this.props.upload(file))
      }
    }
  }

  render() {
    const { title, text, photo, isEdit } = this.props;
    const { error, imagePreview, errorMessage } = this.state;
    return (
      <div className="cabinet-info">
        {error && <div className="cabinet-info-error">{errorMessage}</div>}

        <div className="cabinet-info-img">
          <div className="cabinet-info-upload">
            {isEdit ? <input type="file" onChange={this.handleUpload}/> : null}
            <img src={imagePreview} alt=""/>
          </div>
        </div>
        <div className="cabinet-info-content">
          <h4 className="cabinet-info-title">{title}</h4>
          <p className="cabinet-info-text">{text}</p>
        </div>

      </div>
    );
  }
}
