import React from "react";
import { Formik, Form } from "formik";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import { Col, CardBody, Card, CardTitle } from "reactstrap";
import debug from "sabio-debug";
import * as Yup from "yup";
import * as productService from "@services/productService";
import toastr from "toastr";
import FilesUpload from "@components/formsUpload/FilesUpload";
import PropTypes from "prop-types";

const _logger = debug.extend("productForm");

const basicSchema = Yup.object().shape({
  sku: Yup.string().max(50).required("SKU is required"),
  name: Yup.string().max(255).required("Name is required"),
  manufacturer: Yup.string().max(100).required("Manufacturer is required"),
  year: Yup.number().min(1000).max(9999).required("Year is required"),
  description: Yup.string().max(4000).required("Description is required"),
  specifications: Yup.string().min(2),
  categoryId: Yup.number().required("Category is required"),
  sizeTypeId: Yup.number().required("Size is required"),
  colorId: Yup.number().required("Color is required"),
  conditionTypeId: Yup.number().required("Condition is required"),
  material: Yup.string().max(250).required("Material is required"),
  isVisible: Yup.bool().required("Visibility is required"),
  isActive: Yup.bool().required("Active status is required"),
  primaryImage: Yup.string().url().required("Please enter url"),
});

class ProductForm extends React.Component {
  state = {
    category: [
      { id: 1, name: "Basic half-sleeve" },
      { id: 2, name: "V-neck" },
      { id: 3, name: "Ringer" },
      { id: 4, name: "Cap-sleeve" },
      { id: 5, name: "Pocket" },
      { id: 6, name: "Polo-collar" },
      { id: 7, name: "Baseball" },
      { id: 8, name: "Long-sleeve" },
      { id: 9, name: "Longline" },
      { id: 10, name: "Scoop-neck" },
    ],
    size: [
      { id: 1, name: "XS" },
      { id: 2, name: "S" },
      { id: 3, name: "M" },
      { id: 4, name: "L" },
      { id: 5, name: "XL" },
    ],
    color: [
      { id: 1, name: "Black" },
      { id: 2, name: "White" },
      { id: 3, name: "Grey" },
      { id: 4, name: "Red" },
      { id: 5, name: "Green" },
      { id: 6, name: "Blue" },
      { id: 7, name: "Yellow" },
    ],
    condition: [
      { id: 1, name: "New" },
      { id: 2, name: "Like New" },
      { id: 3, name: "Refurbished" },
      { id: 4, name: "Good" },
      { id: 5, name: "Some Wear and Tear" },
      { id: 6, name: "As Is" },
    ],
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
  };

