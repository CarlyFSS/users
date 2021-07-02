import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import FeaturesModule from './FeaturesModule';
import ControlModule from './ControlModule';
import typeormConfig from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    FeaturesModule,
    ControlModule,
  ],
  providers: [],
  exports: [FeaturesModule],
})
export default class AppModule {}
