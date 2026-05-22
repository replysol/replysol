import { describe, expect, it, beforeEach } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";
import {
  AdminEntryRedirect,
  ProtectedAdminRoute,
  PublicAdminRoute,
} from "@/components/admin/AdminRouteGuards";
import { appRoutes } from "@/config/routes";
import { ADMIN_SESSION_KEY, createAdminSession } from "@/lib/admin-auth";

const replaceMock = (globalThis as { __routerReplaceMock: jest.Mock }).__routerReplaceMock;

describe("AdminRouteGuards", () => {
  beforeEach(() => {
    localStorage.clear();
    replaceMock.mockReset();
  });

  it("redirects guest users away from protected routes", async () => {
    render(
      <ProtectedAdminRoute>
        <div>dashboard</div>
      </ProtectedAdminRoute>,
    );

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith(appRoutes.adminLogin);
    });

    expect(screen.queryByText("dashboard")).not.toBeInTheDocument();
  });

  it("renders public routes for guests", async () => {
    render(
      <PublicAdminRoute>
        <div>login</div>
      </PublicAdminRoute>,
    );

    expect(await screen.findByText("login")).toBeInTheDocument();
    expect(replaceMock).not.toHaveBeenCalled();
  });

  it("redirects authenticated users to the dashboard entry", async () => {
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(createAdminSession("2026-03-20T12:00:00.000Z")));

    render(<AdminEntryRedirect />);

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith(appRoutes.adminDashboard);
    });
  });
});
