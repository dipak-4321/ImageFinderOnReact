import { useEffect, useState } from "react"
import axios from 'axios'
import { Helix } from "ldrs/react";
import "ldrs/react/Helix.css";
const API_KEY = "Ca49nGaAFttdh1w2mNS9-VE0-f2pK-7MP5CBNAvYqAc"

const App = () => {
  const [photos, setPhotos] = useState([])
  const [userinput, setUserinput] = useState('nature')
  const [userQuery, setUserQwery] = useState('nature')
  const [loader, setLoader] = useState(false)
  const [page,setPage] = useState(1)
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
            query: userQuery,
            page: page,
            per_page: 12
          }
        }
      )
    console.log(response);
    setPhotos( [ ...photos,...response.data.results])
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
  const loadMore = ()=>{
    setPage(page+1)
    
  }
  useEffect(()=>{
    fetchImage()
  },[userQuery,page])

  return (
    <div className=" bg-gray-300 py-3 min-h-screen ">

      <div className="flex flex-col items-center gap-15 ">
        <h1 className="md:text-4xl text-2xl font-bold text-fuchsia-600 flex items-center  "><span className="mb-1.5 mr-1">📸 </span>  Image Finder - {userQuery}</h1>
        <div className="mb-4">
          <input 
             value={userinput} 
             onChange={(e)=>{
            setUserInputValue(e.target.value)
          }} type="text" placeholder="Enter the Image name" className="outline-none bg-white rounded-l-sm px-2 h-10  md:w-[330px] w-40 text-fuchsia-600 "/>
          <button onClick={()=>{
            if(userQuery === userinput)return
            setPhotos([])
            setPage(1)
            setUserQwery(userinput.trim())
          }} className="bg-fuchsia-500 hover:bg-fuchsia-600 active:scale-105 text-white px-3 rounded-r-sm h-10 w-[110px] font-bold">Search</button>
        </div>
      </div>
      <div className=" grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 place-items-center p-8  ">
        {photos.map((photo,idx)=>(
          <div className="h-90 w-70  flex flex-col items-center my-1" key={idx}>

           <div className="h-60 sm:w-60 w-90 hover:scale-110 hover:border-2 hover:border-fuchsia-500 hover:mb-2 rounded-2xl ">
            <img src={photo.urls.small} className="h-full w-full object-cover rounded-2xl "   alt={photo.alt_description}  key={photo.id} />
            </div > 
            <div className="my-3 flex flex-col items-center">
             <p className="font-medium text-2xl text-center capitalize mb-3" >{photo.user.name}</p>
             <a  href={photo.links.download} target="_blank" className="py-1 md:px-3 px-10 bg-fuchsia-500 hover:bg-fuchsia-600 border-none rounded  text-white active:scale-95">Download</a>
             </div>
          </div>
        ))

        }

      </div>
            {loader && (<div className="h-screen w-full flex justify-center items-center"> <Helix size={50} color="blue" /> </div>)}
      
      <div className="text-center">
      <button className=" px-7 py-1.5 bg-fuchsia-500 hover:bg-fuchsia-600 active:scale-110 text-white font-medium rounded " onClick={()=>{
        loadMore()
      }}>Load more</button>
      </div>
    </div>
  )
}

export default App