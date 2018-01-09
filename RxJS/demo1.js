var button = document.querySelector("button");
button.addEventListener('click',() => console.log('clicked'));

//使用RXJs
var button = document.querySelector("button");
Rx.Observable.fromEvent(button,'click')
.subscribe(() => console.log("clicked"));

//纯净性

var button = document.querySelector("button");
button.addEventListener('click',() => console.log(`clicked ${++count} times`));

//使用RXJs
var button = document.querySelector("button");
Rx.Observable.fromEvent(button,'click')
  .scan()

//
function tick() {
  this.diff = moment(createAt).fromNow();
  setTimeout(tick.bind(this),1000);
}
//使用RXJS
Observable.interval(1000).subscribe(()=>{
  this.diff = moment(createAt).fromNow();
})


