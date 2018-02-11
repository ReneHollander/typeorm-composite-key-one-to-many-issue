import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {RecurringOrder} from "./RecurringOrder";
import {City} from "./City";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column({select: false})
    password: string;

    @ManyToOne(type => City)
    city: City;

    @OneToMany(type => RecurringOrder, recurringOrder => recurringOrder.user)
    recurringOrders: RecurringOrder[];

}
