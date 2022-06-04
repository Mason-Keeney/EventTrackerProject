package com.skilldistillery.medtrack.services;

import java.util.List;

import com.skilldistillery.medtrack.entities.UserMedication;

public interface UserMedicationService {
	UserMedication createUserMedication(UserMedication userMed);
	List<UserMedication> findByUserId(Integer userId);
	UserMedication updateUserMedication(Integer id, UserMedication userMed);
	UserMedication findById(Integer id);
	boolean deleteUserMedication(Integer id);
}
