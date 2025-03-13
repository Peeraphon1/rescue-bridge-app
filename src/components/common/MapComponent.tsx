
import React, { useState } from "react";
import { toast } from "@/components/ui/toast";
import { MapPinIcon } from "lucide-react";

interface MapComponentProps {
  onLocationSelect?: (lat: number, lng: number) => void;
  initialLat?: number;
  initialLng?: number;
  readOnly?: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({
  onLocationSelect,
  initialLat = 13.7563,
  initialLng = 100.5018,
  readOnly = false
}) => {
  const [apiKeyEntered, setApiKeyEntered] = useState<boolean>(false);
  const [mapApiKey, setMapApiKey] = useState<string>("");

  // This is a placeholder for the real map implementation
  // In a real app, we would integrate with Mapbox, Google Maps, etc.
  
  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (readOnly) return;
    
    // Simulate selecting a location
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert x,y to simulated lat,lng
    const lat = initialLat + (y - rect.height / 2) / 1000;
    const lng = initialLng + (x - rect.width / 2) / 1000;
    
    if (onLocationSelect) {
      onLocationSelect(lat, lng);
      toast({
        title: "Location selected",
        description: `Latitude: ${lat.toFixed(6)}, Longitude: ${lng.toFixed(6)}`,
      });
    }
  };

  const handleSubmitApiKey = () => {
    if (mapApiKey.trim()) {
      setApiKeyEntered(true);
      toast({
        title: "Map API Key Set",
        description: "Map functionality is now enabled",
      });
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
    }
  };

  if (!apiKeyEntered) {
    return (
      <div className="rounded-lg overflow-hidden bg-gray-100 p-4 mb-4">
        <p className="text-sm text-gray-600 mb-2">
          To use the map feature, please enter your map API key:
        </p>
        <input
          type="text"
          value={mapApiKey}
          onChange={(e) => setMapApiKey(e.target.value)}
          placeholder="Enter map API key"
          className="w-full px-3 py-2 border rounded mb-2"
        />
        <button
          onClick={handleSubmitApiKey}
          className="w-full bg-primary text-white py-2 rounded"
        >
          Submit
        </button>
        <p className="text-xs text-gray-500 mt-2">
          For this demo, any text will work as an API key.
        </p>
      </div>
    );
  }

  return (
    <div 
      className="h-64 bg-blue-50 rounded-lg relative overflow-hidden"
      onClick={handleMapClick}
    >
      {/* Simplified map visual */}
      <div className="absolute inset-0 bg-blue-50">
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
          {Array(16)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="border border-blue-100" />
            ))}
        </div>

        {/* Roads */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 transform -translate-y-1/2"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gray-300 transform -translate-x-1/2"></div>
        
        {/* Location marker */}
        {readOnly && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center animate-pulse">
              <MapPinIcon className="h-4 w-4 text-white" />
            </div>
          </div>
        )}
      </div>
      
      {!readOnly && (
        <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-600 bg-white/80 py-1">
          Click to set location
        </div>
      )}
    </div>
  );
};

export default MapComponent;
