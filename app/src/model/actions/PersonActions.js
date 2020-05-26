import axios from "axios";
import {get_persons_successful} from "./index";

const getPersonsSuccessful = (data) => {
    return {
        type: get_persons_successful,
        data: data.persons
    }
}

export const getPersons = () => {
    const url = '/api/persons';
    return (dispatch) => {
        axios.get(url)
            .then(response => {
                dispatch(getPersonsSuccessful(response.data));
            });
    }

    // return (dispatch) => {
    //     setTimeout( () => {
    //
    //             dispatch(getPersonsSuccessful(personJson));
    //         }, 500
    //     )
    // }

};

export const addPerson = (person) => {
    const url = '/api/persons';
    return (dispatch) => {
        axios.post(url, person)
            .then(response => {
                dispatch(getPersonsSuccessful(response.data));
            });
    }
}

export const editPerson = (id, person) => {
    const url = '/api/persons/' + id;
    return (dispatch) => {
        axios.put(url, person)
            .then(response => {
                dispatch(getPersonsSuccessful(response.data));
            });
    }
}

const personJson = JSON.parse('{"persons":[{"id":1,"firstName":"fname","surname":"lname","birthDate":"dob","email":"email","permanentAddress":"permadd","correspondenceAddress":"conadd"},{"id":2,"firstName":"fname","surname":"lname","birthDate":"dob","email":"email","permanentAddress":"permadd","correspondenceAddress":"conadd"},{"id":3,"firstName":"fname","surname":"lname","birthDate":"dob","email":"email","permanentAddress":"permadd","correspondenceAddress":"conadd"},{"id":4,"firstName":"fname","surname":"lname","birthDate":"dob","email":"email","permanentAddress":"permadd","correspondenceAddress":"conadd"},{"id":5,"firstName":"fname","surname":"lname","birthDate":"dob","email":"email","permanentAddress":"permadd","correspondenceAddress":"conadd"},{"id":6,"firstName":"fname","surname":"lname","birthDate":"dob","email":"email","permanentAddress":"permadd","correspondenceAddress":"conadd"},{"id":7,"firstName":"fname","surname":"lname","birthDate":"dob","email":"email","permanentAddress":"permadd","correspondenceAddress":"conadd"},{"id":8,"firstName":"fname","surname":"lname","birthDate":"dob","email":"email","permanentAddress":"permadd","correspondenceAddress":"conadd"},{"id":9,"firstName":"fname","surname":"lname","birthDate":"dob","email":"email","permanentAddress":"permadd","correspondenceAddress":"conadd"}]}');