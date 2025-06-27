document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links (if any are added)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Image Gallery Lightbox functionality (for the Shared Album on gallery.html)
    const galleryImages = document.querySelectorAll('.gallery img');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox img');
    const closeBtn = document.querySelector('.lightbox.close');
    const prevBtn = document.querySelector('.lightbox.prev');
    const nextBtn = document.querySelector('.lightbox.next');

    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = galleryImages[currentIndex].src;
        lightbox.style.display = 'flex';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        lightboxImg.src = galleryImages[currentIndex].src;
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentIndex].src;
    }

    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(index));
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Close lightbox on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            closeLightbox();
        }
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });


    // --- Guest Photo Upload Functionality (Client-Side Preview Only) ---
    const photoUploadInput = document.getElementById('photo-upload');
    const fileStatus = document.getElementById('file-status');
    const imagePreviewContainer = document.getElementById('image-preview-container');
    const submitUploadBtn = document.getElementById('submit-upload');

    if (photoUploadInput) { // Ensure we are on the gallery.html page
        photoUploadInput.addEventListener('change', (event) => {
            const files = event.target.files;
            imagePreviewContainer.innerHTML = ''; // Clear previous previews
            if (files.length > 0) {
                fileStatus.textContent = `${files.length} file(s) selected.`;
                submitUploadBtn.style.display = 'block'; // Show submit button

                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    if (file.type.startsWith('image/')) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const img = document.createElement('img');
                            img.src = e.target.result;
                            img.classList.add('image-preview');
                            imagePreviewContainer.appendChild(img);
                        };
                        reader.readAsDataURL(file);
                    } else {
                        // Handle non-image files if necessary, or filter them out
                        console.warn('Non-image file selected:', file.name);
                    }
                }
            } else {
                fileStatus.textContent = 'No files chosen';
                submitUploadBtn.style.display = 'none'; // Hide submit button
            }
        });

        submitUploadBtn.addEventListener('click', () => {
            const files = photoUploadInput.files;
            if (files.length > 0) {
                // --- IMPORTANT: Backend Integration Required Here ---
                // This is where you would send the files to your server or a cloud storage service.
                // Example using Fetch API (conceptual, requires server endpoint):
                /*
                const formData = new FormData();
                for (let i = 0; i < files.length; i++) {
                    formData.append('weddingPhotos', files[i]);
                }

                fetch('/upload-photos', { // Replace with your actual upload endpoint
                    method: 'POST',
                    body: formData
                })
               .then(response => response.json())
               .then(data => {
                    console.log('Upload success:', data);
                    alert('Photos uploaded successfully! Thank you for sharing your moments.');
                    // Optionally, clear previews and reset input
                    imagePreviewContainer.innerHTML = '';
                    fileStatus.textContent = 'No files chosen';
                    photoUploadInput.value = ''; // Clear selected files
                    submitUploadBtn.style.display = 'none';
                    // You might want to refresh the gallery section here to show new uploads
                })
               .catch(error => {
                    console.error('Upload error:', error);
                    alert('Failed to upload photos. Please try again.');
                });
                */
                alert('This is a demo. For actual upload, a backend server is required!');
                console.log('Simulating upload for:', files.length, 'files.');
                // After "upload" (in a real scenario), you'd clear the input and previews
                imagePreviewContainer.innerHTML = '';
                fileStatus.textContent = 'No files chosen';
                photoUploadInput.value = ''; // Clear selected files
                submitUploadBtn.style.display = 'none';
            } else {
                alert('Please select at least one photo to upload.');
            }
        });
    }
});
