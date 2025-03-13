
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { ArrowLeft, Plus, Image } from "lucide-react";
import MapComponent from "@/components/common/MapComponent";

const RequestHelp = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [formData, setFormData] = useState({
    address: "",
    needs: {
      food: false,
      water: false,
      medicine: false,
      other: false,
    },
    otherDetails: "",
    peopleCount: 1,
    details: "",
    images: [] as File[],
  });

  const handleLocationSelect = (lat: number, lng: number) => {
    setLocation({ lat, lng });
  };

  const handleCheckboxChange = (name: string) => {
    setFormData({
      ...formData,
      needs: {
        ...formData.needs,
        [name]: !formData.needs[name as keyof typeof formData.needs],
      },
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        images: [...formData.images, ...Array.from(files)],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!location.lat || !location.lng) {
      toast({
        title: "Error",
        description: "Please select a location on the map",
        variant: "destructive",
      });
      return;
    }
    
    if (!Object.values(formData.needs).some(value => value)) {
      toast({
        title: "Error",
        description: "Please select at least one item you need help with",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Request Submitted",
        description: "Your help request has been submitted successfully",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-16">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-1 mr-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">Request Help</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="location">Your Location</Label>
          <MapComponent onLocationSelect={handleLocationSelect} />
          <Input
            id="address"
            name="address"
            placeholder="Additional address details"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label>What do you need help with?</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="food"
                checked={formData.needs.food}
                onCheckedChange={() => handleCheckboxChange("food")}
              />
              <Label htmlFor="food">Food</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="water"
                checked={formData.needs.water}
                onCheckedChange={() => handleCheckboxChange("water")}
              />
              <Label htmlFor="water">Water</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="medicine"
                checked={formData.needs.medicine}
                onCheckedChange={() => handleCheckboxChange("medicine")}
              />
              <Label htmlFor="medicine">Medicine</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="other"
                checked={formData.needs.other}
                onCheckedChange={() => handleCheckboxChange("other")}
              />
              <Label htmlFor="other">Other</Label>
            </div>
          </div>
          {formData.needs.other && (
            <Input
              id="otherDetails"
              name="otherDetails"
              placeholder="Please specify other needs"
              value={formData.otherDetails}
              onChange={handleInputChange}
            />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="peopleCount">How many people need assistance?</Label>
          <Input
            id="peopleCount"
            name="peopleCount"
            type="number"
            min="1"
            value={formData.peopleCount}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="details">Additional Details</Label>
          <Textarea
            id="details"
            name="details"
            placeholder="Please provide any additional details that might help rescuers"
            value={formData.details}
            onChange={handleInputChange}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="images">Add Photos (optional)</Label>
          <div className="border border-dashed rounded-md p-4 text-center">
            <Input
              id="images"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <Label
              htmlFor="images"
              className="flex flex-col items-center cursor-pointer"
            >
              <Image className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">
                Click to upload images
              </span>
            </Label>
          </div>
          {formData.images.length > 0 && (
            <div className="text-sm text-gray-500">
              {formData.images.length} image(s) selected
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <span className="animate-spin mr-2">⏳</span> Submitting...
            </span>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </div>
  );
};

export default RequestHelp;
