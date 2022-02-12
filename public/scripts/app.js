/* eslint-disable no-undef */
// Client facing scripts here
$(() => {
  console.log("ready");
  $("#button").on('click', onClick);
});

const onClick = () => {
  $.get("/api/users")
    .then((data) => {
      const list = $("#list");
      for (users of data.users) {
        const li = `<li>${users.url}</li>`;
        list.append(li);
      }
    })
    .catch((err)=>{
      console.log(err);
    });
};

