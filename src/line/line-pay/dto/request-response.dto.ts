export interface PaymentUrl {
  web: string;
  app: string;
}

export interface Info {
  paymentUrl: PaymentUrl;
  transactionId: number;
  paymentAccessToken: string;
}

export interface RequestResponseDto {
  returnCode: string;
  returnMessage: string;
  info: Info;
}
