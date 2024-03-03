import React, { useState } from 'react'
import './Weather.scss'

const Weather = () => {
    const[search , setSearch] = useState("")
    const[weather , setWeather] = useState({})
    const[location , setLocation] = useState({})
    const api = {
        key:"e585caaf2efbd9da7db7e3a784746b37",
        base:"https://api.openweathermap.org/data/2.5/weather"
    }
   
    function handleSearch() {
        
        fetch(`${api.base}?q=${search}&units=metric&APPID=${api.key}`)
        .then(res=>res.json())
        .then(d=>setWeather(d))
    }

    function loc() {
       navigator.geolocation.getCurrentPosition(d=>setLocation(d))
        let lat=location.coords.latitude
        let lon= location.coords.longitude
        fetch(`${api.base}?lat=${lat}&lon=${lon}&units=metric&APPID=${api.key}`)
        .then(res=>res.json())
        .then(d=>setWeather(d))
    }
 function handleEnter( e) {
    if(e.key==="Enter"){
        handleSearch()
    }
 }
       
  return (
    <div className='container'>
        <section className='box' > 
        <input  type="search" spellCheck="false" name=""  placeholder='Enter Location' onChange={(e)=>setSearch(e.target.value)} 
        onKeyDown={(e)=>{handleEnter(e)}}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={loc}>get Location</button>

        {(typeof weather.main!=="undefined")?(
            <div className='sub-box'>
               <p><b>Location : </b> {weather.name}</p>
               <p> <b>Temperature : </b>{weather.main.temp}</p>
               <p> <b>Weather : </b>{weather.weather[0].description}</p>
            </div>

        ):("Not Defined")}
        </section>
      
    </div>
  )
}

export default Weather