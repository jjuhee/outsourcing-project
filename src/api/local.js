import axios from 'axios';

// `${process.env.REACT_APP_LOCAL_SERVER_URL}`

const getLocal = async (input) => {
  console.log('abc', input);
  const { data } = await axios.get('/v1/search/local.json', {
    params: {
      query: input.queryKey[1].local, //input으로 변경
      display: 5
    },
    headers: {
      'X-Naver-Client-Id': process.env.REACT_APP_LOCAL_CLIENT_ID,
      'X-Naver-Client-Secret': process.env.REACT_APP_LOCAL_CLIENT_SECRET
    }
  });

  return data;
};

export { getLocal };
