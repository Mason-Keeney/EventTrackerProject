package com.skilldistillery.medtrack.services;

import java.util.List;

import com.skilldistillery.medtrack.entities.User;

public interface UserService {
	List<User> index();
	User show(Integer id);
	User loginUser(String username, String password);
	User createUser(User user);
	User updateUser(Integer id, User user);
	boolean deleteUser(Integer id);
}
