import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceClient {
  constructor(private readonly httpService: HttpService) {}

  async sendRequest({ url, endpoint }: { url: string; endpoint: string }) {
    try {
      const res = await this.httpService.get(`${url}/${endpoint}`);
      return await (
        await lastValueFrom(res)
      ).data;
    } catch (e: any) {
      throw new Error(e);
    }
  }
}
