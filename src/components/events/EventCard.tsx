import Image from "next/image";
import SFCLogo from "@/assets/sfc-logo.jpeg";
import { SFCEvent } from "@/types";

interface EventCardProps {
  details: SFCEvent;
}

const EventCard: React.FC<EventCardProps> = ({ details }) => {
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
      <section className="events__schedule">
        {startDate} <br /> {startTime} - {endTime}
      </section>
    ) : (
      <section className="events__schedule">
        {startDate} at {startTime} - {endDate} at {endTime}
      </section>
    );

  return (
    <section className="events">
      <header>
        {coverPhoto ? (
          <Image
            src={coverPhoto as string}
            alt={name}
            width={0}
            height={0}
            style={{ width: "100%", height: "320px" }}
          />
        ) : (
          <Image
            src={SFCLogo}
            alt="SFC Greater Vancouver Area Logo"
            width={0}
            height={0}
            style={{ width: "100%", height: "320px" }}
          />
        )}
      </header>

      <section className="events__card">
        <div className="events__card-header">
          <h1 className="text-xl">{name}</h1>
          <h3 className="text-sm pt-1">{host}</h3>
        </div>

        <div className="events__card-section">{description}</div>

        <div className="events__card-section">
          {venue} <br /> {address}
        </div>

        {schedule}
      </section>
    </section>
  );
};

export default EventCard;
