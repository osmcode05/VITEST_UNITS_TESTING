// ===================== Get the longer of two strings =====================

export function GetLongStreng(str1, str2) {
  const s1 = str1.trim();
  const s2 = str2.trim();

  if (!s1 || !s2)
    return "one or more of the input are empty plz complete all inputs";
  if (s1.length === s2.length) return "the two string are equal";
  return s1.length > s2.length ? s1 : s2;
}

// ===================== check if the number are a prime number =====================

export function isPrime(num) {
  if (typeof num !== "number" || num <= 1 || !Number.isInteger(num))
    return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

//**** NOTE **** : Each Number X Write as X = a*b ===> at least one of a or b is less than or equal to sqrt(X)
//For Example : 36 = 4 * 9 ===> at least one of 4 or 9 is less than or equal to sqrt(36) = 6



// ===================== factorial function =====================

export function Factorial(n) {
    if (n < 0 || typeof n !== 'number') return undefined;
    if (n === 0 || n === 1) return 1;
    return n * Factorial(n - 1);
}
// This is a **Recursive function** : function calls itself until it reaches the base case (n === 0 or n === 1)
// Factorial of n (n!) = n * (n-1) * (n-2) * ... * 1
// Ex : Factorial(5) = 5 * 4 * 3 * 2 * 1 = 120

