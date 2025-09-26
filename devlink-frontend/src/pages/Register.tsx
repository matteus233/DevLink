import {useState} from "react";

export default function Register() {
  const [firstName, setfirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, email, password, confirmPassword }),
      });

      const data = await response.json();
      console.log("Response data:", data);
      alert(data.message || data.error);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          DevLink
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Seu nome"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#D8F878] bg-gray-100 text-gray-800"
          />

          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#D8F878] bg-gray-100 text-gray-800"
          />

          <input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#D8F878] bg-gray-100 text-gray-800"
          />

          <input
            type="password"
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#D8F878] bg-gray-100 text-gray-800"
          />

          <button
            type="submit"
            className="bg-[#D8F878] text-black rounded-lg p-3 font-semibold hover:bg-[#c1e66c] transition"
          >
            Registrar
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-800">
          Já tem uma conta?{" "}
          <a href="/Login" className="font-bold text-gray-800 hover:underline">
            Faça login
          </a>
        </p>
      </div>
    </div>
  );
}
