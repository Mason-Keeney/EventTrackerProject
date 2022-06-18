package com.skilldistillery.medtrack.controllers;

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

import com.skilldistillery.medtrack.entities.User;
import com.skilldistillery.medtrack.services.UserService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost"})
public class UserController {

	@Autowired
	private UserService userServ;
	
	@GetMapping("users")
	public List<User> index(){
		return userServ.index();
	}
	
	@GetMapping("users/{id}")
	public User show(@PathVariable Integer id, HttpServletResponse res) {
		User user = null;
		try {
			user = userServ.show(id);
			if (user == null) {
				res.setStatus(404);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return user;
	}
	
	@GetMapping("users/login/{username}/{password}")
	public User login(@PathVariable String username, @PathVariable String password, HttpServletResponse res) {
		User user = null;
		try {
			user = userServ.loginUser(username, password);
			if (user == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return user;
	}
	
	@PostMapping("users")
	public User createUser(@RequestBody User user, HttpServletResponse res, HttpServletRequest req) {
		try {
			user = userServ.createUser(user);
			if(user != null) {
				res.setStatus(201);
				StringBuffer url = req.getRequestURL();
				url.append("/").append(user.getId());
				res.setHeader("Location", url.toString());
			} 
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return user;
	}
	
	@PutMapping("users/{id}")
	public User updateUser(@PathVariable Integer id, @RequestBody User user, HttpServletResponse res, HttpServletRequest req) {
		try {
			user = userServ.updateUser(id, user);
			if(user == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return user;
	}

	@DeleteMapping("users/{id}")
	public void DeleteUser(@PathVariable Integer id, HttpServletResponse res) {
		boolean deleted = false;
		try {
			deleted = userServ.deleteUser(id);
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
