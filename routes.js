import { createServer } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import {
  insertVehicleSchema,
  insertDriverDocumentSchema,
  insertBankAccountSchema,
  insertDeliveryRequestSchema,
  insertDriverRatingSchema,
} from "@shared/schema";

export async function registerRoutes(app) {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', async (req, res) => {
    try {
      if (!req.isAuthenticated() || !req.user || !req.user.claims) {
        return res.json(null);
      }

      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // User profile routes
  app.get('/api/users/profile', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ message: "Failed to fetch user profile" });
    }
  });

  // Vehicle routes
  app.post('/api/vehicles', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const vehicleData = insertVehicleSchema.parse({
        ...req.body,
        driverId: userId,
      });
      
      const vehicle = await storage.createVehicle(vehicleData);
      res.status(201).json(vehicle);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error creating vehicle:", error);
      res.status(500).json({ message: "Failed to create vehicle" });
    }
  });

  app.get('/api/vehicles', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const vehicles = await storage.getVehiclesByDriverId(userId);
      res.json(vehicles);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      res.status(500).json({ message: "Failed to fetch vehicles" });
    }
  });

  app.put('/api/vehicles/:id', isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const updates = insertVehicleSchema.partial().parse(req.body);
      
      const vehicle = await storage.updateVehicle(id, updates);
      res.json(vehicle);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error updating vehicle:", error);
      res.status(500).json({ message: "Failed to update vehicle" });
    }
  });

  app.delete('/api/vehicles/:id', isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteVehicle(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      res.status(500).json({ message: "Failed to delete vehicle" });
    }
  });

  // Driver document routes
  app.post('/api/driver-documents', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const documentData = insertDriverDocumentSchema.parse({
        ...req.body,
        driverId: userId,
      });
      
      const document = await storage.createDriverDocument(documentData);
      res.status(201).json(document);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error creating driver document:", error);
      res.status(500).json({ message: "Failed to create driver document" });
    }
  });

  app.get('/api/driver-documents', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const documents = await storage.getDriverDocuments(userId);
      res.json(documents);
    } catch (error) {
      console.error("Error fetching driver documents:", error);
      res.status(500).json({ message: "Failed to fetch driver documents" });
    }
  });

  // Bank account routes
  app.post('/api/bank-accounts', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const accountData = insertBankAccountSchema.parse({
        ...req.body,
        userId,
      });
      
      const account = await storage.createBankAccount(accountData);
      res.status(201).json(account);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error creating bank account:", error);
      res.status(500).json({ message: "Failed to create bank account" });
    }
  });

  app.get('/api/bank-accounts', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const accounts = await storage.getBankAccountsByUserId(userId);
      res.json(accounts);
    } catch (error) {
      console.error("Error fetching bank accounts:", error);
      res.status(500).json({ message: "Failed to fetch bank accounts" });
    }
  });

  // Delivery request routes
  app.post('/api/delivery-requests', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Calculate fees (simplified calculation)
      const baseFee = 12.50;
      const distanceCharge = 8.00;
      let priorityFee = 0;
      if (req.body.priority === 'express') priorityFee = 15;
      if (req.body.priority === 'urgent') priorityFee = 35;
      
      const insuranceFee = req.body.hasInsurance ? 2.50 : 0;
      const totalAmount = baseFee + distanceCharge + priorityFee + insuranceFee;
      
      const requestData = insertDeliveryRequestSchema.parse({
        ...req.body,
        customerId: userId,
        baseFee: baseFee.toString(),
        distanceCharge: distanceCharge.toString(),
        priorityFee: priorityFee.toString(),
        insuranceFee: insuranceFee.toString(),
        totalAmount: totalAmount.toString(),
      });
      
      const request = await storage.createDeliveryRequest(requestData);
      res.status(201).json(request);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error creating delivery request:", error);
      res.status(500).json({ message: "Failed to create delivery request" });
    }
  });

  app.get('/api/delivery-requests', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      let requests;
      if (user?.role === 'driver') {
        requests = await storage.getDeliveryRequestsByDriverId(userId);
      } else {
        requests = await storage.getDeliveryRequestsByCustomerId(userId);
      }
      
      res.json(requests);
    } catch (error) {
      console.error("Error fetching delivery requests:", error);
      res.status(500).json({ message: "Failed to fetch delivery requests" });
    }
  });

  app.get('/api/delivery-requests/available', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'driver') {
        return res.status(403).json({ message: "Only drivers can access available requests" });
      }
      
      const requests = await storage.getAvailableDeliveryRequests();
      res.json(requests);
    } catch (error) {
      console.error("Error fetching available delivery requests:", error);
      res.status(500).json({ message: "Failed to fetch available delivery requests" });
    }
  });

  app.put('/api/delivery-requests/:id/accept', isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (user?.role !== 'driver') {
        return res.status(403).json({ message: "Only drivers can accept requests" });
      }
      
      const request = await storage.updateDeliveryRequest(id, {
        driverId: userId,
        status: 'accepted',
      });
      
      res.json(request);
    } catch (error) {
      console.error("Error accepting delivery request:", error);
      res.status(500).json({ message: "Failed to accept delivery request" });
    }
  });

  app.put('/api/delivery-requests/:id/status', isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const updateData = { status };
      if (status === 'in_transit') {
        updateData.pickupTime = new Date();
      } else if (status === 'delivered') {
        updateData.deliveryTime = new Date();
      }
      
      const request = await storage.updateDeliveryRequest(id, updateData);
      res.json(request);
    } catch (error) {
      console.error("Error updating delivery request status:", error);
      res.status(500).json({ message: "Failed to update delivery request status" });
    }
  });

  // Driver rating routes
  app.post('/api/driver-ratings', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const ratingData = insertDriverRatingSchema.parse({
        ...req.body,
        customerId: userId,
      });
      
      const rating = await storage.createDriverRating(ratingData);
      res.status(201).json(rating);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error creating driver rating:", error);
      res.status(500).json({ message: "Failed to create driver rating" });
    }
  });

  app.get('/api/drivers/:id/rating', async (req, res) => {
    try {
      const { id } = req.params;
      const avgRating = await storage.getDriverAverageRating(id);
      res.json({ averageRating: avgRating });
    } catch (error) {
      console.error("Error fetching driver rating:", error);
      res.status(500).json({ message: "Failed to fetch driver rating" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
