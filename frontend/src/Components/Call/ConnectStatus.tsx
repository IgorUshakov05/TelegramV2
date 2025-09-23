import { ChartBarIcon } from "@heroicons/react/24/solid";

enum Connect {
  slow = "red",
  normal = "yellow",
  good = "green",
}

type ConnectStatusProps = {
  status: keyof typeof Connect; // "slow" | "normal" | "good"
};

export default function ConnectStatus({ status }: ConnectStatusProps) {
  return (
    <div
      className="flex flex-col justify-center items-center w-32 h-32 bg-gray-100 rounded-lg shadow-md"
      style={{ margin: "auto", width: "fit-content" }}
    >
      <ChartBarIcon width={25} height={25} color={Connect[status]} />
      <span className="mt-2 font-semibold" style={{ color: Connect[status] }}>
        {status === "slow"
          ? "Слабое соединение"
          : status === "normal"
          ? "Среднее соединение"
          : "Хорошее соединение"}
      </span>
    </div>
  );
}
