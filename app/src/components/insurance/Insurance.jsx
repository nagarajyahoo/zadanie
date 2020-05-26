import React from "react";
import * as PersonActions from "../../model/actions/PersonActions";
import * as InsuranceActions from "../../model/actions/InsuranceActions";
import {connect} from "react-redux";
import {
    Table,
    Button,
    Input,
    ModalHeader,
    Modal,
    ModalFooter,
    ModalBody,
    FormGroup,
    Form,
    Col,
    Label,
    FormText, FormFeedback
} from 'reactstrap';
import {isNumberKey, isValidDate} from "../validations";

class Insurance extends React.Component {
    state = {
        displayAddInsuranceModal: false,
        displayEditInsuranceModal: false,
        selectedPerson: -1,
        selectedInsurance: undefined,
        allPersons: [],
        editInsurance: undefined,
        addInsurance: {
            creationDate: undefined,
            insuranceCategory: 'life',
            insuranceType: undefined,
            personId: undefined,
            beginDate: undefined,
            amount: undefined,
            monthlyInstallment: undefined,

            //life insurance fields
            accidentalInsurance: undefined,
            permanentAccidentalDisability: undefined,
            deathInConsequence: undefined,
            accidentCompensationForHospitalisation: undefined,

            //travel insurance fields
            europe: undefined,
            travelPurpose: undefined,

            estateType: undefined,
            address: undefined,
            valueProperty: undefined,

            //Household insurance:
            householdValue: undefined,

            //Property of insurance:
            garage: undefined,
        }
    }

    getPersons = () => {
        return this.props.persons.map(per => {
            return <option value={per.id}>{per.firstName} {per.surname}</option>
        })
    }

    componentDidMount() {
        this.props.getAllPersons();
    }

    getInsurances = (e) => {
        this.setState({
            selectedPerson: e.target.value
        })
    }

    fetchInsurances = () => {
        this.props.getInsurances(this.state.selectedPerson);
    }

    selectedInsurance= (id) => {
        this.setState({
            selectedInsurance: id
        })
    }

