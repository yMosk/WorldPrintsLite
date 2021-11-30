import React from "react";
import ProductCard from "@components/products/ProductCard";
import { Container, Row, Button, Col } from "reactstrap";
import * as productService from "@services/productService";
import debug from "sabio-debug";
import { withRouter } from "react-router";
import Pagination from "rc-pagination";
import SearchField from "react-search-field";
import toastr from "toastr";
import PropTypes from "prop-types";

const _logger = debug.extend("product");

class Product extends React.Component {
  state = {
    products: [],
    pageIndex: 0,
    pageSize: 8,
    total: 0,
    currentPage: 1,
  };

  componentDidMount() {
    this.paginateProducts(this.state.pageIndex, this.state.pageSize);
  }

  paginateProducts(pageIndex, pageSize) {
    productService
      .paginate(pageIndex, pageSize)
      .then(this.onPaginateSuccess)
      .catch(this.onPaginateError);
  }

  onPaginateSuccess = (response) => {
    var productArr = response.item.pagedItems;
    this.setState(() => {
      return {
        products: productArr.map(this.renderProducts),
        total: response.item.totalCount,
        currentPage: response.item.pageIndex + 1,
      };
    });
  };

  onPaginateError = (error) => {
    _logger(error);
  };

  renderProducts = (product) => {
    return (
      <ProductCard
        key={`t_${product.id}`}
        productProp={product}
        onCardClick={this.onCardClick}
        onEditClick={this.onEditClick}
        onDeleteClick={this.onDeleteClick}
      />
    );
  };

  onPageChange = (page) => {
    this.paginateProducts(page - 1, this.state.pageSize);
  };

  onCardClick = (product) => {
    this.props.history.push("/product/details", {
      payload: product,
    });
  };

  onEditClick = (product, e) => {
    if (!e) e = window.event;
    e.stopPropagation();
    this.props.history.push("/product/edit", {
      type: "PRODUCT_TO_EDIT",
      payload: product,
    });
  };

  onDeleteClick = (product) => {
    productService
      .remove(product.id)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteError);
  };

  onDeleteSuccess = (id) => {
    toastr.success(`Product with id: ${id} removed successfully`);
    this.setState((prevState) => {
      let indexOfMappedProducts = this.state.products.findIndex((product) => {
        return product.props.productProp.id === id;
      });
      let newProducts = [...prevState.products];
      if (indexOfMappedProducts >= 0) {
        newProducts.splice(indexOfMappedProducts, 1);
      }
      return { products: newProducts };
    });
  };

  onDeleteError = (error) => {
    toastr.error(`${error}`);
    _logger(error);
  };

  onSearchChange = (value) => {
    productService
      .search(this.state.pageIndex, this.state.pageSize, value)
      .then(this.onPaginateSuccess)
      .catch(this.onPaginateError);

    if (value === "") {
      this.paginateProducts(this.state.pageIndex, this.state.pageSize);
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <Col xl="3" className="d-flex p-4">
            <Button
              href="/product/edit"
              size="sm"
              color="dark"
              className="mt-2 hover-scale-sm btn-pill px-4"
            >
              Add New Product
            </Button>
          </Col>
          <Col xl="5" className="d-flex p-4">
            <Pagination
              onChange={this.onPageChange}
              current={this.state.currentPage}
              pageSize={this.state.pageSize}
              total={this.state.total}
              hideOnSinglePage={true}
            />
          </Col>
          <Col xl="4" className="d-flex p-4">
            <SearchField
              onChange={this.onSearchChange}
              placeholder="Search product"
            />
          </Col>
        </Row>
        <Row>{this.state.products}</Row>
      </Container>
    );
  }
}

Product.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Product);
