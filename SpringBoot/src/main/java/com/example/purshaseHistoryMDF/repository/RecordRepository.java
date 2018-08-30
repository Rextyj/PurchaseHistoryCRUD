package com.example.purshaseHistoryMDF.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.purshaseHistoryMDF.models.Record;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long>{
	//this finds the user model's id
	List<Record> findByUser_Id(Long Id);
}
