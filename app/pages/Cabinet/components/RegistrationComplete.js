import React from 'react';
import { func } from 'prop-types';

const RegistrationComplete = ({ handler }) => {
  return (
    <div className="dev-page cabinet-complete-page">
      <div className="dev-page-icon"><img src="/static/images/img-complete.svg" alt=""/></div>
      <h3 className="content-title">Registration completed</h3>
      <p>A confirmation has been sent to <a href="">your e-mail</a>, please follow the link. Also you can tell us more about you by filling out the form</p>
      <button className="btn btn--blue" onClick={handler}>Tell more</button>
    </div>
  );
};

RegistrationComplete.propTypes = {
  handler: func
};

export default RegistrationComplete;
