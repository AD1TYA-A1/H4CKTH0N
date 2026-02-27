'use client'
import { useState } from 'react'

export default function UploadTest() {
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [uploadedUrl, setUploadedUrl] = useState(null)
    const [loading, setLoading] = useState(false)

    // Show preview when user picks image
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setImage(file)
        setPreview(URL.createObjectURL(file)) // local preview
    }

    // Upload to Cloudinary
    const handleUpload = async () => {
        if (!image) return alert('Pick an image first!')
        setLoading(true)

        const formData = new FormData()
        formData.append('file', image)

        const res = await fetch('/api/uploadImage', {
            method: 'POST',
            body: formData  // NO headers needed with FormData!
        })

        const result = await res.json()

        if (result.success) {
            setUploadedUrl(result.url)  // ✅ This is your Cloudinary link!
            console.log('Image URL:', result.url)
        } else {
            alert('Upload failed!')
        }
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "url": result.url
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/uploadURL", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                
            })
            .catch((error) => console.error(error));
        setLoading(false)
    }

    return (
        <div className="p-8">
            {/* File picker */}
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-4"
            />

            {/* Local preview */}
            {preview && (
                <img
                    src={preview}
                    alt="preview"
                    className="w-48 h-48 object-cover rounded mb-4"
                />
            )}

            {/* Upload button */}
            <button
                onClick={handleUpload}
                disabled={loading}
                className="bg-blue-500 text-white px-6 py-2 rounded"
            >
                {loading ? 'Uploading...' : 'Upload to Cloudinary'}
            </button>

            {/* Show result URL */}
            {uploadedUrl && (
                <div className="mt-4">
                    <p className="text-green-500 font-bold">✅ Uploaded!</p>
                    <p className="text-sm break-all">{uploadedUrl}</p>
                    <img
                        src={uploadedUrl}
                        alt="uploaded"
                        className="w-48 h-48 object-cover rounded mt-2"
                    />
                </div>
            )}
        </div>
    )
}
// ```

// ---

// ## 🔁 Complete Flow
// ```
// User picks image
// ↓
// Local preview shown immediately (URL.createObjectURL)
// ↓
// User clicks Upload
// ↓
// FormData sent to /api/uploadImage
// ↓
// API converts to base64 → sends to Cloudinary
// ↓
// Cloudinary returns secure_url
// ↓
// You save this URL in MongoDB with the report