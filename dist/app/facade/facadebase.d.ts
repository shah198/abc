import { DtoBase } from "../../submodules/Portfolio-Platform-Dtos/DtoBase/dtobase";
import AppService from "../../submodules/Portfolio-Platform-Service/AppServiceBase";
import { EntityBase } from "../../submodules/Portfolio-Platform-Entities/EntityBase/entitybase";
import { RequestModel } from "../../submodules/Portfolio-Platform-Common/RequestModel";
import { ResponseModel } from "../../submodules/Portfolio-Platform-Common/ResponseModel";
export default class FacadeBase<TEntity extends EntityBase, TDto extends DtoBase> {
    private service;
    private appService;
    constructor(service: AppService<TEntity, TDto>);
    getAll(): Promise<ResponseModel<TDto>>;
    create(body: RequestModel<TDto>): Promise<ResponseModel<TDto>>;
    update(body: RequestModel<TDto>): Promise<ResponseModel<TDto>>;
    deleteById(body: RequestModel<TDto>): Promise<ResponseModel<TDto>>;
}
