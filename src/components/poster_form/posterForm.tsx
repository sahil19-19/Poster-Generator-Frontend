import axios from "axios";
import React, { useState } from "react";
import './posterForm.css'

const PosterForm: React.FC = () => {
    const [message, setMessage] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
	const [posterUrl, setPosterUrl] = useState('');
    
    const apiUrl = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPosterUrl("");
        
        if (!image || !message) {
            setError("Image and message are requird");
            return;
        }
        const formData = new FormData();
        formData.append("message", message);
        formData.append("image", image);


        setLoading(true);
        setError("");
        try {
            const res = await axios.post(
                `${apiUrl}/generate-poster`,
                formData
            );
            setPosterUrl(res.data.url);
            // setPosterUrl("https://media.istockphoto.com/id/1419410282/photo/silent-forest-in-spring-with-beautiful-bright-sun-rays.jpg?s=612x612&w=0&k=20&c=UHeb1pGOw6ozr6utsenXHhV19vW6oiPIxDqhKCS2Llk=");
        } catch (err) {
            setError("Failed to generate poster,");
			console.log(err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
        <form onSubmit={handleSubmit} className="poster_form">
            <input
                type="text"
                placeholder="Enter message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
            />
            <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                required
            />
            <button className="submit_button" type="submit">Generate Poster</button>
        </form>
        <div className="display">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {posterUrl && <img src={posterUrl} alt="Poster" className="poster_image"/>}
        </div>
        </>
    );
};

export default PosterForm;
