import resonate from 'ic:canisters/resonate';

resonate.greet(window.prompt("Enter your name:")).then(greeting => {
  window.alert(greeting);
});
