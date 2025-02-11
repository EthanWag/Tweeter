import { Buffer } from "buffer";
import { UserService } from "../model/service/UserService";
import { AccountPresenter, AccountView } from "./AccountPresenter";



export class RegisterPresenter extends AccountPresenter {
    
    private userService : UserService;
    private firstName: string;
    private lastName: string;
    private imageUrl: string;
    private imageFileExtension: string;

    public constructor(
        view: AccountView,
        alias: string,
        password: string,
        firstName: string,
        lastName: string,
        imageUrl: string,
        imageFileExtension: string
    ){
        super(view, alias, password); // pass the isloading function here
        this.firstName = firstName;
        this.lastName = lastName;
        this.imageUrl = imageUrl;
        this.imageFileExtension = imageFileExtension;
        this.userService = new UserService();
    }

    public  checkSubmitButtonStatus(): boolean {
        return (
            !this.firstName ||
            !this.lastName ||
            !super.alias ||
            !super.password ||
            !this.imageUrl ||
            !this.imageFileExtension
        );
    };

    public async doRegister(rememberMe: boolean, imageBytes: Uint8Array) {
        try {
            this.view.setIsLoading(true);

            const [user, authToken] = await this.userService.register(
            this.firstName,
            this.lastName,
            this.alias,
            this.password,
            imageBytes,
            this.imageFileExtension
            );

            this.view.updateUserInfo(user, user, authToken, rememberMe);
            this.view.navigate("/");
        } catch (error) {
            this.view.displayErrorMessage(
            `Failed to register user because of exception: ${error}`
            );
        } finally {
            this.view.setIsLoading(false);
        }
    };

    public handleImageFile (
        file: File | undefined,
        setImageUrl: (url: string) => void,
        setImageBytes: (bytes: Uint8Array) => void,
        setImageFileExtension: (fileExtension: string) => void
        ) {
        if (file) {
            setImageUrl(URL.createObjectURL(file));

            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
            const imageStringBase64 = event.target?.result as string;

            // Remove unnecessary file metadata from the start of the string.
            const imageStringBase64BufferContents =
                imageStringBase64.split("base64,")[1];

            const bytes: Uint8Array = Buffer.from(
                imageStringBase64BufferContents,
                "base64"
            );

            setImageBytes(bytes);
            };
            reader.readAsDataURL(file);

            // Set image file extension (and move to a separate method)
            const fileExtension = this.getFileExtension(file);
            if (fileExtension) {
            setImageFileExtension(fileExtension);
            }
        } else {
            setImageUrl("");
            setImageBytes(new Uint8Array());
        }
    };

    public getFileExtension(file: File): string | undefined {
        return file.name.split(".").pop();
    };
}