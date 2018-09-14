import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn} from "typeorm";
import {Users} from './Users';

@Entity()
export class Records{
	@PrimaryGeneratedColumn()
	id: number;
	
	@CreateDateColumn()
	dateAdded: Date

	@ManyToOne(type => Users, {cascade: true, nullable: false})
	@JoinColumn({name: "user_id"})
	user: number;
	
	@Column({name: "company_name", nullable: true})
	companyName: string;
	
	@Column("double precision", {name:"number_of_shares_bought", nullable: true})
	numOfSharesBought: number;
	
	@Column({name:"date_purchased", nullable: true})
	datePurchased: Date;
	
	@Column({name: "date_sold", nullable: true})
	dateSold: Date;
	
	@Column("double precision", {name: "number_of_shares_sold", nullable: true})
	numOfSharesSold: number;
	
	@Column("double precision", {name: "purchase_price", nullable: true})
	purchasePrice: number;
	
	@Column("double precision", {name: "average_purchase_price", nullable: true})
	avgPurchasePrice: number;
	
	@Column("double precision", {name: "sold_price", nullable: true})
	soldPrice: number;
	
	@Column("double precision", {name: "average_sold_price", nullable: true})
	avgSoldPrice: number;
	
	@Column("double precision", {name: "loss_or_gain_price", nullable: true})
    lossOrGain: number;
    
}