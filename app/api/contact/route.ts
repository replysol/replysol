import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(1).max(4000),
});

const discordWebhookUrl = process.env.DISCORD_CONTACT_WEBHOOK_URL;

function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1)}…`;
}

export async function POST(request: Request) {
  if (!discordWebhookUrl) {
    return NextResponse.json(
      { ok: false, error: "Webhook do Discord nao configurada." },
      { status: 500 },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Payload invalido." },
      { status: 400 },
    );
  }

  const result = contactSchema.safeParse(payload);

  if (!result.success) {
    const flattened = result.error.flatten();
    return NextResponse.json(
      {
        ok: false,
        error: "Dados do formulario invalidos.",
        fieldErrors: flattened.fieldErrors,
        formErrors: flattened.formErrors,
      },
      { status: 400 },
    );
  }

  const { name, email, company, message } = result.data;

  const response = await fetch(discordWebhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "Reply Solutions Contact",
      allowed_mentions: { parse: [] },
      embeds: [
        {
          title: "Novo contato pelo site",
          color: 0x2563eb,
          description: truncate(message, 3500),
          fields: [
            { name: "Nome", value: truncate(name, 1024), inline: true },
            { name: "Email", value: truncate(email, 1024), inline: true },
            { name: "Empresa", value: company ? truncate(company, 1024) : "Nao informado", inline: true },
          ],
          footer: {
            text: "Reply Solutions",
          },
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { ok: false, error: "Falha ao enviar para o Discord." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
