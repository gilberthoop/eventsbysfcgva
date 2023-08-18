import { useState } from "react";
import { SFCEvent } from "@/types";

interface EventCardProps {
  details: SFCEvent;
}

const EventCard: React.FC<EventCardProps> = ({ details }) => {
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

  const [showDetails, setShowDetails] = useState(false);

  const schedule =
    startDate === endDate ? (
      <section className="events__card-section">
        {startDate} <br /> {startTime} - {endTime}
      </section>
    ) : (
      <section className="events__card-section">
        Start {startDate} at {startTime} <br />
        End: {endDate} at {endTime}
      </section>
    );

  return (
    <section className="events__card">
      <div className="events__card-header">
        <h3 className="text-base">{host}</h3>
        <h1 className="text-3xl font-bold">{name}</h1>
      </div>
      <div className="events__card-section">
        <span className="font-black text-xl">{venue}</span> <br /> {address}
      </div>
      {schedule}

      <div className="events__card-section">
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "Hide" : "Show"} details
        </button>
        {showDetails && <div className="pt-2">{description}</div>}
      </div>
    </section>
  );
};

export default EventCard;
