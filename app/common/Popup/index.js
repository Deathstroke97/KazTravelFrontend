import React, { Component } from 'react';
import { array, number, bool, func, string, oneOf } from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import SlickSlider from 'react-slick';

import { popupTypes } from '../../../settings';
import Datepicker from '../Datepicker';

import { toggleModal } from '../../../store/actions/common.actions';
import { modalSelector } from '../../../selectors/common.selectors';

const mapStateToProps = (state, props) => ({
  open: modalSelector(state)
})

@connect(mapStateToProps, { toggleModal })
export default class Popup extends Component {
  static propTypes = {
    open: bool,
    toggleModal: func.isRequired,
    render: func,
    type: oneOf([popupTypes.datepicker, popupTypes.gallery]).isRequired
  }

  render() {
    const { open, type, toggleModal, render, children } = this.props;

    return (
      <div className={classNames('popup', {'popup--open': open})}>
        <dialog className={classNames('popup-dialog', {
          'datepicker-dialog': type === popupTypes.datepicker
        })}>
          <i className="popup-close" onClick={() => toggleModal(false)} />
          {render ? this.props.render(open) : children}
        </dialog>
      </div>
    );
  }
}

