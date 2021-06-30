import { Module } from '@nestjs/common';
import FeaturesModule from './FeaturesModule';
import ControlModule from './ControlModule';

@Module({
  imports: [FeaturesModule, ControlModule],
  providers: [],
  exports: [FeaturesModule],
})
export default class AppModule {}
