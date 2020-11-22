import classes from "./login.module.css";
import React, { Component } from 'react'
import { ToastContainer,toast } from "react-toastify";
import {registrationAPICreator} from "../redux/actions/auth";
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      repassword: "",
      name: "",
      email: "",
      level_id: 2,
      statusRegistration: false
    };
  }
  handleChange(event){
    this.setState({[event.target.name]:event.target.value})
  }
  handleSubmit(e){
    e.preventDefault();
    if(!this.checkField()) return;
    const header={
      headers:{
          "x-access-token":`bearer ${localStorage.getItem("token")}`
      }
    }
    const body = {
      username : this.state.username,
      password : this.state.password,
      name : this.state.name,
      email : this.state.email,
      level_id : this.state.level_id,
    }
    
    const res = registrationAPICreator(body, header)
    res.payload.then((res)=>{
      if(res.status===200){
        this.notify('success','Đăng ký thành công');
        return window.location.replace('/login');
      } 
      this.notify('error','Kiểm tra lại thông tin đăng ký');
    })
    console.log(res)

  }
  isEmpty(val){
    if(val===0)return false;
    if(!val) return true;
    if(val === "") return true;
    return false;
  }
  checkField(){
    if(this.isEmpty(this.state.name)){
      this.notify('warning','Vui lòng nhập đẩy đủ tên người dùng');
      return false
    }
    if(this.isEmpty(this.state.username)){
      this.notify('warning',"Vui lòng nhập đẩy đủ tài khoản người dùng");
      return false
    }
    if(this.isEmpty(this.state.email)){
      this.notify('warning',"Vui lòng nhập đẩy đủ email người dùng");
      return false
    }
    if(this.isEmpty(this.state.password)){
      this.notify('warning',"Vui lòng nhập đẩy đủ mật khẩu người dùng");
      return false
    }
    if(this.isEmpty(this.state.repassword)){
      this.notify('warning',"Vui lòng nhập lại mật khẩu người dùng");
      return false
    }
    if(this.state.repassword !== this.state.password){
      this.notify('warning',"Mật khẩu không trùng nhau");
      return false
    }
    return true
  }
  notify = (type,mess) =>{
    switch (type) {
      case 'warning':
        return toast.warning(mess, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      case 'success':
        return toast.success(mess, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      case 'error':
        return toast.error(mess, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      default:
        break;
    }
  }

  render() {
    return (
      <>
        <ToastContainer
          position='bottom-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
          <div className={classes.container}>
            <div className={classes.boxlogin}>
              <form
                className={classes.contentlogin}
                onSubmit={(e) => {
                  this.handleSubmit(e);
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
                  <div className={classes.label}>Tên</div>
                  <input
                    className={classes.input}
                    type='text'
                    name='name'
                    onChange={(e) => {
                      return this.handleChange(e);
                    }}
                  />
                </div>
                <div className={classes.line}>
                  <div className={classes.label}>Tài khoản</div>
                  <input
                    className={classes.input}
                    type='text'
                    name='username'
                    onChange={(e) => {
                      return this.handleChange(e);
                    }}
                  />
                </div>
                <div className={classes.line}>
                  <div className={classes.label}>Email</div>
                  <input
                    className={classes.input}
                    type='text'
                    name='email'
                    onChange={(e) => {
                      return this.handleChange(e);
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
                      return this.handleChange(e);
                    }}
                  />
                </div>
                <div className={classes.line}>
                  <div className={classes.label}>Nhập lại</div>
                  <input
                    className={classes.input}
                    type='password'
                    name='repassword'
                    onChange={(e) => {
                      return this.handleChange(e);
                    }}
                  />
                </div>
                <small className="text-white" hidden={!this.state.repassword || this.state.repassword===this.state.password}>
                    Mật khẩu không khớp
                </small>
                <div className={classes.linebtn}>
                  <button
                    style={{ outline: "none" }}
                    className={classes.button}
                    type='submit'>
                    Đăng ký
                  </button>
                </div>
                {/* {statusLogin === 500 ? (
                  <p style={{ color: "#f56438", backgroundColor: "#FFFFFF" }}>
                    Tài khoản hoặc mật khẩu không chính xác
                  </p>
                ) : (
                  <p style={{ color: "#FFFFFF" }}>
                    
                  </p>
                )} */}
              </form>
            </div>
          </div>
      </>
    )
  }
}

