import { useEffect, useState } from "react";

interface Link {
  id: number;
  title: string;
  url: string;
}

export default function Dashboard() {
  const [links, setLinks] = useState<Link[] | null>(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch("http://localhost:3001/links", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Erro ao buscar links");
        }
        const data = await res.json();

        if (Array.isArray(data)) {
          setLinks(data);
        } else {
          console.warn("Resposta inesperada:", data);
          setLinks([]);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar links:", err);
        setError("Não foi possível carregar os links.");
        setLinks([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const addLink = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:3001/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, url }),
      });

      if (!response.ok) {
        throw new Error("Falha ao adicionar link");
      }

      const newLink = await response.json();

      setLinks((prev) => (prev ? [...prev, newLink] : [newLink]));
      setTitle("");
      setUrl("");
    } catch (err) {
      console.error(err);
      alert("Erro ao adicionar link.");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Carregando...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Meus Links</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-lg p-2 flex-1"
          />
          <input
            type="text"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border rounded-lg p-2 flex-1"
          />
          <button
            onClick={addLink}
            className="bg-[#D8F878] px-4 py-2 rounded-lg font-semibold"
          >
            +
          </button>
        </div>

        {links && links.length > 0 ? (
          <ul className="space-y-2">
            {links.map((link) => (
              <li
                key={link.id}
                className="flex justify-between bg-gray-100 p-2 rounded"
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">Nenhum link cadastrado.</p>
        )}
      </div>
    </div>
  );
}
