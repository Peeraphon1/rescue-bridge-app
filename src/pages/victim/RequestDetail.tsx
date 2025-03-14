
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatusBadge from "@/components/common/StatusBadge";
import { MapPin, ArrowLeft, Search, UserCircle } from "lucide-react";
import { HelpRequest } from "@/types";

const RequestDetail = () => {
  const navigate = useNavigate();
  
  // Mock data for the requests
  const requests: HelpRequest[] = [
    {
      id: "REQ-001",
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
      status: "pending",
      createdAt: "2023-06-28T10:30:00Z",
      images: ["/lovable-uploads/752a656b-91d7-4948-ad7b-684230379824.png"]
    },
    {
      id: "REQ-002",
      userId: "user-123",
      location: {
        lat: 13.756331,
        lng: 100.501762,
        address: "456 River Rd, Bangkok 10330",
      },
      needs: {
        food: true,
        water: true,
        medicine: false,
        other: false,
      },
      peopleCount: 2,
      details: "Need water and food supplies. Area is flooded.",
      status: "in_progress",
      createdAt: "2023-06-29T14:20:00Z",
      images: []
    },
    {
      id: "REQ-003",
      userId: "user-123",
      location: {
        lat: 13.756331,
        lng: 100.501762,
        address: "789 Rescue Ave, Bangkok 10330",
      },
      needs: {
        food: false,
        water: true,
        medicine: true,
        other: false,
      },
      peopleCount: 1,
      details: "Need medical assistance and water.",
      status: "completed",
      createdAt: "2023-06-20T09:15:00Z",
      images: []
    },
  ];

  const renderRequestCard = (request: HelpRequest) => (
    <Card key={request.id} className="mb-4 border-0 shadow-sm hover:shadow-md transition-all">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            <div className="bg-gray-100 rounded-full p-2 mr-3">
              <UserCircle className="h-5 w-5 text-gray-500" />
            </div>
            <span className="text-sm font-medium">คำขอช่วยเหลือ #{request.id}</span>
          </div>
          <StatusBadge 
            status={request.status} 
            className={request.status === "completed" ? "bg-green-100" : request.status === "in_progress" ? "bg-blue-100" : ""}
          />
        </div>

        <div className="mb-3">
          <p className="text-sm font-medium mb-1">
            ต้องการ: {[
              request.needs.food ? "อาหาร" : "",
              request.needs.water ? "น้ำ" : "",
              request.needs.medicine ? "ยา" : "",
              request.needs.other ? "อื่นๆ" : ""
            ].filter(Boolean).join(", ")}
          </p>
          <p className="text-xs text-gray-600">{request.details}</p>
        </div>

        <div className="flex items-center text-xs text-gray-600 mb-3">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{request.location.address}</span>
        </div>

        <div className="text-xs text-gray-500 mb-3">
          สร้างเมื่อ: {new Date(request.createdAt).toLocaleString('th-TH')}
        </div>

        {request.status === "in_progress" && (
          <div className="border-t pt-3 mt-2">
            <p className="text-sm font-medium text-blue-600">ทีมช่วยเหลือกำลังเดินทางมาหาคุณ</p>
          </div>
        )}
        
        {request.status === "completed" && (
          <div className="border-t pt-3 mt-2">
            <p className="text-sm font-medium text-green-600">ภารกิจช่วยเหลือเสร็จสิ้นแล้ว</p>
          </div>
        )}

        <Button
          className="w-full mt-3 text-primary border border-primary bg-white hover:bg-primary/10"
          variant="outline"
          onClick={() => navigate(`/requests/${request.id}`)}
        >
          ดูรายละเอียด
        </Button>
      </CardContent>
    </Card>
  );

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <img src="/lovable-uploads/b4e3e3c9-5fe6-4c31-b1f9-f078a8165758.png" alt="No requests" className="w-16 h-16 object-contain" />
      </div>
      <p className="text-lg font-medium">ยังไม่มีคำขอช่วยเหลือ</p>
      <p className="text-sm text-gray-500">หากคุณต้องการความช่วยเหลือ กรุณาสร้างคำขอใหม่</p>
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
        <h1 className="text-lg font-semibold flex-1">คำขอช่วยเหลือของฉัน</h1>
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
        </Button>
      </div>

      <Tabs defaultValue="inProgress" className="w-full">
        <TabsList className="w-full grid grid-cols-3 border-b rounded-none bg-white">
          <TabsTrigger value="pending" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
            รอดำเนินการ
          </TabsTrigger>
          <TabsTrigger value="inProgress" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
            กำลังดำเนินการ
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
            เสร็จสิ้น
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="p-4">
          {requests.filter(req => req.status === "pending").length > 0 ? 
            requests.filter(req => req.status === "pending").map(renderRequestCard) : 
            renderEmptyState()
          }
        </TabsContent>
        
        <TabsContent value="inProgress" className="p-4">
          {requests.filter(req => req.status === "in_progress" || req.status === "reserved").length > 0 ? 
            requests.filter(req => req.status === "in_progress" || req.status === "reserved").map(renderRequestCard) : 
            renderEmptyState()
          }
        </TabsContent>
        
        <TabsContent value="completed" className="p-4">
          {requests.filter(req => req.status === "completed").length > 0 ? 
            requests.filter(req => req.status === "completed").map(renderRequestCard) : 
            renderEmptyState()
          }
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RequestDetail;
