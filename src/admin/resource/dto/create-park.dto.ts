import { Location } from './update-slot.dto';

export class CreateParkDto {
  location: Location;
  name: string;
  address: string;
  manager: string;
  bookingPrice: number;
  parkingPricePerMinute: number;
  parkingFreeMintutes: number;
}
