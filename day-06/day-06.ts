export class Day06Solver {
    async processFile(path: string): Promise<string[]> {
        const file = Bun.file(path);
        const text = await file.text();
        const lines = text.split('\n');
        lines.pop();
        return lines;
    }

    solvePartOne(input: string[]): number {
        const entries = input.map((l) => l.split(' ').filter((i) => i !== ''));
        const entriesLength = entries.length;
        if (!entriesLength) throw Error('missing entry length');
        const operations = entries[entriesLength - 1];
        if (!operations) throw Error('missing operations');
        const solutions: number[] = operations.map((o) => (o === '*' ? 1 : 0));
        for (let rowI = 0; rowI < entriesLength - 1; rowI++) {
            const line = entries[rowI];
            if (!line) throw Error('missing line');
            for (let colI = 0; colI < line.length; colI++) {
                const entry = line[colI];
                const operation = operations[colI];
                let solution = solutions[colI];
                if (entry === undefined || !operation || solution === undefined)
                    throw Error(
                        `missing entry or operation or solution ${rowI} ${colI} ${entry} ${operation} ${solution}`
                    );
                if (operation === '*') {
                    solutions[colI]! *= Number(entry);
                } else {
                    solutions[colI]! += Number(entry);
                }
            }
        }
        return solutions.reduce((acc, val) => acc + val, 0);
    }

    solvePartTwo(lines: string[]): number {
        const operations: string[] = [];
        const numbers: string[] = [];
        for (let i = lines.length - 1; i >= 0; i--) {
            for (let j = lines[i]!.length - 1; j >= 0; j--) {
                if (i === lines.length - 1 && lines[i]![j] !== ' ') {
                    operations.push(lines[i]![j]!);
                } else if (i !== lines.length - 1 && !numbers[lines[i]!.length - j - 1]) {
                    numbers[lines[i]!.length - j - 1]! = lines[i]![j]!;
                } else if (i !== lines.length - 1) {
                    numbers[lines[i]!.length - j - 1]! += lines[i]![j]!;
                }
            }
        }
        console.log(numbers);
        const nums = numbers.map((n) => Number(n.split('').reverse().join('')));
        console.log(nums);
        const sums: number[] = operations.map((o) => (o === '*' ? 1 : 0));
        let operationIndex = 0;
        for (let i = 0; i < nums.length; i++) {
            let currentOperator = operations[operationIndex];
            if (nums[i] === 0) {
                operationIndex++;
                currentOperator = operations[operationIndex];
                continue;
            }
            if (currentOperator === '*') {
                sums[operationIndex]! *= nums[i]!;
            }
            if (currentOperator === '+') {
                sums[operationIndex]! += nums[i]!;
            }
        }
        console.log(sums);
        return sums.reduce((acc, v) => acc + v, 0);
    }
}
