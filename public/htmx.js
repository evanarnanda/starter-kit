// we need this function to be able to handle the error response from the server
// so that we can use proper error response
// not just return 200 hihihi ^.^

// for now just 422 error
document.addEventListener('DOMContentLoaded', (event) => {
  document.body.addEventListener('htmx:beforeSwap', function(evt) {
    if (evt.detail.xhr.status === 422) {
      evt.detail.shouldSwap = true;
      evt.detail.isError = false;
    }
  });
})
