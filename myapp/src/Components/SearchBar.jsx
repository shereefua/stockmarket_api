import {useEffect, useState,useContext} from 'react'
import finnHub from '../Api/finhub';//contains (axios+baseurl+token)
import { useGloabalContext } from '../context/4watchlist';

const SearchBar = () => {

const [SearchBar,setSearchBar]= useState('');//controls the search bar
const [results,setResults]= useState([]);//to store the data frm api
const {addStock}=useGloabalContext()



//logic for displying list of sugetion when the user types in the search bar
const renderDropDown=()=>{
  const dropdown= SearchBar ? "show": null
  return(
    <ul style={{height:'500px', overflowY:'scroll' , overflowx:"hidden", cursor:"pointer"}}
    className={`dropdown-menu ${dropdown}`}>
        {results.map((e)=>{
          return(
            <li onClick={()=>{
              addStock(results.symbol) 
              setSearchBar('')
            } } key={e.symbol} className='dropdown-item'>{e.description} ({e.symbol}) ,{e.type}</li>
          )})}
    </ul>
  )
}


useEffect(()=>{
  let isMounted= true;//mounting.
  //runs when the component mounts.
  const fetchData= async ()=>{
    try {
      const response = await finnHub.get("/search",{//makes a GET request to the /search endpoint api inorder to get the data
        params:{
          q: SearchBar //q, is query parameter of api which is used to search for a specific stock,
        }
      })
      console.log(response)

      setResults(response.data.result)//data.result , is the array of objects which contains the data of the stock

    } catch (error) {
          console.error(error);

    }
  }
  if (SearchBar.length > 0 ) {
     fetchData() ;//only runs when the search bar is not empty
  }else(
    setResults([])//bcoz when the usr input is empty, the results array  also should be empty
  )
 return ()=> (isMounted=false)
},[SearchBar]);//this usefect will only runs when search changes





  return (
   <section className='w-50 p-5 rounded mx-auto'>
    <div className='form-floating dropdown'>
      <input 
      style={{backgroundColor: 'ivory'}}
      type="text"
      className='form-control' 
      id='search' 
      placeholder='search'
      autoComplete='off'
      value={SearchBar}
      onChange={(e)=> setSearchBar(e.target.value) }
      ></input>

      <label htmlFor='search'>Search</label>

      {/*
      this part will only show when searchbar having any input value, so its on the function above
       <ul className='dropdown-menu '>
        <li>w</li>
        <li>w</li>
        <li>x</li> 
      </ul> */}
      {renderDropDown()}
    </div>
   </section>
  )
}

export default SearchBar;