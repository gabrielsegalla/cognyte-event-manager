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
                    <span className="event-card-span text-sm md:text-base">{status}</span>
                    <Image 
                        src={'/cognyte-thumb.png'} 
                        width={1280} 
                        height={720} 
                        alt='thumb' 
                        className='event-card-thumb' 
                    />
                </Row>
                <Row>
                    <Col xs={5} sm={5} md={5}>
                        <Moment 
                            format="DD • MMM YY • HH:mm" 
                            className="text-sm "
                        >
                            {startDate.toLocaleString()}
                        </Moment>
                    </Col>
                    <Col xs={2} sm={2} md={2} className='text-sm'>|</Col>
                    <Col xs={5} sm={5} md={5}>
                        <Moment 
                            format="DD • MMM YY • HH:mm" 
                            className="text-sm "
                        >
                            {endDate.toLocaleString()}
                        </Moment>
                    </Col>
                </Row>
                
                <Row>
                    <Col md={10}>
                        <h3 className="text-sm md:text-lg font-semibold mt-1">{title}</h3>
                    </Col>
                    <Col>
                        <p className="sm:text-xs mt-2">${price}</p>
                    </Col>
                </Row>
            </Col>
        </Col>
    );
    
};
