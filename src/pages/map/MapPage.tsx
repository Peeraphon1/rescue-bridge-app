
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapPage = () => {
  const { profile } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Default center point - can be adjusted to a central location for your region
  const [mapCenter, setMapCenter] = useState<[number, number]>([13.7563, 100.5018]); // Default: Bangkok

  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true);
      try {
        // Fetch help requests from Supabase
        const { data, error } = await supabase
          .from("help_requests")
          .select("*");
          
        if (error) throw error;
        
        setRequests(data || []);
        
        // If we have requests with locations, center the map on the first one
        if (data && data.length > 0 && data[0].location_lat && data[0].location_lng) {
          setMapCenter([data[0].location_lat, data[0].location_lng]);
        }
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError("Failed to load map data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="mt-2 text-gray-600">Loading map data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Map View</h1>
      
      <div className="h-[60vh] w-full rounded-lg overflow-hidden border border-gray-200 mb-4">
        <MapContainer
          center={mapCenter}
          zoom={10}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {requests.map((request) => (
            request.location_lat && request.location_lng ? (
              <Marker 
                key={request.id} 
                position={[request.location_lat, request.location_lng]}
              >
                <Popup>
                  <div>
                    <h3 className="font-medium">Help Request</h3>
                    <p className="text-sm">Address: {request.location_address}</p>
                    <p className="text-sm">People: {request.people_count}</p>
                    <p className="text-sm">Status: {request.status}</p>
                  </div>
                </Popup>
              </Marker>
            ) : null
          ))}
        </MapContainer>
      </div>
      
      <div className="text-sm text-gray-500">
        {requests.length === 0 ? (
          <p>No help requests with location data available.</p>
        ) : (
          <p>Showing {requests.length} help requests on the map.</p>
        )}
      </div>
    </div>
  );
};

export default MapPage;
