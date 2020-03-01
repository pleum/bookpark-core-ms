export interface PayInfo {
  method: string;
  amount: number;
}

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  quantity: number;
  price: number;
}

export interface Package {
  id: string;
  amount: number;
  userFeeAmount: number;
  products: Product[];
}

export interface Info {
  transactionId: number;
  orderId: string;
  payInfo: PayInfo[];
  packages: Package[];
}

export interface ConfirmResponseDto {
  returnCode: string;
  returnMessage: string;
  info: Info;
}
