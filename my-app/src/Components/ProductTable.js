import { Container, Row, Col, Table, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { PersonFill, GeoAltFill } from 'react-bootstrap-icons';
import { Image, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useState } from 'react';
import "./ProductTable.css";




function ProductTable(props) {
    // Here I create an array that contains all the product ids and the number of ordered products. I initialized it to zero.
    let prodNum = [];
    for (let i = 0; i < props.productByFarmer.length; i++) {
        prodNum.push({ "number": 0, "pID": props.productByFarmer[i].ProductID })
    }
    console.log(prodNum);

    //this function updates the number in the array, also allows to display the current number in the counter
    function updateNumber(i, sign) {
        if ((sign === -1 && prodNum[i].number !== 0) || (sign === +1 && prodNum[i].number < props.productByFarmer[i].Quantity)) {
            prodNum[i].number += sign;
        }
        return prodNum[i].number;
    }



    return (
        <Col>
            <Table className="d-flex justify-content-center">
                <tbody id="farmer-table" align="center">
                    {props.farmers.map(f =>
                        <FarmerRow farmer={f} productByFarmer={props.productByFarmer} updateNumber={updateNumber} />
                    )}
                </tbody>
            </Table>

        </Col>
    );
};

function FarmerRow(props) {
    console.log("quantirendeding");

    let product = [];

    const splitEvery = (array, length) =>
        array.reduce(
            (result, item, index) => {
                if (index % length === 0) result.push([])
                result[Math.floor(index / length)].push(item)
                return result
            },
            []
        );

    return (<>
        <tr>
            <td className="producttable-col">

                <Container>
                    <Row>
                        <h1 style={{ fontSize: 25 }} align={"left"}>{props.farmer.Company}</h1>
                    </Row>
                    <Row>
                        <section className="d-flex justify-content-between">
                            <div> <PersonFill /><span>&nbsp;</span>
                                {props.farmer.Name}<span>&nbsp;</span>{props.farmer.Surname}
                            </div>
                            <div>
                                <GeoAltFill className="ml-3" /><span>&nbsp;</span>
                                {props.farmer.Address}<span>,&nbsp;</span>{props.farmer.State}
                            </div>
                        </section>
                    </Row>

                    {props.productByFarmer.map(p =>
                        p.FarmerID === props.farmer.FarmerID ? product.push(p) : ''
                    )}

                    {splitEvery(product, 3).map(p => (
                        <Row className = "mb-4">
                            {p.map(pf => (
                                <Col md>
                                    <ProductCard></ProductCard>
                                </Col>
                            ))}
                        </Row>
                    ))}

                </Container>
            </td>
        </tr>
    </>
    );
};

function ProductCard(props) {
    return (

        <Card style={{ width: '11rem' }}>
            <Card.Img variant="top" src="/images/placeholder.jpg" />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>Cras justo odio</ListGroupItem>
                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                <ListGroupItem>Vestibulum at eros</ListGroupItem>
            </ListGroup>
            <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
        </Card>
    );
}


function ProductsCounter(props) {
    const [number, setNumber] = useState(0)

    function updateIndex(sign) {
        let i = props.updateNumber(props.numIndex, sign);
        setNumber(i);
        console.log(i);

    }
    return (
        <ButtonGroup>

            <ToggleButton style={{ minWidth: "2.5rem" }} variant='secondary' onClick={() => updateIndex(-1)}>{/*

 */}
                -
            </ToggleButton>
            <ToggleButton style={{ minWidth: "3rem" }} disabled variant="light">
                {number}
            </ToggleButton>
            <ToggleButton style={{ minWidth: "2.5rem" }} variant="secondary" onClick={() => updateIndex(+1)} >
                +
            </ToggleButton>

        </ButtonGroup>

    );

}

export default ProductTable;
