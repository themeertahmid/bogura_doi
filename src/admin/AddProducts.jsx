import React, { useState } from 'react'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { db, storage } from '../firebase.config'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'
import { async } from '@firebase/util';

import "../styles/add-product.css"

const AddProducts = () => {
  const [enterTitle, setEnterTitle] = useState('')
  const [enterShortDesc, setEnterShortDesc] = useState('')
  const [enterDescription, setEnterDescription] = useState('')
  const [enterCategory, setEnterCategory] = useState('')
  const [enterPrice, setEnterPrice] = useState('')
  const [enterProductImg, setEnterProductImg] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    const product = {
      title: enterTitle,
      shortDesc: enterShortDesc,
      description: enterDescription,
      price: enterPrice,
      category: enterCategory,
      imgUrl: enterProductImg,
    };

    console.log(product);

    try {
      const storageRef = ref(storage, `productImages/${Date.now() + enterPrice}`);
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // You can add progress handling here if needed
        },
        (error) => {
          setLoading(false);
          toast.error('Image not uploaded: ' + error.message);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const docRef = collection(db, 'products'); // Corrected position
          await addDoc(docRef, {
            productName: enterTitle,
            shortDesc: enterShortDesc,
            description: enterDescription,
            price: enterPrice,
            category: enterCategory,
            imgUrl: downloadURL,
          });
          setLoading(false);
          toast.success('Product successfully added!');
          navigate('/dashboard/all-products');
        }
      );
    } catch (error) {
      setLoading(false);
      toast.error('Product not added: ' + error.message);
    }
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <h4>Add Product</h4>
            {
              loading ? <h4 className='py-5'>Loading...</h4> : <>
                <Form onSubmit={addProduct}>
                  <FormGroup className='form_group'>
                    <span>Product title</span>
                    <input type='text' placeholder='Enter A Product Name'
                      value={enterTitle} onChange={e => setEnterTitle(e.target.value)}
                      required></input>
                  </FormGroup>

                  <FormGroup className='form_group'>
                    <span>Short Description</span>
                    <input type='text' placeholder='Enter Short Description'
                      value={enterShortDesc} onChange={e => setEnterShortDesc(e.target.value)}
                      required></input>
                  </FormGroup>

                

                  <div className='d-flex align-items-center justify-content-between gap-5'>
               
                  <FormGroup className='form_group w-50'>
                      <span>Product Image</span>
                      <input type='file' onChange={e => setEnterProductImg(e.target.files[0])}
                        required></input>
                    </FormGroup>
                    <FormGroup className='form_group w-50'>
                      <span>Category</span>
                      <select className='w-100 p-2 ' value={enterCategory} onChange={e => setEnterCategory(e.target.value)}
                        required>
                        <option>Select Category</option>
                        <option value='doi'>দই</option>
                        <option value='misti'>মিষ্টি</option>
                        <option value='sondesh_borfi'>বরফি / কেক / সন্ধেস</option>
                        <option value='khirsha'>ক্ষীরসা</option>
                        <option value='top_category'>Top Categories</option>
                      </select>
                    </FormGroup>
                  </div>

                
                  <button className="buy_btn" type='submit'>Add Product</button>
                </Form>
              </>
            }
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AddProducts