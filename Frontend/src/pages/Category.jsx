import React, { useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'

const Category = () => {
  const [openModel, setopenModel] = useState(false);
  return (
    <section>
      <div className='p-2 shadow-md flex justify-between items-center'>
        <h2 className='font-bold '>Category</h2>
        <button className='px-2 py-1 rounded bg-yellow-500 hover:bg-yellow-600 font-semibold cursor-pointer active:scale-97' onClick={() => setopenModel(!openModel)}>Add Category</button>
      </div>
      {
        openModel && <UploadCategoryModel close = {() => setopenModel(false)}/>
      }
    </section>
  )
}

export default Category