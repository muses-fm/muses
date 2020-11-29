import artist from 'ic:canisters/artist';

resonate.greet(window.prompt("Enter your name:")).then(greeting => {
  window.alert(greeting);
});
