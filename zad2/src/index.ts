interface Order {
  product: string;
  price: number;
}

let orderList: Order[] = [];

const addOrder = () => {
  const productInput = document.getElementById('product-input') as HTMLInputElement;
  const priceInput = document.getElementById('price-input') as HTMLInputElement;

  const product = productInput.value;
  const price = Number(priceInput.value);

  if (product && price) {
    const order: Order = {
      product,
      price
    };

    orderList.push(order);
    displayOrderList();
    clearInputFields();
  }
};

const displayOrderList = () => {
  const orderListElement = document.getElementById('order-list') as HTMLBodyElement;
  orderListElement.innerHTML = '';

  orderList.forEach((order, index) => {
    const li = document.createElement('li');
    li.textContent = `Заказ ${index + 1} - Продукт: ${order.product}, Цена: ${order.price}`;
    orderListElement.appendChild(li);
  });
};

const clearInputFields = () => {
  const productInput = document.getElementById('product-input') as HTMLInputElement;
  const priceInput = document.getElementById('price-input') as HTMLInputElement;

  productInput.value = '';
  priceInput.value = '';
};

const displayResult = (total: number) => {
  const resultElement = document.getElementById('result') as HTMLBodyElement;
  resultElement.innerHTML = `Общая сумма заказа: ${total}`;
};

const calculateOrderTotal = () => {
  const totalAmount = orderList.reduce((sum, order) => sum + order.price, 0);

  displayResult(totalAmount);
};