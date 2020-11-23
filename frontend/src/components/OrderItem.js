//IMPORT LIBRARY
import React from "react";
import { connect } from "react-redux";
//IMPORT ACTIONS
import {
  cancelOrderCreator,
  changeQuantityCreator,
} from "../redux/actions/products";

class OrderItem extends React.Component {
  render() {
    return (
      <div className='sidebar scroll-hidden'>
        <div className='aside-items'>
          <h5 className='detail-order' id='order'>
            Detail Order
          </h5>
          {this.props.products.productsOrdered.map((item, index) => {
            return (
              <div key={index} id='item'>
                <div id='col1'>
                  <img
                    src={
                      item.product_image.split("")[0] === "/"
                        ? `${process.env.REACT_APP_API_URL}${item.product_image}`
                        : item.product_image
                    }
                    alt=''
                  />
                </div>
                <div id='col2'>
                  <h6>{item.product_name}</h6>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <button
                            style={{ outline: "none" }}
                            className='btn-num-order'
                            value={index}
                            id='min'
                            onClick={(e) => this.props.changeQuantity(e)}>
                            -
                          </button>
                        </td>
                        <td>{item.numOrder}</td>
                        <td>
                          <button
                            style={{ outline: "none" }}
                            className='btn-num-order'
                            value={index}
                            id='plus'
                            onClick={(e) => this.props.changeQuantity(e)}>
                            +
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div id='col3'>
                  {this.props.products.productsOrdered[index].product_price} VNĐ
                </div>
              </div>
            );
          })}
        </div>
        <div className='aside-bottom'>
          <div id='total-item'>
            <div id='total'>
              <h6>Tổng</h6>
            </div>
            <div id='total-value'>
              <h6>{this.props.products.totalPrice} VNĐ</h6>
            </div>
          </div>
          <button id='checkout' onClick={this.props.handleCheckOut}>
            In hoá đơn
          </button>
          <button id='cancel' onClick={() => this.props.cancelOrder()}>
            Xoá
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { products } = state;
  return { products };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeQuantity: (event) => {
      dispatch(changeQuantityCreator(event));
    },
    cancelOrder: () => {
      dispatch(cancelOrderCreator());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);
