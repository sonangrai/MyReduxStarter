import React, { useState } from "react";
import { login } from "../Redux/reducers/authReducers";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Alert from "../common/Alert";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

const Login = ({ login, auth }) => {
  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  const { email, password } = data;

  const onChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const onLogin = (e) => {
    e.preventDefault();
    login(data);
  };

  //If the user is already logged in than redirecting user to home
  if (auth.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="form-login">
        <form onSubmit={onLogin}>
          <input type="email" value={email} name="email" onChange={onChange} />
          <input
            type="password"
            value={password}
            name="password"
            onChange={onChange}
          />
          <button type="submit">Login</button>
        </form>
      </div>
      <Alert />
    </>
  );
};

Login.propTypes = {
  login: PropTypes.func,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
