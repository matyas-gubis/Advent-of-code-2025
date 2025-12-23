export class Day02Solver {
    solvePartOne(input: Array<{ start: number; end: number }>): number {
        let sum = 0;
        input.forEach((range) => {
            for (let i = range.start; i <= range.end; i++) {
                const iAsString = i.toString();
                const digits = iAsString.length;
                const hasEvenAmountOfDigits = digits % 2 === 0;
                if (!hasEvenAmountOfDigits) continue;
                const splitPoint = digits / 2;
                const firstPart = Number(iAsString.substring(0, splitPoint));
                const secondPart = Number(iAsString.substring(splitPoint));
                if (firstPart === secondPart) {
                    sum += i;
                }
            }
        });
        return sum;
    }
    solvePartTwo(input: Array<{ start: number; end: number }>): number {
        let sum = 0;
        input.forEach((range) => {
            for (let i = range.start; i <= range.end; i++) {
                if (this.isInvalid(i)) sum += i;
            }
        });
        return sum;
    }
    isInvalid(num: number): boolean {
        let matchFound = false;
        const numAsString = num.toString();
        const digits = numAsString.length;
        const maxLengthOfEachPiece = Math.floor(digits / 2);
        for (let lengthOfThisPiece = 1; lengthOfThisPiece <= maxLengthOfEachPiece; lengthOfThisPiece++) {
            if (digits % lengthOfThisPiece !== 0) continue;

            const timesToCut = digits / lengthOfThisPiece;
            const compareTo = numAsString.substring(0, lengthOfThisPiece);
            let matchCount = 0;
            for (let i = lengthOfThisPiece; i <= digits; i += lengthOfThisPiece) {
                const start = i;
                const end = i + lengthOfThisPiece;
                const compareAgainst = numAsString.substring(start, end);
                if (compareTo !== compareAgainst) {
                    break;
                }
                matchCount++;
            }

            if (matchCount === timesToCut - 1) {
                matchFound = true;
                break;
            }
        }
        return matchFound;
    }
    async processInputFile(path: string): Promise<Array<{ start: number; end: number }>> {
        const file = Bun.file(path);
        const text = await file.text();
        return text.split(',').map((range) => {
            const [start, end] = range.split('-');
            return { start: Number(start), end: Number(end) };
        });
    }
}
