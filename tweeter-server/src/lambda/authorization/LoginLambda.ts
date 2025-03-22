import { LoginRequest, AuthPassResponse } from 'tweeter-shared';
import { AuthService } from '../../model/service/AuthService';

export const handler = async (request:LoginRequest): Promise<AuthPassResponse> => {

    // NOTE RIGHT NOW, THERE IS NO WAY TO FAIL THE LOGIN CHECK BUT IN THE FUTURE, ADD THAT FUNCATIONALITY
    const authService = new AuthService();
    const [user, authToken] = await authService.login(request.alias, request.password);

    return {
        success: true,
        message: 'Login successful',
        valid: true, // THIS WOULD BE FALSE IF LOGIN FAILED
        user: user.dto,
        authToken: authToken.dto
    }
}