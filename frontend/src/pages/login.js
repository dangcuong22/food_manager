import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
import { Redirect, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginAPICreator } from "../redux/actions/auth";

import classes from "./login.module.css";

const Login = (props) => {
  const [formData, updateFormData] = useState({});
  const [login, setLogin] = useState(false);
  const { tokenStatus, isLoginPending, statusLogin } = useSelector(
    (state) => state.authAPI
  );
  let levelId = null;
  const dispatch = useDispatch();

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      level_id: 1,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const resApi = loginAPICreator(formData);
    dispatch(resApi);
  };
  const getLevel =()=>{
    return parseInt(localStorage.getItem('level_id'));
  }
  return (
    <>
      {statusLogin === 200 && tokenStatus.token && getLevel()===1?(
        <Switch>
          <Redirect from='/login' to='/admin' exact />
        </Switch>
      ): statusLogin === 200 && tokenStatus.token && getLevel()===2?(
        <Switch>
          <Redirect from='/login' to='/' exact />
        </Switch>
      ) : (
        <div className={classes.container}>
          <div className={classes.boxlogin}>
            <form
              className={classes.contentlogin}
              onSubmit={(e) => {
                handleSubmit(e);
              }}>
              <h1
                style={{
                  color: "#FFFFFF",
                  fontSize: "40px",
                  fontWeight: "700",
                  marginBottom: "30px",
                }}>
                ANGELA FOOD
              </h1>
              <div className={classes.line}>
                <div className={classes.label}>Tài khoản</div>
                <input
                  className={classes.input}
                  type='text'
                  name='username'
                  onChange={(e) => {
                    return handleChange(e);
                  }}
                />
              </div>
              <div className={classes.line}>
                <div className={classes.label}>Mật khẩu</div>
                <input
                  className={classes.input}
                  type='password'
                  name='password'
                  onChange={(e) => {
                    return handleChange(e);
                  }}
                />
              </div>
              <div className={classes.linebtn}>
                <button
                  style={{ outline: "none" }}
                  className={classes.button}
                  type='submit'>
                  {isLoginPending ? (
                    <i className='fa fa-spinner fa-spin fa-2x fa-fw'></i>
                  ) : (
                    "Đăng nhập"
                  )}
                </button>
              </div>
              {statusLogin === 500 ? (
                <p style={{ color: "#f56438", backgroundColor: "#FFFFFF" }}>
                  Tài khoản hoặc mật khẩu không chính xác
                </p>
              ) : (
                <p style={{ color: "#FFFFFF" }}>
                  
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default Login;
