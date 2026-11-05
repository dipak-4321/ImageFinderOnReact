import { useEffect, useState } from "react"
import axios from 'axios'
const API_KEY = "Ca49nGaAFttdh1w2mNS9-VE0-f2pK-7MP5CBNAvYqAc"

const App = () => {
  const [photos, setPhotos] = useState([])
  const fetchImage = async ()=>{
        const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          headers: {
            Authorization: `Client-ID ${API_KEY}`
          },
          params: {
            query: "girl",
            page: 1,
            per_page: 12
          }
        }
      )
    console.log(response);
    setPhotos(response.data.results)
    
  }

  useEffect(()=>{
    fetchImage()
  },[])

  return (
    <div className=" bg-gray-300 py-3">
      <div className="flex flex-col items-center gap-15 ">
        <h1 className="text-4xl font-bold text-fuchsia-600 flex items-center  "><span className="mb-1.5 mr-1">📸 </span>  Image Finder</h1>
        <div className="mb-4">
          <input type="text" placeholder="Enter the Image name" className="outline-none bg-white rounded-l-sm px-2 h-10  w-[330px] text-fuchsia-600 "/>
          <button className="bg-fuchsia-500 hover:bg-fuchsia-600 active:scale-105 text-white px-3 rounded-r-sm h-10 w-[110px] font-bold">Search</button>
        </div>
      </div>
      <div className=" grid grid-cols-4 gap-5  p-8 pl-15  ">
        {photos.map((photo,idx)=>(
          <div className="h-60 w-70 my-2  flex flex-col items-center " key={idx}>

           <div className="h-50 w-60  rounded-2xl">
            <img src={photo.urls.small} className="h-full rounded-2xl" alt="image not found" />
            </div > 
            <div className="my-3  ">
             <p className="font-medium capitalize text-center mb-3" >Dipak</p>
             <a target='#' className="py-1 px-3 bg-fuchsia-500 hover:bg-fuchsia-600 border-none rounded  text-white active:scale-95">Download</a>
             </div>
          </div>
        ))

        }
      </div>
      <div className="text-center">
      <button className=" px-7 py-1.5 bg-fuchsia-500 hover:bg-fuchsia-600 active:scale-110 text-white font-medium rounded" >Load more</button>
      </div>
    </div>
  )
}

export default App