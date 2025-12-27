export class Splitter {
    constructor(
        public x: number,
        public y: number,
        public leftNeighbour?: Splitter,
        public rightNeighbour?: Splitter
    ) {}
}
export class Day07Solver {
    async processFile(path: string): Promise<string[]> {
        const file = Bun.file(path);
        const text = await file.text();
        const lines = text.split('\n');
        return lines;
    }

    solvePartOne(rows: string[]): number {
        const splitters = this.createNodes(rows);
        const connections = this.getAllConnectedNodes(splitters[0]!);
        return connections.length;
    }

    createNodes(rows: string[]): Splitter[] {
        const splitters: Splitter[] = [];
        rows.forEach((row, rowI) => {
            row.split('').forEach((char, charI) => {
                if (char === '^') {
                    splitters.push(new Splitter(charI, rowI));
                }
            });
        });
        splitters.forEach((splitter) => {
            splitter.leftNeighbour = splitters.find((spl) => spl.x === splitter.x - 1 && spl.y > splitter.y);
            splitter.rightNeighbour = splitters.find((spl) => spl.x === splitter.x + 1 && spl.y > splitter.y);
        });
        return splitters;
    }

    getAllConnectedNodes(startingNode: Splitter): Splitter[] {
        const connectedNodes: Splitter[] = [];
        const q: Splitter[] = [];
        q.push(startingNode);
        while (q.length > 0) {
            const current = q.shift();
            if (current && connectedNodes.findIndex((v) => v.x === current.x && v.y === current.y) === -1) {
                if (current?.leftNeighbour) {
                    q.push(current.leftNeighbour);
                }
                if (current?.rightNeighbour) {
                    q.push(current.rightNeighbour);
                }
                connectedNodes.push(current);
            }
        }
        // this.logSplitters(connectedNodes);
        return connectedNodes;
    }

    getAllRoutes(startingNode: Splitter, memo: Map<string, number> = new Map()): number {
        const nodeKey = `${startingNode.x},${startingNode.y}`;
        
        if (memo.has(nodeKey)) {
            return memo.get(nodeKey)!;
        }
        
        let count = 0;
        
        if (startingNode.leftNeighbour) {
            count += this.getAllRoutes(startingNode.leftNeighbour, memo);
        } else {
            count++;
        }
        
        if (startingNode.rightNeighbour) {
            count += this.getAllRoutes(startingNode.rightNeighbour, memo);
        } else {
            count++;
        }
        
        memo.set(nodeKey, count);
        return count;
    }

    logConnections(splitters: Splitter[]) {
        console.log(
            splitters.map(
                (s) =>
                    `(${s.y} ${s.x}) -> (${s.leftNeighbour?.y || ''},${s.leftNeighbour?.x || ''}), (${
                        s.rightNeighbour?.y || ''
                    },${s.rightNeighbour?.x || ''})`
            )
        );
    }

    logSplitters(splitters: Splitter[]) {
        let text = '';
        for (let i = 0; i < 20; i++) {
            let line = '';
            for (let j = 0; j < 20; j++) {
                const found = splitters.find((n) => n.y === i && n.x === j);
                if (found) {
                    line += 'x';
                } else {
                    line += ' ';
                }
            }
            line += '\n';
            text += line;
        }
        console.log(text);
    }

    solvePartTwo(rows: string[]): number {
        const splitters = this.createNodes(rows);
        const connections = this.getAllConnectedNodes(splitters[0]!);
        const routeCount = this.getAllRoutes(connections[0]!);
        return routeCount;
    }
}
