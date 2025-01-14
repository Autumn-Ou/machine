import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Loading } from "@/components/Loading";
import { Navbar } from "@/components/navbar";
import { EventsScreen } from "@/components/screens/EventsScreen";
import { API_URL, CURR_YEAR } from "@/lib/constants";
import { getStorage, setStorage } from "@/utils/localStorage";
import { formatTime } from "@/utils/time";
import { log } from "@/utils/log";
import { useState, useEffect } from "react";
import Head from "next/head";

async function fetchEventsData(year: number) {
  const eventsData = getStorage(`events_${year}`);

  if (eventsData) {
    return eventsData;
  }

  const start = performance.now();
  const res = await fetch(`${API_URL}/api/events/${year}`, {
    next: { revalidate: 60 },
  });

  log(
    "warning",
    `Fetching [/events/${year}] took ${formatTime(performance.now() - start)}`
  );

  if (!res.ok) {
    return undefined;
  }

  const data = await res.json();
  console.log(data);
  data.sort((a: any, b: any) => a.start_date.localeCompare(b.start_date));

  setStorage(`events_${year}`, data);

  return data;
}

export default function EventsPage() {
  const [events, setEvents] = useState();
  const [year, setYear] = useState<number>(CURR_YEAR);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchEventsData(year);
      if (data) setEvents(data);
    }
    fetchData();
  }, [year]);

  if (!events) return <Loading />;

  return (
    <>
      <Head>
        <title>Events | Scout Machine</title>
      </Head>

      <Navbar active="Events" />

      <div className="flex flex-col items-center justify-center">
        <Header title="Events" desc={`${year} season`} />
        <EventsScreen
          events={events}
          setEvents={setEvents}
          year={year}
          setYear={setYear}
        />
        <Footer />
      </div>
    </>
  );
}
