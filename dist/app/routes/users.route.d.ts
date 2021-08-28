import { UsersFacade } from '../facade/users.facade';
import { ResponseModel } from '../../submodules/Portfolio-Platform-Common/ResponseModel';
import { UsersDto } from '../../submodules/Portfolio-Platform-Dtos/usersDto';
import { RequestModel } from '../../submodules/Portfolio-Platform-Common/RequestModel';
export declare class UsersRoutes {
    private usersFacade;
    constructor(usersFacade: UsersFacade);
    private sns_sqs;
    private topicArray;
    private serviceName;
    onModuleInit(): void;
    allUsers(): Promise<ResponseModel<UsersDto>>;
    createUsers(body: RequestModel<UsersDto>): Promise<ResponseModel<UsersDto>>;
    updateUsers(body: RequestModel<UsersDto>): Promise<ResponseModel<UsersDto>>;
    deleteUsers(body: RequestModel<UsersDto>): Promise<ResponseModel<UsersDto>>;
}
