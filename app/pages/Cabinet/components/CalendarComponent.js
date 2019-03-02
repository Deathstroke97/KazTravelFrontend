import React, { Component } from 'react';
import { bool } from 'prop-types';
import { Field } from 'formik';
import moment from 'moment';

import Select from '../../../common/Forms/SelectField';
import { LocalizationContext } from '../../../../context';

export default class CalendarComponent extends Component {
  static propTypes = {
    disabled: bool
  }

  state = {
    days: [],
    months: [],
    years: []
  }

  componentDidMount() {
    const years = [];
    const nowYear = moment().year();

    for (let i = 18; i <= 70; i++) {
      years.push(nowYear - i);
    }

    this.setState({
      days: Array.from({length: 31}, (v, k) => k + 1),
      months: moment.months(),
      years
    })
  }

  render() {
    const { disabled } = this.props;
    const { days, months, years } = this.state;
    return (
      <LocalizationContext.Consumer>
        {
          ( {localization} ) => (
            <div className="cabinet-calendar">
            <div className="cabinet-calendar-block cabinet-calendar-day">
              <Field
                disabled={disabled}
                component={Select}
                name="birthDate.day"
                label={localization.cabinetDay}
              >
                {days.map((el, i) => <option value={el} key={i}>{el}</option>)}
              </Field>
            </div>
            <div className="cabinet-calendar-block cabinet-calendar-month">
              <Field
                disabled={disabled}
                component={Select}
                name="birthDate.month"
                label={localization.cabinetMonth}
              >
                {months.map((el, i) => <option value={el} key={i}>{el}</option>)}
              </Field>
            </div>
            <div className="cabinet-calendar-block cabinet-calendar-year">
              <Field
                disabled={disabled}
                component={Select}
                name="birthDate.year"
                label={localization.cabinetYear}
              >
                {years.map((el, i) => <option value={el} key={i}>{el}</option>)}
              </Field>
            </div>
          </div>
          )
        }
        </LocalizationContext.Consumer>

    );
  }
}
