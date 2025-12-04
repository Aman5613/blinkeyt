import {toast} from 'react-hot-toast';
import insatance from './axios';
import summary from '../common/summaryAPI';

const uploadImage = async (image) => {
    try {
        const formdata = new FormData();
        formdata.append('image', image);

        const response = await insatance({
          ...summary.uploadImage,
          data: formdata,
        });

        return response;
        
    } catch (error) {
        return toast.error("Image upload failed" + error.message);
    }
}

export default uploadImage;