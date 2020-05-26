package com.zadanie3.app.controller;


import com.zadanie3.app.model.Insurance;
import com.zadanie3.app.model.Insurances;
import com.zadanie3.app.model.Person;
import com.zadanie3.app.model.Persons;
import com.zadanie3.app.service.InsuranceService;
import com.zadanie3.app.service.PersonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;

@RestController
@RequestMapping("/api/persons")
public class PersonController {
    private final PersonService personService;
    private final InsuranceService insuranceService;

    @Inject
    public PersonController(PersonService personService, InsuranceService insuranceService) {
        this.personService = personService;
        this.insuranceService = insuranceService;
    }

    @GetMapping()
    public ResponseEntity<Persons> getPersons() {
        return ResponseEntity.ok(personService.getPersons());
    }

    @PostMapping()
    public ResponseEntity<Persons> addPerson(@RequestBody Person person) {
        return ResponseEntity.ok(personService.addPerson(person));
    }

    @DeleteMapping("/{personId}")
    public ResponseEntity<Persons> deletePerson(@PathVariable("personId") int personId) {
        return ResponseEntity.ok(personService.deletePerson(personId));
    }

    @PutMapping("/{personId}")
    public ResponseEntity<Persons> editPerson(@RequestBody Person person,
                                              @PathVariable("personId") int personId) {
        return ResponseEntity.ok(personService.editPerson(person, personId));
    }

    @GetMapping("/{personId}")
    public ResponseEntity<Person> addPerson(@PathVariable("personId") int personId) {
        return ResponseEntity.ok(personService.getPerson(personId));
    }

    @GetMapping("/{personId}/insurances")
    public ResponseEntity<Insurances> getInsurances(@PathVariable("personId") String personId) {
        return ResponseEntity.ok(insuranceService.getInsurances(Integer.parseInt(personId)));
    }

    @PutMapping("/{personId}/insurances/{insuranceId}")
    public ResponseEntity<Insurances> updateInsurance(@PathVariable("personId") String personId,
                                                      @PathVariable("insuranceId") int insuranceId,
                                                      @RequestBody Insurance insurance) {
        return ResponseEntity.ok(insuranceService.updateInsurance(Integer.parseInt(personId), insuranceId, insurance));
    }

    @PostMapping("/{personId}/insurances")
    public ResponseEntity<Insurances> addInsurance(@PathVariable("personId") String personId,
                                                      @RequestBody Insurance insurance) {
        return ResponseEntity.ok(insuranceService.addInsurance(Integer.parseInt(personId), insurance));
    }
}
