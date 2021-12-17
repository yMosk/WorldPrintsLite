import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import * as productService from "@services/productService";
import debug from "sabio-debug";
import ProductLandingCard from "@components/products/ProductLandingCard";
import Pagination from "rc-pagination";
import ProductFilter from "@components/products/ProductFilter";

const _logger = debug.extend("productLanding");

export default function ProductLanding() {
  const [products, setProducts] = useState();
  const [pageIndex] = useState(0);
  const [pageSize] = useState(6);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();

  const paginateProducts = (pageIndex, pageSize) => {
    productService
      .paginate(pageIndex, pageSize)
      .then(onPaginateSuccess)
      .catch(onPaginateError);
  };

  const onPaginateSuccess = (response) => {
    let productArr = response.item.pagedItems;
    setProducts(productArr.map(renderProducts));
    setTotal(response.item.totalCount);
    setCurrentPage(response.item.pageIndex + 1);
  };

  const onPaginateError = (error) => {
    _logger(error);
  };

  const renderProducts = (product) => {
    return (
      <ProductLandingCard
        key={`t_${product.id}`}
        productProp={product}
        onCardClick={onCardClick}
        onOrderClick={onOrderClick}
      />
    );
  };

  const onPageChange = (page) => {
    paginateProducts(page - 1, pageSize);
  };

  const onCardClick = (product) => {
    history.push("/product/details", {
      payload: product,
    });
  };

  const onOrderClick = (product) => {
    history.push("/shoppingcart", {
      payload: product,
    });
  };

  useEffect(() => {
    paginateProducts(pageIndex, pageSize);
  }, []);

  return (
    <Container className="p-5">
      <Row>
        <Col xl="3" className="p-2">
          <ProductFilter onPaginateSuccess={onPaginateSuccess} />
        </Col>
        <Col xl="9" className="p-2">
          <Container>
            <Row>{products}</Row>
          </Container>
        </Col>
      </Row>
      <Row>
        <Pagination
          onChange={onPageChange}
          current={currentPage}
          pageSize={pageSize}
          total={total}
          hideOnSinglePage={true}
        />
      </Row>
    </Container>
  );
}
