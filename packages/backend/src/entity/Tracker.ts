import {Column, CreateDateColumn, Entity, ManyToOne,UpdateDateColumn,PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Tracking{
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    description:string;
    
    @Column()
    startTime:string;
    @Column()
    endTime:string;

    @CreateDateColumn()
    createdAt:string;

    @UpdateDateColumn ()
    updatedAt:string
}