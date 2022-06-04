package com.skilldistillery.medtrack.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class MedicationTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Medication med;

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
		med = em.find(Medication.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		med = null;
	}
	
	@Test
	@DisplayName("Medication Mapping Test")
	void test_medication_mapping() {
		assertNotNull(med);
		assertEquals("Spironolactone", med.getName());
		
	}

}
