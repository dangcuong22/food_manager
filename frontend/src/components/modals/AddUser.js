import React,{ useState} from "react";
import {useDispatch } from "react-redux";
import {registrationAPICreator} from "../../redux/actions/auth";
const AddUser = (props)=>{
    const dispatch = useDispatch();
    const [formData, updateFormData] = useState({});
    const handleChange = (e) => {
        updateFormData({
            ...formData,level_id:1,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = () => {
        let header={
            headers:{
                "x-access-token":`bearer ${localStorage.getItem("token")}`
            }
        }
        dispatch(registrationAPICreator(formData, header));
        
    };
    return (
    <div className="modal-add-data">
        <div className="content-wrapper">
            <div className="modal-content">
                <form onSubmit={()=>{handleSubmit(); props.handleAddUserModal()}}>
                <div className="row">
                    <div className="col-12">
                        <h4 >Thêm Tài khoản</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">Tên</div>
                    <div className="col-8"><input className="inputuser" name="name" type="text" onChange={(e)=>handleChange(e)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">Tài khoản</div>
                    <div className="col-8"><input className="inputuser" type="text" name="username"  onChange={(e)=>handleChange(e)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">Email</div>
                    <div className="col-8"><input className="inputuser" type="text" name="email"  onChange={(e)=>handleChange(e)} /></div>
                </div>
                <div className="row">
                    <div className="col-4">Mật khẩu</div>
                    <div className="col-8"><input className="inputuser" type="password" name="password"  onChange={(e)=>handleChange(e)} /></div>
                </div>
                <div className="row">
                    <div className="col-4">Quyền</div>
                    <div className="col-8">
                        <select  onChange={(e)=>handleChange(e)}className="selectcategoryuser" name="level_id" placeholder="Category" >
                            <optgroup label="Category">
                                <option value="1" selected>QUản trị</option>
                                <option value="2">Nhân viên</option>
                            </optgroup>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6"></div>
                    <div className="col-6 d-flex justify-content-between align-items-center align-items-center">
                        <button className="btn-cancel" onClick={props.handleAddUserModal}>Huỷ bỏ</button>
                        <button className="btn-add" type="submit">Thêm</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    </div>
)
}

export default AddUser;
