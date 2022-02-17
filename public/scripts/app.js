/* eslint-disable no-undef */

// const { Pool } = require("pg/lib");
// const { user, password } = require("pg/lib/defaults");

// Client facing scripts here
$(() => {
  $('.result').on('click', copy);



  const generate = document.querySelector(".generate");
  const name = (type) => {
    return document.querySelector("input[name=" + type + "]").checked;
  };
  //if all the checkboxes are unchecked return an alert
  generate.addEventListener("click", (event) => {
    event.preventDefault();
    if (!document.querySelector("input[name=uppercase]").checked &&
        !document.querySelector("input[name=number]").checked &&
        !document.querySelector("input[name=lowercase]").checked &&
        !document.querySelector("input[name=symbol]").checked) {

      return alert('Please select a checkbox');
    }

    if (!document.querySelector("input[name=length1]").checked &&
          !document.querySelector("input[name=length2]").checked) {
      return alert('How long would you like the password to be?');
    }

    let loopLength = 0;
    let password = "";
    let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lowercase = "abcdefghijklmnopqrstuvwxyz";
    let number = "0123456789";
    let symbol = "~*$%@#^&!?*'-=/,.{}()[]>";

    if (name("length1")) loopLength += 12;
    if (name("length2")) loopLength += 24;
    if (name("uppercase")) password += uppercase;
    if (name("lowercase")) password += lowercase;
    if (name("number")) password += number;
    if (name("symbol")) password += symbol;

    let result = "";
    for (let i = 0; i < loopLength; i++) {
      let num = Math.floor(Math.random() * password.length);
      result += password[num];
    }
    console.log(result);
    document.querySelector(".result").innerHTML = result;
    // $("input:password").val(result);
  });
});

const copy = (element) => {
  let $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
  alert('Password copied to clipboard');
};
