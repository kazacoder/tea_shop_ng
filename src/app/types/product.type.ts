export type ProductType = {
  id: number;
  image: string;
  title: string;
  price: number;
  description: string;
}

export type ProductOrderType = {
  name: string | null | undefined,
  last_name: string | null | undefined,
  phone: string | null | undefined,
  country: string | null | undefined,
  zip: string | null | undefined,
  product: string | null | undefined,
  address: string | null | undefined,
  comment: string | null | undefined,
}
