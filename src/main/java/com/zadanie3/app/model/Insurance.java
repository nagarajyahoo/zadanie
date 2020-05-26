package com.zadanie3.app.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
public class Insurance {
    private int id;
    private String creationDate;
    private String insuranceCategory;
    private String insuranceType;
    private int personId;
    private String beginDate;
    private String amount;
    private String monthlyInstallment;


    //life insurance fields
    private String accidentalInsurance;
    private String permanentAccidentalDisability;
    private String deathInConsequence;
    private String accidentCompensationForHospitalisation;

    //travel insurance fields
    private String europe;
    private String travelPurpose;

    //Household insurance:
    private String householdValue;

    //Property of insurance:
    private String garage;
    private String estateType;
    private String address;
    private String valueProperty;
}
