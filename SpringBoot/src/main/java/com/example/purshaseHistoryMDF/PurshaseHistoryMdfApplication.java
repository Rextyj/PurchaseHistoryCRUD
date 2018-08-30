package com.example.purshaseHistoryMDF;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class PurshaseHistoryMdfApplication {

	public static void main(String[] args) {
		SpringApplication.run(PurshaseHistoryMdfApplication.class, args);
	}
}
