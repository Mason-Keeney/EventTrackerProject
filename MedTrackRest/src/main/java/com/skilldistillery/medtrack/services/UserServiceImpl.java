package com.skilldistillery.medtrack.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.medtrack.entities.User;
import com.skilldistillery.medtrack.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepo;
	
	@Override
	public List<User> index() {
		return userRepo.findAll();
	}

	@Override
	public User show(Integer id) {
		User user = null;
		Optional<User> op = userRepo.findById(id);
		if(op.isPresent()) {
			user = op.get();
		}
		return user;
	}

	@Override
	public User loginUser(String username, String password) {
		User user = userRepo.findByUsername(username);
		if (user != null) {
			if (!user.getPassword().equals(password)) {
				user = null;
			}
		}
		return user;
	}


	@Override
	public User createUser(User user) {
		for (User existing : userRepo.findAll()) {
			if(user.getUsername().equals(existing.getUsername())) {
				user = null;
			}
		}
		if (user != null) {
			user = userRepo.saveAndFlush(user);
		}
		return user;
	}

	@Override
	public User updateUser(Integer id, User user) {
		User managed = null;
		Optional<User> op = userRepo.findById(id);
		if(op.isPresent()) {
			managed = op.get();
			managed.setFirstName(user.getFirstName());
			managed.setLastName(user.getLastName());
			managed.setUserMeds(user.getUserMeds());
			managed.setMeds(user.getMeds());
			managed = userRepo.saveAndFlush(managed);
		}
		return managed;
	}

	@Override
	public boolean deleteUser(Integer id) {
		boolean deleted = false;
		User deleteMe = null;
		Optional<User> op = userRepo.findById(id);
		if(op.isPresent()) {
			deleteMe = op.get();
			userRepo.delete(deleteMe);
			deleted = true;
		}
		return deleted;
	}

}
