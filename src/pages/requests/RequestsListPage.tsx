
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RequestsListPage = () => {
  const { user, profile } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        // Fetch help requests from Supabase for the current user
        const { data, error } = await supabase
          .from("help_requests")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
          
        if (error) throw error;
        
        setRequests(data || []);
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError("Failed to load your requests. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case "reserved":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Reserved</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">In Progress</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="mt-2 text-gray-600">Loading your requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Requests</h1>
        
        {profile?.role === "victim" && (
          <Button size="sm" asChild>
            <Link to="/request-help">
              <Plus className="h-4 w-4 mr-1" />
              New Request
            </Link>
          </Button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 p-4 rounded-lg mb-4 flex items-center text-red-800">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {!error && requests.length === 0 ? (
        <div className="text-center py-12 px-4">
          <div className="bg-gray-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">No requests found</h3>
          <p className="text-gray-500 mb-6">You haven't made any help requests yet.</p>
          
          {profile?.role === "victim" && (
            <Button asChild>
              <Link to="/request-help">Create New Request</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {requests.map((request) => (
            <Card key={request.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">
                    {request.location_address || "Unknown Location"}
                  </CardTitle>
                  {getStatusBadge(request.status)}
                </div>
              </CardHeader>
              
              <CardContent className="pb-3">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div>
                    <span className="text-gray-500">People:</span> {request.people_count}
                  </div>
                  <div>
                    <span className="text-gray-500">Created:</span> {new Date(request.created_at).toLocaleDateString()}
                  </div>
                  <div className="col-span-2 mt-1">
                    <span className="text-gray-500 block mb-1">Needs:</span>
                    <div className="flex flex-wrap gap-2">
                      {request.needs_food && <Badge variant="secondary">Food</Badge>}
                      {request.needs_water && <Badge variant="secondary">Water</Badge>}
                      {request.needs_medicine && <Badge variant="secondary">Medicine</Badge>}
                      {request.needs_other && <Badge variant="secondary">Other</Badge>}
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-0">
                <Button variant="outline" className="w-full" asChild>
                  <Link to={`/requests/${request.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestsListPage;
