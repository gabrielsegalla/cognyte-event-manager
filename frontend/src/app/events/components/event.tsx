import Image from 'next/image';
import Moment from 'react-moment';
import { Col, Row } from 'reactstrap';
import { useRouter } from "next/navigation";

export interface EventInterface {
    id: number;
    title: string;
    startDate: any;
    endDate: any;
    price: number;
    status: string;
}

export const Event = ({ id, title, startDate, endDate, price, status }: EventInterface) => {
    const router = useRouter()

    const redirectEventPage = (e: any) => {
        e.preventDefault()
        router.push(`/events/${id}`)
    }

    return (
        <Col md={4} className='event-box' key={id} onClick={redirectEventPage}>
            <Col className="event-card my-4">
                <Row>
                    <span className="event-card-span">{status}</span>
                    <Image src={'/cognyte-thumb.png'} width={1280} height={720} alt='thumb' className='event-card-thumb' />
                </Row>
                <Row>
                    <Col>
                        <Moment format="DD • MMM YY • HH:mm">
                            {startDate.toLocaleString()}
                        </Moment>
                    </Col>
                    <Col md={2}>|</Col>
                    <Col>
                        <Moment format="DD • MMM YY • HH:mm">
                            {endDate.toLocaleString()}
                        </Moment>
                    </Col>
                </Row>
                
                <Row>
                    <Col md={10}><h3>{title}</h3></Col>
                    <Col><p>${price}</p></Col>
                </Row>
            </Col>
        </Col>
    );
};
