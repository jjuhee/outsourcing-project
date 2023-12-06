import { getLocal } from 'api/local';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

function MapSearch() {
  const [inputTitle, setInputTitle] = useState('');
  const [localList, setLocalList] = useState([]);

  //TODO : enable 적용해서 검색버튼 클릭 시 refatch?
  // 현재 : key 값이 변경되면 다시 호출
  const { isLoading, isError, refetch, data } = useQuery(
    ['local', { local: inputTitle }],
    getLocal,
    { enabled: false, select: (local) => local.items }
  );

  const searchPlaceHandler = async (e) => {
    e.preventDefault();
    const { data } = await refetch();
    console.log('clicked', data);
    setLocalList(...data);
    //console.log('clicked2', localList);
  };

  const inputTitleHandler = (e) => {
    setInputTitle(e.target.value);
  };

  return (
    <StyledMap>
      {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt-ovmocWvVYCo1g2IIo1fqKxQtAByXUzxkA&usqp=CAU"></img> */}
      <form onSubmit={searchPlaceHandler}>
        <input
          type="text"
          placeholder="장소를 입력해주세요"
          value={inputTitle}
          onChange={inputTitleHandler}
        />
        <button type="submit">검색</button>
      </form>

      <StListArea>
        {isLoading && <h1>로딩중입니다...!</h1>}
        {isError && <h1>오류가 발생하였습니다..!</h1>}
        {data ? (
          data.map((item, index) => {
            return (
              <StArea key={index}>
                <p>{item.title}</p>
                <p>{item.address}</p>
              </StArea>
            );
          })
        ) : (
          <p>검색을 해주세요</p>
        )}
      </StListArea>
      {/* <ListArea /> */}
      {/* {localList[0].title} */}
    </StyledMap>
  );
}

export default MapSearch;

const StyledMap = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  margin: auto;
  padding: 30px;
  text-align: center;
  & input {
  }
  & img {
    width: 600px;
  }
  & button {
    border-radius: 10px;
    margin: 10px auto;
  }
`;

const StListArea = styled.div`
  font-size: 0.9rem;
  width: 250px;
  height: 400px;
  border: 1px solid black;
`;

const StArea = styled.div`
  padding: 5px;
  border-bottom: 1px solid black;
  & p {
    margin-bottom: 2px;
  }
`;
