import { RegisterRequest, AuthPassResponse, ImageCompressor } from 'tweeter-shared';
import { AuthService } from '../../model/service/AuthService';

export const handler = async (request:RegisterRequest): Promise<AuthPassResponse> => {

    // get request userImage from the api
    const compressor = new ImageCompressor();
    const byteArray = compressor.openImage(request.userImageBytes);


    const authService = new AuthService();
    const [user, authToken] = await authService.register(
        request.firstName,
        request.lastName,
        request.alias,
        request.password,
        byteArray,
        request.imageFileExtension
    );

    return {
        success: true,
        message: 'register successful',
        valid: true, // THIS WOULD BE FALSE IF THE REGISTER DIDN'T GO WELL FAILED
        user: user.dto,
        authToken: authToken.dto
    }
}