"use client"
import api from "@/app/services/api";
import { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { EventInterface } from "../components/event";
import { useParams, useRouter } from 'next/navigation';
import moment from "moment";
import notify from "@/app/services/notify";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function EventPage() {

    const params = useParams();
    const [event, setEvent] = useState<EventInterface>({
      id: 0,
      title: "",
      startDate: "",
      endDate: null,
      price: 0,
      status: ""
    })

    const [mode, setMode] = useState("view")
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [status, setStatus] = useState(event.status || "");
    const [title, setTitle] = useState(event.title || "")
    const [startDate, setStartDate] = useState<any>('')
    const [endDate, setEndDate] = useState<any>('')
    const [startTime, setStartTime] = useState<any>('')
    const [endTime, setEndTime] = useState<any>('')
    const [price, setPrice] = useState(event.price || "")
    const router = useRouter()
    const [endDateReference, setEndDateReference] = useState<any>("");


    useEffect(()=>{
      api.get(`/events/${params? params.id: ''}`).then(({data})=>{
        setEvent(data)
      })
    },[])

    useEffect(()=>{
      setStatus(event.status)
      setTitle(event.title)
      setStartDate(defaultValueToDate(event.startDate))
      setEndDate(defaultValueToDate(event.endDate))
      setStartTime(defaultValueToTime(event.startDate))
      setEndTime(defaultValueToTime(event.endDate))
      setPrice(event.price)
    },[event])


    const defaultValueToDate = (datetime: any) =>{
      const momentDate = moment(datetime);
      return momentDate.format("YYYY-MM-DD")
    }

    const defaultValueToTime = (datetime: any) =>{
      const momentDate = moment(datetime);
      return momentDate.format("HH:mm")
    }

    const handleStatusChange = (e: any) => {
      setStatus(e.target.value);
    };

    const handleTitleChange = (e: any) => {
      setTitle(e.target.value);
    };

    const handlePriceChange = (e: any) => {
      setPrice(e.target.value);
    };

    const handleStartDateChange = (e: any) => {
      setStartDate(e.target.value);
      setEndDateReference(moment(e.target.value).add(1, 'day').format('YYYY-MM-DD'))
    };
    const handleStartTimeChange = (e: any) => {
      setStartTime(e.target.value);
    };
    const handleEndDateChange = (e: any) => {
      setEndDate(e.target.value);
    };
    const handleEndTimeChange = (e: any) => {
      setEndTime(e.target.value);
    };

    const getFormattedDateTime = (date: any, time: any) => {
      if (!date || !time) return null;
      return moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm').toISOString();
    };



    const submitEditEvent = (e: any) =>{
      e.preventDefault();
      const body = {
          title: e.target.eventTitle.value,
          startDate: getFormattedDateTime(e.target.startDate.value, e.target.startTime.value),
          endDate: getFormattedDateTime(e.target.endDate.value, e.target.endTime.value),
          price: e.target.eventPrice.value,
          status: String(e.target.eventStatus.value).toUpperCase(),
      }
      try {
          api.put(`/events/${params? params.id: ''}`, body, {
              headers: {
                'Content-Type': 'application/json'
              }
            }).then((response)=>{
              if(response.status === 200){
                  notify("Event edited successfully!", "success")
                  setEvent(response.data)
                  setMode('view')
              }
          })
      } catch (error) {
          notify("An error occurred. Please try again later", "error")
      } 
    }

    const openModalToDeleteEvent = () =>{
      setModalIsOpen(!modalIsOpen)
    }

    const submitEventDeletion = () =>{
      api.delete(`/events/${params? params.id: ''}`).then((response)=>{
        if(response.status === 204){
          notify("Event deleted successfully!", "success")
          openModalToDeleteEvent()
          setMode("delete")
          setTimeout(() => {
            router.push('/')
          }, 4300);
          
        }
        
      })
    }

    return (
      <>
        <Container className="my-5">
          {mode !== 'delete' ? (
              <>
              <div>
              <Breadcrumb tag="nav">
                <BreadcrumbItem tag="a" href="/">Event List</BreadcrumbItem>
                <BreadcrumbItem active tag="span">{event.title}</BreadcrumbItem>
              </Breadcrumb>
              </div>
              <Row>
                <Col md={10}>
                  <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                    {event.title.split(" ").slice(0, -1).join(" ")}{" "}
                    <span className="text-violet-800">
                      {event.title.split(" ").slice(-1)}
                    </span>
                  </h1>
                </Col>
                <Col>
                  <Button color="primary" outline onClick={()=>{setMode('edit')}} className="mr-3">Edit</Button>
                  <Button color="danger" outline onClick={openModalToDeleteEvent}>Delete</Button>
                </Col>
              </Row>
              
              <Row>
                <Row>
                  <Form onSubmit={submitEditEvent}>
                      <FormGroup>
                          <Label for="eventTitle">Event Name</Label>
                          <Input type="text" name="title" id="eventTitle" onChange={handleTitleChange} value={title} disabled={mode != "edit"} />
                      </FormGroup>
                      <Row>
                          <Col>
                              <FormGroup>
                                  <Label for="startDate">Start Date</Label>
                                  <Input 
                                      type="date"
                                      name="start-date"
                                      id="startDate"
                                      value={startDate}
                                      onChange={handleStartDateChange}
                                      disabled={mode != "edit"}
                                  />
                              </FormGroup>
                          </Col>
                          <Col>
                              <FormGroup>
                                  <Label for="startTime">Start Time</Label>
                                  <Input 
                                    type="time"
                                    name="start-time"
                                    id="startTime"
                                    value={startTime}
                                    onChange={handleStartTimeChange}
                                    disabled={mode != "edit"}
                                  />
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
                                      value={endDate}
                                      min={endDateReference}
                                      onChange={handleEndDateChange}
                                      disabled={mode != "edit"}
                                  />
                              </FormGroup>
                          </Col>
                          <Col>
                              <FormGroup>
                                  <Label for="endTime">End Time</Label>
                                  <Input 
                                    type="time" 
                                    name="end-time"
                                    id="endTime"
                                    value={endTime}
                                    onChange={handleEndTimeChange}
                                    disabled={mode != "edit"} 
                                  />
                              </FormGroup>
                          </Col>
                      </Row>
                      <FormGroup>
                          <Label for="eventPrice">Event Price</Label>
                          <Input 
                            type="text"
                            name="price"
                            id="eventPrice"
                            onChange={handlePriceChange}
                            value={price}
                            disabled={mode != "edit"}
                          />
                      </FormGroup>
                      <FormGroup>
                          <Label for="eventStatus">Event Status</Label>
                          <Input 
                              type="select" 
                              name="status" 
                              id="eventStatus"
                              value={status}
                              onChange={handleStatusChange}
                              disabled={mode != "edit"}
                          >
                              <option hidden value=""></option>
                              <option value={"STARTED"}>Started</option>
                              <option value={"COMPLETED"}>Completed</option>
                              <option value={"PAUSED"}>Paused</option>
                          </Input>
                      </FormGroup>
                      {mode === 'edit' ? (
                          <Row >
                              <Col>
                                <Button color="primary" outline type="submit" className="mr-5">Save</Button>
                                <Button outline onClick={()=>{setMode('view')}}>Cancel</Button>
                              </Col>
                          </Row>
                      ) : null}
                      
                    </Form>
                </Row>
              </Row>
              </>
          ) : (
            <>
              <DotLottieReact
                src="https://lottie.host/e898b937-8a90-4640-976c-089fd2420468/Dz5H83I7cF.lottie"
                loop
                autoplay
              />
            </>
          )}
          
          <Modal isOpen={modalIsOpen} toggle={openModalToDeleteEvent}>
            <ModalHeader toggle={openModalToDeleteEvent}>Deletion Confirmation</ModalHeader>
            <ModalBody>
              Are you sure you want to delete this item? This action cannot be undone. If you're unsure, cancel the operation.
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={submitEventDeletion}>Delete</Button>
              <Button className="CognyteButton" onClick={openModalToDeleteEvent}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </Container>
      </>
    );
}
  