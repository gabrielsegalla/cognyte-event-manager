"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import api from "./services/api";
import { Event, EventInterface } from "./events/components/event";
import { Button, Col, Container, Row } from 'reactstrap';
import { useRouter } from "next/navigation";

export default function Home() {
  const [eventList, setEventList] = useState<EventInterface[]>([]);
  const router = useRouter()

  useEffect(()=>{
    api.get('/events').then(({data})=>{
      setEventList(data)
    })
  },[])

  const redirectCreatePage = (e: any) => {
    e.preventDefault()
    router.push('/events/new')
  }

  return (
    <>
      <Container className="my-5">
        <Row>
          <Col md={10}>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">Manage Your <span className="text-violet-800">Events</span> Here!</h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Add, edit, and track your events effortlessly.</p>
          </Col>
          <Col>
            <Button color="primary" outline onClick={redirectCreatePage}>Add New Event</Button>
          </Col>
        </Row>
        <Row className="events-cards-list ">
          {eventList.map((event, index) => (
            <Event key={index} {...event} />
          ))}
        </Row>
      </Container>
    </>
  );
}
