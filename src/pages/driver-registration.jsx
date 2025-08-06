import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"
import { apiRequest } from "@/lib/queryClient"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import FileUpload from "@/components/ui/file-upload"
import { UserCheck, Car, DollarSign } from "lucide-react"

export default function DriverRegistration() {
  const { toast } = useToast()
  
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    
    // Driver Documentation
    licenseNumber: '',
    licenseExpiry: '',
    prdpNumber: '',
    prdpExpiry: '',
    
    // Vehicle Information
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    licensePlate: '',
    vehicleType: 'sedan',
    vehicleColor: '',
    
    // Insurance Information
    insuranceProvider: '',
    policyNumber: '',
    policyStartDate: '',
    policyExpiryDate: '',
    
    // Banking Information
    bankName: '',
    accountType: 'current',
    accountNumber: '',
    branchCode: '',
    accountHolderName: '',
    
    // Agreement
    agreementAccurate: false,
    agreementTerms: false,
    agreementBackground: false,
  })

  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File}>({})

  // Registration mutation
  const registrationMutation = useMutation({
    mutationFn: async (data: any) => {
      // First register as driver user
      await apiRequest("POST", "/api/auth/register-driver", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        role: 'driver',
      })
      
      // Then add vehicle
      await apiRequest("POST", "/api/vehicles", {
        make: data.vehicleMake,
        model: data.vehicleModel,
        year: data.vehicleYear,
        licensePlate: data.licensePlate,
        color: data.vehicleColor,
        vehicleType: data.vehicleType,
      })
      
      // Add driver documents
      const documents = [
        { documentType: 'license', documentNumber: data.licenseNumber, expiryDate: data.licenseExpiry },
        { documentType: 'prdp', documentNumber: data.prdpNumber, expiryDate: data.prdpExpiry },
        { documentType: 'insurance', documentNumber: data.policyNumber, expiryDate: data.policyExpiryDate },
      ]
      
      for (const doc of documents) {
        if (doc.documentNumber) {
          await apiRequest("POST", "/api/driver-documents", doc)
        }
      }
      
      // Add bank account
      await apiRequest("POST", "/api/bank-accounts", {
        bankName: data.bankName,
        accountType: data.accountType,
        accountNumber: data.accountNumber,
        branchCode: data.branchCode,
        accountHolderName: data.accountHolderName,
      })
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted",
        description: "Your driver application has been submitted successfully. You'll receive an email confirmation once approved.",
      })
      // Reset form
      setFormData({
        firstName: '', lastName: '', email: '', phone: '', address: '',
        licenseNumber: '', licenseExpiry: '', prdpNumber: '', prdpExpiry: '',
        vehicleMake: '', vehicleModel: '', vehicleYear: '', licensePlate: '', vehicleType: 'sedan', vehicleColor: '',
        insuranceProvider: '', policyNumber: '', policyStartDate: '', policyExpiryDate: '',
        bankName: '', accountType: 'current', accountNumber: '', branchCode: '', accountHolderName: '',
        agreementAccurate: false, agreementTerms: false, agreementBackground: false,
      })
      setUploadedFiles({})
    },
    onError: (error) => {
      toast({
        title: "Registration Failed",
        description: "Failed to submit your application. Please try again.",
        variant: "destructive",
      })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required personal information fields.",
        variant: "destructive",
      })
      return
    }
    
    if (!formData.licenseNumber || !formData.vehicleMake || !formData.vehicleModel) {
      toast({
        title: "Error", 
        description: "Please fill in all required vehicle and license information.",
        variant: "destructive",
      })
      return
    }
    
    if (!formData.agreementAccurate || !formData.agreementTerms || !formData.agreementBackground) {
      toast({
        title: "Error",
        description: "Please accept all required agreements to continue.",
        variant: "destructive",
      })
      return
    }
    
    registrationMutation.mutate(formData)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (field: string, file: File) => {
    setUploadedFiles(prev => ({ ...prev, [field]: file }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-gray-custom mb-4" data-testid="text-registration-title">
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
                <p className="text-sm text-gray-600">Complete your profile and upload required documents</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-navy text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-gray-custom mb-2">2. Vehicle Setup</h3>
                <p className="text-sm text-gray-600">Add your vehicle details and insurance information</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-gray-custom mb-2">3. Start Earning</h3>
                <p className="text-sm text-gray-600">Get approved and begin accepting delivery requests</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-custom mb-6" data-testid="text-personal-info">
                  Personal Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                      data-testid="input-first-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
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
                      onChange={(e) => handleInputChange('email', e.target.value)}
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
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      data-testid="input-phone"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      data-testid="input-address"
                    />
                  </div>
                </div>
              </div>

              {/* Driver Documentation */}
              <div>
                <h2 className="text-xl font-semibold text-gray-custom mb-6" data-testid="text-driver-docs">
                  Driver Documentation
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="licenseNumber">Driver's License Number *</Label>
                    <Input
                      id="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
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
                      onChange={(e) => handleInputChange('licenseExpiry', e.target.value)}
                      data-testid="input-license-expiry"
                    />
                  </div>
                  <div>
                    <Label htmlFor="prdpNumber">PrDP Number (if applicable)</Label>
                    <Input
                      id="prdpNumber"
                      placeholder="Professional Driving Permit"
                      value={formData.prdpNumber}
                      onChange={(e) => handleInputChange('prdpNumber', e.target.value)}
                      data-testid="input-prdp-number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="prdpExpiry">PrDP Expiry Date</Label>
                    <Input
                      id="prdpExpiry"
                      type="date"
                      value={formData.prdpExpiry}
                      onChange={(e) => handleInputChange('prdpExpiry', e.target.value)}
                      data-testid="input-prdp-expiry"
                    />
                  </div>
                </div>
                
                {/* Document Uploads */}
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <Label>Upload Driver's License</Label>
                    <FileUpload
                      onFileSelect={(file) => handleFileUpload('driverLicense', file)}
                      accept="image/*"
                      maxSize={5 * 1024 * 1024} // 5MB
                      data-testid="upload-driver-license"
                    />
                  </div>
                  <div>
                    <Label>Upload PrDP Certificate</Label>
                    <FileUpload
                      onFileSelect={(file) => handleFileUpload('prdpCert', file)}
                      accept="image/*"
                      maxSize={5 * 1024 * 1024} // 5MB
                      data-testid="upload-prdp-cert"
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-custom mb-6" data-testid="text-vehicle-info">
                  Vehicle Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="vehicleMake">Vehicle Make *</Label>
                    <Select value={formData.vehicleMake} onValueChange={(value) => handleInputChange('vehicleMake', value)}>
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
                      onChange={(e) => handleInputChange('vehicleModel', e.target.value)}
                      required
                      data-testid="input-vehicle-model"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vehicleYear">Year</Label>
                    <Select value={formData.vehicleYear} onValueChange={(value) => handleInputChange('vehicleYear', value)}>
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
                      onChange={(e) => handleInputChange('licensePlate', e.target.value)}
                      required
                      data-testid="input-license-plate"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vehicleType">Vehicle Type</Label>
                    <Select value={formData.vehicleType} onValueChange={(value) => handleInputChange('vehicleType', value)}>
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
                      onChange={(e) => handleInputChange('vehicleColor', e.target.value)}
                      data-testid="input-vehicle-color"
                    />
                  </div>
                </div>
              </div>

              {/* Insurance Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-custom mb-6" data-testid="text-insurance-info">
                  Insurance Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                    <Input
                      id="insuranceProvider"
                      value={formData.insuranceProvider}
                      onChange={(e) => handleInputChange('insuranceProvider', e.target.value)}
                      data-testid="input-insurance-provider"
                    />
                  </div>
                  <div>
                    <Label htmlFor="policyNumber">Policy Number</Label>
                    <Input
                      id="policyNumber"
                      value={formData.policyNumber}
                      onChange={(e) => handleInputChange('policyNumber', e.target.value)}
                      data-testid="input-policy-number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="policyStartDate">Policy Start Date</Label>
                    <Input
                      id="policyStartDate"
                      type="date"
                      value={formData.policyStartDate}
                      onChange={(e) => handleInputChange('policyStartDate', e.target.value)}
                      data-testid="input-policy-start"
                    />
                  </div>
                  <div>
                    <Label htmlFor="policyExpiryDate">Policy Expiry Date</Label>
                    <Input
                      id="policyExpiryDate"
                      type="date"
                      value={formData.policyExpiryDate}
                      onChange={(e) => handleInputChange('policyExpiryDate', e.target.value)}
                      data-testid="input-policy-expiry"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <Label>Upload Insurance Certificate</Label>
                  <FileUpload
                    onFileSelect={(file) => handleFileUpload('insurance', file)}
                    accept="image/*,.pdf"
                    maxSize={10 * 1024 * 1024} // 10MB
                    data-testid="upload-insurance"
                  />
                </div>
              </div>

              {/* Banking Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-custom mb-6" data-testid="text-banking-info">
                  Banking Information
                </h2>
                <Card className="bg-blue-50 mb-6">
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="bg-blue-500 text-white rounded-full p-1 mr-3 mt-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">Secure Banking Details</h4>
                        <p className="text-sm text-blue-700">
                          Your banking information is encrypted and securely stored. This is required for direct payment deposits.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Select value={formData.bankName} onValueChange={(value) => handleInputChange('bankName', value)}>
                      <SelectTrigger data-testid="select-bank-name">
                        <SelectValue placeholder="Select Your Bank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard_bank">Standard Bank</SelectItem>
                        <SelectItem value="fnb">First National Bank</SelectItem>
                        <SelectItem value="absa">ABSA Bank</SelectItem>
                        <SelectItem value="nedbank">Nedbank</SelectItem>
                        <SelectItem value="capitec">Capitec Bank</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="accountType">Account Type</Label>
                    <Select value={formData.accountType} onValueChange={(value) => handleInputChange('accountType', value)}>
                      <SelectTrigger data-testid="select-account-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current">Current Account</SelectItem>
                        <SelectItem value="savings">Savings Account</SelectItem>
                        <SelectItem value="business">Business Account</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      value={formData.accountNumber}
                      onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                      data-testid="input-account-number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="branchCode">Branch Code</Label>
                    <Input
                      id="branchCode"
                      value={formData.branchCode}
                      onChange={(e) => handleInputChange('branchCode', e.target.value)}
                      data-testid="input-branch-code"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="accountHolderName">Account Holder Name</Label>
                    <Input
                      id="accountHolderName"
                      value={formData.accountHolderName}
                      onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
                      data-testid="input-account-holder"
                    />
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div>
                <Card className="bg-gray-50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-custom mb-4" data-testid="text-agreement">
                      Agreement & Terms
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Checkbox
                          id="agreementAccurate"
                          checked={formData.agreementAccurate}
                          onCheckedChange={(checked) => handleInputChange('agreementAccurate', !!checked)}
                          className="mt-1"
                          data-testid="checkbox-agreement-accurate"
                        />
                        <Label htmlFor="agreementAccurate" className="ml-3 text-sm text-gray-700">
                          I confirm that all information provided is accurate and up to date
                        </Label>
                      </div>
                      <div className="flex items-start">
                        <Checkbox
                          id="agreementTerms"
                          checked={formData.agreementTerms}
                          onCheckedChange={(checked) => handleInputChange('agreementTerms', !!checked)}
                          className="mt-1"
                          data-testid="checkbox-agreement-terms"
                        />
                        <Label htmlFor="agreementTerms" className="ml-3 text-sm text-gray-700">
                          I agree to the Terms and Conditions and Privacy Policy
                        </Label>
                      </div>
                      <div className="flex items-start">
                        <Checkbox
                          id="agreementBackground"
                          checked={formData.agreementBackground}
                          onCheckedChange={(checked) => handleInputChange('agreementBackground', !!checked)}
                          className="mt-1"
                          data-testid="checkbox-agreement-background"
                        />
                        <Label htmlFor="agreementBackground" className="ml-3 text-sm text-gray-700">
                          I consent to background checks and document verification as required by Load N Go
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Button 
                  type="submit" 
                  size="lg"
                  className="bg-orange text-white px-12 py-4 text-lg font-semibold hover:bg-orange-600"
                  disabled={registrationMutation.isPending}
                  data-testid="button-submit-application"
                >
                  <UserCheck className="mr-2 h-5 w-5" />
                  {registrationMutation.isPending ? 'Submitting...' : 'Submit Application'}
                </Button>
                <p className="text-sm text-gray-600 mt-4">
                  Your application will be reviewed within 24-48 hours. You'll receive an email confirmation once approved.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
