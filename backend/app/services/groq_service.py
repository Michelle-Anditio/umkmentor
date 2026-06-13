import os
import httpx

GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_MODEL = "llama-3.3-70b-versatile"

def build_system_prompt(analysis_context: dict | None) -> str:
    base = (
        "Kamu adalah konsultan bisnis UMKM bernama UMKMentor. "
        "Kamu hanya boleh membahas hal yang berkaitan dengan bisnis UMKM, penjualan, produk, marketplace, harga, stok, dan analisis usaha. "
        "Jika pengguna bertanya di luar topik tersebut, jawab dengan sopan: "
        "'Maaf 😊 saya hanya bisa membantu hal yang berkaitan dengan analisis dan konsultasi UMKM.' "
        "Jawaban harus ramah, santai, dan membantu 😊. "
        "Gunakan emoji seperlunya (maksimal 1–3). "
        "Jawab singkat, maksimal 2-4 kalimat. "
        "Fokus pada insight dan saran praktis."
        "Jangan menjawab pertanyaan umum seperti coding, sejarah, opini pribadi, politik, atau topik non-bisnis."
    )

    if not analysis_context:
        return base

    context_str = "\n".join(f"- {k}: {v}" for k, v in analysis_context.items())
    return (
        f"{base}\n\n"
        f"Berikut adalah hasil analisis produk pengguna:\n{context_str}\n\n"
        "Gunakan data ini sebagai referensi utama saat menjawab pertanyaan."
    )


async def chat_with_groq(
    messages: list[dict],
    analysis_context: dict | None = None,
) -> str:
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise ValueError("GROQ_API_KEY tidak ditemukan di environment")

    system_prompt = build_system_prompt(analysis_context)
    full_messages = [{"role": "system", "content": system_prompt}] + messages

    async with httpx.AsyncClient(timeout=30) as client:
        response = await client.post(
            GROQ_API_URL,
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
            json={
                "model": GROQ_MODEL,
                "messages": full_messages,
                "max_tokens": 1024,
                "temperature": 0.5,
            },
        )
        response.raise_for_status()
        data = response.json()
        return data["choices"][0]["message"]["content"]