import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { useParams, useNavigate } from 'react-router-dom';
import '../Shop/Product.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { productValidationSchema } from '../Schemas/validationSchema';

function Product() {
  const { shopId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  // Add loading state
  const [show, setShow] = useState(false);
  const [productIdToUpdate, setProductIdToUpdate] = useState(null);
  const [initialValues, setInitialValues] = useState({
    productname: '',
    price: '',
    description: '',
  });

  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    setProductIdToUpdate(null);
    setInitialValues({
      productname: '',
      price: '',
      description: '',
    });
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/${shopId}/products`);
        console.log('Products:', response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [shopId]);  // Ensure shopId is in the dependency array

  const handleAddProduct = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/shop/${shopId}/products`, values);
      console.log('Product added:', response.data);
      setProducts([...products, response.data]);
      handleClose();
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateProduct = async (values, { setSubmitting }) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/shop/${shopId}/products/${productIdToUpdate}`, values);
      console.log('Product updated:', response.data);

      const updatedProducts = products.map(product => {
        if (product._id === response.data._id) {
          return response.data;
        }
        return product;
      });

      setProducts(updatedProducts);
      handleClose();
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditClick = (product) => {
    setInitialValues({
      productname: product.productname,
      price: product.price,
      description: product.description,
    });
    setProductIdToUpdate(product._id);
    handleShow();
  };

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="container">
        <div className="shadow p-5 bg-body rounded">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Products</h2>
            <div>
              <Button className="btn btn-secondary me-2" onClick={handleBack}>
                Back
              </Button>
              <Button className="btn btn-primary" onClick={handleShow}>
                Add Product
              </Button>
            </div>
          </div>

          <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>{productIdToUpdate ? 'Update Product' : 'Add Product'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Formik
                initialValues={initialValues}
                validationSchema={productValidationSchema}
                enableReinitialize
                onSubmit={productIdToUpdate ? handleUpdateProduct : handleAddProduct}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-3">
                      <label htmlFor="productname" className="form-label">Product Name</label>
                      <Field
                        type="text"
                        name="productname"
                        className="form-control"
                        placeholder="Enter product name"
                      />
                      <ErrorMessage name="productname" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="price" className="form-label">Price</label>
                      <Field
                        type="number"
                        name="price"
                        className="form-control"
                        placeholder="Enter price"
                      />
                      <ErrorMessage name="price" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <Field
                        as="textarea"
                        rows={3}
                        name="description"
                        className="form-control"
                        placeholder="Enter description"
                      />
                      <ErrorMessage name="description" component="div" className="text-danger" />
                    </div>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" type="submit" disabled={isSubmitting}>
                        {productIdToUpdate ? 'Update' : 'Add'}
                      </Button>
                    </Modal.Footer>
                  </Form>
                )}
              </Formik>
            </Modal.Body>
          </Modal>

          {products.length === 0 ? (
            <p>No products available.</p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>{product.productname}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>
                      <i className="bi bi-pencil-square" onClick={() => handleEditClick(product)}></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </>
  );
}

export default Product;
