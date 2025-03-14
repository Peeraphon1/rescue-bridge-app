
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import StatusBadge from "@/components/common/StatusBadge";
import { MapPin, ArrowLeft, Clock, CheckCircle, UserCircle, HomeIcon, Phone, Search } from "lucide-react";
import { HelpRequest, MissionStatus, RequestStatus } from "@/types";

const RequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"pending" | "inProgress" | "completed">("inProgress");
  
  // Mock data for the request
  const request: HelpRequest = {
    id: id || "REQ-001",
    userId: "user-123",
    location: {
      lat: 13.756331,
      lng: 100.501762,
      address: "123 Flood St, Bangkok 10330",
    },
    needs: {
      food: true,
      water: true,
      medicine: true,
      other: false,
    },
    peopleCount: 4,
    details: "We need urgent help. Water is rising. We have elderly people and children.",
    status: "in_progress",
    createdAt: "2023-06-28T10:30:00Z",
    images: ["/lovable-uploads/752a656b-91d7-4948-ad7b-684230379824.png"]
  };

  // Mock rescue team data with properly typed status
  const rescueTeam = {
    id: "team-A",
    name: "Team Alpha",
    leader: {
      name: "John Smith",
      phone: "+66 81-234-5678"
    },
    members: 3,
    estimatedArrival: "2023-06-29T14:30:00Z",
    currentLocation: "2 km away",
    status: "on_way" as MissionStatus,
  };

  // Mock list of requests
  const requests: HelpRequest[] = [
    { ...request, id: "REQ-001", status: "pending" },
    { ...request, id: "REQ-002", status: "in_progress" },
    { ...request, id: "REQ-003", status: "completed" },
  ];

  const getProgressValue = (status: string) => {
    switch (status) {
      case "pending": return 0;
      case "reserved": return 25;
      case "in_progress": return 50;
      case "on_way": return 75;
      case "arrived": return 90;
      case "completed": return 100;
      default: return 0;
    }
  };

  // Timeline steps based on request status
  const timelineSteps = [
    { label: "รับคำขอแล้ว", active: true, date: new Date(request.createdAt) },
    { 
      label: "ทีมช่วยเหลือกำลังมาหา", 
      active: rescueTeam.status === "on_way" || rescueTeam.status === "arrived" || rescueTeam.status === "completed", 
      date: (rescueTeam.status === "on_way" || rescueTeam.status === "arrived" || rescueTeam.status === "completed") ? 
        new Date(Date.now() - 3600000) : null 
    },
    { 
      label: "ถึงที่หมายแล้ว", 
      active: rescueTeam.status === "arrived" || rescueTeam.status === "completed", 
      date: null 
    },
  ];

  const filteredRequests = requests.filter(req => {
    if (activeTab === "pending") return req.status === "pending";
    if (activeTab === "inProgress") return req.status === "in_progress" || req.status === "reserved";
    if (activeTab === "completed") return req.status === "completed";
    return true;
  });

  const renderRequestCard = (request: HelpRequest) => (
    <Card key={request.id} className="mb-4 border-0 shadow-sm hover:shadow-md transition-all">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            <div className="bg-gray-100 rounded-full p-2 mr-3">
              <UserCircle className="h-5 w-5 text-gray-500" />
            </div>
            <span className="text-sm font-medium">คุณ</span>
          </div>
          <StatusBadge 
            status={request.status} 
            className={request.status === "completed" ? "bg-green-100" : request.status === "in_progress" ? "bg-blue-100" : ""}
          />
        </div>

        <div className="mb-3">
          <p className="text-sm font-medium mb-1">ต้องการ: น้ำท่วมบ้าน,น้ำ,อาหาร</p>
          <p className="text-xs text-gray-600">{request.details}</p>
        </div>

        <div className="flex items-center text-xs text-gray-600 mb-3">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{request.location.address}</span>
        </div>

        {request.status === "in_progress" && (
          <div className="border-t pt-3 mt-2">
            <p className="text-sm font-medium text-yellow-600">ทีมช่วยเหลือกำลังเดินทางมาหาคุณ</p>
          </div>
        )}
        
        {request.status === "completed" && (
          <div className="border-t pt-3 mt-2">
            <p className="text-sm font-medium text-green-600">ภารกิจช่วยเหลือเสร็จสิ้นแล้ว</p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <img src="/lovable-uploads/b4e3e3c9-5fe6-4c31-b1f9-f078a8165758.png" alt="No requests" className="w-16 h-16 object-contain" />
      </div>
      <p className="text-lg font-medium">ยังไม่มีการแจ้ง</p>
    </div>
  );

  return (
    <div className="pb-16">
      <div className="bg-white p-4 flex items-center sticky top-0 z-10 border-b">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold flex-1">คำขอของฉัน</h1>
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 text-sm font-medium relative ${activeTab === "pending" ? "text-primary" : "text-gray-500"}`}
          onClick={() => setActiveTab("pending")}
        >
          กำลังดำเนินการ
          {activeTab === "pending" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium relative ${activeTab === "inProgress" ? "text-primary" : "text-gray-500"}`}
          onClick={() => setActiveTab("inProgress")}
        >
          สำเร็จ
          {activeTab === "inProgress" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium relative ${activeTab === "completed" ? "text-primary" : "text-gray-500"}`}
          onClick={() => setActiveTab("completed")}
        >
          ยกเลิก
          {activeTab === "completed" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>}
        </button>
      </div>

      <div className="p-4">
        {filteredRequests.length > 0 ? (
          filteredRequests.map(renderRequestCard)
        ) : (
          renderEmptyState()
        )}
      </div>
    </div>
  );
};

export default RequestDetail;
