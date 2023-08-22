import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "@/hooks/use-auth";
import NewEvent from "@/components/events/NewEvent";

function NewEventPage() {
  const { jwtToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!jwtToken) router.push("/login");
  }, []);

  return (
    <div className="p-6 sm:py-16 sm:px-20">{jwtToken && <NewEvent />}</div>
  );
}

export default NewEventPage;
