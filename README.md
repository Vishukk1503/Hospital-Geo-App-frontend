# Hospital Geo App - Frontend

## Overview
This is the frontend for the Hospital Geo App, built using React. It provides an interactive user interface for users to find hospitals nearby, filter based on specialization and bed availability, and view real-time updates on hospital capacity.

## Features
- **Interactive Map**: Displays hospitals on a map with geolocation support.
- **Search Hospitals**: Find hospitals within a specified radius.
- **Filter Options**: Search hospitals by specialization and available beds.
- **Real-Time Updates**: Dynamically updates bed availability.
- **Responsive Design**: Mobile-friendly UI with a clean and modern look.

## Technologies Used
- **React**: UI framework.
- **React Router**: Navigation handling.
- **Leaflet.js**: Interactive maps.
- **Axios**: API communication.
- **Bootstrap / Tailwind CSS**: UI styling.

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js & npm

### Steps
1. **Clone the Repository:**
   ```sh
   git clone <repo-url>
   cd Hospital-Geo-App-frontend
   ```
2. **Install Dependencies:**
   ```sh
   npm install
   ```
3. **Set Up Environment Variables:**
   - Create a `.env` file in the project root.
   - Add the following:
     ```sh
     REACT_APP_API_URL=http://127.0.0.1:8000
     ```
4. **Run the Development Server:**
   ```sh
   npm start
   ```
5. **Access the Application:**
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Integration
The frontend interacts with the backend API hosted at `http://127.0.0.1:8000`. Ensure the backend is running before using the frontend.

## Deployment
To build and deploy:
```sh
npm run build
```
This generates a `build/` directory with the production-ready frontend.



## Contact
For any queries, reach out to **Vishwanatha K** at **vishwanathakanchaboina@gmail.com**.

