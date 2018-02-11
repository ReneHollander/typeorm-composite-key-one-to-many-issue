import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import {DeliverySlot} from "./DeliverySlot";
import {User} from "./User";
import {RecurringOrderItem} from "./RecurringOrderItem";

@Entity()
export class RecurringOrder {

    @ManyToOne(type => DeliverySlot, {primary: true})
    deliverySlot: DeliverySlot;

    @ManyToOne(type => User, user => user.recurringOrders, {primary: true})
    user: User;

    @Column()
    enabled: boolean;

    @OneToMany(type => RecurringOrderItem, item => item.recurringOrder)
    items: RecurringOrderItem[];
}
