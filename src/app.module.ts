import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantModule } from './tenant/tenant.module';
import { dataSourceOptions } from 'database/global.source';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), TenantModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
