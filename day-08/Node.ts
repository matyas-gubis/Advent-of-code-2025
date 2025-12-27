export class Node {
    x: number;
    y: number;
    z: number;
    neighbours: Node[] = [];
    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    addNeighbour(node: Node) {
        this.neighbours.push(node);
        node.neighbours.push(this);
    }

    get key(): string {
        return `${this.x},${this.y},${this.z}`;
    }
    isInSameCircuit(node: Node): boolean {
        return -1 !== this.bfs().findIndex((n) => n.key === node.key);
    }
    bfs(): Node[] {
        const nodes: Node[] = [];
        const q: Node[] = [this];
        const visited: Set<string> = new Set();
        while (q.length !== 0) {
            const current = q.shift();
            nodes.push(current!);
            visited.add(current!.key);
            for (const neigh of current!.neighbours) {
                if (!visited.has(neigh.key)) {
                    q.push(neigh);
                }
            }
        }
        return nodes;
    }
    getDistance(node: Node): number {
        return Math.abs(Math.pow(this.x - node.x, 2) + Math.pow(this.y - node.y, 2) + Math.pow(this.z - node.z, 2));
    }
}
