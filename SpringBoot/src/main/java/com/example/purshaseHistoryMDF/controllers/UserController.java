package com.example.purshaseHistoryMDF.controllers;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;
import javax.xml.ws.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.purshaseHistoryMDF.models.CustomResponse;
import com.example.purshaseHistoryMDF.models.User;
import com.example.purshaseHistoryMDF.repository.UserRepository;

@RestController
public class UserController {
	@Autowired
	private UserRepository userRepository;

	@PostMapping("/users/api/getUser")
	@CrossOrigin("*")
	public ResponseEntity<?> getUser(@Valid @RequestBody User user) {
		//		return userRepository.findById(user.getId())
		//				.map(foundUser -> ResponseEntity.ok().body(foundUser))
		//				.orElse(ResponseEntity.notFound().build());

		ExampleMatcher matcher = ExampleMatcher.matching()
				.withMatcher("username", ExampleMatcher.GenericPropertyMatchers.exact())
				.withMatcher("password", ExampleMatcher.GenericPropertyMatchers.exact());

		Optional<User> thisUser = userRepository.findOne(Example.of(user, matcher));
		CustomResponse response = new CustomResponse();
		if(thisUser.isPresent()) {
			//found the user with the correct password
			response.setData("verified");
//			return thisUser.get();
		} else {
			response.setData("unsuccessful");
//			return null;
		}
		return ResponseEntity.ok().body(response);
	}

	@PostMapping("/users/api/saveUser")
	@CrossOrigin("*")
	public ResponseEntity<?> saveUser(@Valid @RequestBody User user) {
//		User checkUser = getUser(user);
		
		ExampleMatcher matcher = ExampleMatcher.matching()
				.withMatcher("username", ExampleMatcher.GenericPropertyMatchers.exact())
				.withMatcher("password", ExampleMatcher.GenericPropertyMatchers.exact());

		Optional<User> thisUser = userRepository.findOne(Example.of(user, matcher));
		CustomResponse response = new CustomResponse();
		
		if(thisUser.isPresent()) {
			//The user already existed
			response.setData("Please choose another username");
			response.setDuplicate(true);
		} else {
			userRepository.save(user);
			response.setData("successful");
		}
		
		return ResponseEntity.ok().body(response);
	}


}
