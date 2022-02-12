/* eslint-disable no-undef */
// Client facing scripts here
$(() => {
  console.log("ready");
  $("#button").on('click', onClick);
});

const onClick = () => {
  $.get("/api/websites")
    .then((data) => {
      const list = $("#list");
      for (websites of data.websites) {
        const li = `<li>${websites.url}</li>`;
        list.append(li);
      }
    })
    .catch((err)=>{
      console.log(err);
    });
};

