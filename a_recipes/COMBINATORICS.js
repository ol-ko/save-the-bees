function range(m, n) {
    return Array.apply(null, Array(n - m + 1)).map(function (x, i) {
        return m + i;
    });
}

function combinations(n, lstRange) {
    // n -> [a] -> [[a]]
    function comb(n, lst) {
        if (!n) return [[]];
        if (!lst.length) return [];

        var x = lst[0],
            xs = lst.slice(1);

        return comb(n - 1, xs)
            .map(function (t) {
                return [x].concat(t);
            })
            .concat(comb(n, xs));
    }

    // f -> f
    function memoized(fn) {
        m = {};
        return function (x) {
            var args = [].slice.call(arguments),
                strKey = args.join('-');

            v = m[strKey];
            if ('u' === (typeof v)[0]) m[strKey] = v = fn.apply(null, args);
            return v;
        };
    }

    // [m..n]

    var fnMemoized = memoized(comb);

    return fnMemoized(n, lstRange);
}

// non-recursive all combinations size k of n
const n = 1000
const k = 3
combinations(k, range(0, n - 1));
