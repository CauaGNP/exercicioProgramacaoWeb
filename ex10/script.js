renderExpenses();

document
  .querySelector("#buttonEnviarDespesas")
  .addEventListener("click", handleAddExpenseSubmit);

document
  .querySelector("#backButton")
  .addEventListener("click", toggleEditExpenseModal);

document
  .querySelector("#attButton")
  .addEventListener("click", handleExpenseUpdate);

// Handlers

async function handleAddExpenseSubmit() {
  const expenseNameInput = document.querySelector("#inputDespesa");
  const expensePriceInput = document.querySelector("#inputvalorGastoDespesa");

  const expenseName = expenseNameInput.value.trim();
  const expensePrice = Number(expensePriceInput.value);

  if (expenseName === "") {
    alert('Campo "Nome da despesa" não preenchido.');
    expenseNameInput.focus();

    return;
  }

  if (expensePrice === 0) {
    alert('Campo "valor gasto" não preenchido');
    expensePriceInput.focus();

    return;
  }

  const res = await addExpense(expenseName, expensePrice);

  if (!res.ok) {
    alert(`Erro do servidor ${res.status}`);
    return;
  }

  expenseNameInput.value = "";
  expensePriceInput.value = "";

  expenseNameInput.focus();

  renderExpenses();
}

async function handleExpenseUpdate() {
  const id = new URLSearchParams(window.location.search).get("id");
  const newPrice = Number(document.querySelector("#attValue").value);

  if (newPrice === 0) {
    alert("Preencha o campo para atualizar");
    return;
  }

  const res = await updateExpense(id, newPrice);

  if (!res.ok) {
    alert(`Erro no servidor ${res.status}`);
    return;
  }

  toggleEditExpenseModal();
  renderExpenses();
}

async function handleExpenseDelete(id) {
  const res = await deleteExpense(id);

  if (!res.ok) {
    alert(`Erro no servidor ${res.status}`);
    return;
  }

  renderExpenses();
}

// API calls

async function addExpense(name, price) {
  console.log(name, price);

  return await httpClient({
    method: "POST",
    body: {
      descricao: name,
      valor: price,
    },
  });
}

async function getExpenses() {
  return await httpClient({
    method: "GET",
  });
}

async function updateExpense(id, newPrice) {
  return await httpClient({
    method: "PUT",
    path: `/${id}`,
    body: {
      valor: newPrice,
    },
  });
}

async function deleteExpense(id) {
  return await httpClient({
    method: "DELETE",
    path: `/${id}`,
  });
}

// Rendering

async function renderExpenses() {
  const res = await getExpenses();

  if (!res.ok) {
    alert(`Erro no servidor ${res.status}`);
    return;
  }

  const expenses = res.data.results;

  document.querySelector("#list").innerHTML = "";

  expenses.forEach(createExpenseListItem);

  document.querySelector("#totalDespesa").value = expenses.reduce(
    (acc, expense) => acc + expense.valor,
    0
  );
}

function createExpenseListItem(expense) {
  const expensesList = document.querySelector("#list");

  const expensePriceBRL = expense.valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const expenseListItem = Object.assign(document.createElement("li"), {
    innerText: `${expense.descricao} = ${expensePriceBRL}`,
  });

  const editExpenseBtn = Object.assign(document.createElement("button"), {
    innerText: "Atualizar",
    id: expense.objectId,
  });

  const deleteExpenseBtn = Object.assign(document.createElement("button"), {
    innerText: "Deletar",
  });

  editExpenseBtn.addEventListener("click", () => {
    const url = new URL(window.location.href);
    url.searchParams.set("id", expense.objectId);

    window.history.pushState({}, "", url);

    toggleEditExpenseModal();
  });

  deleteExpenseBtn.addEventListener("click", () =>
    handleExpenseDelete(expense.objectId)
  );

  expenseListItem.appendChild(editExpenseBtn);
  expenseListItem.appendChild(deleteExpenseBtn);

  expensesList.appendChild(expenseListItem);
}

function toggleEditExpenseModal() {
  const modal = document.querySelector("#atualizarValor");

  modal.style.display =
    modal.style.display === "none" || modal.style.display === ""
      ? "flex"
      : "none";

  modal.querySelector("input").value = 0;
}

// HTTP Client

async function httpClient({ method, path, body }) {
  const res = await fetch(
    `https://parseapi.back4app.com/classes/Despesas${path ? path : ""}`,
    {
      method,
      headers: {
        "X-Parse-Application-Id": "Ph6uxRL3eforH6wBiUwqYeFCrcoxiR0pJKSDxGeU",
        "X-Parse-REST-API-Key": "2K8jzpSHks2j5r7e7UtfCrt1HAnqxIdCXWMErSEb",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  let data;

  try {
    data = await res.json();
  } catch (error) {}

  return {
    ok: res.ok,
    status: res.status,
    data,
  };
}