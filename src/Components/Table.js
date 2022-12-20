import React from "react";
import data from "../accountData";

export default function Table() {
  const [accountsData, setAccountsData] = React.useState(data);
  const [totalDebitAmount, setTotalDebitAmount] = React.useState("0.00");
  const [totalCreditAmount, setTotalCreditAmount] = React.useState("0.00");

  const toIndianCurrency = (num) => {
    const curr = num.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
    return curr;
  };

  function addRow() {
    const rowInput = {
      account: "",
      debitAmount: "",
      creditAmount: "",
    };

    setAccountsData([...accountsData, rowInput]);

    console.log(accountsData);
  }

  const deleteRow = (i) => {
    const list = [...accountsData];
    list.splice(i, 1);
    setAccountsData(list);
  };

  function handleChange(event) {
    // const { name, value } = event.target;
    // const tempData = [...accountsData];
    // tempData[event.target.dataset.id][name] = value;

    // setAccountsData(tempData);

    let prope = event.target.name; // the custom column attribute
    let index = event.target.dataset.id; // index of state array -rows
    let fieldValue = event.target.value; // value

    const tempRows = [...accountsData]; // avoid direct state mutation
    const tempObj = accountsData[index]; // copy state object at index to a temporary object
    tempObj[prope] = fieldValue; // modify temporary object

    // return object to rows` clone
    tempRows[index] = tempObj;
    setAccountsData(tempRows); // update state
  }

  function handleSubmit(event) {
    console.log(accountsData);
    // const newAccountsData = accountsData.map((data) => {
    //   if (data.name === 'debitAmount') {
    //     return {...data, debitAmount:}
    //   }
    // });
    event.preventDefault();

    setTotalDebitAmount(getTotalDebitAmount);
    setTotalCreditAmount(getTotalCreditAmount);
  }
  function getTotalDebitAmount() {
    return accountsData.reduce((total, item) => {
      return total + Number(item.debitAmount);
    }, 0.0);
  }

  function getTotalCreditAmount() {
    return accountsData.reduce((total, item) => {
      return total + Number(item.creditAmount);
    }, 0.0);
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ textAlign: "center", display: "inline-block" }}
    >
      <table style={{ textAlign: "center" }}>
        <tr>
          <th
            style={{
              borderStyle: "solid",
              borderRadius: "5px",
              borderColor: "#bbbdbb",
              backgroundColor: "#e6e8e6",
            }}
          >
            Accounts
          </th>
          <th
            style={{
              borderStyle: "solid",
              borderRadius: "5px",
              borderColor: "#bbbdbb",
              backgroundColor: "#e6e8e6",
            }}
          >
            Debit Amount
          </th>
          <th
            style={{
              borderStyle: "solid",
              borderRadius: "5px",
              borderColor: "#bbbdbb",
              backgroundColor: "#e6e8e6",
            }}
          >
            Credit Amount
          </th>
        </tr>
        {accountsData.map((data, index) => (
          <tr key={index}>
            <td
              style={{
                borderStyle: "solid",
                borderRadius: "5px",
                borderColor: "#bbbdbb",
              }}
            >
              <select
                name="account"
                data-id={index}
                onChange={handleChange}
                value={data.account}
                style={{
                  font: "inherit",
                  border: "0px",
                }}
              >
                <option value="">--select account--</option>
                <option value="devansh">Devansh</option>
                <option value="aayush">Aayush</option>
                <option value="mirat">Mirat</option>
                <option value="parshva">Parshva</option>
              </select>
            </td>
            <td>
              <input
                type="text"
                placeholder="0.00"
                name="debitAmount"
                data-id={index}
                onChange={handleChange}
                value={data.debitAmount}
                autoComplete="off"
                style={{
                  height: "100%",
                  borderStyle: "solid",
                  borderRadius: "5px",
                  textAlign: "center",
                  borderColor: "#bbbdbb",
                }}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="0.00"
                name="creditAmount"
                data-id={index}
                onChange={handleChange}
                value={data.creditAmount}
                autoComplete="off"
                style={{
                  borderStyle: "solid",
                  borderRadius: "5px",
                  textAlign: "center",
                  borderColor: "#bbbdbb",
                }}
              />
            </td>
            <td
              style={{ color: "red", cursor: "pointer", textAlign: "left" }}
              onClick={() => deleteRow(index)}
            >
              x
            </td>
          </tr>
        ))}
        <tr>
          <td style={{ textAlign: "right", fontWeight: "bold" }}> Total</td>
          <td style={{ textAlign: "right" }}>
            {toIndianCurrency(Number(totalDebitAmount))}
          </td>
          <td style={{ textAlign: "right" }}>
            {toIndianCurrency(Number(totalCreditAmount))}
          </td>
          <button>Submit</button>
        </tr>
      </table>
      <div
        onClick={addRow}
        style={{ cursor: "pointer", color: "blue", textAlign: "center" }}
      >
        Add Row+
      </div>
    </form>
  );
}
