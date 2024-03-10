import { Abstract } from 'entities/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity('blog')
export class Blog extends Abstract {
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;
}
