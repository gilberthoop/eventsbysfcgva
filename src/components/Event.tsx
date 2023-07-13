import { SFCEvent } from "@/types";

interface EventProps {
  details: SFCEvent;
}

const Event: React.FC<EventProps> = ({ details }) => {
  const {
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
    <section className="my-4 px-4 sm:px-10 md:px-8 py-2 sm:py-4 bg-white rounded text-sm md:text-base w-full sm:w-8/12 lg:w-6/12 mx-auto flex flex-col justify-between">
      <header className="text-center text-xl lg:text-2xl py-4 font-black">
        {host} <br />
        {name}
      </header>

      <section className="text-center border-t-2 py-4">{description}</section>

      <section className="text-center border-t-2 py-4">
        {venue} <br /> {address}
      </section>

      {schedule}
    </section>
  );
};

export default Event;
