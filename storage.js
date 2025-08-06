import {
  users,
  vehicles,
  driverDocuments,
  bankAccounts,
  deliveryRequests,
  driverRatings,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, sql } from "drizzle-orm";

class DatabaseStorage {
  // User operations
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData) {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Vehicle operations
  async createVehicle(vehicle) {
    const [newVehicle] = await db.insert(vehicles).values(vehicle).returning();
    return newVehicle;
  }

  async getVehiclesByDriverId(driverId) {
    return await db.select().from(vehicles).where(eq(vehicles.driverId, driverId));
  }

  async updateVehicle(id, updates) {
    const [updatedVehicle] = await db
      .update(vehicles)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(vehicles.id, id))
      .returning();
    return updatedVehicle;
  }

  async deleteVehicle(id) {
    await db.delete(vehicles).where(eq(vehicles.id, id));
  }

  // Driver document operations
  async createDriverDocument(document) {
    const [newDocument] = await db.insert(driverDocuments).values(document).returning();
    return newDocument;
  }

  async getDriverDocuments(driverId) {
    return await db
      .select()
      .from(driverDocuments)
      .where(eq(driverDocuments.driverId, driverId));
  }

  async updateDriverDocument(id, updates) {
    const [updatedDocument] = await db
      .update(driverDocuments)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(driverDocuments.id, id))
      .returning();
    return updatedDocument;
  }

  // Bank account operations
  async createBankAccount(account) {
    const [newAccount] = await db.insert(bankAccounts).values(account).returning();
    return newAccount;
  }

  async getBankAccountsByUserId(userId) {
    return await db.select().from(bankAccounts).where(eq(bankAccounts.userId, userId));
  }

  async updateBankAccount(id, updates) {
    const [updatedAccount] = await db
      .update(bankAccounts)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(bankAccounts.id, id))
      .returning();
    return updatedAccount;
  }

  // Delivery request operations
  async createDeliveryRequest(request) {
    const [newRequest] = await db.insert(deliveryRequests).values(request).returning();
    return newRequest;
  }

  async getDeliveryRequestsByCustomerId(customerId) {
    return await db
      .select()
      .from(deliveryRequests)
      .where(eq(deliveryRequests.customerId, customerId))
      .orderBy(desc(deliveryRequests.createdAt));
  }

  async getDeliveryRequestsByDriverId(driverId) {
    return await db
      .select()
      .from(deliveryRequests)
      .where(eq(deliveryRequests.driverId, driverId))
      .orderBy(desc(deliveryRequests.createdAt));
  }

  async getAvailableDeliveryRequests() {
    return await db
      .select()
      .from(deliveryRequests)
      .where(eq(deliveryRequests.status, "pending"))
      .orderBy(desc(deliveryRequests.createdAt));
  }

  async updateDeliveryRequest(id, updates) {
    const [updatedRequest] = await db
      .update(deliveryRequests)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(deliveryRequests.id, id))
      .returning();
    return updatedRequest;
  }

  async getDeliveryRequest(id) {
    const [request] = await db
      .select()
      .from(deliveryRequests)
      .where(eq(deliveryRequests.id, id));
    return request;
  }

  // Driver rating operations
  async createDriverRating(rating) {
    const [newRating] = await db.insert(driverRatings).values(rating).returning();
    return newRating;
  }

  async getDriverRatings(driverId) {
    return await db
      .select()
      .from(driverRatings)
      .where(eq(driverRatings.driverId, driverId))
      .orderBy(desc(driverRatings.createdAt));
  }

  async getDriverAverageRating(driverId) {
    const [result] = await db
      .select({
        avgRating: sql`AVG(${driverRatings.rating})`,
      })
      .from(driverRatings)
      .where(eq(driverRatings.driverId, driverId));
    return result?.avgRating ? Number(result.avgRating) : 0;
  }
}

export const storage = new DatabaseStorage();
