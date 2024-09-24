// Адаптер (Adapter) — це патерн програмування, який дозволяє об'єктам з інтерфейсом несумісним з іншими об'єктами працювати разом,
// перетворюючи інтерфейс одного об'єкта на інтерфейс, очікуваний іншим об'єктом.

// Клас BankTransfer представляє собою систему для здійснення банківських переказів
class BankTransfer {
  // Зробіть метод initiateTransfer, який приймає amount та відповідає за ініціювання банківського переказу
  initiateTransfer(amount) {
    // Він приймає суму переказу як параметр
    // Для ініціювання банківського переказу спершу обчислюється сума з урахуванням комісії calculatedAmount = this.calculateFee(amount)
    // Виводимо інформацію про ініціювання банківського переказу Ініціюємо банківський переказ: $${calculatedAmount}
    const calculatedAmount = this.calculateFee(amount);
    console.log(`Initiate bank transfer: $${calculatedAmount}`);
  }
  // Зробіть метод calculateFee, який відповідає за розрахунок комісії за переказ
  calculateFee(amount) {
    const totalAmount = amount * 1.02;
    return totalAmount;
  }
  // Він приймає amount переказу як параметр та повертає число після розрахування комісії
  // Логіка розрахунку комісії за переказ amount * 1.02
  // Припустимо, комісія становить 2% від суми переказу
}

// Клас WalletTransfer представляє собою систему для здійснення переказів з гаманця
class WalletTransfer {
  // Створіть метод processTransfer, який відповідає за здійснення переказу з гаманця
  proccesTransfer(amount) {
    console.log(`Transfering from wallet: $${amount}`);
  }
  // Він приймає суму переказу як параметр
  // Виводимо інформацію про здійснення переказу з гаманця Здійснюємо переказ з гаманця: $${amount}
}

// Клас TransferAdapter виступає адаптером, який дозволяє нам користуватися
// методами WalletTransfer так, ніби це BankTransfer.
class TransferAdapter {
  // Робимо конструктор, що приймає об'єкт transferSystem типу WalletTransfer
  // Зберігаємо посилання на об'єкт WalletTransfer у властивості transferSystem
  constructor(transferSystem) {
    this.transferSystem = transferSystem;
  }
  // Робимо метод initiateTransfer, який адаптує API WalletTransfer до API BankTransfer.
  initiateTransfer(amount) {
    // Він приймає amount як аргумент та повертає результат виконання переказу.
    // Викликаємо допоміжний метод calculateFee для обчислення комісії за переказ та результат записуєм в константу calculatedAmount
    // Викликаємо метод processTransfer об'єкту WalletTransfer з calculatedAmount.
    // В результаті повертаємо результат виконання переказу.
    const calculatedAmount = this.calculateFee(amount);
    return this.transferSystem.proccesTransfer(calculatedAmount);
  }
  calculateFee(amount) {
    return amount * 1.2;
  }
  // Створюємо метод calculateFee, що приймає amount та обчислює суму комісії за переказ amount * 1.2, засновуючись на вхідній сумі.
  // Повертаємо amount * 1.2
}

class Order {
  constructor(amount) {
    this.amount = amount;

    if (amount < 100) {
      this.paymentSystem = new TransferAdapter(new WalletTransfer());
    } else {
      this.paymentSystem = new BankTransfer();
    }
  }

  initiateTransfer() {
    return this.paymentSystem.initiateTransfer(this.amount);
  }
}
console.log("Завдання 5 ====================================");
// Після виконання розкоментуйте код нижче

// Створимо екземпляри BankTransfer
const purchase1 = new Order(1000);
purchase1.initiateTransfer();

const purchase2 = new Order(10);
purchase2.initiateTransfer();
