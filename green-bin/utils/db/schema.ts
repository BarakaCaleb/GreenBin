import { create } from 'domain';
import {integer, varchar, pgTable, serial, text, timestamp, jsonb, boolean} from 'drizzle-orm/pg-core';


export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', {length: 255}).notNull(),
  email: varchar('email', {length: 255}).notNull().unique(),
  created_at: timestamp('created_at').notNull().defaultNow(),
});

export const Reports = pgTable('reports', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id).notNull(),
    location: text('location').notNull(),
    wasteType: varchar('waste_type', {length: 255}).notNull(),
    amount: varchar('amount').notNull(),
    imageUrl: text('image_url'),
    verificationResult: jsonb('verification_result'),
    status: varchar('status', {length: 255}).notNull().default('pending'),
    created_at: timestamp('created_at').notNull().defaultNow(),
    collectorId: integer('collector_id').references(() => users.id),
});

export const Rewards = pgTable('rewards', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id).notNull(),
    points: integer('points').notNull().default(0),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
    isAvailable: boolean('is_available').notNull().default(true),
    description: text('description'),
    name: varchar('name', {length: 255}).notNull(),
    collectionInfo: text('collection_info').notNull(),
});

export const CollectedWaste = pgTable('collected_waste', {
    id: serial('id').primaryKey(),
    collectorId: integer('collector_id').references(() => Users.id).notNull(),
    reportId: integer('report_id').references(() => Reports.id).notNull(),
    collectionDate: timestamp('collection_date').notNull(),
    status: varchar('status', {length: 255}).notNull().default('collected'),
});


export const Notifications = pgTable('notifications', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => Users.id).notNull(),
    message: text('message').notNull(),
    type: varchar('type', {length: 50}).notNull(),
    isRead: boolean('is_read').notNull().default(false),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const Transcations = pgTable('transactions', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => Users.id).notNull(),
    type: varchar('type', {length: 20}).notNull(),
    amount: integer('amount').notNull(),
    description: text('description'),
    date: timestamp('date').notNull().defaultNow(),
});