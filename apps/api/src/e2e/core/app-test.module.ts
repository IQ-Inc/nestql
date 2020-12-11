import { Module } from '@nestjs/common';
import { APP_CONF } from '../../app/app.module';

@Module(APP_CONF(true))
export class AppTestModule {}
