import {
  users,
  vehicles,
  driverDocuments,
  bankAccounts,
  deliveryRequests,
  driverRatings,
  type User,
  type UpsertUser,
  type InsertVehicle,
  type Vehicle,
  type InsertDriverDocument,
  type DriverDocument,
  type InsertBankAccount,
  type BankAccount,
  type InsertDeliveryRequest,
  type DeliveryRequest,
  type InsertDriverRating,
  type DriverRating,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, sql } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Vehicle operations
  createVehicle(vehicle: InsertVehicle): Promise<Vehicle>;
  getVehiclesByDriverId(driverId: string): Promise<Vehicle[]>;
  updateVehicle(id: string, updates: Partial<InsertVehicle>): Promise<Vehicle>;
  deleteVehicle(id: string): Promise<void>;
  
  // Driver document operations
  createDriverDocument(document: InsertDriverDocument): Promise<DriverDocument>;
  getDriverDocuments(driverId: string): Promise<DriverDocument[]>;
  updateDriverDocument(id: string, updates: Partial<InsertDriverDocument>): Promise<DriverDocument>;
  
  // Bank account operations
  createBankAccount(account: InsertBankAccount): Promise<BankAccount>;
  getBankAccountsByUserId(userId: string): Promise<BankAccount[]>;
  updateBankAccount(id: string, updates: Partial<InsertBankAccount>): Promise<BankAccount>;
  
  // Delivery request operations
  createDeliveryRequest(request: InsertDeliveryRequest): Promise<DeliveryRequest>;
  getDeliveryRequestsByCustomerId(customerId: string): Promise<DeliveryRequest[]>;
  getDeliveryRequestsByDriverId(driverId: string): Promise<DeliveryRequest[]>;
  getAvailableDeliveryRequests(): Promise<DeliveryRequest[]>;
  updateDeliveryRequest(id: string, updates: Partial<InsertDeliveryRequest>): Promise<DeliveryRequest>;
  getDeliveryRequest(id: string): Promise<DeliveryRequest | undefined>;
  
  // Driver rating operations
  createDriverRating(rating: InsertDriverRating): Promise<DriverRating>;
  getDriverRatings(driverId: string): Promise<DriverRating[]>;
  getDriverAverageRating(driverId: string): Promise<number>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
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
  async createVehicle(vehicle: InsertVehicle): Promise<Vehicle> {
    const [newVehicle] = await db.insert(vehicles).values(vehicle).returning();
    return newVehicle;
  }

  async getVehiclesByDriverId(driverId: string): Promise<Vehicle[]> {
    return await db.select().from(vehicles).where(eq(vehicles.driverId, driverId));
  }

  async updateVehicle(id: string, updates: Partial<InsertVehicle>): Promise<Vehicle> {
    const [updatedVehicle] = await db
      .update(vehicles)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(vehicles.id, id))
      .returning();
    return updatedVehicle;
  }

  async deleteVehicle(id: string): Promise<void> {
    await db.delete(vehicles).where(eq(vehicles.id, id));
  }

  // Driver document operations
  async createDriverDocument(document: InsertDriverDocument): Promise<DriverDocument> {
    const [newDocument] = await db.insert(driverDocuments).values(document).returning();
    return newDocument;
  }

  async getDriverDocuments(driverId: string): Promise<DriverDocument[]> {
    return await db
      .select()
      .from(driverDocuments)
      .where(eq(driverDocuments.driverId, driverId));
  }

  async updateDriverDocument(id: string, updates: Partial<InsertDriverDocument>): Promise<DriverDocument> {
    const [updatedDocument] = await db
      .update(driverDocuments)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(driverDocuments.id, id))
      .returning();
    return updatedDocument;
  }

  // Bank account operations
  async createBankAccount(account: InsertBankAccount): Promise<BankAccount> {
    const [newAccount] = await db.insert(bankAccounts).values(account).returning();
    return newAccount;
  }

  async getBankAccountsByUserId(userId: string): Promise<BankAccount[]> {
    return await db.select().from(bankAccounts).where(eq(bankAccounts.userId, userId));
  }

  async updateBankAccount(id: string, updates: Partial<InsertBankAccount>): Promise<BankAccount> {
    const [updatedAccount] = await db
      .update(bankAccounts)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(bankAccounts.id, id))
      .returning();
    return updatedAccount;
  }

  // Delivery request operations
  async createDeliveryRequest(request: InsertDeliveryRequest): Promise<DeliveryRequest> {
    const [newRequest] = await db.insert(deliveryRequests).values(request).returning();
    return newRequest;
  }

  async getDeliveryRequestsByCustomerId(customerId: string): Promise<DeliveryRequest[]> {
    return await db
      .select()
      .from(deliveryRequests)
      .where(eq(deliveryRequests.customerId, customerId))
      .orderBy(desc(deliveryRequests.createdAt));
  }

  async getDeliveryRequestsByDriverId(driverId: string): Promise<DeliveryRequest[]> {
    return await db
      .select()
      .from(deliveryRequests)
      .where(eq(deliveryRequests.driverId, driverId))
      .orderBy(desc(deliveryRequests.createdAt));
  }

  async getAvailableDeliveryRequests(): Promise<DeliveryRequest[]> {
    return await db
      .select()
      .from(deliveryRequests)
      .where(eq(deliveryRequests.status, 'pending'))
      .orderBy(desc(deliveryRequests.createdAt));
  }

  async updateDeliveryRequest(id: string, updates: Partial<InsertDeliveryRequest>): Promise<DeliveryRequest> {
    const [updatedRequest] = await db
      .update(deliveryRequests)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(deliveryRequests.id, id))
      .returning();
    return updatedRequest;
  }

  async getDeliveryRequest(id: string): Promise<DeliveryRequest | undefined> {
    const [request] = await db
      .select()
      .from(deliveryRequests)
      .where(eq(deliveryRequests.id, id));
    return request;
  }

  // Driver rating operations
  async createDriverRating(rating: InsertDriverRating): Promise<DriverRating> {
    const [newRating] = await db.insert(driverRatings).values(rating).returning();
    return newRating;
  }

  async getDriverRatings(driverId: string): Promise<DriverRating[]> {
    return await db
      .select()
      .from(driverRatings)
      .where(eq(driverRatings.driverId, driverId))
      .orderBy(desc(driverRatings.createdAt));
  }

  async getDriverAverageRating(driverId: string): Promise<number> {
    const [result] = await db
      .select({
        avgRating: sql<number>`AVG(${driverRatings.rating})`,
      })
      .from(driverRatings)
      .where(eq(driverRatings.driverId, driverId));
    
    return result?.avgRating ? Number(result.avgRating) : 0;
  }
}

export const storage = new DatabaseStorage();
