import { UserService } from './user/user.service';
import { AdvertisementService } from './advertisement/advertisement.service';
import { HttpClientService } from './http-client.service';
import { AuthService } from './authentication/auth.service';


export const allServices = [ HttpClientService, AuthService, AdvertisementService, UserService ]