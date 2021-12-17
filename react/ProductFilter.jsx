import React from "react";
import { CardTitle, Button, Col } from "reactstrap";
import { Checkbox, FormControlLabel, Box } from "@material-ui/core";
import { Formik, Form } from "formik";
import createUncontrolledCollapse from "../fields/CreateUncontrolledCollapse";
import * as productService from "@services/productService";
import PropTypes from "prop-types";
import debug from "sabio-debug";
const _logger = debug.extend("productFilter");

function ProductFilter(props) {
  const Manufacturer = createUncontrolledCollapse((props) => (
    <CardTitle {...props} className="font-weight-bold">
      MANUFACTURER ⮟
    </CardTitle>
  ));
  const Material = createUncontrolledCollapse((props) => (
    <CardTitle {...props} className="font-weight-bold">
      MATERIAL ⮟
    </CardTitle>
  ));
  const Year = createUncontrolledCollapse((props) => (
    <CardTitle {...props} className="font-weight-bold">
      YEAR ⮟
    </CardTitle>
  ));
  const Size = createUncontrolledCollapse((props) => (
    <CardTitle {...props} className="font-weight-bold">
      SIZE ⮟
    </CardTitle>
  ));
  const Color = createUncontrolledCollapse((props) => (
    <CardTitle {...props} className="font-weight-bold">
      COLOR ⮟
    </CardTitle>
  ));
  const Condition = createUncontrolledCollapse((props) => (
    <CardTitle {...props} className="font-weight-bold">
      CONDITION ⮟
    </CardTitle>
  ));
  const Category = createUncontrolledCollapse((props) => (
    <CardTitle {...props} className="font-weight-bold">
      CATEGORY ⮟
    </CardTitle>
  ));

  const onFilterSuccess = function (response) {
    props.onPaginateSuccess(response);
  };

  const handleFilter = (values) => {
    let payload = {
      manufacturer: values.manufacturer[0],
      material: values.material[0],
      year: values.year[0] ? parseInt(values.year[0]) : 0,
      sizeId: values.sizeId[0] ? parseInt(values.sizeId[0]) : 0,
      colorId: values.colorId[0] ? parseInt(values.colorId[0]) : 0,
      conditionId: values.conditionId[0] ? parseInt(values.conditionId[0]) : 0,
      categoryId: values.categoryId[0] ? parseInt(values.categoryId[0]) : 0,
    };

    productService
      .filter(payload, 0, 6)
      .then(onFilterSuccess)
      .catch((response) => {
        _logger(response);
      });
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        manufacturer: "",
        material: "",
        year: "",
        sizeId: "",
        colorId: "",
        conditionId: "",
        categoryId: "",
      }}
      onSubmit={handleFilter}
    >
      {({ handleChange }) => (
        <Form>
          <Manufacturer>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="manufacturer"
                    value="Red Bubble"
                    color="default"
                  />
                }
                label="Red Bubble"
              />
            </Box>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="manufacturer"
                    value="China"
                    color="default"
                  />
                }
                label="China"
              />
            </Box>
          </Manufacturer>

          <Material>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="material"
                    value="Cotton"
                    color="default"
                  />
                }
                label="Cotton"
              />
            </Box>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="material"
                    value="Polyester"
                    color="default"
                  />
                }
                label="Polyester"
              />
            </Box>
          </Material>

          <Year>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="year"
                    value={2020}
                    color="default"
                  />
                }
                label="2020"
              />
            </Box>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="year"
                    value={2021}
                    color="default"
                  />
                }
                label="2021"
              />
            </Box>
          </Year>

          <Size>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="sizeId"
                    value={1}
                    color="default"
                  />
                }
                label="XS"
              />
            </Box>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="sizeId"
                    value={2}
                    color="default"
                  />
                }
                label="S"
              />
            </Box>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="sizeId"
                    value={3}
                    color="default"
                  />
                }
                label="M"
              />
            </Box>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="sizeId"
                    value={4}
                    color="default"
                  />
                }
                label="L"
              />
            </Box>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="sizeId"
                    value={5}
                    color="default"
                  />
                }
                label="XL"
              />
            </Box>
          </Size>

          <Color>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="colorId"
                    value={1}
                    color="default"
                  />
                }
                label="Black"
              />
            </Box>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="colorId"
                    value={2}
                    color="default"
                  />
                }
                label="White"
              />
            </Box>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="colorId"
                    value={3}
                    color="default"
                  />
                }
                label="Grey"
              />
            </Box>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="colorId"
                    value={4}
                    color="default"
                  />
                }
                label="Red"
              />
            </Box>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="colorId"
                    value={5}
                    color="default"
                  />
                }
                label="Green"
              />
            </Box>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="colorId"
                    value={6}
                    color="default"
                  />
                }
                label="Blue"
              />
            </Box>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="colorId"
                    value={7}
                    color="default"
                  />
                }
                label="Yellow"
              />
            </Box>
          </Color>

          <Condition>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="conditionId"
                    value={1}
                    color="default"
                  />
                }
                label="New"
              />
            </Box>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="conditionId"
                    value={2}
                    color="default"
                  />
                }
                label="Like New"
              />
            </Box>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="conditionId"
                    value={3}
                    color="default"
                  />
                }
                label="Refurbished"
              />
            </Box>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="conditionId"
                    value={4}
                    color="default"
                  />
                }
                label="Good"
              />
            </Box>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="conditionId"
                    value={5}
                    color="default"
                  />
                }
                label="Some Wear and Tear"
              />
            </Box>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="conditionId"
                    value={6}
                    color="default"
                  />
                }
                label="As Is"
              />
            </Box>
          </Condition>

          <Category>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="categoryId"
                    value={1}
                    color="default"
                  />
                }
                label="Basic half-sleeve"
              />
            </Box>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="categoryId"
                    value={2}
                    color="default"
                  />
                }
                label="V-neck"
              />
            </Box>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="categoryId"
                    value={3}
                    color="default"
                  />
                }
                label="Ringer"
              />
            </Box>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="categoryId"
                    value={4}
                    color="default"
                  />
                }
                label="Cap-sleeve"
              />
            </Box>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="categoryId"
                    value={5}
                    color="default"
                  />
                }
                label="Pocket"
              />
            </Box>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="categoryId"
                    value={6}
                    color="default"
                  />
                }
                label="Polo-collar"
              />
            </Box>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="categoryId"
                    value={7}
                    color="default"
                  />
                }
                label="Baseball"
              />
            </Box>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="categoryId"
                    value={8}
                    color="default"
                  />
                }
                label="Long-sleeve"
              />
            </Box>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="categoryId"
                    value={9}
                    color="default"
                  />
                }
                label="Longline"
              />
            </Box>
            <Box m={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="categoryId"
                    value={10}
                    color="default"
                  />
                }
                label="Scoop-neck"
              />
            </Box>
          </Category>
          <Col>
            <Button
              type="submit"
              size="sm"
              color="primary"
              className="mt-2 hover-scale-sm btn-pill px-4"
            >
              Filter
            </Button>
          </Col>
        </Form>
      )}
    </Formik>
  );
}

ProductFilter.propTypes = {
  onPaginateSuccess: PropTypes.func,
};

export default ProductFilter;
