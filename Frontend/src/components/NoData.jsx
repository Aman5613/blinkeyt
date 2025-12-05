import nodata_img  from "../assets/no-data.gif"

const NoData = () => {
  return (
    <div className="flex justify-center items-center h-full">
        <h2 className='text-center font-semibold text-gray-500 mt-4'>
            <img src={nodata_img} alt="No Data" className=" w-48 h-48 object-contain"/>
            <br />
            No Data Found
        </h2>
    </div>
  )
}

export default NoData