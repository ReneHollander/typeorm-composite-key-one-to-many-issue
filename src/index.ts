import "reflect-metadata";
import {createConnection} from "typeorm";
import {City} from "./entity/City";
import {RecurringOrder} from "./entity/RecurringOrder";
import {RecurringOrderItem} from "./entity/RecurringOrderItem";
import {DeliverySlot} from "./entity/DeliverySlot";
import {Product} from "./entity/Product";
import {User} from "./entity/User";

// connection settings are in the "ormconfig.json" file
createConnection().then(async connection => {

    const cityRepository = connection.getRepository(City);
    const userRepository = connection.getRepository(User);
    const productRepository = connection.getRepository(Product);
    const deliverySlotRepository = connection.getRepository(DeliverySlot);
    const recurringOrderRepository = connection.getRepository(RecurringOrder);
    const recurringOrderItemRepository = connection.getRepository(RecurringOrderItem);

    const city1 = new City();
    city1.postcode = 1000;
    city1.name = "City 1";
    city1.enabled = true;
    await cityRepository.save(city1);

    const user1 = new User();
    user1.city = city1;
    user1.email = "user1@example.com";
    user1.password = "12345678";
    await userRepository.save(user1);

    const product1 = new Product();
    product1.id = 1;
    product1.name = "Product 1";
    product1.price = 0.30;
    await productRepository.save(product1);

    const product2 = new Product();
    product2.id = 3;
    product2.name = "Product 2";
    product2.price = 0.70;
    await productRepository.save(product2);

    const slot1 = new DeliverySlot();
    slot1.by = new Date(null, null, null, 7, null, null, null);
    slot1.name = "Slot 1";
    deliverySlotRepository.save(slot1);

    const slot2 = new DeliverySlot();
    slot2.by = new Date(null, null, null, 7, null, null, null);
    slot2.name = "Slot 2";
    deliverySlotRepository.save(slot2);

    const order1 = new RecurringOrder();
    order1.deliverySlot = slot1;
    order1.user = user1;
    order1.enabled = true;
    await recurringOrderRepository.save(order1);

    const item1 = new RecurringOrderItem();
    item1.recurringOrder = order1;
    item1.product = product1;
    item1.amount = 3;
    recurringOrderItemRepository.save(item1);

    console.log(JSON.stringify(await cityRepository.find(), null, 2));
    console.log(JSON.stringify(await userRepository.find({relations: ["recurringOrders"]}), null, 2));
    console.log(JSON.stringify(await productRepository.find(), null, 2));
    console.log(JSON.stringify(await deliverySlotRepository.find(), null, 2));
    console.log(JSON.stringify(await recurringOrderRepository.find(), null, 2));
    console.log(JSON.stringify(await recurringOrderItemRepository.find(), null, 2));

}).catch(error => console.log("Error: ", error));