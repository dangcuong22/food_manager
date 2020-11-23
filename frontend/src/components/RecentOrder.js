import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrderAPICreator,getOrderCustomerAPICreator } from "../redux/actions/products";
import { getLevel} from '../utils/localstore';
import moment from "moment";

const RecentOrder = () => {
  const convertDates = (time) => {
    let month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let dates = time.substring(0, 10).split("-");
    return `${dates[2]} ${month[Number(dates[1]) - 1]} ${dates[0]}`;
  };
  function formatMoney(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const { dataGetOrder } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    if(getLevel()===1){
      dispatch(getAllOrderAPICreator());
    } else{
      dispatch(getOrderCustomerAPICreator());
    }
    
  }, []);
  return (
    <div className='row'>
      <div
        className='col info-table'
        style={{
          margin: "10px 15px",
          paddingLeft: "40px",
          paddingBottom: "40px",
        }}>
        <h6 style={{ fontWeight: "bold" }}>Đơn hàng đã đặt</h6>
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <th style={{ width: "15%" }}>Hoá đơn</th>
              <th style={{ width: "15%" }}>Tên khách hàng</th>
              <th style={{ width: "15%" }}>Ngày đặt</th>
              <th style={{ width: "40%" }}>Món ăn</th>
              <th style={{ width: "15%" }}>Tổng tiền</th>
            </tr>
            {dataGetOrder.map((item, index) => {
              return (
                <tr
                  key={index.toString()}
                  style={{
                    verticalAlign: "top",
                    borderBottom: "1px",
                    borderBottomColor: "black",
                  }}>
                  <td>
                    #
                    {item.order_date.substring(0, 8).split("-").join("") +
                      item.order_id}
                  </td>
                  <td>{item.name}</td>
                  <td>{moment(item.order_date).format("HH:mm DD/MM/YYYY")}</td>
                  <td>{item.product_order}</td>
                  <td>{formatMoney(item.total_price)} VNĐ</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrder;
