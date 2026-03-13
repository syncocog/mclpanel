import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('servers')
export class Server {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  identifier: string;

  @Column()
  type: string;

  @Column({ default: 'stopped' })
  status: string;

  @Column({ type: 'json', nullable: true })
  resources: {
    memory: number;
    cpu: number;
    disk: number;
  };

  @Column({ type: 'json', nullable: true })
  ports: {
    game: number;
    query: number;
  };

  @Column({ nullable: true })
  dockerImage: string;

  @Column({ nullable: true })
  daemonId: string;

  @ManyToOne(() => User, user => user.servers)
  owner: User;

  @Column({ type: 'json', nullable: true })
  minecraftConfig: {
    version: string;
    serverType: string;
    modpack: string;
    plugins: string[];
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
