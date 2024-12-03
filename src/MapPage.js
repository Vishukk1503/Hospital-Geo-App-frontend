import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { ToastContainer, toast } from "react-toastify";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "react-toastify/dist/ReactToastify.css";

// Fix leaflet's default icon path issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Pre-recorded cities and coordinates
const cities = [
    { name: "Cincinnati, OH", latitude: 39.1031, longitude: -84.5120 },
    { name: "Montgomery, AL", latitude: 32.3792, longitude: -86.3077 },
    { name: "Juneau, AK", latitude: 58.3019, longitude: -134.4197 },
    { name: "Phoenix, AZ", latitude: 33.4484, longitude: -112.0740 },
    { name: "Little Rock, AR", latitude: 34.7465, longitude: -92.2896 },
    { name: "Sacramento, CA", latitude: 38.5816, longitude: -121.4944 },
    { name: "Denver, CO", latitude: 39.7392, longitude: -104.9903 },
    { name: "Hartford, CT", latitude: 41.7658, longitude: -72.6734 },
    { name: "Dover, DE", latitude: 39.1582, longitude: -75.5244 },
    { name: "Tallahassee, FL", latitude: 30.4383, longitude: -84.2807 },
    { name: "Atlanta, GA", latitude: 33.7490, longitude: -84.3880 },
    { name: "Honolulu, HI", latitude: 21.3069, longitude: -157.8583 },
    { name: "Boise, ID", latitude: 43.6150, longitude: -116.2023 },
    { name: "Springfield, IL", latitude: 39.7817, longitude: -89.6501 },
    { name: "Indianapolis, IN", latitude: 39.7684, longitude: -86.1581 },
    { name: "Des Moines, IA", latitude: 41.5868, longitude: -93.6250 },
    { name: "Topeka, KS", latitude: 39.0473, longitude: -95.6752 },
    { name: "Frankfort, KY", latitude: 38.2009, longitude: -84.8733 },
    { name: "Baton Rouge, LA", latitude: 30.4515, longitude: -91.1871 },
    { name: "Augusta, ME", latitude: 44.3106, longitude: -69.7795 },
    { name: "Annapolis, MD", latitude: 38.9784, longitude: -76.4922 },
    { name: "Boston, MA", latitude: 42.3601, longitude: -71.0589 },
    { name: "Lansing, MI", latitude: 42.7325, longitude: -84.5555 },
    { name: "Saint Paul, MN", latitude: 44.9537, longitude: -93.0900 },
    { name: "Jackson, MS", latitude: 32.2988, longitude: -90.1848 },
    { name: "Jefferson City, MO", latitude: 38.5767, longitude: -92.1735 },
    { name: "Helena, MT", latitude: 46.5891, longitude: -112.0391 },
    { name: "Lincoln, NE", latitude: 40.8136, longitude: -96.7026 },
    { name: "Carson City, NV", latitude: 39.1638, longitude: -119.7674 },
    { name: "Concord, NH", latitude: 43.2081, longitude: -71.5376 },
    { name: "Trenton, NJ", latitude: 40.2171, longitude: -74.7429 },
    { name: "Santa Fe, NM", latitude: 35.6870, longitude: -105.9378 },
    { name: "Albany, NY", latitude: 42.6526, longitude: -73.7562 },
    { name: "Raleigh, NC", latitude: 35.7796, longitude: -78.6382 },
    { name: "Bismarck, ND", latitude: 46.8083, longitude: -100.7837 },
    { name: "Columbus, OH", latitude: 39.9612, longitude: -82.9988 },
    { name: "Oklahoma City, OK", latitude: 35.4676, longitude: -97.5164 },
    { name: "Salem, OR", latitude: 44.9429, longitude: -123.0351 },
    { name: "Harrisburg, PA", latitude: 40.2732, longitude: -76.8867 },
    { name: "Providence, RI", latitude: 41.8240, longitude: -71.4128 },
    { name: "Columbia, SC", latitude: 34.0007, longitude: -81.0348 },
    { name: "Pierre, SD", latitude: 44.3683, longitude: -100.3509 },
    { name: "Nashville, TN", latitude: 36.1627, longitude: -86.7816 },
    { name: "Austin, TX", latitude: 30.2672, longitude: -97.7431 },
    { name: "Salt Lake City, UT", latitude: 40.7608, longitude: -111.8910 },
    { name: "Montpelier, VT", latitude: 44.2601, longitude: -72.5754 },
    { name: "Richmond, VA", latitude: 37.5407, longitude: -77.4360 },
    { name: "Olympia, WA", latitude: 47.0379, longitude: -122.9007 },
    { name: "Charleston, WV", latitude: 38.3498, longitude: -81.6326 },
    { name: "Madison, WI", latitude: 43.0731, longitude: -89.4012 },
    { name: "Cheyenne, WY", latitude: 41.1400, longitude: -104.8202 }
  ];
  

// List of specializations
const specializations = [
  "Cardiology",
  "Orthopedics",
  "Pediatrics",
  "Oncology",
  "Neurology",
];

