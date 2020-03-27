import React, {Component} from 'react';
import {Button, Col, Form, FormGroup} from "reactstrap";
import FormElement from "../../Components/Ui/Form/FormElement";
import {connect} from "react-redux";
import {orderRegister} from "../../Store/Actions/actionUser";

class Register extends Component {
    state = {
        username: '',
        password: ''
    };

    inputChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    submitChangeHandler = (e) => {
        e.preventDefault();
        this.props.orderRegister({...this.state})
    };

    getFieldError = fieldName => {
        try {
            return this.props.error[fieldName]
        } catch (e) {
            return undefined
        }
    };

    render() {
        return (
            <Form onSubmit={this.submitChangeHandler}>
                <h1>Register new user!</h1>
                <FormElement
                    propertyName='username'
                    type='text'
                    title='Username'
                    value={this.state.username}
                    onChange={this.inputChangeHandler}
                    autoComplete="new-username"
                    error={this.getFieldError('username')}
                    required={true}
                />
                <FormElement
                    propertyName='password'
                    type='password'
                    title='Password'
                    value={this.state.password}
                    onChange={this.inputChangeHandler}
                    autoComplete="new-password"
                    error={this.getFieldError('password')}
                    required={true}
                />
                <FormGroup row>
                    <Col sm={{offset: 2, size: 10}}>
                        <Button type="submit" color="primary">Register</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

const mapStateToProps = state => ({
    error: state.users.error
});

const mapDispatchToProps = dispatch => ({
    orderRegister: (user) => dispatch(orderRegister(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);