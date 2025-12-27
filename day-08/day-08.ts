export class Day08Solver {
    async processFile(path: string): Promise<string[]> {
        const file = Bun.file(path);
        const text = await file.text();
        const lines = text.split('\n');
        return lines;
    }

    solvePartOne(rows: string[]): number {
        return 0;
    }

    solvePartTwo(rows: string[]): number {
        return 0;
    }
}
