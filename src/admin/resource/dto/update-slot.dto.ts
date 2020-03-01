export class Location {
  type: string;
  coordinates: number[];
}

export class UpdateSlotDto {
  location: Location;
  name: string;
  floor: string;
  device: string;
}