import {Table} from "reactstrap";
import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader,} from 'reactstrap';
import {AvForm, AvField} from "availity-reactstrap-validation";

class Home extends Component {

    state = {
        modal: false,
        content: null,
    }

    componentDidMount() {
        this.fetchData()
    }


    DeleteId = (id) => {
        const {Delete} = this.props
        Delete(id)
        this.fetchData()
        console.log(id)
    }

    EditItem = () => {
        this.EditToggle()
    }

    EditToggle = (id) => {
        const {Delete} = this.props
        Delete(id)
        this.setState({
            modal: !this.state.modal
        })
        this.fetchData()
    }
    fetchData = () => {
        const {data} = this.props
        const {modal} = this.state
        this.setState({
            content: data.length ? data.map((item, index) => (
                <tbody key={index}>
                <tr>
                    <th scope="row">
                        {index + 1}
                    </th>
                    <td>
                        {item.FirstName}
                    </td>
                    <td>
                        {item.LastName}
                    </td>
                    <td>
                        {parseInt(item.Age)}
                    </td>
                    <td>
                        {item.Email}
                    </td>

                    <td>
                        <button onClick={() => this.EditToggle(item.id)} className="btn btn-warning  mx-1">
                            edit
                        </button>
                        <button onClick={() => this.DeleteId(item.id)} className="btn btn-danger">
                            del
                        </button>
                    </td>
                </tr>
                </tbody>
            )) : <div className="container">
                <div className="row">
                    <div className="d-flex">
                        <div className="col-lg-6"></div>
                        <div className="col-lg-6"></div>
                        <div className="col-lg-2"></div>
                        <div className="col-lg-6">
                            <h1 className="font-monospace text-secondary">no data</h1>
                        </div>
                    </div>
                </div>

                <Modal isOpen={modal} toggle={this.EditToggle}>
                    <ModalHeader toggle={this.EditToggle}>Modal title</ModalHeader>
                    <AvForm onValidSubmit={this.EditItem}>

                        <ModalBody>
                            <AvField name="FirstName" label="FirstName" type="text"
                                     required/>
                            <AvField name="LastName" label="LastName" type="text" required/>
                            <AvField name="Age" label="Age" type="number" required/>
                            <AvField name="Email" label="Email" type="Email" required/>
                        </ModalBody>

                        <ModalFooter>
                            <Button onClick={this.EditItem} color="primary"
                                    type="submit">save</Button>{' '}
                            <Button color="secondary" onClick={this.EditToggle}>Cancel</Button>
                        </ModalFooter>
                    </AvForm>
                </Modal>
            </div>

        })
    }

    render() {

        const toggle = () => {
            this.setState({
                modal: !this.state.modal
            })
        }

        const {data, AddNewItem} = this.props
        const {modal, content} = this.state

        const handleValidSubmit = (events, values) => {
            AddNewItem(values)
            console.log(data)
            toggle()
            this.fetchData()
        }

        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="d-flex align-content-between">
                            <div className="text-secondary flex-fill"><h2
                                className=" text text-success font-monospace">Welcome to My List!</h2></div>
                            <Button color="success" onClick={toggle}>
                                Add
                            </Button>
                            <Modal isOpen={modal} toggle={toggle}>
                                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                                <AvForm onValidSubmit={handleValidSubmit}>
                                    <ModalBody>
                                        <AvField name="FirstName" label="FirstName" type="text" required/>
                                        <AvField name="LastName" label="LastName" type="text" required/>
                                        <AvField name="Age" label="Age" type="number" required/>
                                        <AvField name="Email" label="Email" type="Email" required/>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" type="submit"
                                                onSubmit={handleValidSubmit}>save</Button>{' '}
                                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                                    </ModalFooter>
                                </AvForm>

                            </Modal>
                        </div>
                        <hr/>
                        <Table>
                            <thead>
                            <tr>
                                <th>
                                    id
                                </th>
                                <th>
                                    FirstName
                                </th>
                                <th>
                                    LastName
                                </th>
                                <th>
                                    Age
                                </th>
                                <th>
                                    Email
                                </th>
                                <th>
                                    Act
                                </th>
                                <th></th>
                            </tr>
                            </thead>
                            {content}
                        </Table>

                    </div>
                </div>
            </div>
        );
    }
}

export default Home;