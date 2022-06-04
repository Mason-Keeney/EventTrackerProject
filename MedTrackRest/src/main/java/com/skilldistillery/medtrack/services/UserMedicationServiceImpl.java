package com.skilldistillery.medtrack.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.medtrack.entities.User;
import com.skilldistillery.medtrack.entities.UserMedication;
import com.skilldistillery.medtrack.repositories.UserMedicationRepository;
import com.skilldistillery.medtrack.repositories.UserRepository;

@Service
public class UserMedicationServiceImpl implements UserMedicationService {

	@Autowired
	private UserMedicationRepository userMedRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Override
	public UserMedication createUserMedication(UserMedication userMed) {
		userMed.setDate(LocalDate.now());
		
		return userMedRepo.saveAndFlush(userMed);
	}

	@Override
	public List<UserMedication> findByUserId(Integer userId) {
		List<UserMedication> userMeds = new ArrayList<>();
		Optional<User> op = userRepo.findById(userId);
		if(op.isPresent()) {
			User user = op.get();
			if(user.getUsermeds() != null) {
				userMeds = user.getUsermeds();
			}
		}
		return userMeds;
	}

	@Override
	public UserMedication updateUserMedication(Integer id, UserMedication userMed) {
		UserMedication managed = null;
		Optional<UserMedication> op = userMedRepo.findById(id);
		if(op.isPresent()) {
			managed = op.get();
			managed.setMedication(userMed.getMedication());
			managed.setUser(userMed.getUser());
			managed.setTaken(userMed.isTaken());
			managed = userMedRepo.saveAndFlush(managed);
		}
		return managed;
	}

	@Override
	public UserMedication findById(Integer id) {
		UserMedication userMed = null;
		Optional<UserMedication> op = userMedRepo.findById(id);
		if(op.isPresent()) {
			userMed = op.get();
		}
		return userMed;
	}

	@Override
	public boolean deleteUserMedication(Integer id) {
		boolean deleted = false;
		Optional<UserMedication> op = userMedRepo.findById(id);
		if(op.isPresent()) {
			UserMedication userMed = op.get();
			userMedRepo.delete(userMed);
			deleted = true;
		}
		return deleted;
	}

}
