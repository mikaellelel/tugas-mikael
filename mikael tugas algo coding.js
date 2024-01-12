/**
 * Theory understanding:
 * 
 *    if amount >= coin
 *     current_amount - current_coin
 * 
 *    coin 1:
 *     1 - 1 = 0 kita liat index 0 adalah 1, maka masukkan 1
 *     2 - 1 = 1 kita liat index 1 adalah 1, maka masukkan 1 di amount 2
 *    coin 2:
 *     if 0 >= 2 false; next
 *     if 1 >= 2 false; next
 *     if 2 >= 2 true; 2 - 2 = 0; kita liat index 0 adalah 1, maka kita tambahkan 1 di amount 2
 *     if 3 >= 2 true; 3 - 2 = 1; kita liat index 1 adalah 1, maka kita tambahkan 1 di amount 3
 *     if 4 >= 2 true; 4 - 2 = 2; kita liat index 2 adalah 2, maka kita tambahkan 2 di amount 4
 *     if 5 >= 2 true; 5 - 2 = 3; kita liat index 3 adalah 2, maka kita tambahkan 2 di amount 5
 *     if 6 >= 2 true; 6 - 2 = 4; kita liat index 4 adalah 3, maka kita tambahkan 3 di amount 6
 *     if 7 >= 2 true; 7 - 2 = 5; kita liat index 5 adalah 3, maka kita tambahkan 3 di amount 7
 *    coin 5:
 *     if 4 >= 5 false; next
 *     if 5 >= 5 true; 5 - 5 = 0; kita liat index 0 adalah 1, maka kita tambahkan 1 di amount 5
 *     if 6 >= 5 true; 6 - 5 = 1; kita liat index 1 adalah 1, maka kita tambahkan 1 di amount 6
 * 
 *     coin = [1,2,5]
 *         0  1  2  3  4  5  6  7  8  9  10  11  12  13
 *         ---------------------------------------------
 *     1   1  1  1  1  1  1  1  1  1  1   1   1   1   1
 *     2   1  1  2  2  3  3  4  4  5  5   6   6   7   7
 *     5   1  1  2  2  3  4  5  6  7  8  10  11  13  14
 *    ----------------------------------------------------------------------
 *    ---------------------------- OTHER CASE ------------------------------
 *    ----------------------------------------------------------------------
 *    coin = [3,5,12]
 * 
 *     if amount >= coin
 *       current_amount - current_coin
 *    coin 3:
 *     if 1 >= 3 false; next
 *     if 2 >= 3 false; next
 *     if 3 >= 3 true; 3 - 3 = 0; kita liat index 0 adalah 1, maka kita tambahkan 1 di amount 3
 *    coin 5:
 *     if 4 >= 5 false; next
 *     if 5 >= 5 true; 5 - 5 = 0; kita liat index 0 adalah 1, maka kita tambahkan 1 di amount 5
 *     if 6 >= 5 true; 6 - 5 = 1; kita liat index 1 adalah 0, maka kita tambahkan 0 di amount 6
 *    coin 12:
 *     if 11 >= 12 false; next
 *     if 12 >= 12 true; 12 - 12 = 0; kita liat index 0 adalah 1, maka kita tambahkan 1 di amount 12
 * 
 *         0  1  2  3  4  5  6  7  8  9  10  11  12  13  14  15  16  17  18  19  20  21  22  23
 *         -------------------------------------------------------------------------------------
 *     3   1  0  0  1  0  0  1  0  0  1   0   0   1   0   0   1   0   0   1   0   0   1   0   0
 *     5   1  0  0  1  0  1  1  0  1  1   1   1   1   1   1   1   1   1   2   1   1   2   1   2
 *     12  1  0  0  1  0  1  1  0  1  1   1   1   2   1   1   2   1   2   3   1   2   3   2   3
 * 
 *    change:
 *         0  1  2  3  4  5  6  7  8  9  10  11  12  13  14  15  16  17  18  19  20  21  22  23
 *        --------------------------------------------------------------------------------------
 *         1  0  0  1  0  1  1  0  1  1   1   1   2   1   1   2   1   2   3   1   2   3   2   3
 * 
 */



/**
 * Fungsi ini menghitung total cara untuk memberikan kembalian
 * untuk suatu jumlah tertentu menggunakan kumpulan koin yang diberikan.
 * 
 * @param {number} totalAmount - Jumlah yang akan dihitung kembaliannya.
 * @param {number[]} coins - Array denominasi koin.
 * @returns {number} - Jumlah total cara memberikan kembalian.
 */
function calculateMaxChange(totalAmount, coins) {
  // Array untuk menyimpan jumlah cara memberikan kembalian untuk setiap jumlah dari 0 hingga totalAmount.
  let combinations = new Array(totalAmount + 1).fill(0);

  // Hanya ada satu cara memberikan kembalian untuk jumlah nol (tanpa koin).
  combinations[0] = 1;

  // Iterasi melalui setiap koin dan memperbarui array kombinasi.
  for (let coin of coins) {
    for (let j = coin; j <= totalAmount; j++) {
      combinations[j] += combinations[j - coin];
    }
  }

  return combinations[totalAmount];
}

/**
 * Fungsi ini mencetak hasil setelah menghitung total cara memberikan kembalian
 * untuk suatu jumlah tertentu.
 * 
 * @param {number} totalAmount - Jumlah yang akan dihitung kembaliannya.
 * @param {number[]} coins - Array denominasi koin.
 */
function calculateAndPrint(totalAmount, coins) {
  const totalChanges = calculateMaxChange(totalAmount, coins);

  console.log(
    `Untuk jumlah ${totalAmount}, koin ${coins.join(', ')} dapat membentuk `,
    '\x1b[32m', `${totalChanges} cara.`,
    '\x1b[0m', '\n'
  );
}

// Uji coba
const coins1 = [3, 5, 12];
calculateAndPrint(6, coins1); // Hasil Harapannya: 1
calculateAndPrint(23, coins1); // Hasil Harapannya: 3

const coins2 = [1, 2, 5];
calculateAndPrint(5, coins2); // Hasil Harapannya: 4
calculateAndPrint(12, coins2); // Hasil Harapannya: 13

console.log('TEST CASE: IDR');

const rupiah = [1, 5, 50, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000];
calculateAndPrint(123456, rupiah); // Hasil Harapannya: 1283884539549348

// Hapus tanda komentar pada baris berikut untuk uji coba USD jika diperlukan.
// const usd = [1, 5, 10, 25, 50, 100, 200, 500, 1000, 2000, 5000, 10000];
// calculateAndPrint(807, usd); // Hasil Harapannya: 1067831

console.log('\n\n---TP2-W7-S11-R2\n');
const soal_2 = [1, 5, 10, 25, 50, 100];
calculateAndPrint(146, soal_2); // Hasil Harapannya: 913

console.log('\n\n---TK3-W8-S12-R2\n');
const soal_3 = [1, 5, 10, 25, 50, 100];
calculateAndPrint(269, soal_3); // Hasil Harapannya: 7654
