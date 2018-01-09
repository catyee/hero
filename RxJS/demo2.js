const timeA$ = Observable.interval(1000);
const timeB$ = timeA$.filter(num => {
})

//自动更新的状态树
//熟悉Redux的人应该会对这样的一套理念不陌生
// 当前的视图状态 := 之前的状态 + 本次修改的部分

//从一个应用启动之后，整个全局状态的变化，就等于初始的状态叠加了之后所有的action导致的状态修改结果，在RXJS里面，有一个scan操作符可以用来表达这个含义

const action$ = new Subject();
const reducer = (state,payload) => {

}
const state$ = action$.scan(reducer)
  .startWith({});
//只需往这个action$里面推action，就能够在state$上获取出当前状态
//在Redux里面会有一个东西叫combineReducer，在state比较大的时候，用不同的reducer修改state的不同的分支，然后合并。用RxJS，也可以很容易表达出来
const meAction$ = new Subject();
const meReducer = (state,payload) => {}

const articleAction$ = new Subject();
const articleReducer = (state,payload) =>{}

const me$ = meAction$.scan(meReducer).startWith({});
