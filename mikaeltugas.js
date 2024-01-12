function minCoins(coins, m, v) {  
  // table[i] akan menyimpan
  // jumlah minimum koin
  // yang diperlukan untuk nilai i. Jadi
  // table[V] akan menyimpan hasil

  let table = new Array(v + 1);

  // Inisialisasi nilai pertama tabel menjadi nol
  table[0] = 0;

  // Inisialisasi semua nilai tabel sebagai Infinite kecuali yang pertama
  for (let i = 1; i <= v; i++) {
    table[i] = Number.MAX_VALUE;
  }

  // Hitung jumlah minimum koin yang diperlukan untuk semua
  // nilai dari 1 hingga V
  for (let i = 1; i <= v; i++) {
    // Iterasi semua koin yang lebih kecil dari i
    for (let j = 0; j < m; j++) {
      if (coins[j] <= i) {
        let sub_res = table[i - coins[j]];
        if (sub_res !== Number.MAX_VALUE && sub_res + 1 < table[i]) {
          table[i] = sub_res + 1;  
        }
      }   
    }
  }

  if (table[v] === Number.MAX_VALUE) {
    return -1;
  }

  return table[v];
}

// Contoh penggunaan
let coins = [1, 5, 10, 25, 50, 100];
let V = 146;
let m = coins.length;

console.log("Minimum coins required is " + minCoins(coins, m, V));

console.log('\n------------------------------------------');
const V2 = 269;
console.log("Minimum coins required is " + minCoins(coins, m, V2));