  componentDidMount() {
    if (
      this.props.location.state &&
      this.props.location.state.type === "PRODUCT_TO_EDIT"
    ) {
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
            categoryId: newProduct.category.id,
            sizeTypeId: newProduct.sizeType.id,
            colorId: newProduct.color.id,
            conditionTypeId: newProduct.conditionType.id,
            material: newProduct.material,
            isVisible: newProduct.isVisible,
            isActive: newProduct.isActive,
            primaryImage: newProduct.primaryImage,
          },
        };
      });
    }
  }

  handleSubmit = (values, { resetForm }) => {
    if (
      this.props.location.state &&
      this.props.location.state.type === "PRODUCT_TO_EDIT"
    ) {
      productService
        .update(values)
        .then(toastr.success(`Product was updated successfully`))
        .then(this.onSubmitSuccess)
        .catch(this.onSubmitError);
      resetForm();
    } else {
      productService
        .add(values)
        .then(toastr.success(`Success! New product was created`))
        .then(this.onSubmitSuccess)
        .catch(this.onSubmitError);
      resetForm();
    }
  };

  onSubmitSuccess = (response) => {
    this.props.history.push("/product");
  };

  onSubmitError = (response) => {
    toastr.error(`${response}`);
    _logger(response);
  };

  mapType = (type) => (
    <MenuItem key={`type_${type.id}`} value={type.id}>
      {type.name}
    </MenuItem>
  );

  render() {
    return (
      <Col xl="6" className="d-flex">
        <Card className="card-box mb-5 w-100 p-4 d-flex align-items-center card-box-hover-rise">
          <CardBody className="d-flex flex-column flex-grow-1 justify-content-center w-100">
            <CardTitle className="card-header-alt d-flex justify-content-between align-items-center">
              <h6 className="font-weight-bold font-size-lg mb-0 text-black p-1">
                Edit Product
              </h6>
              <Button
                variant="contained"
                href="/product"
                size="large"
                color="grey"
              >
                Cancel
              </Button>
            </CardTitle>
            <div className="divider mt-1" />
            <div className="divider mb-1" />
            <Formik
              enableReinitialize={true}
              initialValues={this.state.formData}
              onSubmit={this.handleSubmit}
              validationSchema={basicSchema}
            >
              {({ values, handleChange, touched, errors, setFieldValue }) => (
                <Form>
                  <TextField name="id" value={values.id} hidden />
                  <Box m={1}>
                    <TextField
                      fullWidth
                      name="sku"
                      label={
                        <>
                          SKU:<i> 50 characters or less</i>
                        </>
                      }
                      type="text"
                      variant="outlined"
                      value={values.sku}
                      onChange={handleChange}
                      error={touched.sku && Boolean(errors.sku)}
                      helperText={touched.sku && errors.sku}
                    />
                  </Box>

                  <Box m={1}>
                    <TextField
                      fullWidth
                      name="name"
                      label={
                        <>
                          Name:<i> 255 characters or less</i>
                        </>
                      }
                      type="text"
                      variant="outlined"
                      value={values.name}
                      onChange={handleChange}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Box>

                  <Box m={1}>
                    <TextField
                      fullWidth
                      name="manufacturer"
                      label={
                        <>
                          Manufacturer:<i> 100 characters or less</i>
                        </>
                      }
                      type="text"
                      variant="outlined"
                      value={values.manufacturer}
                      onChange={handleChange}
                      error={
                        touched.manufacturer && Boolean(errors.manufacturer)
                      }
                      helperText={touched.manufacturer && errors.manufacturer}
                    />
                  </Box>

                  <Box m={1}>
                    <TextField
                      fullWidth
                      name="year"
                      label={
                        <>
                          Year:<i> provide a year</i>
                        </>
                      }
                      type="number"
                      variant="outlined"
                      value={values.year}
                      onChange={handleChange}
                      error={touched.year && Boolean(errors.year)}
                      helperText={touched.year && errors.year}
                    />
                  </Box>

                  <Box m={1}>
                    <TextField
                      fullWidth
                      name="material"
                      label={
                        <>
                          Material:<i> 250 characters or less</i>
                        </>
                      }
                      type="text"
                      variant="outlined"
                      value={values.material}
                      onChange={handleChange}
                      error={touched.material && Boolean(errors.material)}
                      helperText={touched.material && errors.material}
                    />
                  </Box>

                  <Box m={1}>
                    <TextField
                      fullWidth
                      name="description"
                      label={
                        <>
                          Description:<i> 4000 characters or less</i>
                        </>
                      }
                      type="text"
                      variant="outlined"
                      multiline={true}
                      rows={5}
                      value={values.description}
                      onChange={handleChange}
                      error={touched.description && Boolean(errors.description)}
                      helperText={touched.description && errors.description}
                    />
                  </Box>

                  <Box m={1}>
                    <TextField
                      fullWidth
                      name="specifications"
                      label={
                        <>
                          Specifications:<i> not required</i>
                        </>
                      }
                      type="text"
                      variant="outlined"
                      multiline={true}
                      rows={5}
                      value={values.specifications}
                      onChange={handleChange}
                      error={
                        touched.specifications && Boolean(errors.specifications)
                      }
                      helperText={
                        touched.specifications && errors.specifications
                      }
                    />
                  </Box>

                  <Box m={1}>
                    <FormControl
                      fullWidth
                      error={touched.categoryId && Boolean(errors.categoryId)}
                    >
                      <InputLabel>Category</InputLabel>
                      <Select
                        name="categoryId"
                        value={values.categoryId}
                        onChange={handleChange}
                      >
                        {this.state.category.map(this.mapType)}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box m={1}>
                    <FormControl
                      fullWidth
                      error={touched.sizeTypeId && Boolean(errors.sizeTypeId)}
                    >
                      <InputLabel>Size</InputLabel>
                      <Select
                        name="sizeTypeId"
                        value={values.sizeTypeId}
                        onChange={handleChange}
                      >
                        {this.state.size.map(this.mapType)}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box m={1}>
                    <FormControl
                      fullWidth
                      error={touched.colorId && Boolean(errors.colorId)}
                    >
                      <InputLabel>Color</InputLabel>
                      <Select
                        name="colorId"
                        value={values.colorId}
                        onChange={handleChange}
                      >
                        {this.state.color.map(this.mapType)}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box m={1}>
                    <FormControl
                      fullWidth
                      error={
                        touched.conditionTypeId &&
                        Boolean(errors.conditionTypeId)
                      }
                    >
                      <InputLabel>Condition</InputLabel>
                      <Select
                        name="conditionTypeId"
                        value={values.conditionTypeId}
                        onChange={handleChange}
                      >
                        {this.state.condition.map(this.mapType)}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box m={1}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.isVisible}
                          onChange={handleChange}
                          name="isVisible"
                          color="default"
                        />
                      }
                      label="Is this product Visible?"
                    />
                  </Box>

                  <Box m={1}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.isActive}
                          onChange={handleChange}
                          name="isActive"
                          color="default"
                        />
                      }
                      label="Is this product Active?"
                    />
                  </Box>

                  <Box m={1}>
                    <FormControl fullWidth>
                      <img src={values.primaryImage} />
                      <FilesUpload
                        sendFiles={(files) => {
                          setFieldValue("primaryImage", files.items[0].url);
                        }}
                      />
                      <FormLabel
                        error={
                          touched.primaryImage && Boolean(errors.primaryImage)
                        }
                      >
                        Upload image: <i>jpeg, jpg, png, tiff, pdf</i>
                      </FormLabel>
                    </FormControl>
                  </Box>

                  <Box m={1}>
                    <Button
                      variant="contained"
                      type="submit"
                      size="large"
                      color="inherit"
                    >
                      Submit
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

ProductForm.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
};

export default ProductForm;
