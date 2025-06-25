import { Mail, RectangleEllipsis, UserRound } from "lucide-react";
import { Header } from "../components/Header";
import { useRegister } from "../hooks/useRegister";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { trigger } = useRegister();
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!usernameRef.current || !emailRef.current || !passwordRef.current) {
      return;
    }
    const dataTrigger = await trigger({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      email: emailRef.current.value,
    });
    if (!dataTrigger.user) {
      alert(`${dataTrigger.message}`);
      return;
    }
    navigate("/login");
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center pt-30">
        <div className="max-w-[480px] w-full">
          <div className="p-6 sm:p-8 rounded-2xl border border-accent shadow-sm">
            <h1 className="text-center text-3xl font-semibold">Inscription</h1>
            <form className="mt-12 space-y-6">
              <div>
                <label className="text-md font-medium mb-2 block">
                  Nom d'utilisateur
                </label>
                <div className="relative flex items-center">
                  <input
                    name="username"
                    type="text"
                    required
                    className="w-full text-sm border border-base-content px-4 py-3 pr-8 rounded-md outline-white"
                    placeholder="Entrez votre nom d'utilisateur"
                    ref={usernameRef}
                  />
                  <UserRound className="w-4 h-4 absolute right-4" />
                </div>
              </div>
              <div>
                <label className="text-md font-medium mb-2 block">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full text-sm border border-base-content px-4 py-3 pr-8 rounded-md outline-white"
                    placeholder="Entrez votre email"
                    ref={emailRef}
                  />
                  <Mail className="w-4 h-4 absolute right-4" />
                </div>
              </div>
              <div>
                <label className="text-md font-medium mb-2 block">
                  Mot de passe
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full text-sm border border-base-content px-4 py-3 pr-8 rounded-md outline-white"
                    placeholder="Entrez votre mot de passe"
                    ref={passwordRef}
                  />
                  <RectangleEllipsis className="w-4 h-4 absolute right-4 cursor-pointer" />
                </div>
              </div>
              <div className="!mt-12">
                <button
                  type="button"
                  className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-accent border border-accent hover:bg-transparent hover:border cursor-pointer"
                  onClick={() => handleRegister()}
                >
                  S'inscrire
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
