interface Product {
  id: string;
  name: string;
  imageUrl: string;
  quantity: number;
  price: number;
}

interface Package {
  id: string;
  amount: number;
  products: Product[];
}

interface RedirectUrls {
  confirmUrl: string;
  cancelUrl: string;
}

export interface RequestDto {
  amount: number;
  currency: string;
  orderId: string;
  packages: Package[];
  redirectUrls: RedirectUrls;
}
