"use client"
import api from "@/app/services/api";
import notify from "@/app/services/notify";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import { Breadcrumb, BreadcrumbItem, Button, Col, Container, Form, FormFeedback, FormGroup, FormText, Input, Label, Row } from "reactstrap";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function NewEvent() {

    const [status, setStatus] = useState("");
    const [endDateReference, setEndDateReference] = useState<any>("");
    
    const handleStatusChange = (e: any) => {
        setStatus(e.target.value);
    };

    const handleStartDateChange = (e: any) => {
        setEndDateReference(moment(e.target.value).add(1, 'day').format('YYYY-MM-DD'))
    };

    const getFormattedDateTime = (date: any, time: any) => {
        if (!date || !time) return null;
        return moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm').toISOString();
    };

    const submitNewEvent = (e: any) =>{
        e.preventDefault();
        const body = {
            title: e.target.eventTitle.value,
            startDate: getFormattedDateTime(e.target.startDate.value, e.target.startTime.value),
            endDate: getFormattedDateTime(e.target.endDate.value, e.target.endTime.value),
            price: e.target.eventPrice.value,
            status: String(e.target.eventStatus.value).toUpperCase(),
        }
        try {
            api.post('/events', body, {
                headers: {
                  'Content-Type': 'application/json'
                }
              }).then((response)=>{
                if(response.status === 200){
                    notify("Event created successfully!", "success")
                    e.target.reset();
                }
            })
        } catch (error) {
            notify("An error occurred. Please try again later", "error")
        }
          
    }

    return (
        <Container className="my-5">
        <div>
            <Breadcrumb tag="nav">
                <BreadcrumbItem tag="a" href="/">Event List</BreadcrumbItem>
                <BreadcrumbItem active tag="span">Create Your Event</BreadcrumbItem>
              </Breadcrumb>
        </div>
        <Row>
          <Col md={10}>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">Set Up Your Next <span className="text-violet-800">Event</span></h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">A few simple steps to create an unforgettable experience.</p>
          </Col>
        </Row>
        <Row className="mt-5">
            <Col md={6}>
                <Form onSubmit={submitNewEvent}>
                    <FormGroup>
                        <Label for="eventTitle">Event Name</Label>
                        <Input type="text" name="title" id="eventTitle" required />
                    </FormGroup>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="startDate">Start Date</Label>
                                <Input 
                                    type="date"
                                    name="start-date"
                                    id="startDate"
                                    onChange={handleStartDateChange}
                                    required
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="startTime">Start Time</Label>
                                <Input type="time" name="start-time" id="startTime" required/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <FormGroup>
                                <Label for="endDate">End Date</Label>
                                <Input 
                                    type="date"
                                    name="end-date"
                                    id="endDate"
                                    min={endDateReference}
                                    required
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="endTime">End Time</Label>
                                <Input type="time" name="end-time" id="endTime" required />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="eventPrice">Event Price</Label>
                        <Input type="text" name="price" id="eventPrice" required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="eventStatus">Event Status</Label>
                        <Input 
                            type="select" 
                            name="status" 
                            id="eventStatus"
                            value={status}
                            onChange={handleStatusChange}
                            required
                        >
                            <option hidden value=""></option>
                            <option>Started</option>
                            <option>Completed</option>
                            <option>Paused</option>
                        </Input>
                    </FormGroup>
                    
                    <Button color="primary" outline type="submit">Save</Button>
                    
                </Form>
            </Col>
            <Col>
                <DotLottieReact
                    src="https://lottie.host/e7f2e857-cea2-4fcb-9a3a-1f32ccde5fe1/pKKvPmsTZf.lottie"
                    loop
                    autoplay
                />
            </Col>
                    
        </Row>
      </Container>
    );
}
  