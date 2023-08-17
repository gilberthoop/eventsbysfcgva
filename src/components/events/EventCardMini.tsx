import Image from "next/image";
import SFCLogo from "@/assets/sfc-logo.jpeg";

interface EventCardMiniProps {
  coverPhoto?: string;
  host: string;
  name: string;
}

const EventCardMini: React.FC<EventCardMiniProps> = ({
  coverPhoto,
  host,
  name,
}) => {
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
          <h3 className="text-base pt-1">{host}</h3>
          <button onClick={(e) => console.log(e)}>
            <h2 className="underline text-sm">Show details</h2>
          </button>
        </div>
      </section>
    </section>
  );
};

export default EventCardMini;
