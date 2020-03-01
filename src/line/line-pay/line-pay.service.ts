import { Injectable, HttpService } from '@nestjs/common';
import { RequestDto } from './dto/request.dto';
import { AxiosResponse } from 'axios';
import { RequestResponseDto } from './dto/request-response.dto';
import { ConfirmDto } from './dto/confirm.dto';
import { ConfirmResponseDto } from './dto/confirm-response.dto';

@Injectable()
export class LinePayService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Request new payment.
   * @param request request data.
   */
  async request(
    request: RequestDto,
  ): Promise<AxiosResponse<RequestResponseDto>> {
    return this.httpService
      .post<RequestResponseDto>('/v3/payments/request', request)
      .toPromise();
  }

  /**
   * Confirm payment.
   * @param transactionId line pay transaction id.
   * @param confirm confirm data.
   */
  async confirm(
    transactionId: number,
    confirm: ConfirmDto,
  ): Promise<AxiosResponse<ConfirmResponseDto>> {
    return this.httpService
      .post<ConfirmResponseDto>(
        `/v3/payments/${transactionId}/confirm`,
        confirm,
      )
      .toPromise();
  }
}
