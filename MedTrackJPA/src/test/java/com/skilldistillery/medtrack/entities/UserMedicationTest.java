package com.skilldistillery.medtrack.entities;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class UserMedicationTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private UserMedication userMed;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("MedTrackJPA");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		userMed = em.find(UserMedication.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		userMed = null;
	}
	
	@Test
	@DisplayName("Medication Mapping Test")
	void test_medication_mapping() {
		assertNotNull(userMed);
		assertTrue(userMed.isTaken());
		
	}

}
