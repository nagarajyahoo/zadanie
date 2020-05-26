package com.zadanie3.app.service;

import com.zadanie3.app.model.Person;
import com.zadanie3.app.model.Persons;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PersonService {
    private static final Map<Integer, Person> persons_cache = new HashMap<>();
    private static int personCounter = 1;

    public Persons getPersons() {
        Persons persons = new Persons();
        persons.setPersons(persons_cache.values());
        return persons;
    }

    public Persons addPerson(Person person) {
        person.setId(personCounter++);
        persons_cache.put(personCounter-1, person);
        return getPersons();
    }

    public Persons deletePerson(int id) {
        persons_cache.remove(id);
        return getPersons();
    }

    public Person getPerson(int id) {
        return persons_cache.get(id);
    }

    public Persons editPerson(Person person, int personId) {
        persons_cache.remove(personId);
        persons_cache.put(personId, person);
        return getPersons();
    }
}
