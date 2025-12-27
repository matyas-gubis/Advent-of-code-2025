export class Day09Solver {
    async processFile(path: string): Promise<string[]> {
        const text = typeof Bun !== 'undefined' 
            ? await Bun.file(path).text()
            : await fetch(path).then(r => r.text());
        const lines = text.split('\n').map(l => l.trim());
        return lines;
    }

    solvePartOne(input: string[]): number {
        return 0;
    }

    solvePartTwo(input: string[]): number {
        return 0;
    }
}
