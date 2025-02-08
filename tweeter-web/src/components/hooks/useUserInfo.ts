import { useContext } from "react";
import { UserInfoContext } from "../userInfo/UserInfoProvider";

const useUserInfo = () => {
    const { currentUser, authToken, displayedUser, setDisplayedUser, clearUserInfo,updateUserInfo} = useContext(UserInfoContext)
    return {currentUser, authToken, displayedUser, setDisplayedUser, clearUserInfo,updateUserInfo};
}

export default useUserInfo;
