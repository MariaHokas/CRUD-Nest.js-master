import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 100, nullable: true })
  firstName: string;

  @Column({ length: 100, nullable: true })
  lastName: string;

  @Column({ length: 100, nullable: true })
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
// import {
//   Entity,
//   Column,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
//   CreateDateColumn,
//   OneToMany,
//   BeforeInsert,
// } from 'typeorm';
// import { Assignment } from './assignment.entity';

// @Entity()
// export class User {

//   @Column('date', { nullable: true })
//   birthday?: Date;

//   @Column({ nullable: true })
//   isActive?: boolean;

//   @Column({ nullable: true })
//   points?: number;

//   @Column({ select: false })
//   password: string;

//   @CreateDateColumn()
//   created!: Date;

//   @UpdateDateColumn()
//   updated!: Date;

//   @OneToMany(() => Assignment, (assignment) => assignment.user)
//   assignments: Assignment[];

//   @BeforeInsert()
//   emailToLowerCase() {
//     console.log('tuletko tänne?');
//     this.email = this.email.toLowerCase();
//   }
// }
