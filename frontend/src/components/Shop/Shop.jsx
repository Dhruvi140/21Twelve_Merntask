
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Shop/shop.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { shopValidationSchema } from '../Schemas/validationSchema'; 

function Shop() {
    const [shopData, setShopData] = useState([]);
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        id: '', // Added to handle update functionality
        name: '',
        owner: '',
        phone: '',
        GSTNo: '',
        address: ''
    });

    const navigate = useNavigate();

    const handleClose = () => {
        setShow(false);
        // Reset form data after closing modal
        setFormData({
            id: '',
            name: '',
            owner: '',
            phone: '',
            GSTNo: '',
            address: ''
        });
    };

    const handleShow = () => setShow(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/shops');
            setShopData(response.data);
        } catch (error) {
            console.error('Error fetching shop data:', error);
            // Handle error state if needed
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting form with data:', formData);
        try {
            const response = await axios.post('http://localhost:5000/api/shop', formData);
            console.log('Create shop response:', response.data);
            fetchData(); // Update shop list after successful creation
            handleClose(); // Close modal after submission
        } catch (error) {
            console.error('Error creating shop:', error.response ? error.response.data : error.message);
            // Handle error state if needed
        }
    };
    
    const handleUpdateShop = async () => {
        const { id, ...data } = formData; // Destructure id and rest of the data
        console.log('Updating shop with id:', id);
        try {
            const response = await axios.put(`http://localhost:5000/api/shop/${id}`, data);
            console.log('Update shop response:', response.data);
            fetchData(); // Update shop list after successful update
            handleClose(); // Close modal after submission
        } catch (error) {
            console.error('Error updating shop:', error.response ? error.response.data : error.message);
            // Handle error state if needed
        }
    };

    const handleUpdate = (id) => {
        const shopToUpdate = shopData.find(shop => shop._id === id);
        if (shopToUpdate) {
            setFormData({
                id: shopToUpdate._id,
                name: shopToUpdate.name,
                owner: shopToUpdate.owner,
                phone: shopToUpdate.phone,
                GSTNo: shopToUpdate.GSTNo,
                address: shopToUpdate.address
            });
            handleShow(); // Show modal with pre-filled data for update
        } else {
            console.error('Shop not found for update');
        }
    };

    const handleShowProducts = (shopId) => {
        navigate(`/products/${shopId}`);
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{formData.id ? 'Update Shop' : 'Create Shop'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formData.id ? handleUpdateShop : handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name">Shop Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter shop name"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="owner">Owner Name</label>
                            <input
                                type="text"
                                name="owner"
                                value={formData.owner}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter owner name"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter phone number"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="GSTNo">GST No</label>
                            <input
                                type="text"
                                name="GSTNo"
                                value={formData.GSTNo}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter GST number"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address">Address</label>
                            <textarea
                                rows={3}
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter address"
                            />
                        </div>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                {formData.id ? 'Update' : 'Create'}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>

            <div className="shop-container border rounded p-5 shadow">
                <div className="row">
                    {shopData.map((item, index) => (
                        <div key={index} className="col-md-4 mb-4 mt-3">
                            <div className="card border-warning shadow">
                                <div className="card-body">
                                    <h5 className="card-title fs-5 fw-bold">{item.name}</h5>
                                    <p className="card-text mb-1 fw-bolder fs-6"><i className="bi bi-person icon-spacing"></i>{item.owner}</p>
                                    <p className="card-text mb-1 fw-normal fs-6"><i className="bi bi-geo-alt"></i>{item.address}</p>
                                    <p className="card-text mb-1 fw-normal fs-6"><i className="bi bi-telephone icon-spacing"></i>{item.phone}</p>
                                    <a href="#" className="btn btn-primary" onClick={() => handleShowProducts(item._id)}>
                                        Show all products
                                    </a>
                                    <a href="#" className="btn btn-primary m-2" onClick={() => handleUpdate(item._id)}>
                                        Update
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="create-button mt-3">
                <Button variant="primary" onClick={handleShow}>
                    Create
                </Button>
                <Button variant="secondary" className='m-2' onClick={() => navigate('/')}>
                    Back to Home
                </Button>
            </div>
        </>
    );
}

export default Shop;
