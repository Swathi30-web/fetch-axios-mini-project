import { useEffect, useState } from "react";
import axios from "axios";
import api from "../services/api";

interface ImageItem {
  id: string;
  title: string;
  url: string;
}

export default function Images() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const fetchImages = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get<ImageItem[]>("/images");
      setImages(response.data);
    } catch (err) {
      setError(
        axios.isAxiosError(err)
          ? err.message
          : "Failed to load images."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // ADD IMAGE
  const handleAddImage = async () => {
    if (!title.trim() || !url.trim()) {
      alert("Please enter title and image URL.");
      return;
    }

    try {
      const response = await api.post<ImageItem>("/images", {
        title,
        url,
      });

      setImages((prev) => [...prev, response.data]);

      setTitle("");
      setUrl("");
      setShowAdd(false);

      alert("Image added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add image.");
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h2>Images</h2>
        <p className="loading">Loading images...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <h2>Images</h2>
        <p className="error">{error}</p>

        <button
          className="primary-btn"
          onClick={fetchImages}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="page">

      <div className="images-header">
        <div>
          <h2>Images</h2>
          <p className="page-sub">
            Images fetched using Axios
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => setShowAdd(!showAdd)}
        >
          + Add Image
        </button>
      </div>

      {/* ADD IMAGE FORM */}

      {showAdd && (
        <div className="image-form">

          <input
            type="text"
            placeholder="Image title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Image URL"
            value={url}
            onChange={(e) =>
              setUrl(e.target.value)
            }
          />

          <button
            className="primary-btn"
            onClick={handleAddImage}
          >
            Add
          </button>

          <button
            className="ghost-btn"
            onClick={() => {
              setShowAdd(false);
              setTitle("");
              setUrl("");
            }}
          >
            Cancel
          </button>

        </div>
      )}

      {/* FIRST ROW - 2 IMAGES */}

      <div className="image-grid">

        {images.map((image) => (
          <div
            className="image-card"
            key={image.id}
          >
            <img
              src={image.url}
              alt={image.title}
              className="image-item"
            />

            <div className="image-content">
              <h3>{image.title}</h3>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}