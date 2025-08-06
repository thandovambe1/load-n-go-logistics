import { Link } from "wouter"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, MapPin, Clock, Truck, Package, DollarSign } from "lucide-react"

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy to-navy-light opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" data-testid="hero-title">
              Professional Logistics
              <span className="text-orange block">Made Simple</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto" data-testid="hero-description">
              Connect with trusted partner drivers for reliable delivery services. Send packages anywhere, anytime with Load N Go's professional logistics network.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/api/login">
                <Button 
                  size="lg" 
                  className="bg-orange text-white px-8 py-4 text-lg font-semibold hover:bg-orange-600 hover-lift w-full sm:w-auto"
                  data-testid="button-send-package"
                >
                  <Package className="mr-2 h-5 w-5" />
                  Send Package
                </Button>
              </Link>
              <Link href="/api/login">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="bg-white text-navy px-8 py-4 text-lg font-semibold hover:bg-gray-100 hover-lift w-full sm:w-auto"
                  data-testid="button-become-driver"
                >
                  <Truck className="mr-2 h-5 w-5" />
                  Become a Driver
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-custom mb-4" data-testid="features-title">
              Why Choose Load N Go
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional logistics platform built for reliability, security, and efficiency
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 bg-gray-50 hover-lift" data-testid="card-feature-verified">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-orange text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-custom mb-4">Verified Drivers</h3>
                <p className="text-gray-600">
                  All partner drivers are thoroughly vetted with proper licenses, insurance, and professional documentation.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 bg-gray-50 hover-lift" data-testid="card-feature-tracking">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-navy text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-custom mb-4">Real-time Tracking</h3>
                <p className="text-gray-600">
                  Track your deliveries in real-time with precise location updates and delivery confirmations.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 bg-gray-50 hover-lift" data-testid="card-feature-support">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-orange text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-custom mb-4">24/7 Support</h3>
                <p className="text-gray-600">
                  Round-the-clock customer support to ensure smooth logistics operations for all users.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div data-testid="stat-deliveries">
              <div className="text-4xl font-bold text-orange mb-2">10,000+</div>
              <div className="text-white">Successful Deliveries</div>
            </div>
            <div data-testid="stat-drivers">
              <div className="text-4xl font-bold text-orange mb-2">2,500+</div>
              <div className="text-white">Partner Drivers</div>
            </div>
            <div data-testid="stat-cities">
              <div className="text-4xl font-bold text-orange mb-2">50+</div>
              <div className="text-white">Cities Covered</div>
            </div>
            <div data-testid="stat-rating">
              <div className="text-4xl font-bold text-orange mb-2">4.8★</div>
              <div className="text-white">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
