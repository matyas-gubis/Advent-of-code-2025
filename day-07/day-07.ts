export class Day07Solver {
    async processFile(path: string): Promise<string[]> {
        const file = Bun.file(path);
        const text = await file.text();
        const lines = text.split('\n');
        lines.pop();
        return lines;
    }

    solvePartOne(input: string[]): number {
        return 0;
    }

    solvePartTwo(lines: string[]): number {
        return 0;
    }
}
