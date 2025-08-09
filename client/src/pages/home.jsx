import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { MapPin, Flag, PlaneTakeoff, Star, Package } from "lucide-react";

export default function Home() {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [deliveryForm, setDeliveryForm] = useState({
    packageType: "documents",
    estimatedWeight: "under_1kg",
    pickupAddress: "",
    deliveryAddress: "",
    specialInstructions: "",
    priority: "standard",
    hasInsurance: false,
    requiresSignature: false,
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [user, authLoading, toast]);

  // Fetch user's delivery requests
  const { data: deliveryRequests = [], isLoading: requestsLoading } = useQuery({
    queryKey: ["/api/delivery-requests"],
    enabled: !!user,
    refetchInterval: 30000,
  });

  // Create delivery request mutation
  const createDeliveryMutation = useMutation({
    mutationFn: async (data) => {
      await apiRequest("POST", "/api/delivery-requests", data);
    },
    onSuccess: () => {
      toast({
        title: "Delivery Request Created",
        description: "Your delivery request has been sent to partner drivers.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/delivery-requests"] });
      setDeliveryForm({
        packageType: "documents",
        estimatedWeight: "under_1kg",
        pickupAddress: "",
        deliveryAddress: "",
        specialInstructions: "",
        priority: "standard",
        hasInsurance: false,
        requiresSignature: false,
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to create delivery request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!deliveryForm.pickupAddress || !deliveryForm.deliveryAddress) {
      toast({
        title: "Error",
        description: "Please fill in both pickup and delivery addresses.",
        variant: "destructive",
      });
      return;
    }
    createDeliveryMutation.mutate(deliveryForm);
  };

  const calculateTotal = () => {
    const baseFee = 12.5;
    const distanceCharge = 8.0;
    let priorityFee = 0;
    if (deliveryForm.priority === "express") priorityFee = 15;
    if (deliveryForm.priority === "urgent") priorityFee = 35;
    const insuranceFee = deliveryForm.hasInsurance ? 2.5 : 0;
    return baseFee + distanceCharge + priorityFee + insuranceFee;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { variant: "secondary", text: "Pending" },
      accepted: { variant: "default", text: "Accepted" },
      in_transit: { variant: "default", text: "In Transit" },
      delivered: { variant: "secondary", text: "Delivered" },
      cancelled: { variant: "destructive", text: "Cancelled" },
    };
    const config = statusConfig[status] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.text}</Badge>;
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="mb-4 md:mb-0">
                <h1 className="text-2xl font-bold text-gray-custom" data-testid="text-welcome">
                  Welcome back, {user?.firstName || "User"}
                </h1>
                <p className="text-gray-600">Manage your deliveries and track packages</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-gray-600">Account Balance</div>
                  <div className="text-xl font-semibold text-navy" data-testid="text-balance">
                    ${user?.accountBalance || "0.00"}
                  </div>
                </div>
                {user?.profileImageUrl && (
                  <img
                    src={user.profileImageUrl}
                    alt="User profile"
                    className="w-12 h-12 rounded-full object-cover"
                    data-testid="img-profile"
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Create New Delivery Request */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle data-testid="text-create-request">Create New Delivery Request</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Package Details */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="packageType">Package Type</Label>
                      <Select
                        value={deliveryForm.packageType}
                        onValueChange={(value) => setDeliveryForm({ ...deliveryForm, packageType: value })}
                      >
                        <SelectTrigger data-testid="select-package-type">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="documents">Documents</SelectItem>
                          <SelectItem value="small_package">Small Package</SelectItem>
                          <SelectItem value="medium_package">Medium Package</SelectItem>
                          <SelectItem value="large_item">Large Item</SelectItem>
                          <SelectItem value="fragile_items">Fragile Items</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="estimatedWeight">Estimated Weight</Label>
                      <Select
                        value={deliveryForm.estimatedWeight}
                        onValueChange={(value) => setDeliveryForm({ ...deliveryForm, estimatedWeight: value })}
                      >
                        <SelectTrigger data-testid="select-weight">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under_1kg">Under 1kg</SelectItem>
                          <SelectItem value="1_5kg">1-5kg</SelectItem>
                          <SelectItem value="5_10kg">5-10kg</SelectItem>
                          <SelectItem value="10_25kg">10-25kg</SelectItem>
                          <SelectItem value="over_25kg">Over 25kg</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Addresses */}
                  <div>
                    <Label htmlFor="pickupAddress">
                      <MapPin className="inline w-4 h-4 mr-2 text-orange" />
                      Pickup Location
                    </Label>
                    <Input
                      id="pickupAddress"
                      placeholder="Enter pickup address"
                      value={deliveryForm.pickupAddress}
                      onChange={(e) => setDeliveryForm({ ...deliveryForm, pickupAddress: e.target.value })}
                      data-testid="input-pickup-address"
                    />
                  </div>

                  <div>
                    <Label htmlFor="deliveryAddress">
                      <Flag className="inline w-4 h-4 mr-2 text-navy" />
                      Delivery Location
                    </Label>
                    <Input
                      id="deliveryAddress"
                      placeholder="Enter delivery address"
                      value={deliveryForm.deliveryAddress}
                      onChange={(e) => setDeliveryForm({ ...deliveryForm, deliveryAddress: e.target.value })}
                      data-testid="input-delivery-address"
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialInstructions">Special Instructions</Label>
                    <Textarea
                      id="specialInstructions"
                      placeholder="Any special handling instructions..."
                      value={deliveryForm.specialInstructions}
                      onChange={(e) => setDeliveryForm({ ...deliveryForm, specialInstructions: e.target.value })}
                      data-testid="textarea-instructions"
                    />
                  </div>

                  {/* Delivery Options */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Delivery Priority</Label>
                      <RadioGroup
                        value={deliveryForm.priority}
                        onValueChange={(value) => setDeliveryForm({ ...deliveryForm, priority: value })}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="standard" id="standard" data-testid="radio-standard" />
                          <Label htmlFor="standard">Standard (24-48 hours) - Free</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="express" id="express" data-testid="radio-express" />
                          <Label htmlFor="express">Express (Same day) - $15</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="urgent" id="urgent" data-testid="radio-urgent" />
                          <Label htmlFor="urgent">Urgent (2-4 hours) - $35</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div>
                      <Label>Additional Options</Label>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="insurance"
                            checked={deliveryForm.hasInsurance}
                            onCheckedChange={(checked) => setDeliveryForm({ ...deliveryForm, hasInsurance: !!checked })}
                            data-testid="checkbox-insurance"
                          />
                          <Label htmlFor="insurance">Package insurance ($2.50)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="signature"
                            checked={deliveryForm.requiresSignature}
                            onCheckedChange={(checked) => setDeliveryForm({ ...deliveryForm, requiresSignature: !!checked })}
                            data-testid="checkbox-signature"
                          />
                          <Label htmlFor="signature">Signature required</Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Estimated Cost */}
                  <Card className="bg-gray-50">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Base delivery fee</span>
                        <span className="font-medium">$12.50</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Distance charge</span>
                        <span className="font-medium">$8.00</span>
                      </div>
                      <div className="flex justify-between items-center text-lg font-semibold text-navy border-t pt-2">
                        <span>Estimated Total</span>
                        <span data-testid="text-total">${calculateTotal().toFixed(2)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Button
                    type="submit"
                    className="w-full bg-orange text-white hover:bg-orange-600"
                    disabled={createDeliveryMutation.isPending}
                    data-testid="button-submit-request"
                  >
                    <PlaneTakeoff className="mr-2 h-4 w-4" />
                    {createDeliveryMutation.isPending ? "Sending..." : "Send Delivery Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Stats and Recent Deliveries */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle data-testid="text-your-stats">Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Deliveries</span>
                  <span className="font-semibold" data-testid="text-total-deliveries">
                    {deliveryRequests.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-semibold" data-testid="text-month-deliveries">
                    {deliveryRequests.filter((req) => {
                      const reqDate = new Date(req.createdAt);
                      const now = new Date();
                      return reqDate.getMonth() === now.getMonth() && reqDate.getFullYear() === now.getFullYear();
                    }).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg. Rating</span>
                  <span className="font-semibold text-orange" data-testid="text-avg-rating">
                    <Star className="inline w-4 h-4 mr-1" />4.9
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Deliveries */}
            <Card>
              <CardHeader>
                <CardTitle data-testid="text-recent-deliveries">Recent Deliveries</CardTitle>
              </CardHeader>
              <CardContent>
                {requestsLoading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange"></div>
                  </div>
                ) : deliveryRequests.length === 0 ? (
                  <div className="text-center py-8 text-gray-500" data-testid="text-no-deliveries">
                    <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p>No deliveries yet. Create your first delivery request above!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {deliveryRequests.slice(0, 3).map((request) => (
                      <div key={request.id} className="border-l-4 border-orange pl-4" data-testid={`delivery-${request.id}`}>
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium">
                            {request.packageType === "documents"
                              ? "Documents"
                              : request.packageType === "small_package"
                              ? "Small Package"
                              : request.packageType === "medium_package"
                              ? "Medium Package"
                              : request.packageType === "large_item"
                              ? "Large Item"
                              : "Fragile Items"}
                          </span>
                          {getStatusBadge(request.status)}
                        </div>
                        <div className="text-sm text-gray-600">Total: ${request.totalAmount}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {deliveryRequests.length > 3 && (
                  <Button variant="ghost" className="w-full mt-4 text-orange hover:text-orange-600">
                    View All Deliveries
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
