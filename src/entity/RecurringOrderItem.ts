import {Column, Entity, ManyToOne} from "typeorm";
import {RecurringOrder} from "./RecurringOrder";
import {Product} from "./Product";

@Entity()
export class RecurringOrderItem {

    @ManyToOne(type => RecurringOrder, recurringOrder => recurringOrder.items, {primary: true})
    recurringOrder: RecurringOrder;

    @ManyToOne(type => Product, {primary: true, eager: true})
    product: Product;

    @Column()
    amount: number;

}
