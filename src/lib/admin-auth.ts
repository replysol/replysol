export const ADMIN_SESSION_KEY = "reply.admin.session";

export const MOCK_ADMIN_CREDENTIALS = {
  email: "admin@replysolutions.com",
  password: "reply123",
} as const;

export type AdminSession = {
  name: string;
  email: string;
  role: string;
  lastLogin: string;
};

const mockAdminProfile = {
  name: "Victor Souza",
  email: MOCK_ADMIN_CREDENTIALS.email,
  role: "Administrador",
};

function getStorage(storage?: Storage | null) {
  if (storage !== undefined) {
    return storage;
  }

  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
}

function isAdminSession(value: unknown): value is AdminSession {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.name === "string" &&
    typeof candidate.email === "string" &&
    typeof candidate.role === "string" &&
    typeof candidate.lastLogin === "string"
  );
}

export function parseAdminSession(rawSession: string | null) {
  if (!rawSession) {
    return null;
  }

  try {
    const parsedSession = JSON.parse(rawSession) as unknown;
    return isAdminSession(parsedSession) ? parsedSession : null;
  } catch {
    return null;
  }
}

export function validateAdminCredentials(email: string, password: string) {
  return email.trim().toLowerCase() === MOCK_ADMIN_CREDENTIALS.email && password === MOCK_ADMIN_CREDENTIALS.password;
}

export function createAdminSession(lastLogin = new Date().toISOString()): AdminSession {
  return {
    ...mockAdminProfile,
    lastLogin,
  };
}

export function getAdminSession(storage?: Storage | null): AdminSession | null {
  const currentStorage = getStorage(storage);
  const session = parseAdminSession(currentStorage?.getItem(ADMIN_SESSION_KEY) ?? null);

  if (session) {
    return session;
  }

  currentStorage?.removeItem(ADMIN_SESSION_KEY);
  return null;
}

export function isAdminAuthenticated(storage?: Storage | null) {
  return !!getAdminSession(storage);
}

export function loginAdmin(email: string, password: string, storage?: Storage | null) {
  const currentStorage = getStorage(storage);

  if (!validateAdminCredentials(email, password)) {
    return null;
  }

  const session = createAdminSession();
  currentStorage?.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));

  return session;
}

export function logoutAdmin(storage?: Storage | null) {
  getStorage(storage)?.removeItem(ADMIN_SESSION_KEY);
}
