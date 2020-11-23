import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductsAPICreator,
  getProductsAPICreator,
  editProductsAPICreator
} from "../../redux/actions/products";

const AddData = (props) => {
  //   const { isPostFulFilled } = useSelector((state) => state.products);
  const [id] = useState(props.id || null);
  const [name, setName] = useState(props.name || "");
  const [price, setPrice] = useState(props.price || "");
  const [image, setImage] = useState();
  const [category, setCategory] = useState(props.category || 1);
  const dispatch = useDispatch();

  const handleChangeFile = (e) => {
    const content = e.target.files[0];
    setImage(content);
  };
  const handleChangeName = (e) => {
    const content = e.target.value;
    setName(content);
  };
  const handleChangePrice = (e) => {
    const content = e.target.value;
    setPrice(content);
  };
  const handleChangeCategory = (e) => {
    const content = e.target.value;
    setCategory(content);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    if(props.mode === 'edit') formData.append("id", id);
    formData.append("name", name);
    formData.append("price", price);
    if(image) formData.append("image", image);
    formData.append("category_id", category);
    if(props.mode === "edit"){
      dispatch(editProductsAPICreator(id,formData))
    } else{
      dispatch(addProductsAPICreator(formData));
    }
    
  };
  //   useEffect(() => {
  //     if (isPostFulFilled) {
  //       dispatch(getProductsAPICreator(""));
  //     }
  //   }, [isPostFulFilled]);
  return (
    <div className='modal-add-data'>
      <div className='content-wrapper'>
        <div className='modal-content'>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
              props.handleAddDataModal();
            }}>
            <div className='row'>
              <div className='col-12'>
                {props.mode ==='edit'
                  ?<h4>Sửa thông tin sản phẩm</h4>
                  :<h4>Thêm sản phẩm</h4>
                }
              </div>
            </div>
            <div className='row'>
              <div className='col-4'>Tên sp</div>
              <div className='col-8'>
                <input
                  className='input-name'
                  name='name'
                  type='text'
                  onChange={(e) => {
                    handleChangeName(e);
                  }}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col-4'>Ảnh minh hoạ</div>
              <div className='col-8'>
                <input
                  className='input-image'
                  type='file'
                  name='image'
                  onChange={(e) => {
                    handleChangeFile(e);
                  }}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col-4'>Đơn giá</div>
              <div className='col-8'>
                <input
                  className='input-price'
                  type='number'
                  name='price'
                  onChange={(e) => {
                    handleChangePrice(e);
                  }}
                />
              </div>
            </div>

            <div className='row'>
              <div className='col-4'>Danh mục</div>
              <div className='col-8'>
                <select
                  name='category'
                  placeholder='Category'
                  onChange={(e) => {
                    handleChangeCategory(e);
                  }}>
                  <optgroup label='Category'>
                    <option value='1' selected>
                      Cơm
                    </option>
                    <option value='2'>Bún</option>
                    <option value='2'>Phở</option>
                  </optgroup>
                </select>
              </div>
            </div>
            <div className='row'>
              <div className='col-6'></div>
              <div className='col-6 d-flex justify-content-between align-items-center align-items-center'>
                <button
                  className='btn-cancel'
                  onClick={props.handleAddDataModal}>
                  Huỷ bỏ
                </button>
                <button className='btn-add'>Thêm</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddData;
