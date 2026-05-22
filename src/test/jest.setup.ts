import { jest } from "@jest/globals";
import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: jest.fn(),
});

class ResizeObserverMock {
  observe() {}

  unobserve() {}

  disconnect() {}
}

Object.defineProperty(globalThis, "ResizeObserver", {
  writable: true,
  value: ResizeObserverMock,
});

Object.defineProperty(navigator, "clipboard", {
  writable: true,
  value: {
    writeText: jest.fn().mockResolvedValue(undefined),
  },
});

Object.defineProperty(globalThis, "__routerReplaceMock", {
  writable: true,
  value: jest.fn(),
});

Object.defineProperty(globalThis, "__toastMock", {
  writable: true,
  value: jest.fn(),
});

jest.mock("next/image", () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: (globalThis as { __routerReplaceMock: jest.Mock }).__routerReplaceMock,
  }),
}));

jest.mock("@/components/ui/use-toast", () => ({
  useToast: () => ({
    toast: (globalThis as { __toastMock: jest.Mock }).__toastMock,
  }),
}));
