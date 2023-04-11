import { Injectable } from '@nestjs/common';
import { HttpService as AxiosHttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class HttpService {
  constructor(private readonly httpService: AxiosHttpService) {}

  async sendRequest({
    url,
    headers,
    params,
    endpoint
  }: {
    url: string;
    headers?: any;
    params?: any;
    endpoint: string;
  }) {
    try {
      const res = await this.httpService.get(`${url}/${endpoint}`, {
        headers,
        params
      });
      return await (
        await lastValueFrom(res)
      ).data;
    } catch (e: any) {
      throw new Error(e);
    }
  }
}
