import { Node } from './Node';

type Distance = {
    start: Node;
    end: Node;
    distance: number;
};

export class Day08Solver {
    async processFile(path: string): Promise<Node[]> {
        const file = Bun.file(path);
        const text = await file.text();
        const rows = text.split('\n').map((l) => l.trim());
        return rows.map((r) => {
            const [x, y, z] = r.split(',').map((a) => parseInt(a));
            if (x === undefined || y === undefined || z === undefined) throw Error('Invalid input');
            return new Node(x, y, z);
        });
    }

    findClosestNode(node: Node, nodes: Node[]): Node {
        let mindistance = Infinity;
        let closestNode: Node;
        for (let i = 0; i < nodes.length; i++) {
            if (node.key === nodes[i]!.key) {
                continue;
            }
            const dist = node.getDistance(nodes[i]!);
            if (dist < mindistance) {
                mindistance = dist;
                closestNode = nodes[i]!;
            }
        }
        return closestNode!;
    }

    getDistances(nodes: Node[]): Distance[] {
        const distances: Distance[] = [];
        for (let i = 0; i < nodes.length; i++) {
            const compareTo = nodes[i]!;
            for (let j = i + 1; j < nodes.length; j++) {
                const compareAgainst = nodes[j]!;
                distances.push({
                    start: compareTo,
                    end: compareAgainst,
                    distance: compareTo.getDistance(compareAgainst),
                });
            }
        }
        return distances.sort((a, b) => a.distance - b.distance);
    }

    createGraph(nodes: Node[], connectionCount?: number): Node[] {
        const distances = this.getDistances(nodes);
        const countUntil = connectionCount !== undefined ? connectionCount : distances.length;
        for (let i = 0; i < countUntil; i++) {
            const d = distances[i]!;
            if (!d.start.isInSameCircuit(d.end)) {
                d.start.addNeighbour(d.end);
            }
        }
        return nodes;
    }

    getDistinctCircuits(nodes: Node[]): Node[][] {
        const distinctCircuits: Node[][] = [];
        for (const node of nodes) {
            if (distinctCircuits.some((dc) => -1 !== dc.findIndex((n) => n.key === node.key))) {
                continue;
            }
            distinctCircuits.push(node.bfs());
        }
        return distinctCircuits;
    }

    solvePartOne(nodes: Node[], connectionCount?: number): number {
        this.createGraph(nodes, connectionCount);
        const distinctCircuits = this.getDistinctCircuits(nodes).sort((a, b) => b.length - a.length);
        return distinctCircuits[0]!.length * distinctCircuits[1]!.length * distinctCircuits[2]!.length;
    }

    createConnectionsUntilAllConnect(nodes: Node[]): Distance {
        const distances = this.getDistances(nodes);
        for (let i = 0; i < distances.length; i++) {
            const d = distances[i]!;
            if (!d.start.isInSameCircuit(d.end)) {
                d.start.addNeighbour(d.end);
            }
            if (d.start.bfs().length === nodes.length) {
                return d;
            }
        }
        return distances[distances.length - 1]!;
    }

    solvePartTwo(nodes: Node[]): number {
        const lastConnections = this.createConnectionsUntilAllConnect(nodes);
        return lastConnections.start.x * lastConnections.end.x;
    }
}
