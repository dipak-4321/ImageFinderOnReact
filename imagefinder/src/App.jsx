import { useEffect, useState } from "react"
import axios from 'axios'
import { Helix } from "ldrs/react";
import "ldrs/react/Helix.css";
const API_KEY = "Ca49nGaAFttdh1w2mNS9-VE0-f2pK-7MP5CBNAvYqAc"

const App = () => {
  const [photos, setPhotos] = useState([])
  const [userinput, setUserinput] = useState('girl')
  const [q, setQ] = useState('girl')
  const [loader, setLoader] = useState(false)
  const fetchImage = async ()=>{
        try{
        setLoader(true)
        const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          headers: {
            Authorization: `Client-ID ${API_KEY}`
          },
          params: {
            query: q,
            page: 1,
            per_page: 12
          }
        }
      )
    console.log(response);
    setPhotos(response.data.results)
    }
    catch(error){
      console.log(error)
  
    }
    finally{
      setLoader(false)
    }
    
  }
  const setUserInputValue = (value)=>{
      setUserinput(value)
  }

  useEffect(()=>{
    fetchImage()
  },[q])

  return (
    <div className=" bg-gray-300 py-3 min-h-screen ">
      {loader && <div className="h-screen w-full flex justify-center items-center"> <Helix size={50} color="blue" /> </div>}
      <div className="flex flex-col items-center gap-15 ">
        <h1 className="text-4xl font-bold text-fuchsia-600 flex items-center  "><span className="mb-1.5 mr-1">📸 </span>  Image Finder</h1>
        <div className="mb-4">
          <input value={userinput} onChange={(e)=>{
            setUserInputValue(e.target.value)
          }} type="text" placeholder="Enter the Image name" className="outline-none bg-white rounded-l-sm px-2 h-10  w-[330px] text-fuchsia-600 "/>
          <button onClick={()=>{
            setQ(userinput)
          }} className="bg-fuchsia-500 hover:bg-fuchsia-600 active:scale-105 text-white px-3 rounded-r-sm h-10 w-[110px] font-bold">Search</button>
        </div>
      </div>
      <div className=" grid grid-cols-4 gap-5  p-8 ">
        {photos.map((photo,idx)=>(
          <div className="h-90 w-70  flex flex-col items-center my-1" key={idx}>

           <div className="h-60 w-60 hover:scale-110 hover:border-2 hover:border-fuchsia-500 hover:mb-2 rounded-2xl ">
            <img src={photo.urls.small} className="h-full w-full object-cover rounded-2xl "   alt={photo.alt_description}  key={photo.id} />
            </div > 
            <div className="my-3 flex flex-col items-center">
             <p className="font-medium text-2xl text-center capitalize mb-3" >{photo.user.name}</p>
             <a  href={photo.links.download} target="_blank" className="py-1 px-3 bg-fuchsia-500 hover:bg-fuchsia-600 border-none rounded  text-white active:scale-95">Download</a>
             </div>
          </div>
        ))

        }
      </div>
      
      <div className="text-center">
      <button className=" px-7 py-1.5 bg-fuchsia-500 hover:bg-fuchsia-600 active:scale-110 text-white font-medium rounded " >Load more</button>
      </div>
    </div>
  )
}

export default App