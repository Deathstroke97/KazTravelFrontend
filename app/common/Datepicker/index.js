import React, { Component, Fragment } from 'react';
import { func, bool } from 'prop-types';
import DayPicker, { DateUtils } from 'react-day-picker';
import moment, { formatDate, parseDate,  } from 'react-day-picker/moment';


export default class Datepicker extends Component {
  static propTypes = {
    handleSelect: func,
    fromMonth: bool,
    toMonth: bool
  }

  state = {
    from: undefined,
    to: undefined
  }



  handleDayClick = day => {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }


  render() {
    const { from, to } = this.state;
    const { handleSelect, fromMonth, toMonth } = this.props;
    const modifiers = {
      start: from,
      end: to,
      // disabled: fromMonth ? { before: new Date() } :  { after: new Date() }
    };

    return (
      <Fragment>
        <DayPicker
          firstDayOfWeek={1}
          showOutsideDays
          // fromMonth={fromMonth && new Date()}
          toMonth={toMonth && new Date()}
          selectedDays={[from, { from, to }]}
          renderDay={day => <span>{day.getDate()}</span>}
          onDayClick={this.handleDayClick}
          modifiers={modifiers}
        />
        <div className="datepicker-period">
          <span>Period:</span>
          <input type="text" value={from ? from.toLocaleDateString() : ''} readOnly />
          <i />
          <input type="text" value={to ? to.toLocaleDateString() : ''} readOnly />
          <button className="btn btn--blue" disabled={!from || !to} onClick={() => handleSelect(this.state)}>Select</button>
        </div>
      </Fragment>
    );
  }
}
