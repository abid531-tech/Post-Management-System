import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';


export default function Editpost() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        getPostbyid();
    }, []);

    // const getPostbyid = async () => {
    //     const response = await api.get(`/post-by-id/, ${id}`);
    //     setFormData({
    //         title: response.data.title || "",
    //         author: response.data.author || "",
    //         category: response.data.category || "",
    //         status: response.data.status || "",
    //         content: response.data.content || "",
    //         id: id,
    //     });
    // };
    const getPostbyid = async () => {
        try {
            const response = await api.get(`/post-by-id/${id}`);

            console.log("API Response:", response.data);

            setFormData({
                title: response.data.title || "",
                author: response.data.author || "",
                category: response.data.category || "",
                status: response.data.status || "",
                content: response.data.content || "",
                id: id,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        category: "",
        status: "",
        content: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmiting(true);
        setErrors(null);

        try {
            const response = await api.post('/edit-post', formData);

            if (response.data.status === 200) {
                alert("Post Created Successfully!");
                navigate('/');
            }
        } catch (error) {
            console.error("Error Detail:", error);
            if (error.response) {
                // Server responded with an error (like 422 validation)
                setErrors(error.response.data.message || "Validation Error");
            } else {
                // Server is likely not running (ERR_CONNECTION_REFUSED)
                setErrors("Cannot connect to server. Did you run 'php artisan serve'?");
            }
        } finally {
            setIsSubmiting(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row mb-4">
                <div className="col-12">
                    <h1 className="display-4">Create New Post</h1>
                </div>
            </div>

            {errors && <div className='alert alert-danger'>{errors}</div>}

            <div className="card shadow-sm">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Title</label>
                                <input type="text" name='title' value={formData.title} onChange={handleChange} className="form-control" required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Author</label>
                                <input type="text" name='author' value={formData.author} onChange={handleChange} className="form-control" required />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Category</label>
                                <select className="form-select" name='category' value={formData.category} onChange={handleChange} required>
                                    <option value="">Select Category</option>
                                    <option value="Web Development">Web Development</option>
                                    <option value="Programming">Programming</option>
                                    <option value="Design">Design</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Business">Business</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Status</label>
                                <select className="form-select" name='status' value={formData.status} onChange={handleChange} required>
                                    <option value="">Select Status</option>
                                    <option value="Published">Published</option>
                                    <option value="Draft">Draft</option>
                                    <option value="Archived">Archived</option>
                                </select>
                            </div>
                        </div>

                        <div className='mb-3'>
                            <label className="form-label">Content</label>
                            <textarea className="form-control" name='content' value={formData.content} onChange={handleChange} rows="5" required></textarea>
                        </div>

                        <div className="d-flex justify-content-end gap-2">
                            <Link to="/" className="btn btn-secondary">Cancel</Link>
                            {isSubmiting ?
                                <button type="button" className="btn btn-primary">Saving..</button>
                                :
                                <button type='submit' className="btn btn-primary">Update Post</button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
