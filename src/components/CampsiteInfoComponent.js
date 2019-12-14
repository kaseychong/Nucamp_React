import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, 
    Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);
const isNumber = val => !isNaN(+val);

function RenderCampsite({campsite}) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

function RenderComments({comments}) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>
                    Comments
                    </h4>
                {comments.map(comments => {
                    return (
                        <div key={comments.id}>
                            <p>{comments.text}<br />
                                -- {comments.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comments.date)))}
                            </p>
                        </div>
                    );
                })}
                <CommentForm></CommentForm>
            </div>
        );
    }
    return <div />;
}

function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}}</BreadcrumbItem>
                        </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    }
    return <div />;
}


class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            rating:'',
            author:'',
            text: ''
        };
            
        this.toggleModal = this.toggleModal.bind(this);
        this.handleModal = this.handleModal.bind(this);
        }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleModal(event) {
        alert(`Rating: ${event.rating} Author: ${event.author} text: ${event.text}`);
        this.toggleModal();
    }

    render() {
        return (
            <React.Fragment>
                <Button onClick={this.toggleModal} outline><i className="fa fa-pencil fa-lg"/> Submit Comment
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values => this.handleModal(values))}>
                                <div className="form-group">
                                    <Label htmlFor="rating">Rating</Label>
                                        <Control.select model=".rating" id="rating" name="rating" className="form-control"
                                        validators={{
                                            required,
                                            isNumber
                                        }}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        </Control.select>
                                        <Errors
                                        className="text-danger"
                                        model=".rating"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            isNumber: 'Must choose a rating',
                                        }}
                                        />
                                </div>
                                <div className="form-group">
                                    <Label htmlFor="author">Your Name</Label>
                                        <Control.text model=".author" id="author" name="author" className="form-control" placeholder="Your Name"
                                        validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15),
                                        }}
                                        />
                                        <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less',
                                        }}
                                        />
                                </div>
                                <div className="form-group">
                                    <Label htmlFor="text">Comment</Label>
                                        <Control.textarea model=".text" id="text" name="text" className="form-control" rows="6" placeholder="Your comment here"
                                        />
                                </div>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                            </LocalForm>
                        </ModalBody>
                </Modal>
            
            </React.Fragment>
        );
    }
}

export default CampsiteInfo;