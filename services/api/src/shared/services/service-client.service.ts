import {ApiConfigService} from "@shared/config.service";

export class ServiceClient {
  constructor(private readonly configService: ApiConfigService) {
  }
}
