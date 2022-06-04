package com.skilldistillery.medtrack.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.medtrack.entities.Medication;

public interface MedicationRepository extends JpaRepository<Medication, Integer>{
	List<Medication> findMedicationByNameLike(String name);
}
