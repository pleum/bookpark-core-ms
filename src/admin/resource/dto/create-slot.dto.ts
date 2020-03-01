import { Location } from './update-slot.dto';

export class CreateSlotDto {
  location: Location;
  name: string;
  floor: string;
  device: string;
  park: string;
}
