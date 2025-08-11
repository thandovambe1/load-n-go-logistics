// client/src/pages/vehicle-management.jsx
import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import Navigation from "@/components/Navigation";
import Footer from "@/components/footer"; // <-- if your file is Footer.jsx, use '@/components/Footer' instead
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  ArrowLeft,
  Car,
  CheckCircle,
  Shield,
  TriangleAlert,
  Eye,
  Download,
  Upload,
  Plus,
  Calendar,
  Headphones,
  Edit,
  Info,
} from "lucide-react";

/**
 * Small fetch helper that throws on non-OK responses and returns parsed JSON.
 * Kept simple so it works reliably in builds and on Vercel.
 */
async function fetcher(path) {
  const res = await fetch(path, { credentials: "same-origin" });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText || "Fetch error");
    const err = new Error(text);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export default function VehicleManagement() {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // If not a driver, show a toast and redirect to login (when auth resolved).
  useEffect(() => {
    if (!authLoading && (!user || user.role !== "driver")) {
      toast({
        title: "Unauthorized",
        description: "You need to be a registered driver to access this page.",
        variant: "destructive",
      });
      // small delay so user can see the toast
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 600);
    }
  }, [user, authLoading, toast]);

  // Vehicles query (only enabled when user is a driver)
  const {
    data: vehicles = [],
    isLoading: vehiclesLoading,
    error: vehiclesError,
  } = useQuery({
    queryKey: ["/api/vehicles"],
    queryFn: () => fetcher("/api/vehicles"),
    enabled: !!user && user.role === "driver",
    onError: (err) => {
      if (isUnauthorizedError && isUnauthorizedError(err)) {
        toast({ title: "Unauthorized", description: "Please sign in.", variant: "destructive" });
      } else {
        toast({ title: "Error", description: "Failed to load vehicles.", variant: "destructive" });
      }
    },
  });

  // Driver documents
  const {
    data: documents = [],
    isLoading: documentsLoading,
    error: documentsError,
  } = useQuery({
    queryKey: ["/api/driver-documents"],
    queryFn: () => fetcher("/api/driver-documents"),
    enabled: !!user && user.role === "driver",
    onError: (err) => {
      toast({ title: "Error", description: "Failed to load documents.", variant: "destructive" });
    },
  });

  // Delivery requests (for stats)
  const { data: deliveryRequests = [] } = useQuery({
    queryKey: ["/api/delivery-requests"],
    queryFn: () => fetcher("/api/delivery-requests"),
    enabled: !!user && user.role === "driver",
    onError: () => {
      /* non-fatal for stats */
    },
  });

  const getDocumentsByType = (type) => {
    if (!Array.isArray(documents)) return undefined;
    return documents.find((d) => d.documentType === type);
  };

  // Unified helper to compute document status
  const getDocumentStatus = (doc) => {
    if (!doc || !doc.expiryDate) {
      return { status: "missing", text: "Missing", variant: "destructive" };
    }

    const expiryDate = new Date(doc.expiryDate);
    if (!expiryDate || Number.isNaN(expiryDate.getTime())) {
      return { status: "missing", text: "Missing", variant: "destructive" };
    }

    const today = new Date();
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / msPerDay);

    if (daysUntilExpiry < 0) {
      return { status: "expired", text: "Expired", variant: "destructive" };
    } else if (daysUntilExpiry <= 30) {
      return { status: "expiring", text: "Expiring Soon", variant: "secondary" };
    } else {
      return { status: "valid", text: "Valid", variant: "secondary" };
    }
  };

  // Choose active vehicle if any
  const activeVehicle =
    Array.isArray(vehicles) && vehicles.length > 0
      ? vehicles.find((v) => v.isActive) || vehicles[0]
      : null;

  const totalDeliveries = Array.isArray(deliveryRequests)
    ? deliveryRequests.filter((r) => r.status === "delivered").length
    : 0;

  // Simple approximations (adjust with real data later)
  const totalDistance = Math.floor(totalDeliveries * 12.5);
  const avgRating = 4.8;

  // Show spinner while auth is being resolved
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange" />
      </div>
    );
  }

  // If user missing or not a driver, the effect will redirect them. Show nothing.
  if (!user || user.role !== "driver") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-orange hover:text-orange-600 mb-4" data-testid="button-back">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-vehicle-management">
            Vehicle Management
          </h1>
          <p className="text-gray-600">Manage your vehicles, insurance, and documentation</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main column */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Active Vehicle</CardTitle>
                  <Badge className="bg-green-100 text-green-800">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2" /> Active
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                {vehiclesLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange" />
                  </div>
                ) : !activeVehicle ? (
                  <div className="text-center py-8 text-gray-500">
                    <Car className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p>No vehicle registered</p>
                    <p className="text-sm">Add your first vehicle to get started</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Photo & status */}
                    <div className="space-y-4">
                      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Car className="h-16 w-16 text-gray-400 mb-2 mx-auto" />
                          <p className="text-sm text-gray-600">Vehicle Photo</p>
                          <Button variant="ghost" size="sm" className="text-orange hover:text-orange-600 mt-2">
                            Upload Photo
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between py-2 px-3 bg-green-50 rounded-lg">
                          <span className="text-sm font-medium text-green-800">
                            <CheckCircle className="inline mr-2 h-4 w-4" /> License Valid
                          </span>
                          <span className="text-xs text-green-600">
                            {getDocumentsByType("license")?.expiryDate
                              ? `Expires: ${new Date(getDocumentsByType("license").expiryDate).toLocaleDateString()}`
                              : "Not uploaded"}
                          </span>
                        </div>

                        <div className="flex items-center justify-between py-2 px-3 bg-green-50 rounded-lg">
                          <span className="text-sm font-medium text-green-800">
                            <Shield className="inline mr-2 h-4 w-4" /> Insurance Active
                          </span>
                          <span className="text-xs text-green-600">
                            {getDocumentsByType("insurance")?.expiryDate
                              ? `Expires: ${new Date(getDocumentsByType("insurance").expiryDate).toLocaleDateString()}`
                              : "Not uploaded"}
                          </span>
                        </div>

                        <div className="flex items-center justify-between py-2 px-3 bg-yellow-50 rounded-lg">
                          <span className="text-sm font-medium text-yellow-800">
                            <TriangleAlert className="inline mr-2 h-4 w-4" /> Inspection Due
                          </span>
                          <span className="text-xs text-yellow-600">Due: Next Month</span>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Vehicle Information</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Make & Model</span>
                            <span className="font-medium">
                              {activeVehicle?.make || "—"} {activeVehicle?.model || ""}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-gray-600">Year</span>
                            <span className="font-medium">{activeVehicle?.year || "—"}</span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-gray-600">License Plate</span>
                            <span className="font-medium">{activeVehicle?.licensePlate || "—"}</span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-gray-600">Color</span>
                            <span className="font-medium">{activeVehicle?.color || "—"}</span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-gray-600">Type</span>
                            <span className="font-medium">
                              {(activeVehicle?.vehicleType || "").charAt(0).toUpperCase() +
                                (activeVehicle?.vehicleType || "").slice(1) || "—"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <h4 className="font-semibold text-gray-900 mb-3">Performance Stats</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Deliveries</span>
                            <span className="font-medium">{totalDeliveries}</span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-gray-600">Distance Driven</span>
                            <span className="font-medium">{totalDistance} km</span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-gray-600">Avg. Rating</span>
                            <span className="font-medium text-orange">{avgRating}★</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 mt-6">
                  <Button className="flex-1 bg-orange text-white hover:bg-orange-600">
                    <Edit className="mr-2 h-4 w-4" /> Edit Vehicle
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Plus className="mr-2 h-4 w-4" /> Add Another Vehicle
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Documents</CardTitle>
              </CardHeader>

              <CardContent>
                {documentsLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange" />
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* License */}
                    <Card className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium text-gray-900">Driver's License</h4>
                          <Badge {...getDocumentStatus(getDocumentsByType("license"))}>
                            {getDocumentStatus(getDocumentsByType("license")).text}
                          </Badge>
                        </div>

                        <div className="text-sm text-gray-600 mb-3">
                          <div>License #: {getDocumentsByType("license")?.documentNumber || "Not provided"}</div>
                          <div>
                            Expires:{" "}
                            {getDocumentsByType("license")?.expiryDate
                              ? new Date(getDocumentsByType("license").expiryDate).toLocaleDateString()
                              : "Not provided"}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="text-orange hover:text-orange-600">
                            <Eye className="mr-1 h-3 w-3" />View
                          </Button>
                          <Button variant="ghost" size="sm" className="text-orange hover:text-orange-600">
                            <Download className="mr-1 h-3 w-3" />Download
                          </Button>
                          <Button variant="ghost" size="sm" className="text-orange hover:text-orange-600">
                            <Upload className="mr-1 h-3 w-3" />Update
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Registration */}
                    <Card className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium text-gray-900">Vehicle Registration</h4>
                          <Badge variant="secondary">Valid</Badge>
                        </div>

                        <div className="text-sm text-gray-600 mb-3">
                          <div>Registration #: {activeVehicle?.licensePlate || "Not provided"}</div>
                          <div>Expires: August 30, 2024</div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="text-orange hover:text-orange-600">
                            <Eye className="mr-1 h-3 w-3" />View
                          </Button>
                          <Button variant="ghost" size="sm" className="text-orange hover:text-orange-600">
                            <Download className="mr-1 h-3 w-3" />Download
                          </Button>
                          <Button variant="ghost" size="sm" className="text-orange hover:text-orange-600">
                            <Upload className="mr-1 h-3 w-3" />Update
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Insurance */}
                    <Card className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium text-gray-900">Insurance Certificate</h4>
                          <Badge {...getDocumentStatus(getDocumentsByType("insurance"))}>
                            {getDocumentStatus(getDocumentsByType("insurance")).text}
                          </Badge>
                        </div>

                        <div className="text-sm text-gray-600 mb-3">
                          <div>Policy #: {getDocumentsByType("insurance")?.documentNumber || "Not provided"}</div>
                          <div>
                            Expires:{" "}
                            {getDocumentsByType("insurance")?.expiryDate
                              ? new Date(getDocumentsByType("insurance").expiryDate).toLocaleDateString()
                              : "Not provided"}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="text-orange hover:text-orange-600">
                            <Eye className="mr-1 h-3 w-3" />View
                          </Button>
                          <Button variant="ghost" size="sm" className="text-orange hover:text-orange-600">
                            <Download className="mr-1 h-3 w-3" />Download
                          </Button>
                          <Button variant="ghost" size="sm" className="text-orange hover:text-orange-600">
                            <Upload className="mr-1 h-3 w-3" />Update
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* PrDP */}
                    <Card className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium text-gray-900">PrDP Certificate</h4>
                          <Badge {...getDocumentStatus(getDocumentsByType("prdp"))}>
                            {getDocumentStatus(getDocumentsByType("prdp")).text}
                          </Badge>
                        </div>

                        <div className="text-sm text-gray-600 mb-3">
                          <div>PrDP #: {getDocumentsByType("prdp")?.documentNumber || "Not provided"}</div>
                          <div>
                            Expires:{" "}
                            {getDocumentsByType("prdp")?.expiryDate
                              ? new Date(getDocumentsByType("prdp").expiryDate).toLocaleDateString()
                              : "Not provided"}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="text-orange hover:text-orange-600">
                            <Eye className="mr-1 h-3 w-3" />View
                          </Button>
                          <Button variant="ghost" size="sm" className="text-orange hover:text-orange-600">
                            <Download className="mr-1 h-3 w-3" />Download
                          </Button>
                          <Button variant="ghost" size="sm" className="text-orange hover:text-orange-600">
                            <Upload className="mr-1 h-3 w-3" />Update
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Document Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Card className="bg-yellow-50 border border-yellow-200">
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <TriangleAlert className="text-yellow-500 mt-1 mr-3 h-5 w-5" />
                      <div>
                        <h4 className="font-medium text-yellow-800 mb-1">Insurance Expiring Soon</h4>
                        <p className="text-sm text-yellow-700">Your insurance expires in 15 days. Please upload a renewed certificate.</p>
                        <Button variant="ghost" size="sm" className="text-orange hover:text-orange-600 mt-2 p-0">
                          Update Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 border border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <Info className="text-blue-500 mt-1 mr-3 h-5 w-5" />
                      <div>
                        <h4 className="font-medium text-blue-800 mb-1">Vehicle Inspection Due</h4>
                        <p className="text-sm text-blue-700">Annual vehicle inspection due next month. Schedule your appointment.</p>
                        <Button variant="ghost" size="sm" className="text-orange hover:text-orange-600 mt-2 p-0">
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-orange text-white hover:bg-orange-600">
                  <Plus className="mr-2 h-4 w-4" /> Add New Vehicle
                </Button>
                <Button variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" /> Upload Documents
                </Button>
                <Button variant="outline" className="w-full">
                  <Calendar className="mr-2 h-4 w-4" /> Schedule Inspection
                </Button>
                <Button variant="outline" className="w-full">
                  <Headphones className="mr-2 h-4 w-4" /> Contact Support
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vehicle Earnings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">This Week</span>
                  <span className="font-semibold text-navy">${user?.accountBalance ?? "0.00"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-semibold text-navy">
                    {(parseFloat(user?.accountBalance ?? "0") * 4).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Earned</span>
                  <span className="font-semibold text-navy">
                    {(parseFloat(user?.accountBalance ?? "0") * 25).toFixed(2)}
                  </span>
                </div>

                <Button variant="ghost" className="w-full mt-4 text-orange hover:text-orange-600">
                  View Detailed Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
