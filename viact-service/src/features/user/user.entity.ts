import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, nullable: true })
  phoneNumber: string;

  @Column()
  password: string;

  @Column({ nullable: true, type: 'text' })
  accessToken: string;

  @Column({ nullable: true, type: 'text' })
  refreshToken: string;

  @Column({ default: false })
  isDelete: boolean;

  @Column({ default: true, nullable: true })
  isActive: boolean;
}
