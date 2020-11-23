import React ,{useState,useEffect} from "react";
import Chart from "./Chart";
import { useSelector } from "react-redux";
import RecentOrder from "./RecentOrder";
import {getLevel} from "../utils/localstore"
import moment from "moment"

const MainHistory = (props) => {
  const { dataGetOrder } = useSelector((state) => state.products);
  console.log(dataGetOrder)
  const [numberOrderOnDay,setNumberOrderOnDay] = useState(0);
  const [numberOrderOnMonth,setNumberOrderOnMonth] = useState(0);
  const [numberOrderOnYear,setNumberOrderOnYear] = useState(0);
  const [priceOrderOnDay,setPriceOrderOnDay] = useState(0);
  const [priceOrderOnMonth,setPriceOrderOnMonth] = useState(0);
  const [priceOrderOnYear,setPriceOrderOnYear] = useState(0);
  const getOrder = ()=>{
    let nOrderOnDay = 0;
    let nOrderOnMonth = 0;
    let nOrderOnYear = 0;
    let pOrderOnDay = 0;
    let pOrderOnMonth = 0;
    let pOrderOnYear = 0;
    for (let i = 0; i < dataGetOrder.length; i++) {
      const element = dataGetOrder[i];
      if(moment().isSame(element.order_date,"year")){
        nOrderOnYear++;
        pOrderOnYear+= element.total_price;
      }
      if(moment().isSame(element.order_date,"month")){
        nOrderOnMonth++;
        pOrderOnMonth+= element.total_price;
      } 
      if(moment().isSame(element.order_date,"day")){
        nOrderOnDay++;
        pOrderOnDay+= element.total_price;
      }
    }
    setNumberOrderOnDay(nOrderOnDay);
    setNumberOrderOnMonth(nOrderOnMonth);
    setNumberOrderOnYear(nOrderOnYear);
    setPriceOrderOnDay(pOrderOnDay);
    setPriceOrderOnMonth(pOrderOnMonth);
    setPriceOrderOnYear(pOrderOnYear);

  }

  useEffect(() => {
    getOrder()
  });

  return (
    <div id='main-history'>
      <div className='row'>
        <div className='col-12 col-sm-4'>
          <div className='card item1'>
            <div className='card-img-overlay'>
              <p className='card-text'>Hôm nay</p>
              <h5 className='card-text'>{numberOrderOnDay} đơn hàng</h5>
              <p className='card-text'>{priceOrderOnDay} VNĐ</p>
            </div>
          </div>
        </div>

        <div className='col-12 col-sm-4'>
          <div className='card item2'>
            <div className='card-img-overlay'>
              <p className='card-text'>Tháng {moment().format('MM')}</p>
              <h5 className='card-text'>{numberOrderOnMonth} đơn hàng</h5>
              <p className='card-text'>{priceOrderOnMonth} VNĐ</p>
            </div>
          </div>
        </div>
        <div className='col-12 col-sm-4'>
          <div className='card item3'>
            <div className='card-img-overlay'>
              <p className='card-text'>Năm {moment().format('YYYY')}</p>
              <h5 className='card-text'>{numberOrderOnYear} đơn hàng</h5>
              <p className='card-text'>{priceOrderOnYear} VNĐ</p>
            </div>
          </div>
        </div>
      </div>
      {getLevel()===1
        ?(
          <div className='row'>
            <div className='col-12'>
              <Chart />
            </div>
          </div>
        ):(
          null
        )
      }
      <RecentOrder />
    </div>
  );
}

export default MainHistory;
