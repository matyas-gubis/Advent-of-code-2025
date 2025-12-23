export class Day03Solver {
    solvePartOne(nums: Array<string>): number {
        return nums.map((num) => this.solveOneLine(num)).reduce((acc, val) => acc + val, 0);
    }

    solvePartTwo(nums: Array<string>): number {
        return nums.map((num) => this.solveOneLinePartTwo(num)).reduce((acc, val) => acc + val, 0);
    }

    solveOneLine(input: string): number {
        const inputAsArrayOfNumbers = input.split('').map((i) => Number(i));
        let leftIndex = 0;
        let rightIndex = input.length - 1;
        let leftMax = 0;
        let rightMax = 0;
        for (let i = 0; i < rightIndex; i++) {
            const item = inputAsArrayOfNumbers[i];
            if (!item) throw Error('Incorrect input');
            if (item > leftMax) {
                leftMax = item;
                leftIndex = i;
            }
        }
        for (let i = rightIndex; i > leftIndex; i--) {
            const item = inputAsArrayOfNumbers[i];
            if (!item) throw Error('Incorrect input');
            if (item > rightMax) {
                rightMax = item;
                rightIndex = i;
            }
        }
        return Number(leftMax.toString() + rightMax.toString());
    }

    solveOneLinePartTwo(input: string): number {
        const inputAsNumArray = input.split('').map((i) => Number(i));
        const numberOfSwitches = 12;
        let mustNotBeTouched = numberOfSwitches - 1;
        const maxArray = new Array(12).fill(0);
        let nextIndex = 0;
        for (let i = 0; i < numberOfSwitches; i++) {
            const lastNumberToCheck = input.length - mustNotBeTouched;
            for (let j = nextIndex; j < lastNumberToCheck; j++) {
                const currMax = maxArray[i];
                const curr = inputAsNumArray[j];
                if (curr === undefined || currMax === undefined) {
                    throw Error(`Invalid input at i ${i}, j ${j}, `);
                }
                if (curr > currMax) {
                    maxArray[i] = curr;
                    nextIndex = j + 1;
                }
            }
            mustNotBeTouched--;
        }
        return Number(maxArray.join(''));
    }

    async processInput(path: string): Promise<Array<string>> {
        const file = Bun.file(path);
        const text = await file.text();
        return text.split('\n').map((t) => t.trim());
    }
}
