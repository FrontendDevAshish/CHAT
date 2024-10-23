import React, { useEffect, useState } from 'react';


const Task = () => {
    const [result, setResult] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const url = 'https://jsonplaceholder.typicode.com/photos';

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then((res) => setResult(res))
            .catch((err) => console.error('Error fetching data:', err));
    }, []);

    const openModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    return (
        <div>
            {result.map((elem) => (
                <div key={elem.id} className="thumbnail">
                    <img 
                        src={elem.thumbnailUrl} 
                        alt={elem.title} 
                        onClick={() => openModal(elem.url)} 
                        style={{ cursor: 'pointer' }} // Indicate that it's clickable
                    />
                    <p>{elem.title}</p>
                </div>
            ))}

            {/* Modal */}
            {isModalOpen && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close" onClick={closeModal}>&times;</span>
                        <img src={selectedImage} alt="Full size" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Task;
