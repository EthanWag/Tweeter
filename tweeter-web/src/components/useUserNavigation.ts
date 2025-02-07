import { AuthToken, User } from "tweeter-shared";
import useToastListener from "./toaster/ToastListenerHook";
import useUserInfo from "./useUserInfo";


const useUserNavigation = (fetchUser:(alias: string) => Promise<User | null>) => {

    const { setDisplayedUser, currentUser, authToken } = useUserInfo();
    const { displayErrorMessage } = useToastListener();

    const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
        event.preventDefault();
    
        try {
          const alias = extractAlias(event.target.toString());
    
          const user = await getUser(authToken!, alias);
    
          if (!!user) {
            if (currentUser!.equals(user)) {
              setDisplayedUser(currentUser!);
            } else {
              setDisplayedUser(user);
            }
          }
        } catch (error) {
          displayErrorMessage(`Failed to get user because of exception: ${error}`);
        }
      };

    const extractAlias = (value: string): string => {
        const index = value.indexOf("@");
        return value.substring(index);
    };
    
    const getUser = async (
      authToken: AuthToken,
      alias: string
    ): Promise<User | null> => {
      return fetchUser(alias);
    };
    return {navigateToUser};
}

export default useUserNavigation;