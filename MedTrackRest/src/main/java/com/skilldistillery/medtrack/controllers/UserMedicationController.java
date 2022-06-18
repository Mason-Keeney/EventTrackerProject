package com.skilldistillery.medtrack.controllers;

import java.util.ArrayList;
import java.util.Collections;
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

import com.skilldistillery.medtrack.entities.UserMedication;
import com.skilldistillery.medtrack.services.UserMedicationService;
import com.skilldistillery.medtrack.services.UserService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost"})
public class UserMedicationController {

	@Autowired
	private UserMedicationService userMedServ;
	
	@Autowired
	private UserService userServ;
	
	@GetMapping("users/{id}/usermedications")
	public List<UserMedication> findByUser(@PathVariable Integer id, HttpServletResponse res){
		List<UserMedication> userMeds = new ArrayList<>();
		try {
			userMeds = userMedServ.findByUserId(id);
			Collections.sort(userMeds, (a, b) -> b.getDate().compareTo(a.getDate()));
			if(userMeds.isEmpty()) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return userMeds;
	}
	
	@GetMapping("usermedications/{id}")
	public UserMedication findById(@PathVariable Integer id, HttpServletResponse res) {
		UserMedication userMed = null;
		try {
			userMed = userMedServ.findById(id);
			if(userMed == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return userMed;
	}
	
	@PostMapping("users/{id}/usermedications")
	public UserMedication createUserMedication(@PathVariable Integer id, @RequestBody UserMedication userMed, HttpServletResponse res, HttpServletRequest req) {
		try {
				userMed.setUser(userServ.show(id));
			if(userMed.getUser() != null) {
				userMed = userMedServ.createUserMedication(userMed);
				if(userMed != null) {
					res.setStatus(201);
					StringBuffer url = req.getRequestURL();
					url.append("/").append(userMed.getId());
					res.setHeader("Location", url.toString());
				} else {
					res.setStatus(404);
				}
			} else {
				res.setStatus(404);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return userMed;
	}
	
	@PutMapping("usermedications/{id}")
	public UserMedication updateUserMedication(@PathVariable Integer id, @RequestBody UserMedication userMed, HttpServletResponse res, HttpServletRequest req) {
		try {
			userMed = userMedServ.updateUserMedication(id, userMed);
			if(userMed == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return userMed;
	}
	
	@DeleteMapping("usermedications/{id}")
	public void deleteUserMedication(@PathVariable Integer id, HttpServletResponse res) {
		boolean deleted = false;
		try {
			deleted = userMedServ.deleteUserMedication(id);
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
