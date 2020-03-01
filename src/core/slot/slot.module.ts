import { Module, forwardRef } from '@nestjs/common';
import { SlotService } from './slot.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SlotSchema } from './schemas/slot.schema';
import { CoreModule } from '../core.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Slot', schema: SlotSchema }]),
    forwardRef(() => CoreModule),
  ],
  providers: [SlotService],
  exports: [SlotService],
})
export class SlotModule {}
