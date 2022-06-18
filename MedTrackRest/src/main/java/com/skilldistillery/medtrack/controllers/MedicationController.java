package com.skilldistillery.medtrack.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.medtrack.entities.Medication;
import com.skilldistillery.medtrack.services.MedicationService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost"})
public class MedicationController {

	@Autowired
	private MedicationService medService;
	
	@GetMapping("medications")
	public List<Medication> index(){
		return medService.index();
	}
	@GetMapping("medications/{id}")
	public Medication show(@PathVariable Integer id, HttpServletResponse res){
		Medication med = null;
		try {
			med = medService.findById(id);
			if(med == null) {
				res.setStatus(404);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		
		return med;
	}
	@GetMapping("medications/search/{name}")
	public List<Medication> findByName(@PathVariable String name, HttpServletResponse res){
		List<Medication> meds = new ArrayList<>();
		try {
			meds = medService.findByNameLike(name);
			if(meds.isEmpty()) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return meds;
	}
	
	@PostMapping("medications")
	public Medication create(@RequestBody Medication med, HttpServletResponse res, HttpServletRequest req) {
		try {
			med = medService.createMedication(med);
			if(med != null) {
				res.setStatus(201);
				StringBuffer url = req.getRequestURL();
				url.append("/").append(med.getId());
				res.setHeader("Location", url.toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
			med = null;
			res.setStatus(400);
		}
		
		return med;
	}
	
	@PutMapping("medications/{id}")
	public Medication update(@PathVariable Integer id, @RequestBody Medication med, HttpServletResponse res, HttpServletRequest req) {
		try {
			med = medService.updateMedication(id, med);
			if(med != null) {
				res.setStatus(201);
				StringBuffer url = req.getRequestURL();
				url.append("/").append(med.getId());
				res.setHeader("Location", url.toString());
			} else {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			med = null;
			res.setStatus(400);
		}
		
		return med;
	}

	@DeleteMapping("medications/{id}")
	public void delete(@PathVariable Integer id, HttpServletResponse res, HttpServletRequest req) {
		boolean deleted = false;
		try {
			deleted = medService.deleteMedication(id);
			if(deleted) {
				res.setStatus(204);
			} else {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		
	}
}
