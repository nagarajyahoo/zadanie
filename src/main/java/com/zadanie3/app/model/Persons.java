package com.zadanie3.app.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Collection;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
public class Persons {
    private Collection<Person> persons = new ArrayList<>();
}
