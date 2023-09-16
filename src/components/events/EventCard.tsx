import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SFCEventData } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import useEventRequestHandler from "@/hooks/use-event-request-handler";

interface EventCardProps {
  details: SFCEventData;
}

const EventCard: React.FC<EventCardProps> = ({ details }) => {
  const {
    _id,
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
  const [optionsToggle, setOptionsToggle] = useState(false);
  const [jwtToken, setJwtToken] = useState("");

  const router = useRouter();

  useEffect(() => {
    setJwtToken(document.cookie);
  }, []);

  const { handleRemoveEvent } = useEventRequestHandler();

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

  const optionsCTA = (
    <div className="flex justify-end">
      <button
        className="events__btn-action"
        onClick={() => {
          setOptionsToggle((optionsToggle) => !optionsToggle);
        }}
      >
        More
      </button>
    </div>
  );

  const options = (
    <div className={`${optionsToggle ? "events__options" : "hidden"}`}>
      <button onClick={() => router.push(`/edit/${_id}`)}>
        <FontAwesomeIcon icon={faPenToSquare} className="pr-2" />
        Edit event
      </button>
      <button onClick={() => handleRemoveEvent(_id)}>
        <FontAwesomeIcon icon={faTrash} className="pr-2" />
        Remove event
      </button>
      <button
        onClick={() => {
          setOptionsToggle((optionsToggle) => !optionsToggle);
        }}
      >
        <FontAwesomeIcon icon={faXmark} className="pr-2" />
        Close
      </button>
    </div>
  );

  return (
    <section className="events__card">
      {jwtToken && (
        <div>
          {optionsCTA}
          {options}
        </div>
      )}
      <div className="events__card-header">
        <h3 className="text-base">{host}</h3>
        <h1 className="text-3xl font-bold">{name}</h1>
      </div>
      <div className="events__card-section">
        <span className="font-black text-xl">{venue}</span> <br /> {address}
      </div>
      {schedule}

      <div className="events__card-section">
        <button
          className="events__btn-action"
          onClick={() => setShowDetails((showDetails) => !showDetails)}
        >
          {showDetails ? "Hide" : "Show"} details
        </button>
        <div className={`pt-2 ${showDetails ? "show" : "hide"}`}>
          {description}
        </div>
      </div>
    </section>
  );
};

export default EventCard;
