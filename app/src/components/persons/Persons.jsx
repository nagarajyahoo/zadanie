import React from "react";
import {connect} from "react-redux";
import * as PersonActions from "../../model/actions/PersonActions";
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
    FormFeedback
} from 'reactstrap';
import {isValidDate} from "../validations";

class Persons extends React.Component {
    state = {
        displayAddPersonModal: false,
        displayEditPersonModal: false,
        selectedPerson: undefined,
        allPersons: [],
        editPerson: {
            firstName: undefined,
            surname: undefined,
            birthDate: undefined,
            email: undefined,
            permanentAddress: undefined,
            correspondenceAddress: undefined,
        },
        addPerson: {
            firstName: undefined,
            surname: undefined,
            birthDate: undefined,
            email: undefined,
            permanentAddress: undefined,
            correspondenceAddress: undefined,
        }
    }

    componentDidMount() {
        this.props.getAllPersons();
    }

    savePerson = () => {
        if (!this.validateAddFields()) {
            console.log('save person')
            this.props.addPerson(this.state.addPerson);
        }
    }

    deletePerson = () => {

    }

    editPerson = () => {
        if (!this.validateEditFields()) {
            console.log('edit person')
            this.props.editPerson(this.state.selectedPerson, this.state.editPerson);
        }
    }

    toggleAddPerson = () => {
        this.setState({
            addPersonInvalidFirstName: false,
            addPersonInvalidSurname: false,
            addPersonInvalidBirthDate: false,
            addPersonInvalidEmail: false,
            addPersonInvalidCorrespondenceAddress: false
        })

        const display = this.state.displayAddPersonModal;
        this.setState({
            displayAddPersonModal: !display
        })
    }

    toggleEditPerson = () => {
        this.setState({
            editPersonInvalidFirstName: false,
            editPersonInvalidSurname: false,
            editPersonInvalidBirthDate: false,
            editPersonInvalidEmail: false,
            editPersonInvalidCorrespondenceAddress: false
        })

        const ep = this.props.persons.filter((per) => per.id === this.state.selectedPerson)
        const display = this.state.displayEditPersonModal;
        this.setState({
            displayEditPersonModal: !display,
            editPerson: ep[0]
        })
    }

