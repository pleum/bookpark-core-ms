import { Document } from 'mongoose';

import { Manager } from 'src/core/manager/interfaces/manager.interface';

export interface Request extends Document {
  readonly manager: Manager;
  readonly type: string;
  readonly message: string;
  readonly status: string;
  readonly attendant: Manager;
}
