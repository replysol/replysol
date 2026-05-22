import { jest, describe, expect, it, beforeEach } from "@jest/globals";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AdminLogin from "@/views/AdminLogin";
import { MOCK_ADMIN_CREDENTIALS } from "@/lib/admin-auth";
import { appRoutes } from "@/config/routes";

const replaceMock = (globalThis as { __routerReplaceMock: jest.Mock }).__routerReplaceMock;
const toastMock = (globalThis as { __toastMock: jest.Mock }).__toastMock;

describe("AdminLogin", () => {
  beforeEach(() => {
    localStorage.clear();
    replaceMock.mockReset();
    toastMock.mockReset();
    (navigator.clipboard.writeText as jest.Mock).mockResolvedValue(undefined);
  });

  it("fills the mock credentials when requested", async () => {
    render(<AdminLogin />);

    fireEvent.click(screen.getByRole("button", { name: /preencher/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/email/i)).toHaveValue(MOCK_ADMIN_CREDENTIALS.email);
      expect(screen.getByLabelText(/senha/i)).toHaveValue(MOCK_ADMIN_CREDENTIALS.password);
    });
  });

  it("shows an error toast for invalid credentials", async () => {
    render(<AdminLogin />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "invalido@replysolutions.com" },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: "123456" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /acessar dashboard/i }).closest("form") as HTMLFormElement);

    await waitFor(() => {
      expect(toastMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Credenciais inválidas",
          variant: "destructive",
        }),
      );
    });

    expect(replaceMock).not.toHaveBeenCalled();
  });

  it("redirects to the dashboard after a valid login", async () => {
    render(<AdminLogin />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: MOCK_ADMIN_CREDENTIALS.email },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: MOCK_ADMIN_CREDENTIALS.password },
    });
    fireEvent.submit(screen.getByRole("button", { name: /acessar dashboard/i }).closest("form") as HTMLFormElement);

    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith(appRoutes.adminDashboard);
    });

    expect(toastMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Acesso liberado",
      }),
    );
  });
});
