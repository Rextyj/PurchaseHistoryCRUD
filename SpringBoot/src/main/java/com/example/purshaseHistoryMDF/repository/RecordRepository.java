package com.example.purshaseHistoryMDF.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.purshaseHistoryMDF.models.Record;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long>{
	//this finds the user model's id
	List<Record> findByUser_Id(Long Id);


	@Query(value = "Select COUNT(company_name),company_name, SUM(Number_of_shares_bought) as avgNumBought ,SUM(Number_of_shares_sold) as avgNumSold,  "
			+ "AVG(Purchase_price) as avgPrice, AVG(Sold_price) as avgSoldPrice, AVG(Loss_or_gain_price) as avgLossGain from records where user_id = :id GROUP BY company_name ",nativeQuery = true)
	List<?> getAverage(@Param("id") Long Id);
	//@Query(value = "Select * from records", nativeQuery = true)

	@Query(value="Select * from records where user_id = :id and date_purchased between to_date(:beginDate, 'YYYY-MM-DD') and to_date(:endDate, 'YYYY-MM-DD')", nativeQuery = true)
	//@Query(value="Select * from records where user_id = 1000 and date_purchased between '2018-05-12' and '2018-09-21'", nativeQuery = true)
	List<?> getBetweenDate(@Param("beginDate") String beginDate, @Param("endDate") String endDate, @Param("id")Long Id);

	@Query(value="Select to_char(date_purchased, 'MM') as mon, sum(purchase_price) as totalPrice from RECORDS where user_id=?2 and to_char(date_purchased, 'YYYY') = ?1 group by 1 order by mon asc",nativeQuery = true)
	List<?> getMonthlyData(String year, Long Id);
	
	@Query(value="select company_name, sum(purchase_price) as totalPrice from records where user_id=?1 group by 1", nativeQuery = true)
	List<?> getCompanyData(Long Id);
}
