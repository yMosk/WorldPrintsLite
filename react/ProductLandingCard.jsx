import React from "react";
import { Col, Card, Button, Row } from "reactstrap";
import PropTypes from "prop-types";

export default function ProductLandingCard(props) {
  const product = props.productProp;
  const onCardClick = () => {
    props.onCardClick(product);
  };
  const onOrderClick = (e) => {
    e.stopPropagation();
    props.onOrderClick(product);
  };

  return (
    <Col xl="4" className="d-flex">
      <Card
        onClick={onCardClick}
        style={{ cursor: "pointer" }}
        className="mb-1 align-items-center card-box-hover-rise"
      >
        <img
          className="card-img-top"
          src={product.primaryImage}
          alt="t-shirt"
        />
        <div className="card-body">
          <h5 className="card-title font-weight-light">{product.name}</h5>
          <div className="divider mb-1" />
          <p className="card-text font-weight-bold">{product.description}</p>
          <Row className="align-items-center">
            <Col xl="6">
              <p className="p-2 card-text font-weight-light">$30.00</p>
            </Col>
            <Col xl="6">
              <Button
                onClick={onOrderClick}
                size="sm"
                color="primary"
                className="mt-2 hover-scale-sm btn-pill px-4"
              >
                Order
              </Button>
            </Col>
          </Row>
        </div>
      </Card>
    </Col>
  );
}

ProductLandingCard.propTypes = {
  productProp: PropTypes.shape({
    name: PropTypes.string.isRequired,
    primaryImage: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    material: PropTypes.string.isRequired,
  }),
  onCardClick: PropTypes.func,
  onOrderClick: PropTypes.func,
};
