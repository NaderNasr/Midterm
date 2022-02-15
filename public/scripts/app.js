/* eslint-disable no-undef */

// const { Pool } = require("pg/lib");
// const { user, password } = require("pg/lib/defaults");

// Client facing scripts here
$(() => {
  $(".copy").on('click', onClickCopy);

  const generate = document.querySelector(".generate");
  const name = (type) => {
    return document.querySelector("input[name=" + type + "]").checked;
  };

  //if all the checkboxes are unchecked return an alert
  generate.addEventListener("click", (e) => {
    e.preventDefault();
    if (!document.querySelector("input[name=uppercase]").checked &&
        !document.querySelector("input[name=number]").checked &&
        !document.querySelector("input[name=lowercase]").checked &&
        !document.querySelector("input[name=symbol]").checked) {
      return alert('Please select a checkbox');
    }

    let password = "";
    let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lowercase = "abcdefghijklmnopqrstuvwxyz";
    let number = "0123456789";
    let symbol = "~*$%@#^&!?*'-=/,.{}()[]<>";

    if (name("uppercase")) password += uppercase;
    if (name("lowercase")) password += lowercase;
    if (name("number")) password += number;
    if (name("symbol")) password += symbol;


    let result = "";
    for (let i = 0; i < 10; i++) {
      let num = Math.floor(Math.random() * password.length);
      result += password[num];
    }
    console.log(result);
    document.querySelector(".result").innerHTML = result;
  });
});


const copyToClipBoard = (str) => {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

const onClickCopy = (e) => {
  e.preventDefault();
  let copyText = document.querySelector(".result").textContent;
  alert(`copied to clipboard, \n password:  ${copyText} `);
  copyToClipBoard(copyText);
};




// $("#validate").on('submit', isChecked);

// Renders a new saved website password
// const renderVault = () => {
//   $.get("/api/websites")
//     .then((data) => {
//       const list = $("#list");
//       for (website of data.website) {
//         const li = `
//           <h1>${users.name}</h1>
//           <h2>Name</h2>
//           <p>URL</p>
//           <p>Password</p>
//         `;
//         list.append(li);
//       }
//     })
//     .catch((err)=>{
//       console.log(err);
//     });
// };



// console.log(generateString(5)); // length
// console.log(generateString(5, uppercase,  lowerCase, specialChars)); // length
