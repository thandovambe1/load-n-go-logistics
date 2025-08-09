import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Label,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui"; // Adjust imports as needed
import FileUpload from "@/components/FileUpload"; // Your file upload component
import Navigation from "@/components/Navigation";
import { UserCheck, Car, DollarSign } from "lucide-react";

export default function DriverRegistration() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    licenseNumber: "",
    licenseExpiry: "",
    prdpNumber: "",
    prdpExpiry: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    licensePlate: "",
    vehicleType: "",
    vehicleColor: "",
    insuranceProvider: "",
    policyNumber: "",
    policyStartDate: "",
    policyExpiryDate: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field, file) => {
    setUploadedFiles((prev) => ({ ...prev, [field]: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation or mutation logic here
    console.log("Form submitted", formData, uploadedFiles);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader className="text-center pb-8">
            <CardTitle
              className="text-3xl font-bold text-gray-custom mb-4"
              data-testid="text-registration-title"
            >
              Become a Load N Go Partner Driver
            </CardTitle>
            <p className="text-xl text-gray-600">
              Join our professional logistics network and start earning today
            </p>
          </CardHeader>

          <CardContent className="p-8">
            {/* Process Steps */}
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-gray-custom mb-2">1. Register</h3>
                <p className="text-sm text-gray-600">
                  Complete your profile and upload required documents
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-navy text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-gray-custom mb-2">2. Vehicle Setup</h3>
                <p className="text-sm text-gray-600">
                  Add your vehicle details and insurance information
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-gray-custom mb-2">3. Start Earning</h3>
                <p className="text-sm text-gray-600">
                  Get approved and begin accepting delivery requests
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h2
                  className="text-xl font-semibold text-gray-custom mb-6"
                  data-testid="text-personal-info"
                >
                  Personal Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                      data-testid="input-first-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                      data-testid="input-last-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      data-testid="input-email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                      data-testid="input-phone"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      data-testid="input-address"
                    />
                  </div>
                </div>
              </div>

              {/* Driver Documentation */}
              <div>
                <h2
                  className="text-xl font-semibold text-gray-custom mb-6"
                  data-testid="text-driver-docs"
                >
                  Driver Documentation
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="licenseNumber">Driver's License Number *</Label>
                    <Input
                      id="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={(e) =>
                        handleInputChange("licenseNumber", e.target.value)
                      }
                      required
                      data-testid="input-license-number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="licenseExpiry">License Expiry Date</Label>
                    <Input
                      id="licenseExpiry"
                      type="date"
                      value={formData.licenseExpiry}
                      onChange={(e) => handleInputChange("licenseExpiry", e.target.value)}
                      data-testid="input-license-expiry"
                    />
                  </div>
                  <div>
                    <Label htmlFor="prdpNumber">PrDP Number (if applicable)</Label>
                    <Input
                      id="prdpNumber"
                      placeholder="Professional Driving Permit"
                      value={formData.prdpNumber}
                      onChange={(e) => handleInputChange("prdpNumber", e.target.value)}
                      data-testid="input-prdp-number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="prdpExpiry">PrDP Expiry Date</Label>
                    <Input
                      id="prdpExpiry"
                      type="date"
                      value={formData.prdpExpiry}
                      onChange={(e) => handleInputChange("prdpExpiry", e.target.value)}
                      data-testid="input-prdp-expiry"
                    />
                  </div>
                </div>

                {/* Document Uploads */}
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <Label>Upload Driver's License</Label>
                    <FileUpload
                      onFileSelect={(file) => handleFileUpload("driverLicense", file)}
                      accept="image/*"
                      maxSize={5 * 1024 * 1024} // 5MB
                      data-testid="upload-driver-license"
                    />
                  </div>
                  <div>
                    <Label>Upload PrDP Certificate</Label>
                    <FileUpload
                      onFileSelect={(file) => handleFileUpload("prdpCert", file)}
                      accept="image/*"
                      maxSize={5 * 1024 * 1024} // 5MB
                      data-testid="upload-prdp-cert"
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div>
                <h2
                  className="text-xl font-semibold text-gray-custom mb-6"
                  data-testid="text-vehicle-info"
                >
                  Vehicle Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="vehicleMake">Vehicle Make *</Label>
                    <Select
                      value={formData.vehicleMake}
                      onValueChange={(value) => handleInputChange("vehicleMake", value)}
                    >
                      <SelectTrigger data-testid="select-vehicle-make">
                        <SelectValue placeholder="Select Make" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="toyota">Toyota</SelectItem>
                        <SelectItem value="honda">Honda</SelectItem>
                        <SelectItem value="ford">Ford</SelectItem>
                        <SelectItem value="chevrolet">Chevrolet</SelectItem>
                        <SelectItem value="nissan">Nissan</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="vehicleModel">Vehicle Model *</Label>
                    <Input
                      id="vehicleModel"
                      value={formData.vehicleModel}
                      onChange={(e) => handleInputChange("vehicleModel", e.target.value)}
                      required
                      data-testid="input-vehicle-model"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vehicleYear">Year</Label>
                    <Select
                      value={formData.vehicleYear}
                      onValueChange={(value) => handleInputChange("vehicleYear", value)}
                    >
                      <SelectTrigger data-testid="select-vehicle-year">
                        <SelectValue placeholder="Select Year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                        <SelectItem value="2020">2020</SelectItem>
                        <SelectItem value="older">Older</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="licensePlate">License Plate *</Label>
                    <Input
                      id="licensePlate"
                      value={formData.licensePlate}
                      onChange={(e) => handleInputChange("licensePlate", e.target.value)}
                      required
                      data-testid="input-license-plate"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vehicleType">Vehicle Type</Label>
                    <Select
                      value={formData.vehicleType}
                      onValueChange={(value) => handleInputChange("vehicleType", value)}
                    >
                      <SelectTrigger data-testid="select-vehicle-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedan">Sedan</SelectItem>
                        <SelectItem value="hatchback">Hatchback</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="van">Van</SelectItem>
                        <SelectItem value="truck">Truck</SelectItem>
                        <SelectItem value="motorcycle">Motorcycle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="vehicleColor">Vehicle Color</Label>
                    <Input
                      id="vehicleColor"
                      value={formData.vehicleColor}
                      onChange={(e) => handleInputChange("vehicleColor", e.target.value)}
                      data-testid="input-vehicle-color"
                    />
                  </div>
                </div>
              </div>

              {/* Insurance Information */}
              <div>
                <h2
                  className="text-xl font-semibold text-gray-custom mb-6"
                  data-testid="text-insurance-info"
                >
                  Insurance Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                    <Input
                      id="insuranceProvider"
                      value={formData.insuranceProvider}
                      onChange={(e) =>
                        handleInputChange("insuranceProvider", e.target.value)
                      }
                      data-testid="input-insurance-provider"
                    />
                  </div>
                  <div>
                    <Label htmlFor="policyNumber">Policy Number</Label>
                    <Input
                      id="policyNumber"
                      value={formData.policyNumber}
                      onChange={(e) => handleInputChange("policyNumber", e.target.value)}
                      data-testid="input-policy-number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="policyStartDate">Policy Start Date</Label>
                    <Input
                      id="policyStartDate"
                      type="date"
                      value={formData.policyStartDate}
                      onChange={(e) => handleInputChange("policyStartDate", e.target.value)}
                      data-testid="input-policy-start"
                    />
                  </div>
                  <div>
                    <Label htmlFor="policyExpiryDate">Policy Expiry Date</Label>
                    <Input
                      id="policyExpiryDate"
                      type="date"
                      value={formData.policyExpiryDate}
                      onChange={(e) => handleInputChange("policyExpiryDate", e.target.value)}
                      data-testid="input-policy-expiry"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <Label>Upload Insurance Certificate</Label>
                  <FileUpload
                    onFileSelect={(file) => handleFileUpload("insuranceCertificate", file)}
                    accept="image/*"
                    maxSize={5 * 1024 * 1024} // 5MB
                    data-testid="upload-insurance-cert"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-10 w-full bg-navy text-white py-3 rounded-md font-semibold hover:bg-navy-dark"
                data-testid="submit-registration"
              >
                Submit Registration
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
