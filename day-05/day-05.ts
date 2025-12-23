export type Range = {
    start: number;
    end: number;
};
export class Day05Solver {
    async processFile(path: string): Promise<{ ranges: Array<Range>; ingredients: Array<number> }> {
        const file = Bun.file(path);
        const text = await file.text();
        const rows = text.split('\n').map((r) => r.trim());
        let i = 0;
        const ranges: Array<Range> = [];
        const ingredients: Array<number> = [];
        while (rows[i] !== '\n') {
            if (rows[i] === '') break;
            const range = rows[i]?.trim().split('-');
            const start = Number(range?.[0]);
            const end = Number(range?.[1]);
            if (Number.isNaN(start) || Number.isNaN(end)) {
                throw Error(`incorrect input at ${i}, value is '${rows[i]}'`);
            }
            ranges.push({ start, end });
            i++;
        }
        i++;
        while (i < rows.length) {
            ingredients.push(Number(rows[i]));
            i++;
        }
        return { ranges, ingredients };
    }
    async processFileForPartTwo(path: string): Promise<number> {
        const file = Bun.file(path);
        const text = await file.text();
        const rows = text.split('\n').map((r) => r.trim());
        const ranges: Array<Range> = [];

        let i = 0;
        while (rows[i] !== '\n') {
            if (rows[i] === '') break;
            const range = rows[i]?.trim().split('-');
            const start = Number(range?.[0]);
            const end = Number(range?.[1]);
            if (Number.isNaN(start) || Number.isNaN(end)) {
                throw Error(`incorrect input at ${i}, value is '${rows[i]}'`);
            }
            ranges.push({ start, end });
            i++;
        }

        const mergedRanges = this.mergeRanges(ranges);
        console.log(mergedRanges);

        return mergedRanges.map((range) => range.end - range.start + 1).reduce((acc, val) => acc + val, 0);
    }

    private mergeRanges(ranges: Range[]): Range[] {
        const sortedRanges = ranges.sort((a, b) => a.end - b.end).sort((a, b) => a.start - b.start);
        console.log(sortedRanges);
        for (let i = sortedRanges.length - 1; i >= 0; i--) {
            console.log(sortedRanges.length);
            for (let j = i - 1; j >= 0; j--) {
                if (!sortedRanges[j] || !sortedRanges[j]) {
                    console.log(`skipping ${j}`);
                    continue;
                }
                const compareTo = sortedRanges[i];
                const compareAgainst = sortedRanges[j];
                console.log(
                    `comparing ${compareTo?.start}-${compareTo?.end} to ${compareAgainst?.start}-${compareAgainst?.end}`
                );
                if (!compareTo || !compareAgainst) {
                    throw Error(`invalid input at ${i} ${j}`);
                }

                if (compareTo.start <= compareAgainst.end && compareTo.start >= compareAgainst.start) {
                    compareTo.start = compareAgainst.start;
                    sortedRanges.splice(j, 1);
                    break;
                }
            }
        }
        return sortedRanges;
    }

    isIngredientFresh(ranges: Array<Range>, id: number): boolean {
        for (const range of ranges) {
            if (id >= range.start && id <= range.end) {
                return true;
            }
        }
        return false;
    }

    numberOfFreshIngredients(ranges: Array<Range>, ingredients: Array<number>): number {
        return ingredients.filter((ingr) => this.isIngredientFresh(ranges, ingr)).length;
    }
}
