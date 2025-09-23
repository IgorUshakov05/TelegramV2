import { useNavigate } from "react-router-dom";
import { PhoneXMarkIcon } from "@heroicons/react/24/solid";

export default function CallPageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="containerCall d-flex flex-column justify-content-center align-items-center vh-100 text-center bg-dark text-white">
      <div
        className="rounded-circle bg-danger d-flex justify-content-center align-items-center mb-4 shadow-lg"
        style={{ width: 120, height: 120 }}
      >
        <PhoneXMarkIcon className="text-white" width={60} height={60} />
      </div>

      <h1 className="fw-bold mb-3">Звонок не найден</h1>
      <p className="mb-4 text-justify" style={{ maxWidth: 400 }}>
        Похоже, ссылка на звонок недействительна или звонок завершён. Попробуйте
        ещё раз или создайте новый.
      </p>

      <button
        className="btn btn-danger px-4 py-2 rounded-pill w-100"
        onClick={() => navigate("/")}
        style={{ maxWidth: 400 }}
      >
        На главную
      </button>
    </div>
  );
}
