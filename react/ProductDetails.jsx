import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Card, Badge, Button } from "reactstrap";
import PropTypes from "prop-types";

class ProductDetails extends React.Component {
  state = {
    formData: {
      id: "",
      sku: "",
      name: "",
      manufacturer: "",
      year: "",
      description: "",
      specifications: "",
      categoryId: "",
      sizeTypeId: "",
      colorId: "",
      conditionTypeId: "",
      material: "",
      isVisible: false,
      isActive: false,
      primaryImage: "",
    },
    type: "",
    visibleBadge: "warning",
    activeBadge: "warning",
  };

  componentDidMount() {
    if (this.props.location.state) {
      let newProduct = { ...this.props.location.state.payload };
      this.setState(() => {
        return {
          formData: {
            id: newProduct.id,
            sku: newProduct.sku,
            name: newProduct.name,
            manufacturer: newProduct.manufacturer,
            year: newProduct.year,
            description: newProduct.description,
            specifications: newProduct.specifications,
            categoryId: newProduct.category.name,
            sizeTypeId: newProduct.sizeType.name,
            colorId: newProduct.color.name,
            conditionTypeId: newProduct.conditionType.name,
            material: newProduct.material,
            isVisible: newProduct.isVisible,
            isActive: newProduct.isActive,
            primaryImage: newProduct.primaryImage,
          },
        };
      });
    }
    if (this.props.location.state.payload.isVisible) {
      this.setState(() => {
        return {
          visibleBadge: "success",
        };
      });
    }
    if (this.props.location.state.payload.isActive) {
      this.setState(() => {
        return {
          activeBadge: "success",
        };
      });
    }
  }

