# Background Image Setup

To use your own agricultural field image:

1. Place your image file in the `frontend/public/` folder (e.g., `hero-bg.jpg`)
2. Update `frontend/src/components/Home.css` line 10:
   - Change from: `background-image: url('https://images.unsplash.com/...');`
   - To: `background-image: url('/hero-bg.jpg');`

Or use any external image URL by replacing the URL in `Home.css`.


