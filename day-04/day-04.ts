type position = {
    x: number;
    y: number;
};
export class Day04Solver {
    directions: Array<position> = [];

    constructor() {
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (i === 0 && j === 0) continue;
                this.directions.push({ x: i, y: j });
            }
        }
    }

    async processFile(path: string): Promise<Array<string>> {
        const file = Bun.file(path);
        const text = await file.text();
        return text.split('\n').map((t) => t.trim());
    }
    isFieldAccessible(matrix: Array<string>, position: position): boolean {
        if (matrix?.[position.y]?.[position.x] !== '@') return false;
        let rollsOfPaperNearby = 0;
        for (const direction of this.directions) {
            const fieldToCheck = { x: position.x + direction.x, y: position.y + direction.y };
            if (fieldToCheck.y < 0 || fieldToCheck.y > matrix.length) {
                continue;
            }
            const currentRow = matrix[fieldToCheck.y];
            if (fieldToCheck.x < 0 || currentRow === undefined || fieldToCheck.y > currentRow.length) {
                continue;
            }
            const currField = currentRow[fieldToCheck.x];
            if (currField === undefined) {
                continue;
            }
            if (currField === '@') {
                rollsOfPaperNearby++;
            }
            if (rollsOfPaperNearby === 4) {
                return false;
            }
        }
        return true;
    }
    numberOfAccessiblePaperRolls(rows: Array<string>): number {
        return rows
            .map((row, y) => row.split('').map((field, x) => this.isFieldAccessible(rows, { x, y })))
            .flat()
            .reduce((acc, val) => (val ? acc + 1 : acc), 0);
    }
    solvePartTwo(rows: Array<string>): number {
        let newRows = rows;
        let sum = 0;
        let i = 0;
        const overFlowStopper = 100;
        while (
            newRows.some((row, y) => row.split('').some((field, x) => this.isFieldAccessible(newRows, { x, y }))) &&
            i < overFlowStopper
        ) {
            sum += this.numberOfAccessiblePaperRolls(newRows);
            newRows = newRows.map((row, y) =>
                row
                    .split('')
                    .map((field, x) => (this.isFieldAccessible(newRows, { x, y }) ? '.' : field))
                    .join('')
            );
            console.log('newrows:');
            newRows.forEach((row) => {
                console.log(row);
            });
            i++;
        }
        return sum;
    }
}
