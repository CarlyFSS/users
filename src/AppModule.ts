import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from 'nest-router';
import FeaturesModule from './FeaturesModule';
import ControlModule from './ControlModule';
import TypeormConfig from './config/TypeormConfig';
import AppRoutes from './shared/routes/AppRoutes';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeormConfig),
    FeaturesModule,
    ControlModule,
    RouterModule.forRoutes(AppRoutes),
  ],
  providers: [],
  exports: [FeaturesModule],
})
export default class AppModule {}
