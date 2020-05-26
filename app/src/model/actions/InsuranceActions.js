import axios from "axios";
import {get_insurances_successful} from "./index";

const getInsurancesSuccessful = (data) => {
    return {
        type: get_insurances_successful,
        data: data.insurances
    }
}

export const getInsurances = (personId) => {
    const url = `/api/persons/${personId}/insurances`;
    return (dispatch) => {
        axios.get(url)
            .then(response => {
                dispatch(getInsurancesSuccessful(response.data));
            });
    }

    // return (dispatch) => {
    //     setTimeout(()=> {
    //         dispatch(getInsurancesSuccessful(inss));
    //     }, 500)
    // }
};

export const addInsurance = (personId, insurance) => {
    const url = `/api/persons/${personId}/insurances`;
    return (dispatch) => {
        axios.post(url, insurance)
            .then(response => {
                dispatch(getInsurancesSuccessful(response.data));
            });
    }
}

export const editInsurance = (personId, insuranceId, insurance) => {
    const url = `/api/persons/${personId}/insurances/${insuranceId}`;
    return (dispatch) => {
        axios.put(url, insurance)
            .then(response => {
                dispatch(getInsurancesSuccessful(response.data));
            });
    }
}

const inss = JSON.parse('{"insurances":[{"id":1,"creationDate":null,"insuranceCategory":"life","insuranceType":null,"personId":0,"beginDate":"fsdf","amount":"dsfdsf","monthlyInstallment":"sdf","accidentalInsurance":"sdfs","permanentAccidentalDisability":"sdfdsf","deathInConsequence":"dsfdsf","accidentCompensationForHospitalisation":"sdfdsf","europe":false,"travelPurpose":null,"householdValue":null,"garage":null,"estateType":null,"address":null,"valueProperty":null},{"id":2,"creationDate":null,"insuranceCategory":"life","insuranceType":null,"personId":0,"beginDate":"fsdf","amount":"dsfdsf","monthlyInstallment":"sdf","accidentalInsurance":"sdfs","permanentAccidentalDisability":"sdfdsf","deathInConsequence":"dsfdsf","accidentCompensationForHospitalisation":"sdfdsf","europe":false,"travelPurpose":null,"householdValue":null,"garage":null,"estateType":null,"address":null,"valueProperty":null},{"id":3,"creationDate":null,"insuranceCategory":"life","insuranceType":null,"personId":0,"beginDate":"fsdf","amount":"dsfdsf","monthlyInstallment":"sdf","accidentalInsurance":"sdfs","permanentAccidentalDisability":"sdfdsf","deathInConsequence":"dsfdsf","accidentCompensationForHospitalisation":"sdfdsf","europe":false,"travelPurpose":null,"householdValue":null,"garage":null,"estateType":null,"address":null,"valueProperty":null},{"id":4,"creationDate":null,"insuranceCategory":"life","insuranceType":null,"personId":0,"beginDate":"fsdf","amount":"dsfdsf","monthlyInstallment":"sdf","accidentalInsurance":"sdfs","permanentAccidentalDisability":"sdfdsf","deathInConsequence":"dsfdsf","accidentCompensationForHospitalisation":"sdfdsf","europe":false,"travelPurpose":null,"householdValue":null,"garage":null,"estateType":null,"address":null,"valueProperty":null},{"id":5,"creationDate":null,"insuranceCategory":"life","insuranceType":null,"personId":0,"beginDate":"fsdf","amount":"dsfdsf","monthlyInstallment":"sdf","accidentalInsurance":"sdfs","permanentAccidentalDisability":"sdfdsf","deathInConsequence":"dsfdsf","accidentCompensationForHospitalisation":"sdfdsf","europe":false,"travelPurpose":null,"householdValue":null,"garage":null,"estateType":null,"address":null,"valueProperty":null}]}');