  render() {
    return (
      <>
        <Row className="justify-content-center">
          <Col lg="6">
            <Card className="shadow-xxl mb-5">
              <div className="card-tr-actions">
                <Button
                  href="/product"
                  size="sm"
                  color="dark"
                  className="mt-2 hover-scale-sm btn-pill px-4"
                >
                  Back
                </Button>
              </div>
              <div className="card-header bg-secondary text-center pt-4 pb-3">
                <div className="avatar-icon-wrapper shadow-xxl border-white border-3 m-0">
                  <div className="d-block p-0 avatar-icon-wrapper m-0 100">
                    <img
                      src={this.state.formData.primaryImage}
                      alt="t-shirt"
                      className="img-fit-container"
                    />
                  </div>
                </div>
                <h3 className="font-size-xl font-weight-bold mt-2">
                  {this.state.formData.name}
                </h3>
                <Badge
                  color="dark"
                  className="mt-1 mb-4 font-size-xs px-4 py-1 h-auto"
                >
                  $30.00
                </Badge>
                <Row className="justify-content-center">
                  <Col md="9">
                    <div className="bg-secondary m-3 py-3 px-0 text-center rounded">
                      <div className="mt-2 line-height-sm">
                        <b className="font-size-lg">
                          {this.state.formData.description}
                        </b>
                        <div className="divider" />
                        <span className="text-black-50 d-block">
                          {this.state.formData.specifications}
                        </span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="divider" />
              <div className="card-body text-center card-body-button">
                <Row className="no-gutters">
                  <Col md="3">
                    <div className="bg-secondary m-3 py-3 px-0 text-center rounded">
                      <div>
                        <FontAwesomeIcon
                          icon={["far", "chart-bar"]}
                          className="font-size-xxl text-info"
                        />
                      </div>
                      <div className="mt-2 line-height-sm">
                        <b className="font-size-lg">MANUFACTURER:</b>
                        <span className="text-black-50 d-block">
                          {this.state.formData.manufacturer}
                        </span>
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="bg-secondary m-3 py-3 px-0 text-center rounded">
                      <div>
                        <FontAwesomeIcon
                          icon={["far", "chart-bar"]}
                          className="font-size-xxl text-info"
                        />
                      </div>
                      <div className="mt-2 line-height-sm">
                        <b className="font-size-lg">MATERIAL:</b>
                        <span className="text-black-50 d-block">
                          {this.state.formData.material}
                        </span>
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="bg-secondary m-3 py-3 px-0 text-center rounded">
                      <div>
                        <FontAwesomeIcon
                          icon={["far", "chart-bar"]}
                          className="font-size-xxl text-info"
                        />
                      </div>
                      <div className="mt-2 line-height-sm">
                        <b className="font-size-lg">YEAR:</b>
                        <span className="text-black-50 d-block">
                          {this.state.formData.year}
                        </span>
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="bg-secondary m-3 py-3 px-0 text-center rounded">
                      <div>
                        <FontAwesomeIcon
                          icon={["far", "chart-bar"]}
                          className="font-size-xxl text-info"
                        />
                      </div>
                      <div className="mt-2 line-height-sm">
                        <b className="font-size-lg">PRICE:</b>
                        <span className="text-black-50 d-block">$30.00</span>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row className="no-gutters">
                  <Col md="3">
                    <div className="bg-secondary m-3 py-3 px-0 text-center rounded">
                      <div>
                        <FontAwesomeIcon
                          icon={["far", "chart-bar"]}
                          className="font-size-xxl text-info"
                        />
                      </div>
                      <div className="mt-2 line-height-sm">
                        <b className="font-size-lg">SIZE:</b>
                        <span className="text-black-50 d-block">
                          {this.state.formData.sizeTypeId}
                        </span>
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="bg-secondary m-3 py-3 px-0 text-center rounded">
                      <div>
                        <FontAwesomeIcon
                          icon={["far", "chart-bar"]}
                          className="font-size-xxl text-info"
                        />
                      </div>
                      <div className="mt-2 line-height-sm">
                        <b className="font-size-lg">COLOR:</b>
                        <span className="text-black-50 d-block">
                          {this.state.formData.colorId}
                        </span>
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="bg-secondary m-3 py-3 px-0 text-center rounded">
                      <div>
                        <FontAwesomeIcon
                          icon={["far", "chart-bar"]}
                          className="font-size-xxl text-info"
                        />
                      </div>
                      <div className="mt-2 line-height-sm">
                        <b className="font-size-lg">CONDITION:</b>
                        <span className="text-black-50 d-block">
                          {this.state.formData.conditionTypeId}
                        </span>
                      </div>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="bg-secondary m-3 py-3 px-0 text-center rounded">
                      <div>
                        <FontAwesomeIcon
                          icon={["far", "chart-bar"]}
                          className="font-size-xxl text-info"
                        />
                      </div>
                      <div className="mt-2 line-height-sm">
                        <b className="font-size-lg">CATEGORY:</b>
                        <span className="text-black-50 d-block">
                          {this.state.formData.categoryId}
                        </span>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row className="no-gutters bg-secondary m-3 py-3 px-0 justify-content-center rounded">
                  <Button color="dark" className="badge-wrapper m-3">
                    <Badge
                      color={this.state.visibleBadge}
                      className="badge-position badge-position--top-right badge-circle-inner"
                    >
                      New notifications
                    </Badge>
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon icon={["far", "lightbulb"]} />
                    </span>
                    <span className="btn-wrapper--label">Is visible</span>
                  </Button>
                  <Button color="dark" className="badge-wrapper m-3">
                    <Badge
                      color={this.state.activeBadge}
                      className="badge-position badge-position--top-right badge-circle-inner"
                    >
                      New notifications
                    </Badge>
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon icon={["far", "lightbulb"]} />
                    </span>
                    <span className="btn-wrapper--label">Is active</span>
                  </Button>
                </Row>
                <Row className="no-gutters bg-secondary m-3 py-3 px-0 justify-content-center rounded">
                  <Button
                    // onClick={onOrderClick}
                    size="large"
                    color="dark"
                    className="mt-2 hover-scale-sm btn-pill px-4"
                  >
                    Order
                  </Button>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
};

export default ProductDetails;
