import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import FeaturesModule from './FeaturesModule';
import ControlModule from './ControlModule';
import TypeormConfig from './config/TypeormConfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeormConfig),
    FeaturesModule,
    ControlModule,
  ],
  providers: [],
  exports: [FeaturesModule],
})
export default class AppModule {}
