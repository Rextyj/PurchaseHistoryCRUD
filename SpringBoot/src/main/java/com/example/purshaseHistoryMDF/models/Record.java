package com.example.purshaseHistoryMDF.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "records")
public class Record extends AuditModel{
	@Id
	@GeneratedValue(generator = "record_generator")
	@SequenceGenerator(
			name = "record_generator",
			sequenceName = "record_sequence",
			initialValue = 1000
	)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private User user;
	
	@Column(name = "Company_name")
	private String companyName;
	
	@Column(name = "Number_of_shares_bought")
	private Long numOfSharesBought;
	
	@Column(name = "Date_purchased")
	private Date datePurchased;
	
	@Column(name = "Date_sold")
	private Date dateSold;
	
	@Column(name = "Number_of_shares_sold")
	private Long numOfSharesSold;
	
	@Column(name = "Purchase_price")
	private Double purchasePrice;
	
	@Column(name = "Average_purchase_price")
	private Double avgPurchasePrice;
	
	@Column(name = "Sold_price")
	private Double soldPrice;
	
	@Column(name = "Average_sold_price")
	private Double avgSoldPrice;
	
	@Column(name = "Loss_or_gain_price")
	private Double lossOrGain;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public Long getNumOfSharesBought() {
		return numOfSharesBought;
	}

	public void setNumOfSharesBought(Long numOfSharesBought) {
		this.numOfSharesBought = numOfSharesBought;
	}

	public Date getDatePurchased() {
		return datePurchased;
	}

	public void setDatePurchased(Date datePurchased) {
		this.datePurchased = datePurchased;
	}

	public Date getDateSold() {
		return dateSold;
	}

	public void setDateSold(Date dateSold) {
		this.dateSold = dateSold;
	}

	public Long getNumOfSharesSold() {
		return numOfSharesSold;
	}

	public void setNumOfSharesSold(Long numOfSharesSold) {
		this.numOfSharesSold = numOfSharesSold;
	}

	public Double getPurchasePrice() {
		return purchasePrice;
	}

	public void setPurchasePrice(Double purchasePrice) {
		this.purchasePrice = purchasePrice;
	}

	public Double getAvgPurchasePrice() {
		return avgPurchasePrice;
	}

	public void setAvgPurchasePrice(Double avgPurchasePrice) {
		this.avgPurchasePrice = avgPurchasePrice;
	}

	public Double getSoldPrice() {
		return soldPrice;
	}

	public void setSoldPrice(Double soldPrice) {
		this.soldPrice = soldPrice;
	}

	public Double getAvgSoldPrice() {
		return avgSoldPrice;
	}

	public void setAvgSoldPrice(Double avgSoldPrice) {
		this.avgSoldPrice = avgSoldPrice;
	}

	public Double getLossOrGain() {
		return lossOrGain;
	}

	public void setLossOrGain(Double lossOrGain) {
		this.lossOrGain = lossOrGain;
	}

	
	
	
}
