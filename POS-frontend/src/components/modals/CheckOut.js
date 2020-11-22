import React from "react";
import { connect } from "react-redux";
import {
  postOrderAPICreator,
  toastPostOrderCreator,
} from "../../redux/actions/products";

class CheckOut extends React.Component {
  constructor(props) {
    super(props);
    this.idOrder = Math.floor(Math.random()*1000000000);
  }
  componentDidUpdate = () => {
    
    if (this.props.products.statusPost === 200) {
      this.props.handleCheckOut();
    } else if (this.props.products.statusPost === 500) {
      this.props.handleCheckOut();
    }
  };
  handlePostOrder = () => {
    let products = this.props.products.productsOrdered.map((item) => {
      return item.product_name;
    });
    let quality = this.props.products.productsOrdered.map((item) => {
      return item.numOrder;
    });
    let total =
      Number(this.props.products.totalPrice) +
      0.1 * Number(this.props.products.totalPrice);
    let body = {
      user: Number(localStorage.getItem("user_id")),
      product_order: `${products}`,
      quality_order: `${quality}`,
      total_price: total
    };
    this.props.postOrder(body);
    // setTimeout(this.props.cancelToastPostOrder, 5000);
  };
  calcTotalPrice(){
    return Number(this.props.products.totalPrice)
  }
  render() {
    return (
      <div className='modal'>
        <div className='content-wrapper'>
          <div className='modal-content'>
            <button
              style={{ outline: "none" }}
              onClick={this.props.handleCheckOut}
              type='button'
              className='close text-right'
              data-dismiss='modal'
              aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
            <div className='row'></div>
            <div className='row'></div>
            <div className='row'>
              <div className='col'>Mã đơn hàng</div>
              <div className='col'>ID:#{this.idOrder}</div>
            </div>
            <div className='row row-cashier'>
              <div className='col col-cashier'>
                Tài khoản khách hàng : {localStorage.getItem("name")}
              </div>
              <div className='col'></div>
            </div>
            {this.props.products.productsOrdered.map((item, index) => {
              return (
                <div key={index.toString()} className='row'>
                  <div className='col'>
                    {item.product_name} {item.numOrder}x
                  </div>
                  <div className='col'>{item.product_price} VNĐ</div>
                </div>
              );
            })}
            <div className='row mt-3'>
              <div className='col'></div>
              <div className='col'>
                Tổng:{" "}
                {this.calcTotalPrice()} VNĐ{" "}
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <button
                type='submit'
                id='ship'
                className='btn button-print px-3 mx-3'
                onClick={() => {
                  return this.handlePostOrder();
                }}>
                {this.props.products.isPostPending ? (
                  <i className='fa fa-spinner fa-spin fa-2x fa-fw'></i>
                ) : (
                    "Xác nhận"
                  )}
              </button>
              {/* <button
                id='go-to-store'
                className='btn button-print px-3 mx-3'
                onClick={() => {
                  return this.handlePostOrder();
                }}>
                {this.props.products.isPostPending ? (
                  <i className='fa fa-spinner fa-spin fa-2x fa-fw'></i>
                ) : (
                    "Đến lấy"
                  )}
              </button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { products } = state;
  return { products };
};
const mapDispatchToProps = (dispacth) => {
  return {
    postOrder: (body) => {
      dispacth(postOrderAPICreator(body));
    },
    cancelToastPostOrder: () => {
      dispacth(toastPostOrderCreator());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);
