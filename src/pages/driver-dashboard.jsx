import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from "@/hooks/use-toast"
import { isUnauthorizedError } from "@/lib/authUtils"
import { apiRequest } from "@/lib/queryClient"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "wouter"
import { RefreshCw, Phone, Camera, Car, Clock, Headphones, MapPin, Flag, Route, User, DollarSign } from "lucide-react"

export default function DriverDashboard() {
  const { user, isLoading: authLoading } = useAuth()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  // Redirect if not authenticated or not a driver
  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'driver')) {
      toast({
        title: "Unauthorized",
        description: "You need to be a registered driver to access this page.",
        variant: "destructive",
      })
      setTimeout(() => {
        window.location.href = "/api/login"
      }, 500)
      return
    }
  }, [user, authLoading, toast])

  // Fetch available delivery requests
  const { data: availableRequests = [], isLoading: requestsLoading, refetch } = useQuery<any[]>({
    queryKey: ["/api/delivery-requests/available"],
    enabled: !!user && user.role === 'driver',
    refetchInterval: 30000, // Refresh every 30 seconds
  })

  // Fetch driver's accepted/current deliveries
  const { data: driverRequests = [], isLoading: driverRequestsLoading } = useQuery<any[]>({
    queryKey: ["/api/delivery-requests"],
    enabled: !!user && user.role === 'driver',
    refetchInterval: 30000,
  })

  // Accept delivery request mutation
  const acceptRequestMutation = useMutation({
    mutationFn: async (requestId: string) => {
      await apiRequest("PUT", `/api/delivery-requests/${requestId}/accept`, {})
    },
    onSuccess: () => {
      toast({
        title: "Request Accepted",
        description: "You have successfully accepted this delivery request.",
      })
      queryClient.invalidateQueries({ queryKey: ["/api/delivery-requests/available"] })
      queryClient.invalidateQueries({ queryKey: ["/api/delivery-requests"] })
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        })
        setTimeout(() => {
          window.location.href = "/api/login"
        }, 500)
        return
      }
      toast({
        title: "Error",
        description: "Failed to accept delivery request. Please try again.",
        variant: "destructive",
      })
    },
  })

  // Update delivery status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ requestId, status }: { requestId: string; status: string }) => {
      await apiRequest("PUT", `/api/delivery-requests/${requestId}/status`, { status })
    },
    onSuccess: () => {
      toast({
        title: "Status Updated",
        description: "Delivery status has been updated successfully.",
      })
      queryClient.invalidateQueries({ queryKey: ["/api/delivery-requests"] })
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        })
        setTimeout(() => {
          window.location.href = "/api/login"
        }, 500)
        return
      }
      toast({
        title: "Error",
        description: "Failed to update delivery status. Please try again.",
        variant: "destructive",
      })
    },
  })

  const handleAcceptRequest = (requestId: string) => {
    acceptRequestMutation.mutate(requestId)
  }

  const handleUpdateStatus = (requestId: string, status: string) => {
    updateStatusMutation.mutate({ requestId, status })
  }

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      standard: { variant: "secondary" as const, text: "Standard" },
      express: { variant: "default" as const, text: "Express" },
      urgent: { variant: "destructive" as const, text: "Urgent" },
    }
    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.standard
    return <Badge variant={config.variant}>{config.text}</Badge>
  }

  const getPackageTypeBadge = (packageType: string) => {
    const typeColors: { [key: string]: string } = {
      documents: "bg-green-100 text-green-800",
      small_package: "bg-blue-100 text-blue-800",
      medium_package: "bg-purple-100 text-purple-800",
      large_item: "bg-yellow-100 text-yellow-800",
      fragile_items: "bg-red-100 text-red-800",
    }
    
    const displayNames: { [key: string]: string } = {
      documents: "Documents",
      small_package: "Small Package", 
      medium_package: "Medium Package",
      large_item: "Large Item",
      fragile_items: "Fragile Items",
    }

    return (
      <Badge className={typeColors[packageType] || "bg-gray-100 text-gray-800"}>
        {displayNames[packageType] || packageType}
      </Badge>
    )
  }

  const getCurrentDelivery = () => {
    return driverRequests.find((req: any) => req.status === 'accepted' || req.status === 'in_transit')
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: "secondary" as const, text: "Pending" },
      accepted: { variant: "default" as const, text: "Accepted" },
      in_transit: { variant: "default" as const, text: "In Transit" },
      delivered: { variant: "secondary" as const, text: "Delivered" },
      cancelled: { variant: "destructive" as const, text: "Cancelled" },
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    return <Badge variant={config.variant}>{config.text}</Badge>
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange"></div>
      </div>
    )
  }

  const currentDelivery = getCurrentDelivery()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Driver Dashboard Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="mb-4 md:mb-0">
                <h1 className="text-2xl font-bold text-gray-custom" data-testid="text-dashboard-title">
                  Driver Dashboard
                </h1>
                <p className="text-gray-600">
                  Welcome back, {user?.firstName || 'Driver'}
                </p>
                <div className="flex items-center mt-2">
                  <Badge className="bg-green-100 text-green-800 mr-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>Online
                  </Badge>
                  <span className="text-sm text-gray-600">
                    Ready for deliveries
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-gray-600">Today's Earnings</div>
                  <div className="text-xl font-semibold text-navy" data-testid="text-earnings">
                    ${user?.accountBalance || '0.00'}
                  </div>
                </div>
                {user?.profileImageUrl && (
                  <img 
                    src={user.profileImageUrl} 
                    alt="Driver profile" 
                    className="w-12 h-12 rounded-full object-cover"
                    data-testid="img-driver-profile"
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Available Delivery Requests */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle data-testid="text-available-requests">Available Delivery Requests</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => refetch()}
                    disabled={requestsLoading}
                    data-testid="button-refresh"
                  >
                    <RefreshCw className={`h-4 w-4 mr-1 ${requestsLoading ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {requestsLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange"></div>
                  </div>
                ) : availableRequests.length === 0 ? (
                  <div className="text-center py-8 text-gray-500" data-testid="text-no-requests">
                    <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p>No available delivery requests at the moment.</p>
                    <p className="text-sm">Check back soon for new opportunities!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {availableRequests.map((request: any) => (
                      <Card key={request.id} className="border border-gray-200 hover:bg-gray-50 transition-colors" data-testid={`request-${request.id}`}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex gap-2">
                              {getPriorityBadge(request.priority)}
                              {getPackageTypeBadge(request.packageType)}
                            </div>
                            <span className="text-lg font-semibold text-navy" data-testid={`amount-${request.id}`}>
                              ${request.totalAmount}
                            </span>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="text-orange mr-2 w-4 h-4" />
                              <span>Pickup: {request.pickupAddress}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Flag className="text-navy mr-2 w-4 h-4" />
                              <span>Delivery: {request.deliveryAddress}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Route className="mr-2 w-4 h-4" />
                              <span>Est. 25 mins • 8.5 km</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-600">
                              <Clock className="inline mr-1 w-4 h-4" />
                              {new Date(request.createdAt).toLocaleString()}
                            </div>
                            <Button 
                              className="bg-orange text-white hover:bg-orange-600"
                              onClick={() => handleAcceptRequest(request.id)}
                              disabled={acceptRequestMutation.isPending}
                              data-testid={`button-accept-${request.id}`}
                            >
                              {acceptRequestMutation.isPending ? 'Accepting...' : 'Accept Delivery'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar with Current Delivery and Stats */}
          <div className="space-y-6">
            {/* Current Delivery Status */}
            <Card>
              <CardHeader>
                <CardTitle data-testid="text-current-delivery">Current Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                {currentDelivery ? (
                  <div>
                    <div className="border-l-4 border-blue-400 pl-4 mb-4" data-testid={`current-delivery-${currentDelivery.id}`}>
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium">
                          {getPackageTypeBadge(currentDelivery.packageType)}
                        </span>
                        {getStatusBadge(currentDelivery.status)}
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div><User className="inline mr-2 w-4 h-4" />Customer ID: {currentDelivery.customerId}</div>
                        <div><DollarSign className="inline mr-2 w-4 h-4" />Earnings: ${currentDelivery.totalAmount}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {currentDelivery.status === 'accepted' && (
                        <Button 
                          className="w-full bg-orange text-white hover:bg-orange-600"
                          onClick={() => handleUpdateStatus(currentDelivery.id, 'in_transit')}
                          disabled={updateStatusMutation.isPending}
                          data-testid="button-start-delivery"
                        >
                          <Route className="mr-2 h-4 w-4" />
                          Start Delivery
                        </Button>
                      )}
                      {currentDelivery.status === 'in_transit' && (
                        <Button 
                          className="w-full bg-green-600 text-white hover:bg-green-700"
                          onClick={() => handleUpdateStatus(currentDelivery.id, 'delivered')}
                          disabled={updateStatusMutation.isPending}
                          data-testid="button-mark-delivered"
                        >
                          <Camera className="mr-2 h-4 w-4" />
                          Mark as Delivered
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500" data-testid="text-no-current-delivery">
                    <Route className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p>No active delivery</p>
                    <p className="text-sm">Accept a request to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Driver Performance */}
            <Card>
              <CardHeader>
                <CardTitle data-testid="text-performance">Your Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating</span>
                  <span className="font-semibold text-orange" data-testid="text-rating">4.8★</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deliveries Today</span>
                  <span className="font-semibold" data-testid="text-deliveries-today">
                    {driverRequests.filter((req: any) => {
                      const reqDate = new Date(req.createdAt)
                      const today = new Date()
                      return reqDate.toDateString() === today.toDateString()
                    }).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">This Week</span>
                  <span className="font-semibold" data-testid="text-deliveries-week">
                    {driverRequests.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Acceptance Rate</span>
                  <span className="font-semibold text-green-600" data-testid="text-acceptance-rate">94%</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle data-testid="text-quick-actions">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/vehicle-management">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    data-testid="button-vehicle-settings"
                  >
                    <Car className="mr-2 h-4 w-4" />
                    Vehicle Settings
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  data-testid="button-availability"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Set Availability
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  data-testid="button-support"
                >
                  <Headphones className="mr-2 h-4 w-4" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
