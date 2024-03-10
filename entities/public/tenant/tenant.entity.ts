import { Abstract } from 'entities/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity('tenants')
export class Tenant extends Abstract {
  @Column({ nullable: false })
  name: string;
}
