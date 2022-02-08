import logo from './logo.svg';
import React from "react";
import './App.css';
import Title from "./components/Title"
import MainCard from "./components/MainCard"
import Form from "./components/Form"
import Favorites from './components/Favorites';

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};
const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};

// {}안에 자바스크립트 문법을 사용 가능
// 컴포넌트를 만들어서 태그<>처럼 사용
const App = () => {
  const CAT1 = "https://cataas.com/cat/60b73094e04e18001194a309/says/react";
  const CAT2 = "https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn";
  const CAT3 = "https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript";


  // 자식 컴포넌트 안에서 쓰던 것을 부모 컨포넌트를 끌어올려서 사용함(lifting state up)
  // 불필요하게 localStorage에 접근하는 것을 방지
  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem('counter');  
  });
  const [mainCat, setMainCat] = React.useState(CAT1);
  const [favorites, setFavorites] = React.useState(()=>{

    //favorites가 없으면 빈배열을 써라
    return jsonLocalStorage.getItem('favorites') || []
  })

  const alreadyFavorite = favorites.includes(mainCat)

  // 앱 진입시 바로 api 콜을 해서 그 api데이터를 메인 캣으로 갈아줌
  // 처음 사이트에 접속했을 때 First Cat이라는 문구와 함께 랜덤한 고양이 사진 출력
  async function setInitialCat(){
    const newCat = await fetchCat('First Cat');
    setMainCat(newCat);
  }

  // useEffect : 
  React.useEffect(()=>{
    setInitialCat();
  },[])
  
  // 상태를 자식 컴포넌트에 프롭스로 넘겨줌
  // await 쓰려면 함수앞에 async 붙어야함
  async function updateMainCat(value){
    const newCat = await fetchCat(value);

    setMainCat(newCat);
    // 생성을 연타해도 숫자가 제대로 올라감
    // prev = previous의 약자로 기존 값이라는 뜻
    setCounter((prev)=>{
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem('counter', nextCounter);
      return nextCounter;
    })
  }

  function handleHeartClick(){
    const nextFavorites = [...favorites, mainCat]
    // 기존의 favorites 배열을 펼치고 CAT3를 추가한다는 문법
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem('favorites', nextFavorites);
  }

  const counterTitle = counter === null ? "" : counter+"번째 "

  return(
    <div>
      <Title>{counterTitle}고양이 가라사대</Title>
      <Form updateMainCat={updateMainCat} />
      <MainCard img={mainCat} onHeartClick={handleHeartClick} alreadyFavorite={alreadyFavorite} />
      <Favorites favorites={favorites} />
    </div>
  );
}

export default App;