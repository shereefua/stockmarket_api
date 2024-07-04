

import React, { useContext,useState } from 'react';

const BananaContext= React.createContext();

const Rootcomopnent=({children})=>{

    const [watchList, setWatchList] = useState(["GOOGL","MSFT","AMZN"]);

//logic for adding the stock
    const addStock =(estock)=>{
        if(watchList.indexOf(estock) === -1){
          setWatchList([...watchList,estock])
        }
      };
//logic for removing the stock
      const deleteStock=(estock)=>{
        setWatchList(watchList.filter((e)=>{
            return e !== estock
        }))
      }

    return(
        <BananaContext.Provider value={{watchList,addStock}}>
            {children}
        </BananaContext.Provider>
    )
}

//3rd,setting up a custom hook for make it simple
const useGloabalContext = ()=>{
    return useContext(BananaContext)
}

export {BananaContext,Rootcomopnent,useGloabalContext }

