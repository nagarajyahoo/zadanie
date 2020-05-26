package com.zadanie3.app.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
public class Person {
    private int id;
    String firstName;
    String surname;
    String birthDate;
    String email;
    String permanentAddress;
    String correspondenceAddress;
}
