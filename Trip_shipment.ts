interface Trip {
  from: string;
  to: string;
}

interface Shipment {
  pickUps: string[];
  dropPoints: string[];
}

function isValidTrips(trips: Trip[], shipment: Shipment): boolean {
  const graph: { [key: string]: string[] } = {};

  // Create graph
  for (const trip of trips) {
    if (!graph[trip.from]) {
      graph[trip.from] = [];
    }
    graph[trip.from].push(trip.to);
  }

  // Check if there is a path from each pick up point to each drop point
  for (const pickUp of shipment.pickUps) {
    for (const dropPoint of shipment.dropPoints) {
      if (!hasPath(graph, pickUp, dropPoint)) {
        return false;
      }
    }
  }

  // Check if all pick up points are visited before any drop point is visited
  const visited: { [key: string]: boolean } = {};
  for (const trip of trips) {
    if (shipment.dropPoints.includes(trip.to) && !visited[trip.from]) {
      return false;
    }
    visited[trip.from] = true;
  }

  return true;
}

function hasPath(graph: { [key: string]: string[] }, from: string, to: string): boolean {
  const visited: { [key: string]: boolean } = {};
  const stack: string[] = [from];

  while (stack.length > 0) {
    const node = stack.pop();
    if (node === to) {
      return true;
    }
    if (visited[node]) {
      continue;
    }
    visited[node] = true;
    if (graph[node]) {
      for (const neighbor of graph[node]) {
        stack.push(neighbor);
      }
    }
  }

  return false;
}
