import React, { useEffect,useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { connect, useSelector, useDispatch } from "react-redux";
import Edit from '../assets/image/edit.svg'
import Delete from '../assets/image/delete.svg'
import {getLevel} from '../utils/localstore'
import swal from 'sweetalert';
import {
  getProductsAPICreator,
  selectProductCreator,
  resetStatusCreator,
  deleteProductsAPICreator
} from "../redux/actions/products";
import {deleteProductsAPI} from '../utils/requestProducts'

const Main = (props) => {
  let { products, productsOrdered, isPending, statusPost } = useSelector(
    (state) => state.products
  );
  const [level_id] =useState(getLevel())
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsAPICreator(""));
  }, []);
  const notifyError = (mess) =>
    toast.error(mess||"Xin lỗi đơn hàng thất bại", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const notifySuccess = () =>
    toast.success("Hoàn tất đơn hàng", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  useEffect(() => {
    if (statusPost === 200) {
      notifySuccess();
      setTimeout(() => {
        dispatch(resetStatusCreator());
      }, 3000);
    } else if (statusPost === 500) {
      notifyError();
      setTimeout(() => {
        dispatch(resetStatusCreator());
      }, 3000);
    }
  }, [statusPost]);
  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      console.log(bottom);
    }
  };

  const onUpdateProduct = (product)=>{
    console.log('sua',product)
  }

  const onDelete = (product)=>{
    swal({
      title: "Xác nhận xoá sản phẩm",
      icon: "warning",
      dangerMode: true,
    })
    .then(res => {
      if (res) {
        handDelet(product.product_id)
      }
    });
  }
  const handDelet = (product_id)=>{
    deleteProductsAPI(product_id)
      .then((res)=>{
        console.log(res)
        if(res.status!==200) return notifyError("Đã xảy ra lỗi vui lòng thử lại sau ít phút");
        dispatch(getProductsAPICreator(""));
      })
  }
  return (
    <div className='main' onScroll={handleScroll}>
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
      {isPending ? (
        <h3 style={{ textAlign: "center" }}>Loading...</h3>
      ) : products.length ? (
        <div className='row'>
          {products.map((product, index) => {
            return (
              <div
                key={index.toString()}
                className='col-6 col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                <div className='card bg-transparent'>
                  <img
                    src={
                      product.product_image.split("")[0] === "/"
                        ? `${process.env.REACT_APP_API_URL}${product.product_image}`
                        : product.product_image
                    }
                    className='card-img-top'
                    alt=''
                  />

                  <div className='card-img-overlay'>
                    <label className='container1' title='Click for order'>
                      <input
                        type='checkbox'
                        value={product.product_id}
                        name={product.product_name}
                        onChange={(e) => {
                          dispatch(selectProductCreator(e));
                        }}
                        checked={
                          productsOrdered.find((item) => {
                            return item.product_id === product.product_id;
                          })
                            ? true
                            : false
                        }
                      />
                      <span className='checkmark'></span>
                    </label>
                  </div>

                  <div className='card-body d-flex justify-content-between'>
                    <div>
                      <p className='card-title'>{product.product_name}</p>
                      <p className='card-text'>{product.product_price} VNĐ</p>
                    </div>
                    {level_id==1?
                        (
                          <div className="d-flex align-items-center">
                            {/* <img 
                              src={Edit} alt="Edit" 
                              className="w-15px mx-2" 
                              style={{fill:"#FFC107"}}
                              onClick={onUpdateProduct.bind(this,product)}
                            ></img> */}
                            <img 
                              src={Delete} alt="Delete"
                              className="w-15px "
                              style={{fill:"#DC3545", cursor: "pointer"}}
                              onClick={onDelete.bind(this,product)}
                            ></img>
                          </div>
                        ) :(
                          null
                        )
                    }
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h3 style={{ textAlign: "center" }}>Trống</h3>
      )}
    </div>
  );
};

export default Main;
