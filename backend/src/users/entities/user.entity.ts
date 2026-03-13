import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Server } from '../../servers/entities/server.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ default: false })
  twoFactorEnabled: boolean;

  @Column({ nullable: true })
  twoFactorSecret: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Server, server => server.owner)
  servers: Server[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
