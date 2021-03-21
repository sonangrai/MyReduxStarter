import React from "react";
import { connect } from "react-redux";

const Alert = ({ alert }) => {
  return <>{alert && <div className="alert">{alert}</div>}</>;
};

const mapStateToProps = (state) => ({
  alert: state.alert.errors,
});

export default connect(mapStateToProps)(Alert);
