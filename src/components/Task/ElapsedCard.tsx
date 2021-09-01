import React from "react";

type Props = {
  elapsed: {
    task_name: string;
    seconds: string | number;
  };
};

export default function ElapsedCard({ elapsed }: Props) {
  return (
    <div className="p-3 h-100">
      <h6 className="stats-small__label text-uppercase text-center mb-0">
        <b>{elapsed.task_name}</b>
      </h6>
      <h2 className="my-3 mx-auto">{elapsed.seconds}</h2>
      <h6 className="stats-small__label text-uppercase text-center">
        Elapsed Time
      </h6>
    </div>
  );
}
