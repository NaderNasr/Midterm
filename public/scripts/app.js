/* eslint-disable no-undef */
// Client facing scripts here
$(() => {
  console.log("ready");
  $("#newVault").on('click', onClick);
});

const onClick = () => {
  $.get("/api/websites")
    .then((data) => {
      const list = $("#list");
      for (users of data.users) {
        const li = `
          <h1>${users.name}</h1>
          <h2>Name</h2>
          <p>URL</p>
          <p>Password</p>
        `;
        list.append(li);
      }
    })
    .catch((err)=>{
      console.log(err);
    });
};

