import { AuthService } from "../model/service/AuthService"

const main = async () => {
    let service = new AuthService();

    const val = await service.register("John", "Doe", "johndoe", "password", new Uint8Array(0), "png");

    console.log(val)
}

main();