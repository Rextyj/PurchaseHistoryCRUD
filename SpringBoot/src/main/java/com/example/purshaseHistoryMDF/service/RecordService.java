package com.example.purshaseHistoryMDF.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.purshaseHistoryMDF.models.Record;
import com.example.purshaseHistoryMDF.repository.RecordRepository;

@Service
public class RecordService {
	private RecordRepository recordRepository;
	
	public RecordService(RecordRepository recordRepository) {
		this.recordRepository = recordRepository;
	}
	
	public List<?> getAverage(Long Id) {
		return recordRepository.getAverage(Id);
	}
	
	public List<?> getBetweenDate(String beginDate, String endDate,Long Id){
		return recordRepository.getBetweenDate(beginDate,endDate, Id);
	}
}
