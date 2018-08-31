package com.example.purshaseHistoryMDF.controllers;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.purshaseHistoryMDF.exception.ResourceNotFoundException;
import com.example.purshaseHistoryMDF.models.CustomResponse;
import com.example.purshaseHistoryMDF.models.Record;
import com.example.purshaseHistoryMDF.models.User;
import com.example.purshaseHistoryMDF.repository.RecordRepository;
import com.example.purshaseHistoryMDF.repository.UserRepository;
import com.example.purshaseHistoryMDF.service.RecordService;

@RestController
@CrossOrigin("*")
public class RecordController {
	private RecordService recordService;
	
	public RecordController(RecordService recordService) {
		this.recordService = recordService;
	}
	@Autowired
	private RecordRepository recordRepository;

	@Autowired
	private UserRepository userRepository;
	
	
	@GetMapping("/records/api/{username}/getPurchase")
	public List<Record> getRecords(@PathVariable String username) {
		ExampleMatcher matcher = ExampleMatcher.matching()
				.withMatcher("username", ExampleMatcher.GenericPropertyMatchers.exact());

		User tempUser = new User();
		tempUser.setUsername(username);
		Long userId = userRepository.findOne(Example.of(tempUser, matcher))
				.map(user -> {
					return user.getId();
				}).orElseThrow(() -> new ResourceNotFoundException("User not found when trying to get record"));
		return recordRepository.findByUser_Id(userId);
	}
	
//	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/records/api/{username}/SavePurchase")
	public ResponseEntity<CustomResponse> saveRecord(@PathVariable String username, 
			@Valid @RequestBody Record record) {
		ExampleMatcher matcher = ExampleMatcher.matching()
				.withMatcher("username", ExampleMatcher.GenericPropertyMatchers.exact());

		User tempUser = new User();
		tempUser.setUsername(username);
		userRepository.findOne(Example.of(tempUser, matcher))
		.map(user -> {
			record.setUser(user);
			return recordRepository.save(record);
		}).orElseThrow(() -> new ResourceNotFoundException("User not found when trying to save record " + username));

		CustomResponse customResponse = new CustomResponse(); 
		customResponse.setData("Added a new item");
		return ResponseEntity.ok().body(customResponse);

	}
	
//	@CrossOrigin(origins = "http://localhost:4200")
	@DeleteMapping("/records/api/{username}/deletePurchase/{recordId}")
	public ResponseEntity<?> deleteRecord(@PathVariable String username,
											@PathVariable Long recordId) {
		Record _record = recordRepository.findById(recordId).orElseThrow(() -> new ResourceNotFoundException("Record with id not found"));
		recordRepository.delete(_record);
		//after deleting the record, return the updated record
		//or should we ask the front end to make two api calls
		CustomResponse customResponse = new CustomResponse(); 
		customResponse.setData("Deleted an item");
		return ResponseEntity.ok().body(customResponse);
		
	}
	
	@GetMapping("/records/api/{username}/getPurchase/getAverage")
	public List<?> getAverage(@PathVariable String username) {
		ExampleMatcher matcher = ExampleMatcher.matching()
				.withMatcher("username", ExampleMatcher.GenericPropertyMatchers.exact());

		User tempUser = new User();
		tempUser.setUsername(username);
		Long userId = userRepository.findOne(Example.of(tempUser, matcher))
				.map(user -> {
					return user.getId();
				}).orElseThrow(() -> new ResourceNotFoundException("User not found when trying to get record"));
		return recordService.getAverage(userId);
	}

	@GetMapping("/records/api/{username}/getPurchase/getBetweenDate/{beginDate}/{endDate}")
	public List<?> getBetweenDate(@PathVariable String beginDate, @PathVariable String endDate,@PathVariable String username) {
		ExampleMatcher matcher = ExampleMatcher.matching()
				.withMatcher("username", ExampleMatcher.GenericPropertyMatchers.exact());

		User tempUser = new User();
		tempUser.setUsername(username);
		Long userId = userRepository.findOne(Example.of(tempUser, matcher))
				.map(user -> {
					return user.getId();
				}).orElseThrow(() -> new ResourceNotFoundException("User not found when trying to get record"));
		return recordService.getBetweenDate(beginDate, endDate, userId);
	}

}
