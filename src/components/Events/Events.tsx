import { events } from '#/data/events'
import { fluidFont } from '#/lib/fluid-font'

export interface EventsProps {
  startDate?: string
  endDate?: string
}

export default function Events({ startDate, endDate }: EventsProps) {
  const matchingEvents = events
    .filter(
      (event) =>
        (!startDate || event.date >= startDate) &&
        (!endDate || event.date <= endDate),
    )
    .sort((eventA, eventB) => eventA.date.localeCompare(eventB.date))

  if (matchingEvents.length === 0) {
    return <></>
  }

  return (
    <section aria-labelledby="events">
      <h3
        id="events"
        className="flex gap-2 items-baseline font-arabic mb-4"
        style={{ fontSize: fluidFont(20, 36) }}
      >
        Events
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead className="border-b border-white/30 text-muted-foreground">
            <tr>
              <th scope="col" className="py-3 pr-4 font-semibold">
                Date
              </th>
              <th scope="col" className="py-3 pr-4 font-semibold">
                Event
              </th>
              <th scope="col" className="py-3 pr-4 font-semibold">
                Location
              </th>
              <th scope="col" className="py-3 font-semibold">
                Type
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/15">
            {matchingEvents.map((event) => (
              <tr key={`${event.date}-${event.name}`}>
                <td className="py-3 pr-4 whitespace-nowrap">
                  <time dateTime={event.date}>{event.date}</time>
                </td>
                <td className="py-3 pr-4">{event.name}</td>
                <td className="py-3 pr-4">{event.location}</td>
                <td className="py-3 whitespace-nowrap">
                  {event.type === 'dj' ? 'DJ Set' : 'Live'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
