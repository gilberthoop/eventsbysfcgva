import Image from "next/image";
import { SFCEvent } from "@/types";

interface EventProps {
  details: SFCEvent;
}

const Event: React.FC<EventProps> = ({ details }) => {
  const {
    coverPhoto,
    host,
    name,
    description,
    venue,
    address,
    startDate,
    startTime,
    endDate,
    endTime,
  } = details;

  const schedule =
    startDate === endDate ? (
      <section className="text-center border-t-2 py-4">
        {startDate} <br /> {startTime} - {endTime}
      </section>
    ) : (
      <section className="text-center border-t-2 py-4">
        {startDate} at {startTime} - {endDate} at {endTime}
      </section>
    );

  return (
    <section className="my-4 bg-white rounded text-sm md:text-base h-fit w-full sm:w-8/12 md:w-5/12 lg:w-3/12 flex flex-col justify-between">
      <header>
        {coverPhoto && (
          <Image
            src={coverPhoto as string}
            alt={name}
            width={0}
            height={0}
            style={{ width: "100%", height: "320px" }}
          />
        )}
      </header>

      <section className="px-4 sm:px-10 md:px-8 py-2 sm:py-4">
        <div className="text-center text-xl lg:text-2xl font-black pb-4">
          <h1 className="text-xl lg:text-3xl">{name}</h1>
          <h3 className="text-base pt-1">{host}</h3>
        </div>

        <div className="text-center border-t-2 py-4">{description}</div>

        <div className="text-center border-t-2 py-4">
          {venue} <br /> {address}
        </div>

        {schedule}
      </section>
    </section>
  );
};

export default Event;
