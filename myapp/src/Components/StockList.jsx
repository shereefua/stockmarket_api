import React,{useEffect,useState} from 'react'
import finnHub from "../Api/finhub";//contains (axios+baseurl+token)
import { BsCaretDown , BsCaretUpFill} from "react-icons/bs";
import {useGloabalContext} from '../context/4watchlist';
import {useNavigate} from 'react-router-dom'

const StockList = () => {
    const [stocks,setStocks] = useState([]); //contains all of our stock data fetch
   // const [watchList, setWatchList] = useState(["GOOGL","MSFT","AMZN"]); //cutted this to conxtext for getting access to save the user input(which is search bar dropdown items)
    const {watchList} = useGloabalContext();//destructerd
    const navigate = useNavigate();

 //for changing the color and icon of the stock price
    const changeStokcolor= (chg)=>{
      return chg > 0 ? "success" : "danger";

    };
    const renderIcon=(chg)=>{
      return chg > 0 ? <BsCaretUpFill/> : <BsCaretDown/>
    };


   useEffect(()=>{
      
    const fetchData= async()=>{
      let isMounted= true;//mounting
      try {                       
        const response = await Promise.all(
           watchList.map((e)=>{
            return finnHub.get("/quote",{//qute is an end point. frm api 
                params:{
                    symbol:e
                }
            })

           }))

       console.log(response);//NOW WE GET ALL DATA FRM API,THRU AXIOS RESPNSE,BUT WE ONLY NEED TO DISPLAY (DATA=CHART) AND THE (SYMBOL=GOOGL);SO,WE NEED TO FILTER THE RESPONSE BEFORE SENDING IT TO STOCK STATE

       //extracting data AND symbol from axios response, returning as an object
    const frshData= response.map((e)=>{
          return{ 
            data: e.data,//data is a proprties of api dtabse
            symbol: e.config.params.symbol//itereates through the array and returns the symbol which we only need to display
          }    
       })
      // console.log(frshData)//succefuly we get extracted data and symbol only
    
  
        if(isMounted){
           setStocks(frshData);//appending into stock variable,
        }//5.48 error chnce else

      } catch (error) {
        console.error(error);
        alert("error occured")


      }

       return ()=> (isMounted=false)
    };
    
     fetchData()

     },[watchList])//usefect wil only run when the copnonent mounts, after it wont run, but we need to run when every time watchlist updateso we aded to dpndncy array
     

  const handleStockSelect=(stokname)=>{
      navigate(`detail/${stokname}`)
  }





  return (
<section >
  <table className='table hover mt-3'>
    <thead style={{color: "rgb(79,89,102)"}}>
      <tr>
        <th scope="col" >name</th>
         <th scope="col" >last</th>
         <th scope="col">chg</th>
         <th scope="col">chg</th>
          <th scope="col" >high</th>
          <th scope="col" >low</th>
          <th scope="col">open</th>
          <th scope="col">pclose</th>
      </tr>  
    </thead>
    <tbody>
      {stocks.map((e)=>{
        return(
      <tr style={{cursor:'pointer'}} onClick={()=> handleStockSelect(e.symbol) } className='table-row' key={e.symbol}>
        <th scope="row">{e.symbol}</th>
        <td  >{e.data.c}</td>
        <td className={`text-${changeStokcolor(e.data.d)}`}>{e.data.d} {renderIcon(e.data.d)}</td>
        <td className={`text-${changeStokcolor(e.data.dp)}`}>{e.data.dp} {renderIcon(e.data.dp)}</td>
        <td  scope="row">{e.data.h}</td>
        <td  scope="row">{e.data.l}</td>
        <td  scope="row">{e.data.o}</td>
        <td  scope="row">{e.data.pc}</td>
      </tr> 
        )
      })}
      
    </tbody>
  </table>
 
</section>

     
  )
}

export default StockList;