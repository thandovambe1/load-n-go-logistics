import { sql, relations } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  decimal,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (required for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User roles enum
export const userRoleEnum = pgEnum('user_role', ['customer', 'driver']);

// Delivery status enum
export const deliveryStatusEnum = pgEnum('delivery_status', ['pending', 'accepted', 'in_transit', 'delivered', 'cancelled']);

// Package type enum
export const packageTypeEnum = pgEnum('package_type', ['documents', 'small_package', 'medium_package', 'large_item', 'fragile_items']);

// Priority enum
export const priorityEnum = pgEnum('priority', ['standard', 'express', 'urgent']);

// Vehicle type enum
export const vehicleTypeEnum = pgEnum('vehicle_type', ['sedan', 'hatchback', 'suv', 'van', 'truck', 'motorcycle']);

// Users table (required for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: userRoleEnum("role").default('customer'),
  phone: varchar("phone"),
  address: text("address"),
  accountBalance: decimal("account_balance", { precision: 10, scale: 2 }).default('0.00'),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Vehicles table
export const vehicles = pgTable("vehicles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  driverId: varchar("driver_id").notNull().references(() => users.id),
  make: varchar("make").notNull(),
  model: varchar("model").notNull(),
  year: varchar("year").notNull(),
  licensePlate: varchar("license_plate").notNull().unique(),
  color: varchar("color").notNull(),
  vehicleType: vehicleTypeEnum("vehicle_type").notNull(),
  isActive: boolean("is_active").default(true),
  photoUrl: varchar("photo_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Driver documents table
export const driverDocuments = pgTable("driver_documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  driverId: varchar("driver_id").notNull().references(() => users.id),
  documentType: varchar("document_type").notNull(), // 'license', 'prdp', 'insurance', 'registration'
  documentNumber: varchar("document_number"),
  expiryDate: timestamp("expiry_date"),
  fileUrl: varchar("file_url"),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Bank accounts table
export const bankAccounts = pgTable("bank_accounts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  bankName: varchar("bank_name").notNull(),
  accountType: varchar("account_type").notNull(),
  accountNumber: varchar("account_number").notNull(),
  branchCode: varchar("branch_code").notNull(),
  accountHolderName: varchar("account_holder_name").notNull(),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Delivery requests table
export const deliveryRequests = pgTable("delivery_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerId: varchar("customer_id").notNull().references(() => users.id),
  driverId: varchar("driver_id").references(() => users.id),
  packageType: packageTypeEnum("package_type").notNull(),
  estimatedWeight: varchar("estimated_weight").notNull(),
  pickupAddress: text("pickup_address").notNull(),
  deliveryAddress: text("delivery_address").notNull(),
  specialInstructions: text("special_instructions"),
  priority: priorityEnum("priority").default('standard'),
  hasInsurance: boolean("has_insurance").default(false),
  requiresSignature: boolean("requires_signature").default(false),
  status: deliveryStatusEnum("status").default('pending'),
  baseFee: decimal("base_fee", { precision: 10, scale: 2 }).notNull(),
  distanceCharge: decimal("distance_charge", { precision: 10, scale: 2 }).notNull(),
  priorityFee: decimal("priority_fee", { precision: 10, scale: 2 }).default('0.00'),
  insuranceFee: decimal("insurance_fee", { precision: 10, scale: 2 }).default('0.00'),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  pickupTime: timestamp("pickup_time"),
  deliveryTime: timestamp("delivery_time"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Driver ratings table
export const driverRatings = pgTable("driver_ratings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  deliveryRequestId: varchar("delivery_request_id").notNull().references(() => deliveryRequests.id),
  customerId: varchar("customer_id").notNull().references(() => users.id),
  driverId: varchar("driver_id").notNull().references(() => users.id),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  vehicles: many(vehicles),
  driverDocuments: many(driverDocuments),
  bankAccounts: many(bankAccounts),
  customerDeliveryRequests: many(deliveryRequests, { relationName: "customer" }),
  driverDeliveryRequests: many(deliveryRequests, { relationName: "driver" }),
  customerRatings: many(driverRatings, { relationName: "customer" }),
  driverRatings: many(driverRatings, { relationName: "driver" }),
}));

export const vehiclesRelations = relations(vehicles, ({ one }) => ({
  driver: one(users, {
    fields: [vehicles.driverId],
    references: [users.id],
  }),
}));

export const driverDocumentsRelations = relations(driverDocuments, ({ one }) => ({
  driver: one(users, {
    fields: [driverDocuments.driverId],
    references: [users.id],
  }),
}));

export const bankAccountsRelations = relations(bankAccounts, ({ one }) => ({
  user: one(users, {
    fields: [bankAccounts.userId],
    references: [users.id],
  }),
}));

export const deliveryRequestsRelations = relations(deliveryRequests, ({ one, many }) => ({
  customer: one(users, {
    fields: [deliveryRequests.customerId],
    references: [users.id],
    relationName: "customer",
  }),
  driver: one(users, {
    fields: [deliveryRequests.driverId],
    references: [users.id],
    relationName: "driver",
  }),
  ratings: many(driverRatings),
}));

export const driverRatingsRelations = relations(driverRatings, ({ one }) => ({
  deliveryRequest: one(deliveryRequests, {
    fields: [driverRatings.deliveryRequestId],
    references: [deliveryRequests.id],
  }),
  customer: one(users, {
    fields: [driverRatings.customerId],
    references: [users.id],
    relationName: "customer",
  }),
  driver: one(users, {
    fields: [driverRatings.driverId],
    references: [users.id],
    relationName: "driver",
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertVehicleSchema = createInsertSchema(vehicles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertDriverDocumentSchema = createInsertSchema(driverDocuments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBankAccountSchema = createInsertSchema(bankAccounts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertDeliveryRequestSchema = createInsertSchema(deliveryRequests).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertDriverRatingSchema = createInsertSchema(driverRatings).omit({
  id: true,
  createdAt: true,
});

// Types
export type UpsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertVehicle = z.infer<typeof insertVehicleSchema>;
export type Vehicle = typeof vehicles.$inferSelect;
export type InsertDriverDocument = z.infer<typeof insertDriverDocumentSchema>;
export type DriverDocument = typeof driverDocuments.$inferSelect;
export type InsertBankAccount = z.infer<typeof insertBankAccountSchema>;
export type BankAccount = typeof bankAccounts.$inferSelect;
export type InsertDeliveryRequest = z.infer<typeof insertDeliveryRequestSchema>;
export type DeliveryRequest = typeof deliveryRequests.$inferSelect;
export type InsertDriverRating = z.infer<typeof insertDriverRatingSchema>;
export type DriverRating = typeof driverRatings.$inferSelect;
