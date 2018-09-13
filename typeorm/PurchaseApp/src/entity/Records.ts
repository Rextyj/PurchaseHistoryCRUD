import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import {Users} from './Users';

@Entity()
export class Records{
	@PrimaryGeneratedColumn()
	id: number;
	
	@ManyToOne(type => Users, {cascade: true, nullable: false})
	@JoinColumn({name: "user_id"})
	user: number;
	
	@Column({name: "Company_name", nullable: true})
	companyName: string;
	
	@Column("double precision", {name:"Number_of_shares_bought", nullable: true})
	numOfSharesBought: number;
	
	@Column({name:"Date_purchased", nullable: true})
	datePurchased: Date;
	
	@Column({name: "Date_sold", nullable: true})
	dateSold: Date;
	
	@Column("double precision", {name: "Number_of_shares_sold", nullable: true})
	numOfSharesSold: number;
	
	@Column("double precision", {name: "Purchase_price", nullable: true})
	purchasePrice: number;
	
	@Column("double precision", {name: "Average_purchase_price", nullable: true})
	avgPurchasePrice: number;
	
	@Column("double precision", {name: "Sold_price", nullable: true})
	soldPrice: number;
	
	@Column("double precision", {name: "Average_sold_price", nullable: true})
	avgSoldPrice: number;
	
	@Column("double precision", {name: "Loss_or_gain_price", nullable: true})
    lossOrGain: number;
    
}