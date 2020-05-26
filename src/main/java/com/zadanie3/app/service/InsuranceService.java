package com.zadanie3.app.service;

import com.zadanie3.app.model.Insurance;
import com.zadanie3.app.model.Insurances;
import com.zadanie3.app.model.Person;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class InsuranceService {
    private static final Map<Integer, Insurance> insurance_cache = new HashMap<>();
    private static final Map<Integer, List<Integer>> person_insurance = new HashMap<>();
    private static int insuranceCounter = 1;
    private static DateFormat dateFormat = new SimpleDateFormat("dd MMM yyyy");

    private final PersonService personService;

    @Inject
    public InsuranceService(PersonService personService) {
        this.personService = personService;
    }

    public Insurances getInsurances(int personId) {
        Insurances insurances = new Insurances();
        List<Insurance> personInsurances = new ArrayList<>();
        List<Integer> insIds = personId == -1 ? getAllInsuranceIds() : person_insurance.get(personId);
        if (insIds != null && !insIds.isEmpty()) {
            insIds.forEach(insId -> {
                Insurance ins = insurance_cache.get(insId);
                Person per = personService.getPerson(ins.getPersonId());
                ins.setPersonFirstName(per.getFirstName());
                ins.setPersonSurname(per.getSurname());
                personInsurances.add(ins);
            });
        }
        insurances.setInsurances(personInsurances);
        return insurances;
    }

    private List<Integer> getAllInsuranceIds() {
        List<Integer> allIds = new ArrayList<>();
        person_insurance.values().forEach(values -> allIds.addAll(values));
        return allIds;
    }

    public Insurances addInsurance(int person, Insurance insurance) {
        int insId = insuranceCounter++;
        insurance.setId(insId);
        insurance.setCreationDate(dateFormat.format(new Date()));
        insurance.setPersonId(person);
        insurance_cache.put(insId, insurance);
        person_insurance.putIfAbsent(person, new ArrayList<>());
        person_insurance.get(person).add(insId);
        return getInsurances(person);
    }

    public Insurances updateInsurance(int person, int insuranceId, Insurance insurance) {
        insurance_cache.put(insuranceId, insurance);
        return getInsurances(person);
    }
}
