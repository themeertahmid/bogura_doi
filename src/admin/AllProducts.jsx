import React, { useState } from 'react';
import { Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Form } from 'reactstrap';
import { toast } from 'react-toastify';
import { db } from '../firebase.config';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import useGetData from '../custom-hooks/useGetData.js';

const storage = getStorage();

const AllProducts = () => {
  const { data: productsData, loading } = useGetData('products');
  const [modal, setModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [enterCategory, setEnterCategory] = useState('');

  const toggleModal = () => setModal(!modal);

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id));
    toast.success('Deleted');
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    const imageRef = ref(storage, `images/${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);
    const url = await getDownloadURL(imageRef);
    return url;
  };

  const updateProduct = async () => {
    const imgUrl = await uploadImage();

    const productRef = doc(db, 'products', currentProduct.id);
    await updateDoc(productRef, {
      productName: currentProduct.productName,
      imgUrl: imgUrl || currentProduct.imgUrl,
      category: enterCategory || currentProduct.category,
    });

    toast.success('Updated');
    toggleModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const handleUpdateClick = (product) => {
    setCurrentProduct(product);
    setImageFile(null); // Reset image file
    setEnterCategory(product.category); // Set category for the dropdown
    toggleModal();
  };

  // Categories array
  const categories = [
    { value: 'doi', label: 'দই' },
    { value: 'misti', label: 'মিষ্টি' },
    { value: 'sondesh_borfi', label: 'বরফি / কেক / সন্ধেস' },
    { value: 'khirsha', label: 'ক্ষীরসা' },
    { value: 'top_category', label: 'Top Categories' }
  ];

  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  loading ? <h4 className='py-5 text-center fw-bold'>Loading...</h4> :
                    productsData.map(item => (
                      <tr key={item.id}>
                        <td>
                          <img src={item.imgUrl} alt='' style={{ width: '50px', height: '50px' }} />
                        </td>
                        <td>{item.productName}</td>
                        <td>{item.category}</td>
                        <td className='action_td'>
                          <span onClick={() => handleUpdateClick(item)} className=""><i className="ri-edit-2-line"></i></span>
                          <span onClick={() => deleteProduct(item.id)} className=""><i className="ri-delete-bin-6-line"></i></span>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>

            {/* Update Modal */}
            <Modal className="" isOpen={modal} toggle={toggleModal}>

              <ModalBody>
                <h4 className='py-4 '>Update Products</h4>
                <Form>
                  <FormGroup className="form_group">
                    <span>Product Name</span>
                    <input
                      type="text"
                      name="productName"
                      value={currentProduct.productName || ''}
                      onChange={handleInputChange}
                      className=""
                    />
                  </FormGroup>
                  <FormGroup className="form_group">
                    <span>Image</span>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className=""
                    />
                  </FormGroup>
                  <FormGroup className='form_group'>
                    <span>Category</span>
                    <select
                      className='w-100 p-2'
                      value={enterCategory}
                      onChange={e => setEnterCategory(e.target.value)}
                      required
                    >
                      <option value=''>Select Category</option>
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>{category.label}</option>
                      ))}
                    </select>
                  </FormGroup>
                </Form>

                <div className='modal_actions'>
                  <button className='buy_btn' onClick={updateProduct}>Update</button>
                  <button className='buy_btn' onClick={toggleModal}>Cancel</button>
                </div>
              </ModalBody>



            </Modal>

          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AllProducts;
