import type { Session } from "@auth/core/types";
import { FaSignInAlt, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { signIn, signOut } from "auth-astro/client";

interface Props {
  session: Session | null;
}

export const LoginLogout = ({ session }: Props) => {

  const handleLogin = () => {
    signIn();
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
      <div className="flex items-center gap-2">
        <FaUserCircle className="text-gray-500" size={24} />
        <span className="text-sm text-gray-700">
          {session
            ? session.user?.name || session.user?.email || "Usuario"
            : "Invitado"}
        </span>
      </div>
      {session ? (
        <button
          className="flex items-center gap-1 px-2 py-1 text-sm text-red-600 hover:underline"
          onClick={handleLogout}
        >
          <FaSignOutAlt /> Salir
        </button>
      ) : (
        <button
          className="flex items-center gap-1 px-2 py-1 text-sm text-green-600 hover:underline"
          onClick={handleLogin}
        >
          <FaSignInAlt /> Entrar
        </button>
      )}
    </header>
  );
};
