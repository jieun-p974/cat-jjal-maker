import React from "react";

// 상위에서 선언한 updateMainCat을 prop으로 받음
const Form = ({updateMainCat}) => {
    const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);
    const [value, setValue] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    
    // toUpperCase()를 통해 value값이 대문자가 됨
    function handleInputChange(e){
      const userValue = e.target.value;
      console.log(includesHangul(userValue));
      setErrorMessage('');
      if(includesHangul(userValue)){
        setErrorMessage('한글은 입력할 수 없습니다.')
      }
      setValue(userValue.toUpperCase());
    }
  
    function handleFormSubmit(e){
      //폼 전송시 자동으로 refresh되는 것을 막아줌
      e.preventDefault();
      //매번 else를 하지 않고 검증 전에 setErrorMessage를 빈값으로 세팅해줌
      setErrorMessage('');
  
      if(value === ''){
        setErrorMessage('빈 값으로 만들 수 없습니다.');
        return; //함수가 updateMainCat까지 부르지 않고 끝나게 해줌
      }
      updateMainCat(value);
    }
  
    return (
      <form onSubmit={handleFormSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="영어 대사를 입력해주세요"
          value={value}
          onChange={handleInputChange}
        />
        <button type="submit">생성</button>
        <p style={{color:"red"}}>{errorMessage}</p>
      </form>
    );
}

export default Form