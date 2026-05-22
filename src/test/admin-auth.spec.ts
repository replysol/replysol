import { describe, expect, it } from "@jest/globals";
import {
  ADMIN_SESSION_KEY,
  createAdminSession,
  getAdminSession,
  isAdminAuthenticated,
  loginAdmin,
  logoutAdmin,
  parseAdminSession,
  validateAdminCredentials,
} from "@/lib/admin-auth";

const createStorageMock = () => {
  const storage = new Map<string, string>();

  return {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => {
      storage.set(key, value);
    },
    removeItem: (key: string) => {
      storage.delete(key);
    },
  } as Storage;
};

describe("admin-auth", () => {
  it("validates mock credentials with normalized email", () => {
    expect(validateAdminCredentials("  ADMIN@REPLYSOLUTIONS.COM  ", "reply123")).toBe(true);
    expect(validateAdminCredentials("admin@replysolutions.com", "wrong-password")).toBe(false);
  });

  it("creates and persists a session on successful login", () => {
    const storage = createStorageMock();
    const session = loginAdmin("admin@replysolutions.com", "reply123", storage);

    expect(session).not.toBeNull();
    expect(getAdminSession(storage)).toEqual(session);
    expect(isAdminAuthenticated(storage)).toBe(true);
  });

  it("rejects invalid sessions and clears corrupted storage", () => {
    const storage = createStorageMock();
    storage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ invalid: true }));

    expect(parseAdminSession("{bad-json")).toBeNull();
    expect(getAdminSession(storage)).toBeNull();
    expect(storage.getItem(ADMIN_SESSION_KEY)).toBeNull();
  });

  it("removes the session on logout", () => {
    const storage = createStorageMock();
    storage.setItem(ADMIN_SESSION_KEY, JSON.stringify(createAdminSession("2026-03-20T12:00:00.000Z")));

    logoutAdmin(storage);

    expect(isAdminAuthenticated(storage)).toBe(false);
  });
});
