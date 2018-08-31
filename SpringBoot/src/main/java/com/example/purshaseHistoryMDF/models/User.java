package com.example.purshaseHistoryMDF.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "users")
public class User extends AuditModel{
	@Id
	@GeneratedValue(generator = "user_generator")
	@SequenceGenerator(
			name = "user_generator",
			sequenceName = "user_sequence",
			initialValue = 1000
	)
	private Long id;
	
	@NotBlank
	@Column(name = "username", columnDefinition = "TEXT")
	private String username;
	
	@NotBlank
	@Column(name = "password", columnDefinition = "TEXT")
	private String password;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
}