    render() {
        return (
            <div style={{marginTop: '10px', width: '80%', marginLeft: '20px'}}>
                {this.addPersonModal()}
                {this.editPersonModal()}

                <Table bordered>
                    <thead>
                    <tr>
                        <th>Select</th>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Surname</th>
                        <th>Date Of Birth</th>
                        <th>Email</th>
                        <th>Permanent Address</th>
                        <th>Correspondence Address</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.getTbody()}
                    </tbody>
                </Table>
                <div>
                    <Button color={'primary'} onClick={this.toggleAddPerson}>Add Person</Button> &nbsp;
                    <Button color={'info'} onClick={this.toggleEditPerson} disabled={!this.state.selectedPerson}>Edit
                        Person</Button> &nbsp;
                    <Button color={'danger'} onClick={this.deletePerson}>Delete Person</Button>
                </div>
            </div>
        )
    }

    updateAddPersonVal = (e) => {
        const addPerson = this.state.addPerson;
        addPerson[e.target.id] = e.target.value;
        this.setState({
            addPerson
        });
    }

    validateAddFields = () => {
        this.setState({
            addPersonInvalidFirstName: !this.state.addPerson.firstName,
            addPersonInvalidSurname: !this.state.addPerson.surname,
            addPersonInvalidBirthDate: !isValidDate(this.state.addPerson.birthDate),
            addPersonInvalidEmail: this.validateEmail(this.state.addPerson.email),
            addPersonInvalidCorrespondenceAddress: !this.state.addPerson.correspondenceAddress
        })

        return !this.state.addPerson.firstName ||
            !this.state.addPerson.surname ||
            !isValidDate(this.state.addPerson.birthDate) ||
            this.validateEmail(this.state.addPerson.email) ||
            !this.state.addPerson.correspondenceAddress;
    }

    validateEmail(email) {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let invalid;
        if (emailRex.test(email)) {
            invalid = false;
        } else {
            invalid = true
        }
        return invalid;
    }

    validateEditFields = () => {
        this.setState({
            editPersonInvalidFirstName: !this.state.editPerson.firstName,
            editPersonInvalidSurname: !this.state.editPerson.surname,
            editPersonInvalidBirthDate: !isValidDate(this.state.editPerson.birthDate),
            editPersonInvalidEmail: this.validateEmail(this.state.editPerson.email),
            editPersonInvalidCorrespondenceAddress: !this.state.editPerson.correspondenceAddress
        })

        return !this.state.editPerson.firstName ||
            !this.state.editPerson.surname ||
            !isValidDate(this.state.editPerson.birthDate) ||
            this.validateEmail(this.state.editPerson.email)||
            !this.state.editPerson.correspondenceAddress;
    }

    addPersonModal = () => {
        return <Modal toggle={this.toggleAddPerson} isOpen={this.state.displayAddPersonModal} size={'lg'}>
            <ModalHeader>Add Person</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup row>
                        <Label for="firstName" sm={2}>First Name</Label>
                        <Col sm={10}>
                            <Input type="text" name="firstName" id="firstName"
                                   invalid={this.state.addPersonInvalidFirstName}
                                   onChange={(e) => this.updateAddPersonVal((e))}/>
                            <FormFeedback>Required field</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="surname" sm={2}>Last Name</Label>
                        <Col sm={10}>
                            <Input type="text" name="surname" id="surname"
                                   invalid={this.state.addPersonInvalidSurname}
                                   onChange={(e) => this.updateAddPersonVal((e))}/>
                            <FormFeedback>Required field</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="birthDate" sm={2}>Date Of Birth</Label>
                        <Col sm={10}>
                            <Input type="text" name="birthDate" id="birthDate"
                                   invalid={this.state.addPersonInvalidBirthDate}
                                   onChange={(e) => this.updateAddPersonVal((e))}
                                   placeHolder={'MM/DD/YYYY'}/>
                            <FormFeedback>Please enter valid date in MM/DD/YYYY format</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="email" sm={2}>Email</Label>
                        <Col sm={10}>
                            <Input type="email" name="email" id="email"
                                   invalid={this.state.addPersonInvalidEmail}
                                   onChange={(e) => this.updateAddPersonVal((e))}/>
                            <FormFeedback>Invalid email</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="permanentAddress" sm={2}>Perm Address</Label>
                        <Col sm={10}>
                            <Input type="textarea" name="permanentAddress" id="permanentAddress"
                                   onChange={(e) => this.updateAddPersonVal((e))}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="correspondenceAddress" sm={2}>Cor Address</Label>
                        <Col sm={10}>
                            <Input type="textarea" name="correspondenceAddress" id="correspondenceAddress"
                                   invalid={this.state.addPersonInvalidCorrespondenceAddress}
                                   onChange={(e) => this.updateAddPersonVal((e))}/>
                            <FormFeedback>Required field</FormFeedback>
                        </Col>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.savePerson}>Save Person</Button>{' '}
                <Button color="secondary" onClick={this.toggleAddPerson}>Cancel</Button>
            </ModalFooter>
        </Modal>;
    }

    updateEditPersonVal = (e) => {
        const editPerson = this.state.editPerson;
        editPerson[e.target.id] = e.target.value;
        this.setState({
            editPerson
        });
    }

    editPersonModal = () => {
        return <Modal toggle={this.toggleEditPerson} isOpen={this.state.displayEditPersonModal} size={'lg'}>
            <ModalHeader>Edit Person</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup row>
                        <Label for="firstName" sm={2}>First Name</Label>
                        <Col sm={10}>
                            <Input type="text" name="firstName" id="firstName"
                                   value={this.state.editPerson.firstName}
                                   invalid={this.state.editPersonInvalidFirstName}
                                   onChange={(e) => this.updateEditPersonVal(e)}/>
                            <FormFeedback>Required field</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="surname" sm={2}>Last Name</Label>
                        <Col sm={10}>
                            <Input type="text" name="surname" id="surname"
                                   value={this.state.editPerson.surname}
                                   invalid={this.state.editPersonInvalidSurname}
                                   onChange={(e) => this.updateEditPersonVal(e)}/>
                            <FormFeedback>Required field</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="birthDate" sm={2}>Date Of Birth</Label>
                        <Col sm={10}>
                            <Input type="text" name="birthDate" id="birthDate"
                                   value={this.state.editPerson.birthDate}
                                   invalid={this.state.editPersonInvalidBirthDate}
                                   onChange={(e) => this.updateEditPersonVal(e)}
                                   placeHolder={'MM/DD/YYYY'}/>
                            <FormFeedback>Please enter valid date in MM/DD/YYYY format</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="email" sm={2}>Email</Label>
                        <Col sm={10}>
                            <Input type="email" name="email" id="email"
                                   value={this.state.editPerson.email}
                                   invalid={this.state.editPersonInvalidEmail}
                                   onChange={(e) => this.updateEditPersonVal(e)}/>
                            <FormFeedback>Invalid email</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="permanentAddress" sm={2}>Perm Address</Label>
                        <Col sm={10}>
                            <Input type="textarea" name="permanentAddress" id="permanentAddress"
                                   value={this.state.editPerson.permanentAddress}
                                   onChange={(e) => this.updateEditPersonVal(e)}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="correspondenceAddress" sm={2}>Cor Address</Label>
                        <Col sm={10}>
                            <Input type="textarea" name="correspondenceAddress" id="correspondenceAddress"
                                   value={this.state.editPerson.correspondenceAddress}
                                   invalid={this.state.editPersonInvalidCorrespondenceAddress}
                                   onChange={(e) => this.updateEditPersonVal(e)}/>
                            <FormFeedback>Required field</FormFeedback>
                        </Col>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.editPerson}>Save Person</Button>{' '}
                <Button color="secondary" onClick={this.toggleEditPerson}>Cancel</Button>
            </ModalFooter>
        </Modal>;
    }

    selectedPerson = (personId) => {
        console.log('personid ' + personId)
        this.setState({
            selectedPerson: personId
        })
    }

    getTbody = () => {
        const row = this.props.persons.map(person => {
            return (
                <tr>
                    <td><input type="checkbox" onChange={() => this.selectedPerson(person.id)}/></td>
                    <td>{person.id}</td>
                    <td>{person.firstName}</td>
                    <td>{person.surname}</td>
                    <td>{person.birthDate}</td>
                    <td>{person.email}</td>
                    <td>{person.permanentAddress}</td>
                    <td>{person.correspondenceAddress}</td>
                </tr>
            )
        })
        return row;
    }
}

const mapStateToProps = (state) => {
    return {
        persons: state.persons.persons
    }
};

const mapActionToProps = (dispatch) => {
    return {
        getAllPersons: () => dispatch(PersonActions.getPersons()),
        editPerson: (id, person) => dispatch(PersonActions.editPerson(id, person)),
        addPerson: (person) => dispatch(PersonActions.addPerson(person))
    }
};

export default connect(mapStateToProps, mapActionToProps)(Persons);