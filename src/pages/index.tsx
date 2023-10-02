import SideMenuBar from "@/components/menu/SideMenuBar";
import UpcomingEvents from "@/components/events/UpcomingEvents";

export default function Home() {
  return (
    <main className="block lg:flex">
      <SideMenuBar />
      <section className="w-full">
        <UpcomingEvents />
      </section>
    </main>
  );
}
