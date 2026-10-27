import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import crypto from "crypto";

const SALT_ROUNDS = 12;

export async function getAdminByEmail(email: string) {
  return prisma.admin.findUnique({ where: { email } });
}

export async function getAdminById(id: string) {
  return prisma.admin.findUnique({ where: { id } });
}

async function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, "gingerly-salt", SALT_ROUNDS, (err, derivedKey) => {
      if (err) return reject(err);
      resolve(derivedKey.toString("hex"));
    });
  });
}

async function verifyPasswordHash(plain: string, hashValue: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(plain, "gingerly-salt", SALT_ROUNDS, (err, derivedKey) => {
      if (err) return reject(err);
      resolve(crypto.timingSafeEqual(Buffer.from(hashValue, "hex"), derivedKey));
    });
  });
}

export async function createAdmin(email: string, password: string, name: string, role = "ADMIN") {
  const passwordHash = await hashPassword(password);
  return prisma.admin.create({
    data: { email, password: passwordHash, name, role },
  });
}

export async function verifyPassword(plain: string, hashValue: string) {
  return verifyPasswordHash(plain, hashValue);
}

export async function createSession(adminId: string, ttlMs = 7 * 24 * 60 * 60 * 1000) {
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + ttlMs);
  return prisma.session.create({
    data: { token, adminId, expiresAt },
  });
}

export async function getSession(token: string) {
  const session = await prisma.session.findUnique({
    where: { token },
    include: { admin: true },
  });
  if (!session) return null;
  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { id: session.id } });
    return null;
  }
  if (!session.admin?.active) return null;
  return session;
}

export async function destroySession(token: string) {
  await prisma.session.deleteMany({ where: { token } });
}

export async function logAudit(action: string, entity: string, entityId: string, adminId?: string, meta?: Prisma.InputJsonValue) {
  return prisma.auditLog.create({
    data: { action, entity, entityId, adminId, meta: meta ?? {} },
  });
}

export const AUTH_COOKIE = "gingerly_admin_session";
