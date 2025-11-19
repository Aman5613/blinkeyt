import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className='border-t border-gray-300 '>
      <div className='container mx-auto p-4  text-center flex flex-col md:flex-row md:justify-between md:items-center'>
        <p>© 2025 grabNgo All rights reserved.</p>
        <div className=" text-center">
          <a href="">
            <FaFacebook className='inline mr-4 text-2xl hover:text-blue-600' />
          </a>
          <a href="">
            <FaTwitter className='inline mr-4 text-2xl hover:text-blue-400' />
          </a>
          <a href="">
            <FaInstagram className='inline text-2xl hover:text-pink-500' />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer