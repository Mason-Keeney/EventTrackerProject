package com.skilldistillery.medtrack.services;

import java.util.List;

import com.skilldistillery.medtrack.entities.Medication;

public interface MedicationService {
	List<Medication> index();
	Medication findById(Integer id);
	List<Medication> findByNameLike(String name);
	Medication createMedication(Medication med);
	Medication updateMedication(Integer id, Medication med);
	boolean deleteMedication(Integer id);
}
