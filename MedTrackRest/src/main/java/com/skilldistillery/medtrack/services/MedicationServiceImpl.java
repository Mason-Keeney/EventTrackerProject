package com.skilldistillery.medtrack.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.medtrack.entities.Medication;
import com.skilldistillery.medtrack.repositories.MedicationRepository;

@Service
public class MedicationServiceImpl implements MedicationService {

	@Autowired
	private MedicationRepository medRepo;
	
	@Override
	public List<Medication> index() {
		
		return medRepo.findAll();
	}

	@Override
	public Medication findById(Integer id) {
		Medication med = null;
		Optional<Medication> op = medRepo.findById(id);
		if (op.isPresent()) {
			med = op.get();
		}
		return med;
	}

	@Override
	public List<Medication> findByNameLike(String name) {
		name = "%" + name + "%";
		return medRepo.findMedicationByNameLike(name);
	}

	@Override
	public Medication createMedication(Medication med) {
		return medRepo.saveAndFlush(med);
	}

	@Override
	public Medication updateMedication(Integer id, Medication med) {
		Medication managed = null;
		Optional<Medication> op = medRepo.findById(id);
		if(op.isPresent()) {
			managed = op.get();
			managed.setName(med.getName());
			managed.setDosage(med.getDosage());
			managed.setPrimaryUse(med.getPrimaryUse());
			managed.setSecondaryUse(med.getSecondaryUse());
			managed.setUseFrequency(med.getUseFrequency());
			managed = medRepo.saveAndFlush(managed);
		}
		return managed;
	}

	@Override
	public boolean deleteMedication(Integer id) {
		boolean deleted = false;
		Medication deleteMe = null;
		Optional<Medication> op = medRepo.findById(id);
		if(op.isPresent()) {
			deleteMe = op.get();
			medRepo.delete(deleteMe);
			deleted = true;
		}
		return deleted;
	}

}