function MapPage() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [radius, setRadius] = useState(50);
  const [specialization, setSpecialization] = useState("");
  const [minBeds, setMinBeds] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);

  const initializeMap = () => {
    const existingMap = document.getElementById("map");
    if (existingMap._leaflet_id) {
      existingMap._leaflet_id = null;
    }

    const map = L.map("map").setView([40.7128, -74.0060], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    setMapInstance(map);
  };

  const clearMarkers = () => {
    mapInstance.eachLayer((layer) => {
      if (!layer._url) mapInstance.removeLayer(layer);
    });
  };

  const fetchNearestHospital = async () => {
    if (!selectedCity) {
      toast.error("Please select a city first!");
      return;
    }
  
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/hospitals/nearest?latitude=${selectedCity.latitude}&longitude=${selectedCity.longitude}`
      );
      if (!response.ok) throw new Error("Failed to fetch nearest hospital.");
  
      const data = await response.json();
      clearMarkers();
  
      // Adjusted destructuring to match the API field name
      const { latitude, longitude, name, beds_available } = data.hospital;
  
      L.marker([latitude, longitude])
        .addTo(mapInstance)
        .bindPopup(`<b>${name}</b><br>Beds Available: ${beds_available}`);
      mapInstance.setView([latitude, longitude], 12);
      toast.success("Nearest hospital loaded.");
    } catch (error) {
      console.error(error);
      toast.error("Error fetching nearest hospital.");
    }
  };
  

  const fetchHospitals = async () => {
    const lat = latitude || (selectedCity && selectedCity.latitude);
    const long = longitude || (selectedCity && selectedCity.longitude);
  
    if (!lat || !long) {
      toast.error("No coordinates provided. Please select a city or enter coordinates.");
      return;
    }
  
    const url = specialization || minBeds
      ? `http://127.0.0.1:8000/hospitals/filter?latitude=${lat}&longitude=${long}&radius_km=${radius}&specialization=${specialization}&min_beds=${minBeds}`
      : `http://127.0.0.1:8000/hospitals?latitude=${lat}&longitude=${long}&radius_km=${radius}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch hospitals.");
  
      const data = await response.json();
      clearMarkers();
  
      const hospitals = specialization || minBeds ? data.filtered_hospitals : data.hospitals;
      hospitals.forEach((hospital) => {
        const { name, specialization, beds_available, latitude, longitude } = hospital;
  
        // Create a marker for each hospital with detailed popup information
        L.marker([latitude, longitude])
          .addTo(mapInstance)
          .bindPopup(`
            <b>${name}</b><br>
            <b>Specialization:</b> ${specialization || "N/A"}<br>
            <b>Beds Available:</b> ${beds_available || "N/A"}
          `);
      });
  
      mapInstance.setView([lat, long], 12);
      toast.success("Hospitals loaded.");
    } catch (error) {
      console.error(error);
      toast.error("Error fetching hospitals.");
    }
  };
  

  useEffect(() => {
    initializeMap();
  }, []);

  return (
    <MDBContainer className="py-5">
      <h1 className="text-center mb-4">Hospital Locator Map</h1>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <MDBDropdown>
          <MDBDropdownToggle color="primary" className="mb-3 mb-md-0">
            {selectedCity ? selectedCity.name : "Select a City"}
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            {cities.map((city) => (
              <MDBDropdownItem
                key={city.name}
                onClick={() => {
                  setSelectedCity(city);
                  setLatitude("");
                  setLongitude("");
                }}
              >
                {city.name}
              </MDBDropdownItem>
            ))}
          </MDBDropdownMenu>
        </MDBDropdown>

        <MDBBtn color="primary" size="lg" onClick={fetchNearestHospital}>
          Show Hospital
        </MDBBtn>
      </div>

      <MDBBtn
        color="secondary"
        onClick={() => setShowAdvanced((prev) => !prev)}
        className="mb-3"
      >
        Advanced Options
      </MDBBtn>

      {showAdvanced && (
        <div
          style={{
            padding: "20px",
            background: "#f8f9fa",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            marginBottom: "20px",
          }}
        >
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <MDBInput
              type="number"
              label="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="mb-3 mb-md-0"
              style={{ width: "150px" }}
            />
            <MDBInput
              type="number"
              label="Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="mb-3 mb-md-0"
              style={{ width: "150px" }}
            />
            <MDBInput
              type="number"
              label="Radius (km)"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              className="mb-3 mb-md-0"
              style={{ width: "150px" }}
            />
            <MDBDropdown>
              <MDBDropdownToggle color="secondary">
                {specialization || "Specialization"}
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                {specializations.map((spec) => (
                  <MDBDropdownItem
                    key={spec}
                    onClick={() => setSpecialization(spec)}
                  >
                    {spec}
                  </MDBDropdownItem>
                ))}
              </MDBDropdownMenu>
            </MDBDropdown>
            <MDBInput
              type="number"
              label="Min Beds"
              value={minBeds}
              onChange={(e) => setMinBeds(e.target.value)}
              className="mb-3 mb-md-0"
              style={{ width: "150px" }}
            />
          </div>
          <MDBBtn color="primary" size="lg" onClick={fetchHospitals}>
            Show Hospitals
          </MDBBtn>
        </div>
      )}

      <div
        id="map"
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      ></div>
      <ToastContainer />
    </MDBContainer>
  );
}

export default MapPage;
