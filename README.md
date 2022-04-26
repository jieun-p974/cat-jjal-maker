# Open API를 사용한 고양이 짤방 생성기
**OPen API**를 통해 랜덤으로 불러오는 고양이 사진에 입력한 텍스트를 더해 고양이 짤방을 생성해줍니다.  
마음에 드는 짱방은 사진 우측 하단에 있는 하트를 클릭해서 **Local storage**에 저장할 수 있습니다.  
영어로만 입력할 수 있으며 자동으로 대문자로 출력됩니다.  

**실행 화면**
![고양이짤방생성기](https://user-images.githubusercontent.com/84063843/165304564-573c1a33-d780-4531-bfbb-f5eac3d2f2cd.gif)

## 사용기술
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/> <img src="https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=CSS&logoColor=white"/> <img src="https://img.shields.io/badge/HTML-E34F26?style=flat-square&logo=HTML&logoColor=white"/>

## 사용툴
<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat-square&logo=Visual Studio Code&logoColor=white"/> <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/>

## 주요코드
- Open API와 연결하는 코드
```js
const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};
```
- 한글로 입력하는 것을 막고 입력값을 대문자로 출력하는 코드
```js
function handleInputChange(e){
      const userValue = e.target.value;
      console.log(includesHangul(userValue));
      setErrorMessage('');
      if(includesHangul(userValue)){
        setErrorMessage('한글은 입력할 수 없습니다.')
      }
      setValue(userValue.toUpperCase());
}
```
- 하트를 클릭하면 저장하는 코드
```js
function handleHeartClick(){
    const nextFavorites = [...favorites, mainCat]
    // 기존의 favorites 배열에 추가해줌
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem('favorites', nextFavorites);
  }
```
