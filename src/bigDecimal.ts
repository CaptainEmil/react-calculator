export default class BigDecimal {
    num1: bigint;
    num2: bigint;
    isNegative: boolean;
    zerosBefNum2: number;

    constructor(num1: bigint | string | number, num2?: bigint | string | number) {
        this.isNegative = num1.toString().includes('-');
        this.zerosBefNum2 = 0;



        if (num2 === undefined && (typeof num1 === "string" || typeof num1 === "number")) {
            const numArr = num1.toString().split(".");

            if (numArr[1] !== undefined && numArr[1].split('')[0] === '0' && numArr[1].split('').length > 1) {

                this.zerosBefNum2 = numArr[1].replace(/[1-9]+\d*/, '').length;
            }
            
            this.num1 = BigDecimal.bigIntAbs(BigInt(numArr[0] === "-" ? 0 : numArr[0]!));
            this.num2 = BigDecimal.bigIntAbs(BigInt(numArr[1] === undefined ? 0 : numArr[1].replace(/0+$/, '')));
            return;
        }

        num2 = num2?.toString().replace(/0+$/, '');

        if (typeof num2 === "string" && num2.split('').length > 1 && num2.split('')[0] === '0') {
            this.zerosBefNum2 = num2.replace(/[1-9]+\d*/, '').length;
        }

        this.num1 = BigDecimal.bigIntAbs(BigInt(num1));
        this.num2 = BigDecimal.bigIntAbs(BigInt(num2 ?? 0));
    }

    private static bigIntAbs(bigInt: bigint) {
        return (bigInt < 0n) ? -bigInt : bigInt;
    }

    private static bigDecJoin(bigDec1: BigDecimal, bigDec2: BigDecimal) {
        const bigDec1Num2Len = bigDec1.num2.toString().replace(/0+$/, '').length + bigDec1.zerosBefNum2;
        const bigDec2Num2Len = bigDec2.num2.toString().replace(/0+$/, '').length + bigDec2.zerosBefNum2;
        const maxLen = Math.max(bigDec1Num2Len, bigDec2Num2Len);

        const bigDec1Num2Str = ("0".repeat(bigDec1.zerosBefNum2) + bigDec1.num2.toString().replace(/0+$/, '')).padEnd(maxLen, '0');
        const bigDec2Num2Str = ("0".repeat(bigDec2.zerosBefNum2) + bigDec2.num2.toString().replace(/0+$/, '')).padEnd(maxLen, '0');
        const bigDec1Join = BigInt((bigDec1.isNegative ? "-" : "") + bigDec1.num1.toString() + bigDec1Num2Str);
        const bigDec2Join = BigInt((bigDec2.isNegative ? "-" : "") + bigDec2.num1.toString() + bigDec2Num2Str);

        return { bigDecJoinArr: [bigDec1Join, bigDec2Join], maxLen, bigDec1Num2Len, bigDec2Num2Len };
    }

    static sum(bigDec1: BigDecimal, bigDec2: BigDecimal) {
        const { bigDecJoinArr, maxLen } = BigDecimal.bigDecJoin(bigDec1, bigDec2);;

        const bigDec1Join = bigDecJoinArr[0] as bigint;
        const bigDec2Join = bigDecJoinArr[1] as bigint;

        const resBigInt = bigDec1Join + bigDec2Join;

        const resArr = resBigInt.toString().split('');
        resArr.splice(resBigInt.toString().length - maxLen, 0, '.');

        return new BigDecimal(resArr.join(''));
    }

    static diff(bigDec1: BigDecimal, bigDec2: BigDecimal) {
        const { bigDecJoinArr, maxLen } = BigDecimal.bigDecJoin(bigDec1, bigDec2);;

        const bigDec1Join = bigDecJoinArr[0] as bigint;
        const bigDec2Join = bigDecJoinArr[1] as bigint;

        let resBigInt = bigDec1Join - bigDec2Join;
        const isNegative = resBigInt < 0n;
        resBigInt = BigDecimal.bigIntAbs(resBigInt);

        const resArr = resBigInt.toString().split('');
        for (let i = resBigInt.toString().length - maxLen; i < 0; ++i) {
            resArr.splice(0, 0, '0');
        }

        resArr.splice(Math.max(resBigInt.toString().length - maxLen, 0), 0, '.');
        resArr.splice(0, 0, isNegative ? '-' : "");
        return new BigDecimal(resArr.join(''));
    }

    static prod(bigDec1: BigDecimal, bigDec2: BigDecimal) {
        if (bigDec1.toString() === "1" || bigDec2.toString() === "1") return bigDec1.toString() === "1" ? bigDec2 : bigDec1;

        const { bigDecJoinArr } = BigDecimal.bigDecJoin(bigDec1, bigDec2);;

        const bigDec1Join = bigDec1.num2 === 0n ? bigDec1.num1 : BigInt(bigDecJoinArr[0]!.toString().replace(/0+$/, ''));
        const bigDec2Join = bigDec2.num2 === 0n ? bigDec2.num1 : BigInt(bigDecJoinArr[1]!.toString().replace(/0+$/, ''));

        const resBigInt = bigDec1Join * bigDec2Join;

        const resArr = resBigInt.toString().split('');

        if (bigDec1.num2 !== 0n || bigDec2.num2 !== 0n) {

            let dotIndex = resBigInt.toString().length - ((bigDec1.num2 === 0n ? 0 : bigDec1.num2.toString().length + bigDec1.zerosBefNum2) + (bigDec2.num2 === 0n ? 0 : bigDec2.num2.toString().length + bigDec2.zerosBefNum2));
            while (dotIndex < 0) {
                resArr.splice(0, 0, '0');
                dotIndex++;
            }
            resArr.splice(dotIndex, 0, '.');

        }

        return new BigDecimal(resArr.join(''));
    }


    static div(bigDec1: BigDecimal, bigDec2: BigDecimal) {
        const { bigDecJoinArr } = BigDecimal.bigDecJoin(bigDec1, bigDec2);;

        let bigDec1Join = BigDecimal.bigIntAbs(bigDecJoinArr[0] as bigint);
        const bigDec2Join = BigDecimal.bigIntAbs(BigInt(bigDec2.zerosBefNum2 > 0 ? bigDecJoinArr[1]!.toString().replace(/0+$/, "") : bigDecJoinArr[1]!));

        const isNegative = bigDec2.isNegative !== bigDec1.isNegative;

        let resBefDot = bigDec1Join / bigDec2Join;
        let resBefDotLen = resBefDot === 0n ? 0 : resBefDot.toString().length;
        let resAfDot = 0n;
        let zerosBefNum2 = 0;

        for (let i = 0; i <= 100 + resBefDotLen && bigDec1Join > 0; ++i) {

            if (i >= 1) {

                resAfDot = resAfDot * 10n + bigDec1Join / bigDec2Join;
                if (resAfDot === 0n) zerosBefNum2++;
            }

            bigDec1Join = bigDec1Join % bigDec2Join * 10n;
        }

        const resArr = ((resBefDot === 0n ? "" : resBefDot.toString()) + "0".repeat(zerosBefNum2) + resAfDot.toString()).split('');
        resArr.splice(resBefDotLen, 0, '.');

        return new BigDecimal((isNegative ? "-" : "") + (resAfDot === 0n ? resBefDot : resArr.join('')));
    }

    static floor(bigDec: BigDecimal) {
        return new BigDecimal(bigDec.num1.toString());
    }

    static ceil(bigDec: BigDecimal) {
        return new BigDecimal((bigDec.num1 + (bigDec.num2 === 0n ? 0n : 1n)).toString());
    }

    static mod(bigDec: BigDecimal, quot: BigDecimal) {
        return BigDecimal.diff(bigDec, BigDecimal.prod(BigDecimal.floor(BigDecimal.div(bigDec, quot)), quot));
    }

    static fac(bigDec: BigDecimal) {
        var fact = 1n;
        for (let i = 2n; i <= bigDec.num1; i++) {
            fact *= i;
        }
        return new BigDecimal(fact.toString());
    }

    static bigIntPow(x: bigint, n: bigint): bigint {
        if (n == 0n) return 1n;
        if (n % 2n == 0n) return BigDecimal.bigIntPow(x * x, n / 2n);
        return x * BigDecimal.bigIntPow(x, n - 1n);
    }

    static bigIntNthRoot(base: bigint, root: bigint) {
        let s = base + 1n;
        let k1 = root - 1n;
        let u = base;
        while (u < s) {
            s = u;
            u = ((u * k1) + base / BigDecimal.bigIntPow(u, k1)) / root;
        }
        return s;
    }


    static nthRoot(bigDec: BigDecimal, root: bigint = 2n) {

        const arr = [new BigDecimal(BigDecimal.bigIntNthRoot(bigDec.num1, root).toString())];

        for (let i = 1; i < 10; ++i) {
            const pow = BigDecimal.intPow(arr[i - 1]!, root - 1n).toFixed(50);
            const div1 = BigDecimal.div(bigDec, pow).toFixed(50);
            const diff = BigDecimal.diff(div1, arr[i - 1]!).toFixed(50);
            const div2 = BigDecimal.div(diff, new BigDecimal(root.toString())).toFixed(50);
            const sum = BigDecimal.sum(arr[i - 1]!, div2).toFixed(50);
            arr[i] = sum;
        }

        return arr[arr.length - 1]!;
    }

    static intPow(bigDec: BigDecimal, n: bigint): BigDecimal {

        if (n == 0n) return new BigDecimal("1");
        if (n % 2n == 0n) return BigDecimal.intPow(BigDecimal.prod(bigDec, bigDec), n / 2n);
        return BigDecimal.prod(bigDec, BigDecimal.intPow(bigDec, n - 1n)).toFixed(100);
    }

    static pow(bigDec: BigDecimal, pow: BigDecimal) {
        const num1Pow = BigDecimal.intPow(bigDec, pow.num1);
        const denumPow = pow.num2 === 0n ? new BigDecimal("1") : BigDecimal.nthRoot(bigDec, BigInt("1" + "0".repeat(pow.num2.toString().length))).toFixed(50);
        const num2Pow = pow.num2 === 0n ? new BigDecimal("1") : BigDecimal.intPow(denumPow, pow.num2).toFixed(50);
        const prod = BigDecimal.prod(num1Pow, num2Pow);
        return pow.isNegative ? BigDecimal.div(new BigDecimal("1"), prod) : prod;
    }

    static ln(bigDec: BigDecimal) {
        let cnt = 0;
        while (Number(bigDec.toFixed(15).toString()) > Math.E) {
            bigDec = BigDecimal.div(bigDec, BigDecimal.E());
            cnt++;
        }
        const num = Number(bigDec.toString().slice(0, 15));
        return new BigDecimal((Math.log(num) + cnt).toString());
    }

    static log(bigDec: BigDecimal, base: BigDecimal = new BigDecimal(10)) {
        return BigDecimal.div(BigDecimal.ln(bigDec), BigDecimal.ln(base));
    }

    static sin(bigDec: BigDecimal) {
        const mod = BigDecimal.mod(bigDec, BigDecimal.prod(new BigDecimal(2), BigDecimal.PI()));
        console.log(mod.toString());
        const num = Number(mod.toString().slice(0, 15));

        return new BigDecimal(Math.sin(num).toFixed(20).toString());
    }

    static cos(bigDec: BigDecimal) {
        const mod = BigDecimal.mod(bigDec, BigDecimal.prod(new BigDecimal(2), BigDecimal.PI()));
        const num = Number(mod.toString().slice(0, 15));
        return new BigDecimal(Math.cos(num).toFixed(20).toString());
    }

    static tan(bigDec: BigDecimal) {
        const mod = BigDecimal.mod(bigDec, BigDecimal.prod(new BigDecimal(2), BigDecimal.PI()));
        const num = Number(mod.toString().slice(0, 15));
        return new BigDecimal(Math.tan(num).toFixed(20).toString());
    }

    static PI() {
        return new BigDecimal(Math.PI.toString());
    }

    static E() {
        return new BigDecimal(Math.E.toString());
    }

    toFixed(n: number) {

        return new BigDecimal(this.toString().slice(0, n));
    }

    toString() {
        const num1Str = this.num1.toString();
        const num2Str = this.num2.toString();
        return `${this.isNegative ? "-" : ""}${num1Str}${num2Str.replace("0", "").length === 0 ? "" : '.' + "0".repeat(this.zerosBefNum2) + num2Str.replace(/0+$/, '')}`;
    }
}