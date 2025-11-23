import insatance from "../utils/axios";
import summary from "../common/summaryAPI";

const getuserdetails = async () => {
  try {
    const user = await insatance({ ...summary.getuserDetails });
    return user.data.user;
  } catch (error) {
    return error;
  }
};

export default getuserdetails;
