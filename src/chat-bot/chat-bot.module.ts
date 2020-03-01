import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatBotController } from './chat-bot.controller';
import { ChatBotService } from './chat-bot.service';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [ChatBotController],
  providers: [ChatBotService],
})
export class ChatBotModule {}
