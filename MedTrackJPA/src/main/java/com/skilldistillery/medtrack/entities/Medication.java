package com.skilldistillery.medtrack.entities;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Medication {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private Integer dosage;
	@Column(name="primary_use")
	private String primaryUse;
	@Column(name="secondary_use")
	private String secondaryUse;
	@Column(name="use_frequency")
	private String useFrequency;
	
	public Medication() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getDosage() {
		return dosage;
	}

	public void setDosage(Integer dosage) {
		this.dosage = dosage;
	}

	public String getPrimaryUse() {
		return primaryUse;
	}

	public void setPrimaryUse(String primaryUse) {
		this.primaryUse = primaryUse;
	}

	public String getSecondaryUse() {
		return secondaryUse;
	}

	public void setSecondaryUse(String secondaryUse) {
		this.secondaryUse = secondaryUse;
	}

	public String getUseFrequency() {
		return useFrequency;
	}

	public void setUseFrequency(String useFrequency) {
		this.useFrequency = useFrequency;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Medication other = (Medication) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Medication [id=" + id + ", name=" + name + ", primaryUse=" + primaryUse + "]";
	}

	
}
