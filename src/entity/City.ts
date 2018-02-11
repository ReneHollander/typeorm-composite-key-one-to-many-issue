import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class City {

    @PrimaryColumn()
    postcode: number;

    @PrimaryColumn()
    name: string;

    @Column({default: false})
    enabled: boolean;

}
