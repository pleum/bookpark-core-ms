import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { LineModule } from './line/line.module';
import { ChatBotModule } from './chat-bot/chat-bot.module';
import { LiffModule } from './liff/liff.module';
import { CoreModule } from './core/core.module';
import { AdminModule } from './admin/admin.module';
import { PaymentModule } from './payment/payment.module';
import { DeviceModule } from './device/device.module';
import { TasksModule } from './tasks/tasks.module';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    ScheduleModule.forRoot(),
    LineModule,
    ChatBotModule,
    LiffModule,
    CoreModule,
    AdminModule,
    PaymentModule,
    DeviceModule,
    TasksModule,
    RegisterModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
