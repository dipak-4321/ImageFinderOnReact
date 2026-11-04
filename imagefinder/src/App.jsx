
const App = () => {
  return (
    <div className=" bg-gray-300 pt-2">
      <div className="flex flex-col items-center gap-15 ">
        <h1 className="text-4xl font-bold text-fuchsia-700 ">Image Finder</h1>
        <div className="mb-4">
          <input type="text" placeholder="Enter the name " className="bg-white rounded-l-sm px-2 h-10 w-[330px] "/>
          <button className="bg-fuchsia-500 text-white px-3 rounded-r-sm h-10 w-[110px] font-bold">Search</button>
        </div>
      </div>
      <div className=" grid grid-cols-4 gap-5  p-8 pl-15  ">
        {Array(12).fill(0).map((elem,idx)=>(
          <div className="h-50 w-60 bg-white rounded-2xl"></div>
        ))

        }
      </div>
    </div>
  )
}

export default App