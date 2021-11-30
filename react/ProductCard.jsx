import React from "react";
import { Col, Card, Button } from "reactstrap";
import PropTypes from "prop-types";

function ProductCard(props) {
  const product = props.productProp;
  const onCardClick = function () {
    props.onCardClick(product);
  };
  const onEditClick = function () {
    props.onEditClick(product);
  };
  const onDeleteClick = function () {
    props.onDeleteClick(product);
  };

  return (
    <Col xl="3" className="d-flex">
      <Card
        onClick={onCardClick}
        style={{ cursor: "pointer" }}
        className="card-box mb-5 w-100 p-4 d-flex align-items-center card-box-hover-rise"
      >
        <div className="d-flex flex-column flex-grow-1 justify-content-center w-100">
          <div className="card-header-alt d-flex justify-content-between align-items-center">
            <h6 className="font-weight-bold font-size-lg mb-0 text-black p-1">
              {product.name}
            </h6>
          </div>
          <img src={product.primaryImage} />
          <div className="divider mt-1" />
          <div className="divider mb-1" />
          <div className="pt-4">
            <div className="text-black-50 pt-3">{product.description}</div>
            <div className="text-black-50 pt-3">{product.material}</div>
          </div>
          <Button
            onClick={onEditClick}
            size="sm"
            color="light"
            className="mt-2 hover-scale-sm btn-pill px-4"
          >
            Edit
          </Button>
          <Button
            onClick={onDeleteClick}
            size="sm"
            color="dark"
            className="mt-2 hover-scale-sm btn-pill px-4"
          >
            Delete
          </Button>
        </div>
      </Card>
    </Col>
  );
}

ProductCard.propTypes = {
  productProp: PropTypes.shape({
    name: PropTypes.string.isRequired,
    primaryImage: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    material: PropTypes.string.isRequired,
  }),
  onCardClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};

export default ProductCard;