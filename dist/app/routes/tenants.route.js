"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantsRoutes = void 0;
const common_1 = require("@nestjs/common");
const tenants_facade_1 = require("../facade/tenants.facade");
const ResponseModel_1 = require("../../submodules/Portfolio-Platform-Common/ResponseModel");
const SNS_SQS_1 = require("../../submodules/Portfolio-Platform-RabbitMQConfig/SNS_SQS");
const RequestModel_1 = require("../../submodules/Portfolio-Platform-Common/RequestModel");
const Message_1 = require("../../submodules/Portfolio-Platform-Common/Message");
let TenantsRoutes = class TenantsRoutes {
    constructor(tenantsFacade) {
        this.tenantsFacade = tenantsFacade;
        this.sns_sqs = SNS_SQS_1.SNS_SQS.getInstance();
        this.topicArray = ['TENANTS_ADD', 'TENANTS_UPDATE', 'TENANTS_DELETE'];
        this.serviceName = ['TENANTS_SERVICE', 'TENANTS_SERVICE', 'TENANTS_SERVICE'];
    }
    onModuleInit() {
        for (var i = 0; i < this.topicArray.length; i++) {
            this.sns_sqs.listenToService(this.topicArray[i], this.serviceName[i], (() => {
                let value = this.topicArray[i];
                return async (result) => {
                    console.log("Result is........" + JSON.stringify(result));
                    try {
                        let responseModelOfTenantsDto = null;
                        console.log(`listening to  ${value} topic.....result is....`);
                        switch (value) {
                            case 'TENANTS_ADD':
                                console.log("Inside TENANTS_ADD Topic");
                                responseModelOfTenantsDto = await this.createTenants(result["message"]);
                                break;
                            case 'TENANTS_UPDATE':
                                console.log("Inside TENANTS_UPDATE Topic");
                                responseModelOfTenantsDto = await this.updateTenants(result["message"]);
                                break;
                            case 'TENANTS_DELETE':
                                console.log("Inside TENANTS_DELETE Topic");
                                responseModelOfTenantsDto = await this.deleteTenants(result["message"]);
                                break;
                        }
                        console.log("Result of aws of GroupRoutes  is...." + JSON.stringify(result));
                        let requestModelOfTenantsDto = result["message"];
                        responseModelOfTenantsDto.setSocketId(requestModelOfTenantsDto.SocketId);
                        responseModelOfTenantsDto.setCommunityUrl(requestModelOfTenantsDto.CommunityUrl);
                        responseModelOfTenantsDto.setRequestId(requestModelOfTenantsDto.RequestGuid);
                        responseModelOfTenantsDto.setStatus(new Message_1.Message("200", "Group Inserted Successfully", null));
                        for (let index = 0; index < result.OnSuccessTopicsToPush.length; index++) {
                            const element = result.OnSuccessTopicsToPush[index];
                            console.log("ELEMENT: ", JSON.stringify(responseModelOfTenantsDto));
                            this.sns_sqs.publishMessageToTopic(element, responseModelOfTenantsDto);
                        }
                    }
                    catch (error) {
                        console.log("Inside Catch.........");
                        console.log(error, result);
                        for (let index = 0; index < result.OnFailureTopicsToPush.length; index++) {
                            const element = result.OnFailureTopicsToPush[index];
                            let errorResult = new ResponseModel_1.ResponseModel(null, null, null, null, null, null, null, null, null);
                            ;
                            errorResult.setStatus(new Message_1.Message("500", error, null));
                            this.sns_sqs.publishMessageToTopic(element, errorResult);
                        }
                    }
                };
            })());
        }
    }
    allTenants() {
        try {
            return this.tenantsFacade.getAll();
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createTenants(body) {
        try {
            let result = await this.tenantsFacade.create(body);
            return result;
        }
        catch (error) {
            console.log("Error is....." + error);
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateTenants(body) {
        try {
            console.log("Executing update query..............");
            return await this.tenantsFacade.update(body);
        }
        catch (error) {
            console.log("Error is....." + error);
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    deleteTenants(body) {
        try {
            return this.tenantsFacade.deleteById(body);
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TenantsRoutes.prototype, "allTenants", null);
__decorate([
    common_1.Post("/"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RequestModel_1.RequestModel]),
    __metadata("design:returntype", Promise)
], TenantsRoutes.prototype, "createTenants", null);
__decorate([
    common_1.Put("/"),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RequestModel_1.RequestModel]),
    __metadata("design:returntype", Promise)
], TenantsRoutes.prototype, "updateTenants", null);
__decorate([
    common_1.Delete('/'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RequestModel_1.RequestModel]),
    __metadata("design:returntype", Promise)
], TenantsRoutes.prototype, "deleteTenants", null);
TenantsRoutes = __decorate([
    common_1.Controller('tenants'),
    __metadata("design:paramtypes", [tenants_facade_1.TenantsFacade])
], TenantsRoutes);
exports.TenantsRoutes = TenantsRoutes;
//# sourceMappingURL=tenants.route.js.map