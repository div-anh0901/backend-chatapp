import { Module } from "@nestjs/common";
import { MessagingGateway } from "./gateway";
import { Services } from "@/utils/contants";
import { GatewaySessionManager } from "./gatewat.session";



@Module({
    providers:[
        MessagingGateway,
        {
            provide: Services.GATEWAY_SESSION_MANAGER,
            useClass: GatewaySessionManager,
          },
    ]
})


export class GatewayModule{}