import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
import finhub from '../Api/finhub';

const StockDetailPage = () => {
  const [chartData, setChartData]= useState;
  const {stoksymbol} = useParams();

useEffect(()=>{
  const fetchData = async ()=>{

    const date = new Date()
    const currentTime= Math.floor(date.getTime()/1000)
    let OneDay;
    if(date.getDay() === 6){
         OneDay=currentTime - 2*24*60*60;
    }else if(date.getDay() === 0){
      OneDay= currentTime - 3*24*60*60;
    } else {
       OneDay= currentTime - 24*60*60;
    }
    const OneWeek = currentTime - 7 * 24 * 60 *60
    const OneYear = currentTime - 365* 24* 60 *60


  const responses = await Promise.all([

       finhub.get("/stock/candle",{
      params:{
        symbol:stoksymbol ,
        from: OneDay,
        to: currentTime,
        resolution: 30
      }  
    }),finhub.get("/stock/candle",{
      params:{
        symbol:stoksymbol ,
        from: OneWeek,
        to: currentTime,
        resolution: 60 
      }  
    }),finhub.get("/stock/candle",{
      params:{
        symbol:stoksymbol ,
        from: OneYear,
        to: currentTime,
        resolution: "w" //in aweek
      }  
    })
    
  ])
         
    console.log(responses)
  }
  fetchData()
},[])





  return (
  <>
  {stoksymbol}
 </>
    
  )
}



export default StockDetailPage;
//7 25 :42 sec