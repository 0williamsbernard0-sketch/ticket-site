type Seat = {
  id: string;
  price: number;
  available: boolean;
  lockedBy?: string;
};

type EventState = {
  seats: Seat[];
  queue: string[];
};

const db: Record<string, EventState> = {};

// initialize event if not exists
export function initEvent(eventId: string) {
  if (!db[eventId]) {
    const seats: Seat[] = Array.from({ length: 40 }, (_, i) => ({
      id: `S${i + 1}`,
      price: 100 + (i % 5) * 25,
      available: true,
    }));

    db[eventId] = {
      seats,
      queue: [],
    };
  }

  return db[eventId];
}

// QUEUE SYSTEM
export function joinQueue(eventId: string, userId: string) {
  const event = initEvent(eventId);

  if (!event.queue.includes(userId)) {
    event.queue.push(userId);
  }

  return event.queue.indexOf(userId) + 1;
}

// MOVE QUEUE
export function processQueue(eventId: string) {
  const event = initEvent(eventId);
  return event.queue.shift(); // next user
}

// SEAT LOCK
export function lockSeat(eventId: string, seatId: string, userId: string) {
  const event = initEvent(eventId);

  const seat = event.seats.find((s) => s.id === seatId);

  if (!seat || !seat.available) return false;

  seat.available = false;
  seat.lockedBy = userId;

  return true;
}

// GET EVENT STATE
export function getEvent(eventId: string) {
  return initEvent(eventId);
}