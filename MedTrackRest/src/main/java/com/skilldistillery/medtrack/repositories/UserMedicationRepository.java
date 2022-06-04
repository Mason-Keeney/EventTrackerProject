package com.skilldistillery.medtrack.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.medtrack.entities.UserMedication;

public interface UserMedicationRepository extends JpaRepository<UserMedication, Integer>{
	List<UserMedication> findByUser_id(@Param("id") Integer id);
}
