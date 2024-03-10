import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { DataSource, QueryRunner } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class TenantService {
  private tenantSource: DataSource;
  private queryRunner: QueryRunner;
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.queryRunner = this.dataSource.createQueryRunner();
  }

  async create(createTenantDto: CreateTenantDto) {
    try {
      const response = await this.queryRunner.query(
        `INSERT INTO public.tenants (name) VALUES ($1) RETURNING id`,
        [createTenantDto.name],
      );
      await this.createSchema(response[0].id);
      await this.executeMigrationsForTenant(response[0].id);
    } catch (err) {
      return { message: 'Something went wrong' };
    } finally {
      return { message: 'Tenant Setup Successful' };
    }
  }

  async createSchema(schema: string) {
    await this.dataSource.createQueryRunner().createSchema(schema, true);
  }

  async executeMigrationsForTenant(schema: string): Promise<void> {
    try {
      this.tenantSource = new DataSource({
        type: 'postgres',
        database: 'blog',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '73-55-608Cyka',
        entities: ['./dist/entities/tenant/**/*.entity.js'],
        migrations: ['./dist/database/tenant/*'],
        schema,
      });
      await this.tenantSource.initialize();
      await this.tenantSource.query(`SET search_path TO "${schema}"`);
      await this.tenantSource.runMigrations({ transaction: 'all' });
      await this.tenantSource.query(`SET search_path TO public`);
    } finally {
      this.tenantSource.destroy();
    }
  }
}