    render() {
        return (
            <div style={{marginLeft: "20px"}}>
                <div style={{width: "50%", marginTop: '20px'}}>
                    {this.addInsuranceModal()}
                </div>
                <div style={{width: "50%", marginTop: '20px'}}>
                    <FormGroup row>
                        <Label for="personSelect" sm={2}>Person: </Label>
                        <Col sm={5}>
                            <Input type="select" name="personSelect" id="personSelect"
                                   onChange={(e) => this.getInsurances(e)}>
                                <option value={-1}>All Persons</option>
                                {this.getPersons()}
                            </Input>
                        </Col>
                        <Col sm={3}>
                            <Button color={'primary'} onClick={this.fetchInsurances}>Get Insurances</Button>
                        </Col>
                    </FormGroup>
                </div>
                <div style={{width: "70%", marginTop: '20px'}}>
                    <Table bordered>
                        <thead>
                        <tr>
                            <th>Select</th>
                            <th>#</th>
                            <th>Insurer</th>
                            <th>Insurance Category</th>
                            <th>Insurance Type</th>
                            <th>Created Date</th>
                            <th>Start Date</th>
                            <th>Contract Amount</th>
                            <th>Monthly Installment</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.getTbody()}
                        </tbody>
                    </Table>
                </div>
                <div>
                    <Button color={'primary'} onClick={this.toggleAddInsurance} disabled={this.state.selectedPerson === -1}>Add Insurance</Button> &nbsp;
                    <Button color={'info'} onClick={this.toggleEditInsurance} disabled={this.state.selectedPerson === -1 || this.state.editInsurance}>Edit
                        Insurance</Button> &nbsp;
                    <Button color={'danger'}>Delete Insurance</Button>
                </div>
            </div>
        )
    }

    getTbody = () => {
        const row = this.props.insurance.map(insurance => {
            console.log(insurance)
            return (
                <tr>
                    <td><input type="checkbox" onChange={() => this.selectedInsurance(insurance.id)}/></td>
                    <td>{insurance.id}</td>
                    <td>{insurance.personId}</td>
                    <td>{insurance.insuranceCategory === 'life' ? 'Life Insurance' : 'Non Life Insurance'}</td>
                    <td>{insurance.insuranceType}</td>
                    <td>{insurance.creationDate}</td>
                    <td>{insurance.beginDate}</td>
                    <td>{insurance.amount}</td>
                    <td>{insurance.monthlyInstallment}</td>
                </tr>
            )
        })
        return row;
    }

    toggleAddInsurance = () => {
        this.setState({
            invalid_creationDate: false,
            invalid_insuranceCategory: false,
            invalid_insuranceType: false,
            invalid_personId: false,
            invalid_beginDate: false,
            invalid_amount: false,
            invalid_monthlyInstallment: false,

            //life insurance fields
            invalid_accidentalInsurance: false,
            invalid_permanentAccidentalDisability: false,
            invalid_deathInConsequence: false,
            invalid_accidentCompensationForHospitalisation: false,

            //travel insurance fields
            invalid_europe: false,
            invalid_travelPurpose: false,

            invalid_estateType: false,
            invalid_address: false,
            invalid_valueProperty: false,

            //Household insurance:
            invalid_householdValue: false,

            //Property of insurance:
            invalid_garage: false,
        })
        const display = this.state.displayAddInsuranceModal;
        this.setState({
            displayAddInsuranceModal: !display
        })
    }

    toggleEditInsurance = () => {
        const ep = this.props.insurance.filter((per) => per.id === this.state.selectedInsurance)
        const display = this.state.displayEditInsuranceModal;
        this.setState({
            displayEditInsuranceModal: !display,
            editInsurance: ep[0]
        })
    }

    updateAddInsuranceVal = (e) => {
        const addInsurance = this.state.addInsurance;
        addInsurance[e.target.id] = e.target.value;
        this.setState({
            addInsurance
        });
    }

    updateEditInsuranceVal = (e) => {
        const editInsurance = this.state.editInsurance;
        editInsurance[e.target.id] = e.target.value;
        this.setState({
            editInsurance
        });
    }

    getInsuranceTypes = (insuranceCategory) => {
        if ("non-life" === insuranceCategory) {
            const nonLife = ["Household", "Property"]
            return nonLife.map(per => {
                return <option value={per}>{per}</option>
            })
        }
        else {
            const life = ["Accidental", "Travel"]
            return life.map(per => {
                return <option value={per}>{per}</option>
            })
        }
    }

    saveInsurance = () => {
        if(!this.validateFields()) {
            console.log('saving')
            const personId = this.state.selectedPerson;
            const insurance = this.state.addInsurance;
            this.props.addInsurance(personId, insurance);
        }
    }

    validateFields = () => {
        this.setState({
            invalid_insuranceType: !this.state.addInsurance.insuranceType  || this.state.addInsurance.insuranceType === "",
            invalid_beginDate: !isValidDate(this.state.addInsurance.beginDate),
            invalid_amount: !this.state.addInsurance.amount,
            invalid_monthlyInstallment: !this.state.addInsurance.monthlyInstallment,
        })
        return (
            !this.state.addInsurance.insuranceType || this.state.addInsurance.insuranceType === "" ||
            !isValidDate(this.state.addInsurance.beginDate) ||
            !this.state.addInsurance.amount ||
            !this.state.addInsurance.monthlyInstallment
        );
    }

    addInsuranceModal = () => {
        return <Modal toggle={this.toggleAddInsurance} isOpen={this.state.displayAddInsuranceModal} size={'lg'}>
            <ModalHeader>Add Insurance</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup row>
                        <Label for="insuranceCategory" sm={3}>Insurance Category</Label>
                        <Col sm={9}>
                            <Input type="select" name="insuranceCategory" id="insuranceCategory"
                                   onChange={(e) => this.updateAddInsuranceVal((e))}>
                                <option value={"life"}>Life Insurance</option>
                                <option value={"non-life"}>Non Life Insurance</option>
                            </Input>
                            <FormFeedback>Select Insurance Category</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="insuranceType" sm={3}>Insurance Type</Label>
                        <Col sm={9}>
                            <Input type="select" name="insuranceType" id="insuranceType"
                                   invalid={this.state.invalid_insuranceType}
                                   onChange={(e) => this.updateAddInsuranceVal((e))}>
                                <option value={""}>Select</option>
                                {this.getInsuranceTypes(this.state.addInsurance.insuranceCategory)}
                            </Input>
                            <FormFeedback>Select Insurance Type</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="beginDate" sm={3}>Begin Date</Label>
                        <Col sm={9}>
                            <Input type="text" name="beginDate" id="beginDate"
                                   placeHolder={'MM/DD/YYYY'}
                                   invalid={this.state.invalid_beginDate}
                                   onChange={(e) => this.updateAddInsuranceVal((e))}/>
                            <FormFeedback>Please enter valid date in MM/DD/YYYY format</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="amount" sm={3}>Contract Amount</Label>
                        <Col sm={9}>
                            <Input type="text" name="amount" id="amount"
                                   invalid={this.state.invalid_amount}
                                   onKeyPress={(e) => isNumberKey(e)}
                                   onChange={(e) => this.updateAddInsuranceVal((e))}/>
                            <FormFeedback>Required field</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="monthlyInstallment" sm={3}>Monthly Installment</Label>
                        <Col sm={9}>
                            <Input type="text" name="monthlyInstallment" id="monthlyInstallment"
                                   invalid={this.state.invalid_monthlyInstallment}
                                   onKeyPress={(e) => isNumberKey(e)}
                                   onChange={(e) => this.updateAddInsuranceVal((e))}/>
                            <FormFeedback>Required field</FormFeedback>
                        </Col>
                    </FormGroup>

                    <FormGroup row hidden={this.state.addInsurance.insuranceType !== 'Accidental'}>
                        <Label for="accidentalInsurance" sm={3}>Accidental Insurance</Label>
                        <Col sm={9}>
                            <Input type="text" name="accidentalInsurance" id="accidentalInsurance"
                                   onKeyPress={(e) => isNumberKey(e)}
                                   onChange={(e) => this.updateAddInsuranceVal((e))}/>
                        </Col>
                    </FormGroup>

                    <FormGroup row hidden={this.state.addInsurance.insuranceType !== 'Accidental'}>
                        <Label for="permanentAccidentalDisability" sm={3}>Permanent Accidental Disability</Label>
                        <Col sm={9}>
                            <Input type="text" name="permanentAccidentalDisability" id="permanentAccidentalDisability"
                                   onKeyPress={(e) => isNumberKey(e)}
                                   onChange={(e) => this.updateAddInsuranceVal((e))}/>
                        </Col>
                    </FormGroup>

                    <FormGroup row hidden={this.state.addInsurance.insuranceType !== 'Accidental'}>
                        <Label for="deathInConsequence" sm={3}>Death In Consequence</Label>
                        <Col sm={9}>
                            <Input type="text" name="deathInConsequence" id="deathInConsequence"
                                   onKeyPress={(e) => isNumberKey(e)}
                                   onChange={(e) => this.updateAddInsuranceVal((e))}/>
                        </Col>
                    </FormGroup>

                    <FormGroup row hidden={this.state.addInsurance.insuranceType !== 'Accidental'}>
                        <Label for="accidentCompensationForHospitalisation" sm={3}>Accident Compensation For
                            Hospitalisation</Label>
                        <Col sm={9}>
                            <Input type="text" name="accidentCompensationForHospitalisation"
                                   id="accidentCompensationForHospitalisation"
                                   onKeyPress={(e) => isNumberKey(e)}
                                   onChange={(e) => this.updateAddInsuranceVal((e))}/>
                        </Col>
                    </FormGroup>

                    <FormGroup row hidden={this.state.addInsurance.insuranceType !== 'Travel'}>
                        <Label for="europe" sm={3}>Is Europe</Label>
                        <Col sm={9}>
                           <Input type="checkbox" name="europe"
                                   id="europe"
                                   onChange={(e) => this.updateAddInsuranceVal((e))}/>
                        </Col>
                    </FormGroup>

                    <FormGroup row hidden={this.state.addInsurance.insuranceType !== 'Travel'}>
                        <Label for="travelPurpose" sm={3}>Travel Purpose</Label>
                        <Col sm={9}>
                            <Input type="text" name="travelPurpose"
                                   id="travelPurpose"
                                   onChange={(e) => this.updateAddInsuranceVal((e))}/>
                        </Col>
                    </FormGroup>

                    <FormGroup row hidden={this.state.addInsurance.insuranceType !== 'Household'}>
                        <Label for="householdValue" sm={3}>Household Value</Label>
                        <Col sm={9}>
                            <Input type="text" name="householdValue"
                                   id="householdValue"
                                   onKeyPress={(e) => isNumberKey(e)}
                                   onChange={(e) => this.updateAddInsuranceVal((e))}/>
                        </Col>
                    </FormGroup>

                    <FormGroup row hidden={this.state.addInsurance.insuranceType !== 'Property'}>
                        <Label for="garage" sm={3}>Is Garage</Label>
                        <Col sm={9}>
                            <Input type="checkbox" name="garage"
                                   id="garage"
                                   onChange={(e) => this.updateAddInsuranceVal((e))}/>
                        </Col>
                    </FormGroup>

                    <FormGroup row hidden={this.state.addInsurance.insuranceType !== 'Property'}>
                        <Label for="estateType" sm={3}>Estate Type</Label>
                        <Col sm={9}>
                            <Input type="text" name="estateType"
                                   id="estateType"
                                   onChange={(e) => this.updateAddInsuranceVal((e))}/>
                        </Col>
                    </FormGroup>

                    <FormGroup row hidden={this.state.addInsurance.insuranceType !== 'Property'}>
                        <Label for="address" sm={3}>Address</Label>
                        <Col sm={9}>
                            <Input type="textarea" name="address"
                                   id="address"
                                   onChange={(e) => this.updateAddInsuranceVal((e))}/>
                        </Col>
                    </FormGroup>

                    <FormGroup row hidden={this.state.addInsurance.insuranceType !== 'Property'}>
                        <Label for="valueProperty" sm={3}>Property Value</Label>
                        <Col sm={9}>
                            <Input type="text" name="valueProperty"
                                   id="valueProperty"
                                   onKeyPress={(e) => isNumberKey(e)}
                                   onChange={(e) => this.updateAddInsuranceVal((e))}/>
                        </Col>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.saveInsurance}>Save Insurance</Button>{' '}
                <Button color="secondary" onClick={this.toggleAddInsurance}>Cancel</Button>
            </ModalFooter>
        </Modal>;
    }
}

const mapStateToProps = (state) => {
    return {
        persons: state.persons.persons,
        insurance: state.insurance.insurances
    }
};

const mapActionToProps = (dispatch) => {
    return {
        getAllPersons: () => dispatch(PersonActions.getPersons()),
        addInsurance: (person, insurance) => dispatch(InsuranceActions.addInsurance(person, insurance)),
        editInsurances: (person, insuranceId, insurance) => dispatch(InsuranceActions.editInsurance(person, insuranceId, insurance)),
        getInsurances: (person) => dispatch(InsuranceActions.getInsurances(person))
    }
};

export default connect(mapStateToProps, mapActionToProps)(Insurance);